# 03. URL 移行一覧（旧URL → 新URL）

最終更新: 2026-09-13（SEO 改修にあわせて全面改訂）

実装: `worker/index.ts`
検証: `npm run verify:redirects`（`scripts/check-redirects.mjs` / 172ケース）

> このドキュメントは **現在の対応表** です。
> ホテル中心だった前構成（`/raki-house/…` 4言語48URL）の対応表は
> git 履歴と `docs/07-corporate-renewal.md` §3.1 を参照してください。

---

## 0. 原則

| 状況 | 扱い |
|---|---|
| 内容が新サイトに存在する | 最も関連する新URLへ **301** |
| 複数の旧ページを1ページへ統合した | 統合後のページへ **301**（該当セクションへフラグメント付き） |
| 廃止され、代替ページも無い | **410 Gone** |
| 元々存在しなかったパス | **404** |

**やっていないこと**

- 関連の無い旧URLをまとめてトップページへ 301 すること
  （Google に soft 404 と判定され、トップページの評価まで下げるため）
- リダイレクトチェーン
  ホスト正規化・旧URL解決・末尾スラッシュ・`?lightbox=` は
  Worker 内で1つの転送先に畳んでから 301 を1回だけ返します。

---

## 1. ホスト・プロトコルの正規化

| 旧 | 新 |
|---|---|
| `http://japanworld.co.jp/*` | `https://www.japanworld.co.jp/*` |
| `https://japanworld.co.jp/*` | `https://www.japanworld.co.jp/*` |
| `http://www.japanworld.co.jp/*` | `https://www.japanworld.co.jp/*` |

パスとクエリは保持します（`?lightbox=` のみ削除）。

旧URLとホスト正規化が重なった場合も **1 ホップ**です。

```
http://japanworld.co.jp/companyprofile
  → 301 → https://www.japanworld.co.jp/company/     ← ここで終わり
```

---

## 2. 旧 Wix サイトのページ（日本語・プレフィックスなし）

| 旧URL | 新URL | Status | 理由 |
|---|---|---:|---|
| `/` | `/` | 200 | 変更なし |
| `/rakihouse` | `/business/hospitality/` | 301 | 施設紹介 → ホスピタリティ事業ページへ統合 |
| `/楽気ハウス-那須` | `/business/hospitality/` | 301 | 施設インデックス → 同上 |
| `/about` | `/business/hospitality/` | 301 | 「楽気ハウスの取り組み」→ 事業概要の節へ |
| `/lobby` | `/business/hospitality/#facilities` | 301 | ロビー → 「館内のご案内」へ統合 |
| `/room` | `/business/hospitality/#facilities` | 301 | 客室 → 同上 |
| `/spa` | `/business/hospitality/#facilities` | 301 | 温泉・大浴場 → 同上 |
| `/restaurant-and-bar` | `/business/hospitality/#facilities` | 301 | レストラン＆バー → 同上 |
| `/banquethall` | `/business/hospitality/#facilities` | 301 | 宴会場 → 同上 |
| `/about-5` | `/business/hospitality/#membership` | 301 | 楽気ハウス会員権 → 「楽気ハウス会員権」の節へ |
| `/salon` | `/business/wellness/` | 301 | 細胞浴SALON 太古の甕の専用ページ |
| `/companyprofile` | `/company/` | 301 | 会社概要 |
| `/甲斐路-home` | — | **410** | 楽気ハウス甲斐路。**別会社へ売却済みで現在の Japan World株式会社とは無関係**のため、当社サイトに対応ページが無い（下記 5 参照） |
| `/blog-feed.xml` | — | **410** | Wix のブログ RSS。新サイトにブログが無く、`/news/` はフィードを持たない |

`/楽気ハウス-那須` `/甲斐路-home` は実際には
`/%E6%A5%BD%E6%B0%97%E3%83%8F%E3%82%A6%E3%82%B9-%E9%82%A3%E9%A0%88` のように
URLエンコードされて届きます。Worker は `decodeURIComponent` してから照合するため、
エンコード済み・未エンコードのどちらでも一致します。

### フラグメントについて

`#facilities` `#membership` `#booking` は **着地位置の改善のため**に付けています。
Google はフラグメントを無視して `/business/hospitality/` として索引するので、
URL の正規化・評価の集約には影響しません。
id は `src/pages/business/hospitality.astro` の `<section id="…">` と対応しています。

---

## 3. 前構成（ホテル中心）のページ

前構成が本番で稼働していた期間に索引された可能性があるため、こちらも残しています。

