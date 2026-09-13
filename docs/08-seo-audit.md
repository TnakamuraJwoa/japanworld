# 08. SEO 監査と改修

実施日: 2026-09-13
対象: `C:\work\wix\japanworld`（**ローカルのみ**。デプロイ・push は行っていません）

目的:

1. 「Japan World株式会社」を検索した人に、現在の会社と事業が正しく伝わること
2. Google から適切にクロール・インデックス・評価されること

前提: `docs/07-corporate-renewal.md` のコーポレートサイト改修が
**すでに本番へ反映済み**であることを 2026-09-13 に実測で確認しました
（`https://www.japanworld.co.jp/` の `<title>` と `<h1>`、
セキュリティヘッダーが `worker/index.ts` と一致）。
本ドキュメントは、その上での SEO 改修の記録です。

---

## 1. 調査した構成

| 項目 | 実測 |
|---|---|
| フレームワーク | Astro 5（`output: 'static'` / `trailingSlash: 'always'` / `build.format: 'directory'`） |
| ホスティング | Cloudflare Workers + Static Assets（`wrangler.jsonc`） |
| Worker | `worker/index.ts`（`run_worker_first: true` で全リクエストが Worker を通る） |
| ルーティング | `src/pages/**`。`src/data/site.ts` の `ROUTES` が唯一の定義 |
| sitemap | `src/pages/sitemap.xml.ts` が動的生成（ビルド時に静的出力） |
| robots.txt | `public/robots.txt`（全許可 + sitemap 参照） |
| canonical | `src/layouts/Base.astro` が `path` prop から絶対URLを生成 |
| OGP / Twitter Card | 同上。ページごとに画像を差し替え |
| JSON-LD | `src/data/jsonld.ts` |
| 404 | `src/pages/404.astro` を Worker が 404 ステータスで返す |
| redirects | `worker/index.ts`（ファイルベースの `_redirects` は不使用） |
| 画像 | `scripts/build-images.mjs` が WebP を複数幅で生成。外部 CDN 不使用 |
| 外部 JS | **0 バイト**。Web フォントも読み込まない |

`wrangler.jsonc` の `routes` はコメントアウトされたままで、
カスタムドメインは Cloudflare ダッシュボード側で割り当てられているとみられます。

---

## 2. 公開ページ一覧

| URL | ページ名 | HTTP Status | index 対象 |
|---|---|---:|---|
| `/` | トップ | 200 | ✅ |
| `/business/` | 事業紹介 | 200 | ✅ |
| `/business/hospitality/` | Resort Hotel 楽気ハウス那須 | 200 | ✅ |
| `/business/wellness/` | 細胞浴SALON 太古の甕 | 200 | ✅ |
| `/business/beauty/` | Esthetic Salon RICHIA | 200 | ✅ |
| `/company/` | 会社情報 | 200 | ✅ |
| `/news/` | お知らせ一覧 | 200 | ✅ |
| `/news/nasu-accommodation-tax-2026/` | 那須町宿泊税の導入について | 200 | ✅ |
| `/contact/` | お問い合わせ | 200 | ✅ |
| `/404.html` | ページが見つかりません | 404 | ❌ `noindex, follow` |
| `/sitemap.xml` | サイトマップ（9URL） | 200 | — |
| `/robots.txt` | robots | 200 | — |
| `/docs/raki-house-yoyaku-manual.pdf` | 宿泊予約マニュアル | 200 | ✅ |

`/news/page/<n>/` はお知らせが 11 件目になった時点で自動生成されます（現在 1 件のため未生成）。

---

## 3. 旧サイトの検索資産の洗い出し

調査元:

- `docs/01-research.md`（2026-09-11 の旧 Wix サイト実測。sitemap 48URL）
- `docs/07-corporate-renewal.md`（前構成の対応表）
- **Internet Archive の CDX API**（`japanworld.co.jp` ドメイン全体を照会）
- 本番への実測（全URLに対する HTTP ステータス確認）

### 3.1 今回あらたに見つかった旧URL

