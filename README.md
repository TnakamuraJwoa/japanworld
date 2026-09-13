# japanworld.co.jp — Astro + Cloudflare Workers

Japan World株式会社のコーポレートサイト。

- 本番想定 URL: `https://www.japanworld.co.jp/`
- **日本語のみ / 9ページ + お知らせ詳細 + 404**
- ランタイム JavaScript: **約 1KB**（モバイルメニューとスクロール表示のインライン2ブロックのみ。外部ファイル0）

> **2026-09-13 コーポレートサイトへ全面改修。**
> それ以前は「楽気ハウス那須」のホテル紹介が中心で、4言語 48URL の構成でした。
> 今回、事業（ウェルネス／ビューティー／ホスピタリティ）を軸とした構成へ変更し、
> 多言語版は廃止して日本語ページへ 301 しています。経緯は `docs/07-corporate-renewal.md` を参照。

---

## セットアップ

Node.js 20.11 以上が必要です。

```bash
npm install
```

PATH に Node が無い環境では、先に次を実行してください。

```bash
export PATH="/c/Program Files/nodejs:$PATH"          # bash / Git Bash
$env:PATH = "C:\Program Files\nodejs;$env:PATH"      # PowerShell
```

---

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（Astro） |
| `npm run build` | `dist/` へ静的ビルド |
| `npm run preview` | `wrangler dev` で Worker ごと確認 |
| `npm run check` | 型チェック（`astro check`） |
| `npm run images` | `assets/source/` から `public/images/` の WebP を再生成 |
| `npm run verify` | ビルド成果物の検証（SEO・alt・リンク・Wix依存・sitemap ほか） |
| `npm run verify:redirects` | 旧URLのリダイレクト 153 ケースを検証 |
| `npm run verify:overflow` | 8つの画面幅で横スクロールが起きていないか検証（Chrome / Edge が必要） |
| `npm run shots` | 全ページのスクリーンショットを撮る（Chrome / Edge が必要） |
| `npm run deploy` | **本番デプロイ。ユーザーが実行するものです** |

Chrome が無い環境では `CHROME_PATH` に Edge を指定できます。

```bash
CHROME_PATH="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" npm run verify:overflow
```

### まとめて検証する

```bash
npm run build
npm run verify
npm run verify:redirects
npm run verify:overflow
npx wrangler deploy --dry-run
```

---

## サイト構成

```
/                          トップ
├─ /business/              事業紹介（3事業のハブ）
│   ├─ /business/wellness/      細胞浴SALON 太古の甕
│   ├─ /business/beauty/        Esthetic Salon RICHIA
│   └─ /business/hospitality/   Resort Hotel 楽気ハウス那須／会員権
├─ /company/               会社情報
├─ /news/                  お知らせ一覧（ページネーション対応）
│   ├─ /news/<id>/              お知らせ詳細
│   └─ /news/page/<n>/          2ページ目以降（11件目から自動生成）
├─ /contact/               お問い合わせ
└─ /404                    （worker が返す）
```

---

## ディレクトリ構成

```
assets/source/          Wix から取得した原画像（変更しない／リポジトリの資産）
public/
  images/               配信用 WebP（scripts/build-images.mjs が生成）
  docs/                 楽気ハウス宿泊予約マニュアル PDF
  robots.txt  favicon.svg  apple-touch-icon.png
src/
  data/
    site.ts             ★ 会社情報・ホテル情報・外部リンク・ルート定義（事実情報の唯一の出典）
    business.ts         ★ 3事業の一覧データ（カード・見出しで共有）
    news.ts             ★ お知らせ（microCMS のレスポンス形に合わせてある）
    jsonld.ts           構造化データ
    images.generated.ts 自動生成（編集しない）
  components/           Header / Footer / Picture / PageHero / Breadcrumbs /
                        CtaBand / NewsList / Pagination
  layouts/Base.astro    <head>・共通レイアウト・スクロール表示のスクリプト
  pages/
    index.astro         トップ
    business/           index / wellness / beauty / hospitality
    company/index.astro
    news/               index / [id] / page/[page]
    contact/index.astro
    404.astro
    sitemap.xml.ts
  styles/global.css     デザイントークン・共通スタイル・アニメーション
scripts/
  image-manifest.mjs    ★ 画像の一覧と alt テキスト
  build-images.mjs      画像生成
  check-all.mjs         ビルド成果物の検証
  check-redirects.mjs   リダイレクト検証
  check-overflow.mjs    横スクロール検証
  shots.mjs             スクリーンショット
  lib/preview.mjs       検証用の静的サーバー
worker/index.ts         Cloudflare Worker（apex→www・旧URL 301・多言語 301・410・404・ヘッダー）
wrangler.jsonc          Workers 設定（★ routes はコメントアウト中）
docs/                   調査・設計・要確認事項のドキュメント
```

★ を付けたファイルが、内容を直す際の入口です。

---

## コンテンツを直したいとき

