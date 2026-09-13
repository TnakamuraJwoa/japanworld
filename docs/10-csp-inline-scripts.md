# 10. 本番でスマートフォンのメニューが開かない — CSP とインラインスクリプト

発生報告: 2026-09-13
対象: `https://www.japanworld.co.jp/`（本番）
修正: ローカルで実施・検証済み。**デプロイするまで本番には反映されません。**

---

## 1. 症状

スマートフォン幅で右上の「メニュー」をタップしても、ドロワーが開かない。
PC 幅ではナビが常時表示のため影響なし。

あわせて、スクロールで要素がふわっと出る表示（`.reveal`）も動いていなかった
（JavaScript が無効なときと同じく、最初から全部表示される状態）。こちらは見た目に支障が無いので気づかれていなかった。

---

## 2. 原因

**Worker が返す Content-Security-Policy が、HTML に埋め込まれたスクリプトの実行を禁止していた。**

| 項目 | 値 |
|---|---|
| CSP（修正前） | `script-src 'self'` |
| メニューのJS | `<script type="module">…</script>`（Astro が小さいので HTML にインライン化） |
| スクロール表示のJS | `<script>…</script>`（`is:inline`） |

CSP の `'self'` は「同じオリジンの**外部ファイル**」だけを許可し、**インラインスクリプトは許可しない**。
このサイトは外部 JS ファイルを 0 本にする設計（`docs/07` §9）で、2 本の JS をどちらも HTML に埋め込んでいるため、
ブラウザが両方とも実行を拒否していた。

本番を Chrome（390px・タッチ）で開いた実測:

```
[security/error] Executing inline script violates the following Content Security Policy
                 directive 'script-src 'self''. Either the 'unsafe-inline' keyword,
                 a hash ('sha256-wSa0hyPf3VnJFanSG2s099Mj49N7zCmmoB0xF2cPymE='), ...
[security/error] Executing inline script violates ... a hash ('sha256-aMXvDcDLfQFhPvzV5B2hPm8ffE/HuDXIndy5gNvxViE='), ...
タップ後: aria-expanded=false  data-open=false   ← 開かない
```

### なぜローカルの検査（`npm run verify:nav`）で見つからなかったか

`verify:nav` / `verify:overflow` / `shots` は `scripts/lib/preview.mjs` の簡易サーバーで `dist/` を配信していた。
このサーバーは **Worker を通さない**ので CSP ヘッダーが付かず、Chrome はスクリプトを普通に実行していた。
つまり「dist を素で開けば動く／Worker 越しだと動かない」という差がローカルでは見えなかった。

（`cac3c38` `343bc9e` のドロワー修正はどちらも、この検査で「開く」ことを確認して入っている。
JS が動く前提の修正としては正しく、本番で動かなかった原因は別＝CSP だった。）

---

## 3. 修正

### 3.1 方針: CSP を緩めず、ハッシュで許可する

| 案 | 採否 | 理由 |
|---|---|---|
| `script-src 'self' 'unsafe-inline'` | ✗ | どんなインラインスクリプトでも動いてしまい、CSP を付けている意味が無くなる |
| JS を外部ファイルにする | △ | 動くが、外部 JS 0 本の設計を崩す。`is:inline` のスクロール表示も書き換えが要る |
| **ビルドごとにインラインスクリプトの SHA-256 を CSP に載せる** | **✓** | そのビルドで生成した 2 本だけを許可できる。設計を変えずに済む |
| nonce | ✗ | リクエストごとに HTML を書き換える必要があり、静的サイトには過剰 |

### 3.2 仕組み

```
npm run build
  ├─ astro build                      … dist/ を生成
  └─ node scripts/build-csp-hashes.mjs
        dist/**/*.html の <script>（src なし・実行されるもの）を SHA-256 で数え上げ、
        worker/csp-hashes.generated.ts に書き出す

worker/index.ts
  import { CSP_SCRIPT_HASHES } from './csp-hashes.generated.ts'
  script-src 'self' 'sha256-…' 'sha256-…'
```

修正後の CSP（wrangler dev 実測）:

```
script-src 'self' 'sha256-aMXvDcDLfQFhPvzV5B2hPm8ffE/HuDXIndy5gNvxViE=' 'sha256-wSa0hyPf3VnJFanSG2s099Mj49N7zCmmoB0xF2cPymE='
```

JSON-LD（`type="application/ld+json"`）は実行されないため対象外。