`docs/01` の 48URL には入っていなかったものです。

| 旧URL | 最後に 200 を確認 | 扱い |
|---|---|---|
| `/甲斐路-home` | 2023-03-30 | **410**（下記 3.1.1） |
| `/blog-feed.xml` | 2022-05-16 | **410**（Wix のブログ RSS。新サイトにブログなし） |

`/en/甲斐路-home` などの言語版も同様に 410 にしています。

#### 3.1.1 楽気ハウス甲斐路（`/甲斐路-home`）— 確定 / 2026-09-13

> **楽気ハウス甲斐路は別会社へ売却済みで、現在の Japan World株式会社とは関係がありません。**
> そのため当社サイトに対応ページが存在せず、`/甲斐路-home` は **410 Gone** とします。

判断の内訳:

| 候補 | 採否 | 理由 |
|---|---|---|
| `/business/hospitality/`（那須）へ 301 | ✗ | 別会社が運営する**別施設**への誤誘導になる |
| トップページへ 301 | ✗ | 内容が対応しない 301 は soft 404 と判定される（§4 と同じ理由） |
| 売却先 `kaiji.co.jp` へ 301 | ✗ | **当社と無関係の外部ドメインへ、当社ドメインの評価を渡すことになる**。売却先サイトの内容・存続を当社は管理できない |
| **410 Gone** | **✓** | 「もう存在しない」と明示でき再クロールが早く止まる。売却済みという事実とも一致する |

**変更しないでください:**

- `/甲斐路-home` を 301 に変えること（上記いずれの転送先でも不可）
- 新サイトに甲斐路を現在の事業として掲載・復活させること

強制する仕組み:

- `npm run verify` の **[12]** … ビルド成果物に「甲斐路」「kaiji.co.jp」が混入していれば**エラーで落ちます**
- `npm run verify:redirects` … `/甲斐路-home` と言語版が 410 を返すことを検査

詳細は `docs/03-url-migration.md` §5、実装は `worker/index.ts` の `GONE_PATHS`。

**`www.rakinasu.com` 側の対応と混同しないでください。**
あちらに残る旧チケットの案内は「すでに券をお持ちの方が那須で使える」という
**アフターサポート**であり、甲斐路を当社の現在の事業として掲載するものではありません。
本サイト側の 410・不掲載・[12] の検査は、その対応によって緩めません。
違いの一覧と作業手順は `docs/09-rakinasu-kaiji-ticket.md`。

### 3.2 除外したもの

Internet Archive には `/h_500` `/q_90/…` `/al_c` `/enc_auto/…` `/usm_0.66_1.00_0.01` といった
パスも記録されていますが、これは Wix の画像CDN URL
（`static.wixstatic.com/media/…/v1/fill/w_500,h_375,al_c,q_90,enc_auto/…`）を
アーカイバが相対パスとして解決してしまったもので、実在したページではありません。
当時から 404 を返していたことも確認済みのため、個別対応はしていません。

---

## 4. 旧URL → 新URL 対応表

**完全な一覧は `docs/03-url-migration.md`** にあります。ここでは方針と要点のみ。

| 旧URL | 新URL | Status | 理由 |
|---|---|---:|---|
| `/rakihouse` `/楽気ハウス-那須` `/about` | `/business/hospitality/` | 301 | 施設紹介 → ホスピタリティ事業ページへ統合 |
| `/lobby` `/room` `/spa` `/restaurant-and-bar` `/banquethall` | `/business/hospitality/#facilities` | 301 | 5ページを「館内のご案内」1節へ統合 |
| `/about-5` | `/business/hospitality/#membership` | 301 | 会員権 → 該当セクション |
| `/salon` | `/business/wellness/` | 301 | 細胞浴SALON の専用ページが存在する |
| `/companyprofile` | `/company/` | 301 | 会社概要 |
| `/raki-house/**` `/booking/` `/membership/` `/access/` | `/business/hospitality/`（一部 `#` 付き） | 301 | 前構成からの統合 |
| `/en/*` `/zh/*` `/vi/*`（対応表にあるもの） | 対応する日本語ページ | 301 | 同内容の日本語ページが存在する |
| `/en/*` `/zh/*` `/vi/*`（対応表に無いもの） | — | **404** | 対応する日本語ページが無い |
| `/甲斐路-home` | — | **410** | 廃止・代替ページなし |
| `/blog-feed.xml` | — | **410** | 廃止・代替なし |
| `/_api/*` `/_partials*` `/_files/*` ほか | — | **410** | Wix 固有パス |

