# japanworld.co.jp — Astro + Cloudflare Workers

Japan World株式会社 / Resort Hotel 楽気ハウス那須 のコーポレートサイト。
Wix からの移行版です。

- 本番想定 URL: `https://www.japanworld.co.jp/`
- 48ページ（日本語 / English / 繁體中文 / Tiếng Việt × 12ページ）＋ 404
- ランタイム JavaScript: **0 バイト**（モバイルメニューのインライン1ブロックのみ）

---

## セットアップ

Node.js 20.11 以上が必要です。

```bash
npm install
```

このリポジトリには `.tooling/node-v22.20.0-win-x64/` に Node のポータブル版が置かれています。
PATH に Node が無い環境では、先に次を実行してください。

```bash
export PATH="$PWD/.tooling/node-v22.20.0-win-x64:$PATH"   # bash
$env:PATH = "$PWD\.tooling\node-v22.20.0-win-x64;$env:PATH"  # PowerShell
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
| `npm run verify:redirects` | 旧URLのリダイレクト 122 ケースを検証 |
| `npm run verify:overflow` | 8つの画面幅で横スクロールが起きていないか検証（Chrome が必要） |
| `npm run shots` | 全ページのスクリーンショットを撮る（Chrome が必要） |
| `npm run deploy` | **本番デプロイ。ユーザーが実行するものです** |

### まとめて検証する

```bash
npm run build
npm run verify
npm run verify:redirects
npm run verify:overflow
npx wrangler deploy --dry-run
```

---

## ディレクトリ構成

```
assets/source/          Wix から取得した原画像 74点（変更しない／リポジトリの資産）
public/
  images/               配信用 WebP（scripts/build-images.mjs が生成）
  docs/                 楽気ハウス宿泊予約マニュアル PDF
  robots.txt  favicon.svg  apple-touch-icon.png
src/
  data/
    site.ts             ★ 会社情報・ホテル情報・外部リンク・ルート定義（事実情報の唯一の出典）
    jsonld.ts           構造化データ
    images.generated.ts 自動生成（編集しない）
  i18n/
    types.ts            コンテンツの型
    ja.ts en.ts zh.ts vi.ts   ★ 全ページの本文
    index.ts
  components/           Header / Footer / Picture / PageHero / BookingRoutes / Breadcrumbs / CtaBand
  sections/             各ページの本体（Home / Hotel / Rooms / Spa / Dining / Banquet /
                        Salon / Nasu / Booking / Membership / Access / Company）
  layouts/Base.astro    <head>・共通レイアウト
  pages/
    [...slug].astro     48ページをここから静的生成
    404.astro
    sitemap.xml.ts
  styles/global.css     デザイントークンと共通スタイル
scripts/
  image-manifest.mjs    ★ 画像の一覧と alt テキスト
  build-images.mjs      画像生成
  check-all.mjs         ビルド成果物の検証
  check-redirects.mjs   リダイレクト検証
  check-overflow.mjs    横スクロール検証
  shots.mjs             スクリーンショット
  lib/preview.mjs       検証用の静的サーバー
worker/index.ts         Cloudflare Worker（apex→www・旧URL 301・410・404・ヘッダー）
wrangler.jsonc          Workers 設定（★ routes はコメントアウト中）
docs/                   調査・設計・要確認事項のドキュメント
```

★ を付けたファイルが、内容を直す際の入口です。

---

## コンテンツを直したいとき

| 直したいもの | ファイル |
|---|---|
| 会社の住所・電話・資本金・代表者 | `src/data/site.ts` の `COMPANY` |
| ホテルの住所・電話・客室数・受付時間 | `src/data/site.ts` の `HOTEL` |
| 外部サイトのURL（rakinasu / JWCCS / NFT / バス時刻表） | `src/data/site.ts` の `EXTERNAL` |
| 一般のお客様の予約先（予約エンジン・言語別） | `src/data/site.ts` の `bookingUrl()` |
| NFT導線の表示・非表示 | `src/data/site.ts` の `FEATURES.nftLink`（現在 `false`。証明書更新後に `true` へ） |
| 各ページの本文・見出し・説明文 | `src/i18n/ja.ts` `en.ts` `zh.ts` `vi.ts` |
| ページの追加・削除・URL変更 | `src/data/site.ts` の `ROUTES` と `src/pages/[...slug].astro` |
| 画像の差し替え・alt テキスト | `scripts/image-manifest.mjs` → `npm run images` |
| 旧URLのリダイレクト | `worker/index.ts` の `SLUG_MAP` / `EXACT_REDIRECTS` |

住所・電話番号などの事実情報は `src/data/site.ts` **1箇所だけ**に書かれています。
ページ側にハードコードされている場所はありません。

---

## デプロイ

⚠ **このリポジトリからは本番デプロイを行っていません。**

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

---

## 設計上の決めごと

- **事実情報は推測で変更しない。** 判断できないものは `docs/04-content-review.md` に記録し、
  サイト側は現行の記載を保つか、日本語版に合わせるかのどちらかにして、どちらを選んだか明記する
- **会員権の金額・契約条件は推測で書かない。** 日本語版は現行サイトの記載のまま。
  英・中・越版は、日本語版と食い違っていた具体的な数値（宿泊料金・予約時期・期限）を
  確認が取れるまで外し、「JWCCS および契約書面をご確認ください」に置き換えている（docs/04 要確認 #2）
- **失効した証明書へ利用者を誘導しない。** NFT導線は `FEATURES.nftLink` で無効化中（docs/04 要確認 #6）
- **健康表現を追加・強化しない。** `docs/05-health-content-review.md` 参照
- **Webフォント・外部スクリプトを読み込まない。** CSP を `default-src 'self'` に保てる
- **旧URLを捨てない。** 48の旧URLすべてに 301 を用意する