| 旧URL | 新URL | Status |
|---|---|---:|
| `/raki-house/` | `/business/hospitality/` | 301 |
| `/raki-house/rooms/` | `/business/hospitality/#facilities` | 301 |
| `/raki-house/spa/` | `/business/hospitality/#facilities` | 301 |
| `/raki-house/dining/` | `/business/hospitality/#facilities` | 301 |
| `/raki-house/banquet/` | `/business/hospitality/#facilities` | 301 |
| `/raki-house/nasu/` | `/business/hospitality/` | 301 |
| `/raki-house/salon/` | `/business/wellness/` | 301 |
| `/booking/` | `/business/hospitality/#booking` | 301 |
| `/membership/` | `/business/hospitality/#membership` | 301 |
| `/access/` | `/business/hospitality/` | 301 |

---

## 4. 多言語（`/en` ／ `/zh` ／ `/vi`）

新サイトは日本語のみです。**SEO のためだけに英語・中国語・ベトナム語ページを作ることはしません。**
`hreflang` も出力していません（`html lang="ja"` のみ）。

### 4.1 対応する日本語ページがあるもの → 301

上記 2・3 の対応表を、そのまま各言語プレフィックスに適用します。

| 旧URL | 新URL | Status |
|---|---|---:|
| `/en` `/en/` `/zh` `/zh/` `/vi` `/vi/` | `/` | 301 |
| `/en/rakihouse` `/zh/rakihouse` `/vi/rakihouse` | `/business/hospitality/` | 301 |
| `/en/room` ほか | `/business/hospitality/#facilities` | 301 |
| `/en/about-5` ほか | `/business/hospitality/#membership` | 301 |
| `/en/salon` ほか | `/business/wellness/` | 301 |
| `/en/companyprofile` `/en/company` ほか | `/company/` | 301 |

各言語の**トップページ（`/en` など）だけ `/` へ 301** しています。
同じ会社の同じトップページの言語違いであり、対応関係が 1 対 1 のためです。

### 4.2 対応表に無いもの → 404

| 旧URL | Status | 理由 |
|---|---:|---|
| `/en/news` `/zh/business/` `/vi/whatever/…` など | **404** | 元々存在しないか、対応する日本語ページが無い |

⚠ 2026-09-13 の改修前は、これらを**すべてトップページへ 301** していました。
関連の無いページをまとめてトップへ送ると Google は soft 404 と判定し、
転送先（トップページ）の評価にも影響します。素直に 404 を返すよう変更しました。

404 を返すまでに 301 を挟まないよう、末尾スラッシュの補完より前で判定しています。

---

## 5. 「楽気ハウス甲斐路」の扱い（確定 / 2026-09-13）

### 判断

> **楽気ハウス甲斐路は別会社へ売却済みで、現在の Japan World株式会社とは関係がありません。**
> そのため当社サイトに対応ページが無く、`/甲斐路-home` は **410 Gone** とします。
>
> （2026-09-13 ご確認いただいた内容。以後この扱いを変更しないでください。）

`/甲斐路-home` は 2023-03 時点では公開されていました（Internet Archive で 200 を確認）。
2026-09 の旧サイト調査時点では sitemap から外れており、新サイトにも掲載はありません。

### なぜ 301 ではなく 410 なのか

| 候補 | 採否 | 理由 |
|---|---|---|
| `/business/hospitality/`（那須）へ 301 | ✗ | **別会社が運営する別施設**。検索から来た人を誤った施設へ誘導することになる |
| トップページへ 301 | ✗ | 内容が対応しない 301 は Google に soft 404 と判定される（本書 §0 の原則） |
| 売却先 `kaiji.co.jp` へ 301 | ✗ | **当社と無関係の外部ドメインへ、当社ドメインの評価を渡すことになる**。売却先サイトの内容・存続を当社は管理できない |
| 404 | △ | 誤りではないが、クローラが再訪を続ける |
| **410 Gone** | **✓** | 「もう存在しない」とクローラに明示でき、再クロールが早く止まる。売却済みという事実とも一致する |

### やってはいけないこと

- `/甲斐路-home` を 301 に変えること（上記いずれの転送先でも不可）
- 新サイトに甲斐路を**現在の事業として掲載・復活**させること

`npm run verify` の **[12]** が、ビルド成果物に「甲斐路」「kaiji.co.jp」が
混入していないかを毎回検査します（混入するとエラーで落ちます）。
`npm run verify:redirects` は `/甲斐路-home` と言語版が 410 を返すことを検査します。

### 社外の掲載について（当社サイトの範囲外）

`docs/07-corporate-renewal.md` §1.2 に、社外へ甲斐路の掲載が残っている旨の記録があります
（kaiji.co.jp、山梨県公式観光ネット、宿泊予約サイト各社ほか）。
売却済みであれば、**これらは売却先の管理対象**であり当社サイトの問題ではありません。

### `www.rakinasu.com` 側との違い（混同しないこと）