| 直したいもの | ファイル |
|---|---|
| 会社の住所・電話・資本金・代表者 | `src/data/site.ts` の `COMPANY` |
| 登記上の事業内容の一覧 | `src/data/site.ts` の `COMPANY_BUSINESS` |
| ホテルの住所・電話・客室数・受付時間 | `src/data/site.ts` の `HOTEL` |
| 外部サイトのURL（rakinasu / JWCCS / 細胞浴 / NFT） | `src/data/site.ts` の `EXTERNAL` |
| NFT導線の表示・非表示 | `src/data/site.ts` の `FEATURES.nftLink`（現在 `false`。証明書更新後に `true` へ） |
| 事業カードの名称・説明・画像 | `src/data/business.ts` |
| **お知らせの追加・修正** | `src/data/news.ts` の `NEWS` 配列 |
| 各ページの本文・見出し | 対応する `src/pages/**/*.astro`（本文はページ内に直接書いてあります） |
| ページの追加・削除・URL変更 | `src/data/site.ts` の `ROUTES` と `src/pages/` |
| 画像の差し替え・alt テキスト | `scripts/image-manifest.mjs` → `npm run images` |
| 旧URLのリダイレクト | `worker/index.ts` の `SLUG_MAP` / `EXACT_REDIRECTS` |

住所・電話番号などの事実情報は `src/data/site.ts` **1箇所だけ**に書かれています。
ページ側にハードコードされている場所はありません。

---

## デプロイ

⚠ **このリポジトリからは本番デプロイを行っていません。**

⚠ **ただし `https://www.japanworld.co.jp/` では、すでに本サイトの旧版が配信されています。**
2026-09-13 時点で実測したところ、`Server: cloudflare` で、レスポンスヘッダーが
`worker/index.ts` の `SECURITY_HEADERS` と一致し、HTML も Astro のビルド出力でした。
`wrangler.jsonc` の `routes` はコメントアウトされたままなので、
カスタムドメインは Cloudflare ダッシュボード側で割り当てられているとみられます。
**今回の改修内容は、デプロイするまで本番には反映されません。**

`wrangler.jsonc` の `routes` はコメントアウトされています。
これを有効にして `wrangler deploy` すると、**Cloudflare が該当ゾーンに DNS レコードを自動作成します。**

デプロイの前に **必ず `docs/06-dns-migration.md` を読んでください。**
このドメインは heteml のメール（MX）と、稼働中のサブドメイン `jwcc` / `nft` を抱えています。

```bash
# 1. まず workers.dev で確認する（routes はコメントアウトのまま）
npx wrangler deploy

# 2. DNS の準備が完了してから、routes を有効にして再デプロイ
npx wrangler deploy
```

---

## ドキュメント

| ファイル | 内容 |
|---|---|
| [docs/01-research.md](docs/01-research.md) | 現行 Wix サイトの調査結果（全URL・Wix依存・外部サービス・SEO実測） |
| [docs/02-site-design.md](docs/02-site-design.md) | 現行サイトの問題点と、新サイトの設計 |
| [docs/03-url-migration.md](docs/03-url-migration.md) | 旧URL → 新URL の全対応表 |
| **[docs/04-content-review.md](docs/04-content-review.md)** | **★ 古い情報・矛盾・要確認事項（最初に読んでください）** |
| [docs/05-health-content-review.md](docs/05-health-content-review.md) | 健康・医療に関わる表現のレビュー |
| [docs/06-dns-migration.md](docs/06-dns-migration.md) | DNS 調査結果と移行手順 |
| **[docs/07-corporate-renewal.md](docs/07-corporate-renewal.md)** | **★ 今回のコーポレートサイト改修の決定事項と要確認事項** |

⚠ docs/01〜03 はホテル中心だった前構成を前提に書かれています。
現在の構成は docs/07 が正です。

---

## 設計上の決めごと

- **事実情報は推測で変更しない。** 判断できないものは `docs/04-content-review.md` と
  `docs/07-corporate-renewal.md` に記録し、サイト側は現行の記載を保つか、
  数値を外して定性的に書くかのどちらかにして、どちらを選んだか明記する
- **存在しない事業を載せない。** 掲載しているのは実在が確認できた3事業のみ。
  システム・IT事業は登記上の事業内容に該当項目がなく、今回は掲載していない（docs/07）
- **会員権の金額・契約条件は推測で書かない。** 現行サイトの記載のまま掲載し、
  契約書面と JWCCS 利用規約の確認を促す注記を添えている
- **失効した証明書へ利用者を誘導しない。** NFT導線は `FEATURES.nftLink` で無効化中（docs/04 要確認 #6）
- **健康表現を追加・強化しない。** `docs/05-health-content-review.md` 参照
- **Webフォント・外部スクリプトを読み込まない。** CSP を `default-src 'self'` に保てる
- **旧URLを捨てない。** Wix 時代・前構成・多言語のすべてに 301 を用意する（153ケースを検証）
- **アニメーションのためにライブラリを足さない。** CSS と IntersectionObserver 約20行のみ。
  `prefers-reduced-motion: reduce` では初期状態の隠しごと無効化する