### 4.1 ★ 今回いちばん大きな修正: 多言語の受け皿を撤去

改修前の `worker/index.ts` には、次の処理がありました。

```ts
// 対応表に無い旧多言語URLも、トップへ着地させる（404 にしない）
function languageFallback(pathname) {
  for (const prefix of ['/en','/zh','/vi'])
    if (pathname.startsWith(prefix)) return '/';   // ← すべてトップへ 301
}
```

`/vi/foobar/` のような**存在したことすらないURLまでトップページへ 301** していました。

Google は、内容の対応しないページへの 301 を **soft 404** として扱います。
大量に積み上がると、転送先（この場合トップページ）の評価にも響きます。

→ **撤去しました。** 対応表にある 12 ページ × 3 言語は従来どおり日本語版へ 301、
それ以外は 404 を返します。末尾スラッシュの補完より前で判定しているため、
404 までに 301 を挟みません。

### 4.2 リダイレクトチェーンの解消

改修前は、apex から旧URLへ来ると **301 を 2 回**踏んでいました。

```
改修前: http://japanworld.co.jp/rakihouse
  → 301 → https://www.japanworld.co.jp/rakihouse
  → 301 → https://www.japanworld.co.jp/business/hospitality/
```

ホスト正規化・旧URL解決・末尾スラッシュ・`?lightbox=` を
Worker 内で1つの転送先に畳んでから 301 を1回返すように変更しました。

```
改修後: http://japanworld.co.jp/rakihouse
  → 301 → https://www.japanworld.co.jp/business/hospitality/   ← 1ホップ
```

`npm run verify:redirects` に**チェーン検査**（`CHAIN_ENTRIES`）を追加しています。
2ホップ以上になると失敗します。

### 4.3 統合先セクションへのフラグメント

旧サイトで独立していた 5 ページ（ロビー・客室・温泉・レストラン・宴会場）は
`/business/hospitality/` 1ページへ統合しました。1ページが長いため、
旧URLから来た人が最上部に落ちると目的の情報まで遠くなります。

`#facilities` `#booking` `#membership` を付けて該当セクションへ着地させています。
Google はフラグメントを無視して `/business/hospitality/` として索引するため、
URL の正規化・評価の集約には影響しません（純粋に着地位置の改善です）。

id は `src/pages/business/hospitality.astro` の `<section id="…">` と対応しています。
**どちらかを変えるときは両方直してください。**

---

## 5. 多言語の扱い

現在のサイトは**日本語のみ**です。

- SEO のためだけに英語・中国語・ベトナム語ページは作っていません（ご指示どおり）
- `hreflang` は出力していません。存在しない言語版を検索エンジンに知らせないためです
- `html lang="ja"` / `og:locale = ja_JP` で固定
- `npm run verify` の [6] が「hreflang が無いこと」を毎回検査します

各言語の**トップページ（`/en` `/zh` `/vi`）だけは `/` へ 301** しています。
同じ会社の同じトップページの言語違いで、対応関係が 1 対 1 のためです。

---

## 6. ページごとの SEO 監査（改修後）