`www.rakinasu.com`（当社運営・**Wix のまま稼働中 / 本リポジトリの対象外**）には、
旧「楽気ハウス甲斐路 無料宿泊ペアチケット」の案内ページが残っています。
こちらは 2026-09-13 に、**旧チケット保有者へのアフターサポート**として
那須の宿泊券ページへ統合する方針が決まりました。

**この2つは目的が違います。取り違えないでください。**

| | japanworld.co.jp（本リポジトリ） | www.rakinasu.com（対象外・Wix） |
|---|---|---|
| 対象URL | `/甲斐路-home` | `/甲斐路無料宿泊ペアチケットの説明` |
| 扱い | **410 Gone** | `/about-4#legacy-kaiji-ticket` へ **301** |
| 目的 | 甲斐路を**当社の事業として掲載しない** | すでに券を持っている方への**利用案内（アフターサポート）** |
| 甲斐路の施設情報 | 掲載しない | **掲載しない**（住所・電話・アクセス・予約リンクは削除） |
| 「当社が甲斐路を運営」の記述 | 無し | **削除する**（現在の事実と異なる） |

つまり rakinasu.com 側の対応は「**券は那須で使える**」という利用者向けの案内であって、
**甲斐路を Japan World株式会社の現在の事業として復活させるものではありません。**

したがって本リポジトリ側の方針（410・不掲載・`npm run verify` [12] の検査）は
**rakinasu.com 側の対応によって緩めません。**
詳細と作業手順は `docs/09-rakinasu-kaiji-ticket.md` を参照してください。

---

## 6. Wix 固有 URL

| 旧URL | 挙動 |
|---|---|
| `/_files/ugd/64855c_46735f4f79e5460d9c353093d4e03724.pdf` | `/docs/raki-house-yoyaku-manual.pdf`（301） |
| `/en/_files/ugd/…pdf` `/zh/…` `/vi/…` | `/docs/raki-house-yoyaku-manual.pdf`（301） |
| `/pages-sitemap.xml` | `/sitemap.xml`（301） |
| `/en_en-sitemap.xml` `/zh_zh-sitemap.xml` `/vi_vi-sitemap.xml` | `/sitemap.xml`（301） |
| `/en_en-pages-sitemap.xml` `/zh_zh-…` `/vi_vi-…` | `/sitemap.xml`（301） |
| `/*?lightbox=…` | クエリを落として最終URLへ 301（1ホップ） |
| `/_api/*` `/_partials*` `/_serverless/*` `/_functions/*` `/pro-gallery-webapp/*` | **410 Gone** |
| `/_files/*`（上記PDF以外） | **410 Gone** |

410 はクローラに「もう存在しない」と明示して再訪を止めるためのものです。

---

## 7. 正規化ルール

| 入力 | 挙動 |
|---|---|
| `/RAKIHOUSE` `/RakiHouse` | 小文字化して照合 → `/business/hospitality/` へ 301 |
| `/rakihouse/` `/about-5/` | 末尾スラッシュ付きでも照合 → 新URLへ 301 |
| `/company`（スラッシュなし） | `/company/` へ 301 |
| `/booking?utm_source=x` | `/business/hospitality/?utm_source=x#booking` へ 301（クエリ保持） |
| 上記いずれにも当たらないパス | `/404.html` を **404** ステータスで返す |
| `POST` `PUT` など | **405 Method Not Allowed**（`Allow: GET, HEAD`） |

---

## 8. 新サイトの URL 一覧（9ページ + お知らせ詳細 + 404）

| URL | ページ名 | Status | index 対象 |
|---|---|---:|---|
| `/` | トップ | 200 | ✅ |
| `/business/` | 事業紹介 | 200 | ✅ |
| `/business/hospitality/` | Resort Hotel 楽気ハウス那須 | 200 | ✅ |
| `/business/wellness/` | 細胞浴SALON 太古の甕 | 200 | ✅ |
| `/business/beauty/` | Esthetic Salon RICHIA | 200 | ✅ |
| `/company/` | 会社情報 | 200 | ✅ |
| `/news/` | お知らせ一覧 | 200 | ✅ |
| `/news/<id>/` | お知らせ詳細（現在1件） | 200 | ✅ |
| `/news/page/<n>/` | お知らせ一覧 2ページ目以降（11件目から自動生成） | 200 | ✅ |
| `/contact/` | お問い合わせ | 200 | ✅ |
| `/404.html` | 404ページ | 404 | ❌ `noindex, follow` |

その他:

| URL | 内容 |
|---|---|
| `/sitemap.xml` | 上記のうち index 対象の URL（`lastmod` は実際の更新日） |
| `/robots.txt` | 全許可 + sitemap 参照 |
| `/docs/raki-house-yoyaku-manual.pdf` | 楽気ハウス宿泊予約マニュアル |
| `/favicon.svg` `/apple-touch-icon.png` | ファビコン |
| `/images/**` | 配信用 WebP |