### 3.3 運用上の約束

- **`worker/csp-hashes.generated.ts` はコミットする**（`src/data/images.generated.ts` と同じ扱い）。
- **`npm run build` → `npm run deploy` の順で実行する。** Worker は生成物をバンドルして配信するので、この順なら HTML と CSP は必ず一致する。
- `astro build` を単体で走らせると生成物が古いままになる。`npm run verify` の **[13]** がそれを検出する。
- メニューやスクロール表示の JS を 1 文字でも変えるとハッシュが変わる。**変えたら `npm run build`**（自動で再生成される）。

---

## 4. 再発防止 — ローカル検査を Worker 経由にした

`scripts/lib/preview.mjs` を、`worker/index.ts` を実際に呼んで配信する形に変えた（`scripts/lib/worker-local.mjs`）。
`verify:nav` / `verify:overflow` / `shots` はすべて **本番と同じヘッダー付き**で Chrome に読み込まれるようになり、
CSP 違反があれば検査が落ちる。

追加した検査:

| コマンド | 内容 |
|---|---|
| `npm run verify` [13] | dist のインラインスクリプトのハッシュと `worker/csp-hashes.generated.ts` が一致すること |
| `npm run verify:redirects` | Worker が返す CSP の `script-src` に、dist の全インラインスクリプトのハッシュが載っていること |
| `npm run verify:nav` | Worker + CSP 経由でドロワーが実際に開閉すること（従来は CSP 無しで検査していた） |

逆テスト（生成物のハッシュを 1 件わざと壊した状態）:

| コマンド | 結果 |
|---|---|
| `npm run verify` | [13] で **✗**（生成物に無いインラインスクリプト） |
| `npm run verify:redirects` | **✗ script-src にハッシュが無い** |
| `npm run verify:nav` | **✗ aria-expanded が false**（本番と同じ症状をローカルで再現） |

---

## 5. 検証結果（修正後）

| 項目 | 結果 |
|---|---|
| `npm run check` | 0 errors / 0 warnings / 0 hints |
| `npm run build` | 10 ページ生成、ハッシュ 2 件生成 |
| `npm run verify` | エラー 0 / 警告 0（[13] 一致） |
| `npm run verify:redirects` | 172 / 172、CSP ハッシュ 2 本あり |
| `npm run verify:nav`（Worker + CSP 経由） | 320 / 390 / 414 / 768px × 4 ページ × 2 スクロール位置 すべて開閉 OK |
| `npm run verify:overflow`（Worker 経由） | 横スクロールなし |
| `wrangler dev --local` 実機（workerd） | CSP にハッシュ 2 件、タップで `aria-expanded=true`、ブラウザログ **0 件** |

---

## 6. ★ 別件: Cloudflare Web Analytics のビーコンも CSP で止まっている

本番の Chrome ログにもう 1 件出ていた:

```
[security/error] Loading the script 'https://static.cloudflareinsights.com/beacon.min.js/…'
                 violates the following Content Security Policy directive: "script-src 'self'".
```

Cloudflare のゾーン設定で **Web Analytics（自動注入）** が有効になっており、エッジで
`<script src="https://static.cloudflareinsights.com/beacon.min.js">` が差し込まれているが、
CSP がそれを遮断しているため **計測は一切記録されていない**（本リポジトリのコードには含まれていない）。

どちらかをご判断ください。**今回は変更していません。**

| 案 | 内容 |
|---|---|
| A. 計測を使わない | Cloudflare ダッシュボード → Web Analytics で、このサイトの自動注入を OFF にする。CSP はそのまま |
| B. 計測を使う | `worker/index.ts` の CSP に `script-src … https://static.cloudflareinsights.com` と `connect-src 'self' https://cloudflareinsights.com` を追加する（コード変更＋デプロイ） |

なお、注入されるのは外部 `src` 付きの `<script>` なので、今回のハッシュには影響しない。

---

## 7. 反映に必要な作業

```bash
npm run build      # dist と worker/csp-hashes.generated.ts を生成
npm run verify     # [13] まで通ること
npm run deploy     # ← 本番反映（ご指示があるまで実行しません）
```

デプロイ後、`https://www.japanworld.co.jp/` のレスポンスヘッダーの `Content-Security-Policy` に
`'sha256-…'` が 2 つ含まれていること、スマートフォンでメニューが開くことをご確認ください。