| URL | title（文字数） | description（文字数） | H1 | canonical | JSON-LD |
|---|---|---|---|---|---|
| `/` | Japan World株式会社｜那須高原のリゾートホテル運営<br>（30） | Japan World株式会社は、栃木県・那須高原のリゾートホテル「楽気ハウス那須」を運営しています。館内には、細胞浴SALON「太古の甕」と Esthetic Salon RICHIA を併設し、宿泊とあわせてご利用いただけます。<br>（116） | Japan World株式会社 健康と、美しさと、暮らしのそばに。 | `/` | WebSite + Organization |
| `/business/` | 事業紹介｜Japan World株式会社<br>（20） | Japan World株式会社の事業紹介。栃木県・那須高原のリゾートホテル「楽気ハウス那須」を運営しています。全26室、温泉大浴場と露天風呂、200人規模のコンベンションホールを備えています。<br>（96） | 事業紹介 | `/business/` | WebSite + Organization + BreadcrumbList |
| `/business/hospitality/` | Resort Hotel 楽気ハウス那須｜Japan World株式会社<br>（36） | Japan World株式会社が那須高原で運営するリゾートホテル「楽気ハウス那須」。全26室、温泉大浴場と露天風呂、200人規模のコンベンションホールを備えています。会員制ですが一般のお客様もご宿泊いただけます。<br>（106） | Resort Hotel 楽気ハウス那須 | `/business/hospitality/` | WebSite + Organization + **LodgingBusiness** + BreadcrumbList |
| `/business/wellness/` | 細胞浴SALON 太古の甕｜Japan World株式会社<br>（29） | JWORLD CO.,LTD が運営する細胞浴SALON「太古の甕」。天然鉱石「樹紋石」を敷き詰めた大きな甕による温浴サロンです。楽気ハウス那須の館内にあります。ご入浴の流れとご利用案内。要事前予約。<br>（100） | 細胞浴SALON 太古の甕 | `/business/wellness/` | WebSite + Organization + BreadcrumbList |
| `/business/beauty/` | Esthetic Salon RICHIA｜Japan World株式会社<br>（37） | JWORLD CO.,LTD が運営するエステサロン Esthetic Salon RICHIA。フェイシャルとボディの2系統を、一人ひとりの肌の状態に合わせたマンツーマン施術で。楽気ハウス那須の館内・要事前予約。<br>（107） | Esthetic Salon RICHIA | `/business/beauty/` | WebSite + Organization + BreadcrumbList |
| `/company/` | 会社情報｜Japan World株式会社<br>（20） | Japan World株式会社の会社概要。商号、代表取締役、本社所在地、資本金、事業内容をご案内します。東京都台東区上野に本社を置き、栃木県・那須高原でリゾートホテル「楽気ハウス那須」を運営しています。<br>（101） | 会社情報 | `/company/` | WebSite + Organization + BreadcrumbList |
| `/news/` | お知らせ｜Japan World株式会社<br>（20） | Japan World株式会社からのお知らせ一覧です。運営するリゾートホテル「楽気ハウス那須」の営業に関するご案内、館内サロンのご案内、事業に関する最新情報を、公開日の新しい順に掲載しています。<br>（97） | お知らせ | `/news/` | WebSite + Organization + BreadcrumbList |
| `/news/nasu-accommodation-tax-2026/` | 那須町宿泊税の導入について｜Japan World株式会社<br>（29） | 2026年10月1日より、栃木県那須郡那須町において宿泊税が導入されます。これに伴い、Resort Hotel 楽気ハウス那須にご宿泊のお客様にも宿泊税をご負担いただきます。税額および免除の条件は那須町の定めによります。<br>（110） | 那須町宿泊税の導入について | `/news/nasu-…-2026/` | WebSite + Organization + **NewsArticle** + BreadcrumbList |
| `/contact/` | お問い合わせ｜Japan World株式会社<br>（22） | Japan World株式会社へのお問い合わせ窓口をご案内します。事業・会員権・取材に関するご相談は東京・上野の本社（TEL 03-5846-8403）まで、ご宿泊と館内サロンのご予約は Resort Hotel 楽気ハウス那須まで直接ご連絡ください。<br>（126） | お問い合わせ | `/contact/` | WebSite + Organization + BreadcrumbList |
| `/404.html` | ページが見つかりません｜Japan World株式会社<br>（27） | お探しのページは移動または削除された可能性があります。<br>（27） | ページが見つかりません | `/404/` | —（`noindex, follow`） |

