# 03. URL 移行一覧（旧URL → 新URL）

実装: `worker/index.ts`
検証: `npm run verify:redirects`（`scripts/check-redirects.mjs`）

すべて **301（恒久的リダイレクト）**。パスは Worker 側で
大文字小文字・末尾スラッシュの有無を吸収してから照合します。

---

## 1. ホスト正規化

| 旧 | 新 |
|---|---|
| `http://japanworld.co.jp/*` | `https://www.japanworld.co.jp/*` |
| `https://japanworld.co.jp/*` | `https://www.japanworld.co.jp/*` |
| `http://www.japanworld.co.jp/*` | `https://www.japanworld.co.jp/*` |

パスとクエリ文字列は保持します（`?lightbox=` を除く。下記 4 参照）。

---

## 2. ページ（日本語・プレフィックスなし）

| 旧URL | 新URL | 備考 |
|---|---|---|
| `/` | `/` | 変更なし |
| `/rakihouse` | `/raki-house/` | 施設トップ |
| `/楽気ハウス-那須` | `/raki-house/` | 施設インデックスだったページを施設トップに統合 |
| `/lobby` | `/raki-house/` | ロビーの内容は施設トップの一節へ |
| `/about` | `/raki-house/` | 「楽気ハウスの取り組み」は施設トップの一節へ（アクセス情報は `/access/` へ移動） |
| `/room` | `/raki-house/rooms/` | |
| `/spa` | `/raki-house/spa/` | |
| `/restaurant-and-bar` | `/raki-house/dining/` | |
| `/banquethall` | `/raki-house/banquet/` | |
| `/salon` | `/raki-house/salon/` | |
| `/about-5` | `/membership/` | 楽気ハウス会員権 |
| `/companyprofile` | `/company/` | 会社概要 |

`/楽気ハウス-那須` は実際には
`/%E6%A5%BD%E6%B0%97%E3%83%8F%E3%82%A6%E3%82%B9-%E9%82%A3%E9%A0%88`
としてリクエストされます。Worker は `decodeURIComponent` してから照合するため、
エンコード済み・未エンコードのどちらでも一致します。

---

## 3. ページ（英語 `/en` ／ 中国語 `/zh` ／ ベトナム語 `/vi`）

日本語とまったく同じ対応を、各言語プレフィックスに対して適用します。
**旧URLを404にせず、同じ言語の新URLへ 301 します。**

| 旧URL | 新URL |
|---|---|
| `/en` | `/en/` |
| `/en/rakihouse` | `/en/raki-house/` |
| `/en/楽気ハウス-那須` | `/en/raki-house/` |
| `/en/lobby` | `/en/raki-house/` |
| `/en/about` | `/en/raki-house/` |
| `/en/room` | `/en/raki-house/rooms/` |
| `/en/spa` | `/en/raki-house/spa/` |
| `/en/restaurant-and-bar` | `/en/raki-house/dining/` |
| `/en/banquethall` | `/en/raki-house/banquet/` |
| `/en/salon` | `/en/raki-house/salon/` |
| `/en/about-5` | `/en/membership/` |
| `/en/companyprofile` | `/en/company/` |

`/zh/…` と `/vi/…` も同じ 12 件ずつ。**合計 48 の旧URLすべてに対応**しています。

---

## 4. Wix 固有 URL

| 旧URL | 新URL / 挙動 |
|---|---|
| `/_files/ugd/64855c_46735f4f79e5460d9c353093d4e03724.pdf` | `/docs/raki-house-yoyaku-manual.pdf`（301） |
| `/en/_files/ugd/…pdf` `/zh/_files/ugd/…pdf` `/vi/_files/ugd/…pdf` | `/docs/raki-house-yoyaku-manual.pdf`（301） |
| `/pages-sitemap.xml` | `/sitemap.xml`（301） |
| `/en_en-sitemap.xml` `/zh_zh-sitemap.xml` `/vi_vi-sitemap.xml` | `/sitemap.xml`（301） |
| `/en_en-pages-sitemap.xml` `/zh_zh-pages-sitemap.xml` `/vi_vi-pages-sitemap.xml` | `/sitemap.xml`（301） |
| `/*?lightbox=…` | クエリを落として同じパスへ 301 |
| `/_api/*` | **410 Gone** |
| `/_partials*` | **410 Gone** |
| `/_serverless/*` | **410 Gone** |
| `/_functions/*` | **410 Gone** |
| `/pro-gallery-webapp/*` | **410 Gone** |
| `/_files/*`（上記PDF以外） | **410 Gone** |