全ページ共通:

- `robots` … `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- `og:type` … `website`（お知らせ詳細のみ `article`）
- `twitter:card` … `summary_large_image`（`twitter:image:alt` つき）
- H1 は各ページ 1 つ。`h1 → h2 → h3` で段を飛ばしていない
- 内部リンク切れ 0 / 画像 alt の欠落 0 / `width`・`height` の欠落 0

---

## 7. 改修内容

### 7.1 title

| ページ | 改修前 | 改修後 | 理由 |
|---|---|---|---|
| `/` | `Japan World株式会社 \| 健康と、美しさと、暮らしのそばに。` | `Japan World株式会社｜那須高原のリゾートホテル運営` | タグラインだけでは、検索結果を見た人に**何をしている会社か**が伝わらない。タグラインは h1 に残した |
| `/business/hospitality/` | `ホスピタリティ｜Resort Hotel 楽気ハウス那須 \| Japan World株式会社`（幅 65） | `Resort Hotel 楽気ハウス那須｜Japan World株式会社` | ナビ用ラベルを重ねると長くて途中で切れる。事業名そのものを先頭に |
| `/business/wellness/` | `ウェルネス｜細胞浴SALON 太古の甕 \| …` | `細胞浴SALON 太古の甕｜Japan World株式会社` | 同上。サロン名で探されるため |
| `/business/beauty/` | `ビューティー｜Esthetic Salon RICHIA \| …` | `Esthetic Salon RICHIA｜Japan World株式会社` | 同上 |
| 全ページ | 区切りが `｜` と `\|` で混在 | **`｜` に統一** | 1つの title に2種類の区切りが入っていた |

キーワードの羅列・全ページ同一 title・実在しない事業名・誇張表現は使っていません。

### 7.2 meta description

全 10 ページとも固有です。短かった 3 本を、**掲載済みの事実だけ**を使って書き足しました。

| ページ | 改修前 | 改修後 |
|---|---:|---:|
| `/news/` | 62字 | 97字 |
| `/news/<id>/` | 71字 | 110字 |
| `/contact/` | 93字 | 126字（本社の電話番号を追加） |

存在しないサービス・実績・拠点・事業は足していません。

### 7.3 H1・見出し構造

トップページの h1 は `健康と、美しさと、暮らしのそばに。` だけで、
**社名が h1 に入っていませんでした**（社名は上の `<p class="hero__eyebrow">` にあった）。

社名を h1 の中に取り込みました。見た目は変えていません。

```html
<h1 class="hero__title">
  <span class="hero__name">Japan World株式会社</span>
  <span class="hero__tagline">健康と、美しさと、<br>暮らしのそばに。</span>
</h1>
```

`compressHTML: true` で span 間の空白が消え、
`Japan World株式会社健康と、…` と続いてしまうため `{' '}` を明示しています。

他のページは改修前から h1 が 1 つで階層の飛びもありませんでした。
`npm run verify` の [12] で毎回検査するようにしています。

### 7.4 Organization 構造化データ

全ページに出力しています（`@id` は `https://www.japanworld.co.jp/#organization`）。

追加した項目:

| 項目 | 値 | 目的 |
|---|---|---|
| `legalName` | Japan World株式会社 | 登記上の正式名称として明示 |
| `description` | 東京・上野に本社、那須高原でリゾートホテルを運営 | ナレッジパネル等で会社の説明として使われうる |
| `logo` | `ImageObject`（幅・高さつき） | URL 文字列だけより解釈が確実 |
| `image` | コーポレート画像 | 同上 |
| `contactPoint` | `customer service` / TEL / メール / `areaServed: JP` / `availableLanguage: Japanese` | 問い合わせ窓口の明示 |

変更した項目:

| 項目 | 変更 | 理由 |
|---|---|---|
| `sameAs` | `jwcc.japanworld.co.jp` を削除し `rakinasu.com` のみに | JWCCS はログイン必須の会員予約システムで、法人を同定する情報を持たない |

**出力していないもの**（意図的）:

- `foundingDate` / `numberOfEmployees` / 法人番号 … 確認できていない
- `knowsAbout`（登記上の事業内容10項目）… 細胞浴とエステは JWORLD CO.,LTD の事業であり、
  構造化データで当社の事業として主張しないという方針（`docs/07` §2.1）。
  **復活していないことを `npm run verify` の [12] が検査します。**

その他の構造化データ:

- `WebSite` … 全ページ。サイト内検索が無いので `potentialAction` は出力していない
- `LodgingBusiness` … `/business/hospitality/` のみ。`parentOrganization` で Organization に紐付け
- `NewsArticle` … お知らせ詳細。`image` `inLanguage` `url` `isPartOf` を追加
- `BreadcrumbList` … **先頭に「ホーム」を追加**。画面のパンくずと項目が一致していなかったため
  （食い違うパンくずは Google に無視されることがある）。一致することを [12] が検査します

### 7.5 sitemap.xml

`lastmod` に**ビルド日時**を入れていました。ビルドのたびに全URLが「更新された」と
申告することになり、実際に更新したページの信号が埋もれます。

- 固定ページ … `CONTENT_UPDATED`（`src/pages/sitemap.xml.ts` の定数。本文を直したら更新する）
- お知らせ詳細 … 記事の `publishedAt`
- お知らせ一覧 … 最新記事の `publishedAt`
- いずれも**未来日は当日に丸める**（未来日の `lastmod` は無視されるため）

### 7.6 その他

| 項目 | 改修前 | 改修後 |
|---|---|---|
| `robots` メタ | 出力なし（404 のみ `noindex`） | 全ページに出力。`max-image-preview:large` 等で検索結果の見え方を広げる |
| `og:type` | トップ以外すべて `article` | `website`（お知らせ詳細のみ `article`）。常設ページを記事扱いにしない |
| 既定の OGP 画像 | `salon/kame-open`（JWORLD CO.,LTD の事業の画像） | `hero/corporate-resort` |
| `twitter:image:alt` | なし | 追加 |
| フラグメントの着地位置 | — | `scroll-padding-top` を追加し、固定ヘッダーに隠れないようにした |

### 7.7 社名の表記

サイト内の表記は `src/data/site.ts` の `COMPANY.name` 1か所から生成されており、
`JapanWorld株式会社` `Japan World 株式会社` などの揺れは**ありませんでした**。
今後混入しないよう、`npm run verify` の [12] で検査します。

なお `docs/07-corporate-renewal.md` の表に「ジーワールド株式会社」という記述が残っており、
同じ文書の下の行（「社名の読みは**ジェイワールド**」）と矛盾していたため修正しました。
公開ページ側は最初から `ジェイワールド` のみです。

---

## 8. ローカル検証の結果

| コマンド | 結果 |
|---|---|
| `npm run check`（astro check） | **0 errors / 0 warnings / 0 hints** |
| `npm run build` | 10ページ生成・成功 |
| `npm run verify` | **エラー 0 / 警告 0**（[1]〜[12]） |
| `npm run verify:redirects`（worker を直接呼ぶ） | **172 / 172 通過** |
| `npm run verify:redirects http://127.0.0.1:8799`（`wrangler dev --local` 実機） | **172 / 172 通過** |
| リダイレクトチェーン検査（9パターン） | **すべて 1 ホップ** |
| `npm run verify:overflow` | 320〜1280px の 8 幅 × 10ページで横スクロールなし |
| `npm run verify:nav` | 390 / 414 / 768 / 1280px でドロワー開閉 OK |
| スクリーンショット（`npm run shots`） | デスクトップ 9 / モバイル 9。h1 の変更で崩れが無いことを目視確認 |

`npm run verify` の検査項目に **[12] コーポレートSEO** を追加しました。