410 はクローラに「もう存在しない」と明示して再訪を止めるためのものです。

---

## 5. 正規化ルール

| 入力 | 挙動 |
|---|---|
| `/RAKIHOUSE` `/RakiHouse` | 小文字化して照合 → `/raki-house/` へ 301 |
| `/rakihouse/` `/about-5/` | 末尾スラッシュ付きでも照合 → 新URLへ 301 |
| `/raki-house`（スラッシュなし） | `/raki-house/` へ 301 |
| `/booking?utm_source=x` | `/booking/?utm_source=x` へ 301（クエリ保持） |
| 上記いずれにも当たらないパス | `/404.html` を **404** ステータスで返す |
| `POST` `PUT` など | **405 Method Not Allowed**（`Allow: GET, HEAD`） |

---

## 6. 新サイトの URL 一覧（48ページ）

| ページキー | 日本語 | 英語 | 中国語 | ベトナム語 |
|---|---|---|---|---|
| ホーム | `/` | `/en/` | `/zh/` | `/vi/` |
| 楽気ハウス那須 | `/raki-house/` | `/en/raki-house/` | `/zh/raki-house/` | `/vi/raki-house/` |
| 客室 | `/raki-house/rooms/` | `/en/raki-house/rooms/` | `/zh/raki-house/rooms/` | `/vi/raki-house/rooms/` |
| 温泉・大浴場 | `/raki-house/spa/` | `/en/raki-house/spa/` | `/zh/raki-house/spa/` | `/vi/raki-house/spa/` |
| ダイニング | `/raki-house/dining/` | `/en/raki-house/dining/` | `/zh/raki-house/dining/` | `/vi/raki-house/dining/` |
| 宴会場 | `/raki-house/banquet/` | `/en/raki-house/banquet/` | `/zh/raki-house/banquet/` | `/vi/raki-house/banquet/` |
| 細胞浴サロン | `/raki-house/salon/` | `/en/raki-house/salon/` | `/zh/raki-house/salon/` | `/vi/raki-house/salon/` |
| 那須高原 | `/raki-house/nasu/` | `/en/raki-house/nasu/` | `/zh/raki-house/nasu/` | `/vi/raki-house/nasu/` |
| 宿泊予約 ★新設 | `/booking/` | `/en/booking/` | `/zh/booking/` | `/vi/booking/` |
| 会員権 | `/membership/` | `/en/membership/` | `/zh/membership/` | `/vi/membership/` |
| アクセス ★新設 | `/access/` | `/en/access/` | `/zh/access/` | `/vi/access/` |
| 会社概要 | `/company/` | `/en/company/` | `/zh/company/` | `/vi/company/` |

その他:

| URL | 内容 |
|---|---|
| `/sitemap.xml` | 48URL を hreflang 付きで 1 本にまとめたサイトマップ |
| `/robots.txt` | 全許可 + sitemap 参照 |
| `/404.html` | 404ページ（`noindex, follow`） |
| `/docs/raki-house-yoyaku-manual.pdf` | 楽気ハウス宿泊予約マニュアル（現行サイトのPDFをそのまま） |
| `/favicon.svg` `/apple-touch-icon.png` | ファビコン |
| `/images/**` | 配信用 WebP |

★新設の 2 ページ（`/booking/` `/access/`）は旧サイトに対応する URL がないため、
リダイレクト元はありません。sitemap とナビゲーションから到達します。