- `robots` が公開ページで `index`、404 で `noindex` であること
- `og:type` が常設ページで `website`、お知らせ詳細で `article` であること
- 見出しが h1 で始まり、階層を飛ばしていないこと
- `Organization` に `name` / `legalName` / `url` / `logo` / `address` / `telephone` があること
- `Organization.knowsAbout` が復活していないこと
- 画面のパンくずと `BreadcrumbList` が一致すること
- 社名の表記ゆれが本文に混ざっていないこと
- **売却済みの「甲斐路 / kaiji.co.jp」が出力に混ざっていないこと**（§3.1.1）
- `sitemap.xml` の `lastmod` が未来日でないこと

Chrome を使う検査（`verify:overflow` / `verify:nav` / `shots`）は、
Chrome が既定のパスに無い環境では `CHROME_PATH` を指定してください。

```powershell
$env:CHROME_PATH = "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
```

---

## 9. ★ 要確認・要対応

`docs/07-corporate-renewal.md` §11 の一覧に加えて、今回の SEO 改修で出たものです。

| # | 内容 | 現在の扱い |
|---|---|---|
| 1 | **お知らせの `publishedAt` が未来日**（`2026-10-01`）。これは宿泊税の**施行日**であって掲載日ではない。`NewsArticle.datePublished` が未来日になっている | 実際の掲載日が分かり次第、`src/data/news.ts` を修正。sitemap 側は当日に丸めて回避済み |
| 2 | **Search Console への登録**。ご指示により操作していない | 下記 10 を参照 |
| 3 | **本社所在地が2種類**（`docs/07` §11 #2 から継続） | 日本語版の値を継続採用。構造化データにもこの値が入る |
| 4 | **`/privacy/` が無い** | 未作成（`docs/07` §6）。コーポレートサイトとしては用意が望ましい |
| 5 | **お知らせが1件のみ** | 更新頻度は検索側の評価材料になる。掲載したい記事をご指示ください |
| 6 | **`www.rakinasu.com` の「甲斐路宿泊ペアチケット」ページ**。「Japan World株式会社が運営管理している、楽気ハウス甲斐路」という現在の事実と異なる記載が残っている | 方針は確定（`/about-4#legacy-kaiji-ticket` へ統合＋301）。ただし **rakinasu.com は Wix のまま稼働中でローカルにリポジトリが無く、本セッションでは実装できていません**。原稿と作業手順は `docs/09-rakinasu-kaiji-ticket.md` |

### 解決済み

| 内容 | 結論 |
|---|---|
| **楽気ハウス甲斐路（`/甲斐路-home`）の扱い** | **別会社へ売却済みで現在の Japan World株式会社とは無関係**のため、**410 Gone で確定**（2026-09-13）。`kaiji.co.jp` への 301 も行わない。§3.1.1 参照 |

---

## 10. デプロイ後にお願いしたいこと（今回は実施していません）

ご指示のとおり、**デプロイ / DNS変更 / git push / Search Console の操作 /
本番環境の変更 / ドメイン設定変更 / 外部サービスの設定変更は行っていません。**

反映後に効果が出る作業として、次をご検討ください。

1. **Search Console でサイトマップを送信**（`https://www.japanworld.co.jp/sitemap.xml`）
2. **URL 検査ツールでトップと `/company/` のインデックス登録をリクエスト**
3. 「カバレッジ」で、改修前にトップへ 301 していた多言語URLが
   **「見つかりませんでした（404）」へ移っていくこと**を確認
   （soft 404 の警告が減っていれば、4.1 の変更が効いています）
4. 「リダイレクト エラー」にチェーンが残っていないことを確認
5. **Google ビジネス プロフィール**があれば、会社名・住所・電話を
   `src/data/site.ts` の値と一致させる（サイトと外部情報の表記を揃えるほど法人の同定が安定します）
6. カバレッジで `/甲斐路-home` が **410（削除済み）** として扱われていることを確認。
   売却済みの施設なので、当社サイトの検索結果から消えるのが正しい状態です
