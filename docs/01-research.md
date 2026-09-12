# 01. 現行サイト調査結果 — www.japanworld.co.jp

調査日: 2026-09-11
対象: https://www.japanworld.co.jp/ （Wix.com Website Builder 製）

---

## 1. サイト全体像

| 項目 | 内容 |
|---|---|
| CMS | Wix.com Website Builder |
| 言語 | 日本語（既定・ルート） / 英語 `/en` / 中国語繁体 `/zh` / ベトナム語 `/vi` |
| ページ数 | 12ページ × 4言語 = **48 URL** |
| 1ページあたりHTML | **約 500〜740 KB**（Wix ランタイム込み） |
| 画像 | static.wixstatic.com から配信、**実測 74点・合計 117 MB（原寸）** |
| sitemap | Wix 自動生成（`/sitemap.xml` → `/pages-sitemap.xml` ほか言語別4本） |

### 1.1 robots.txt（現行）

```
User-agent: *
Allow: /
Disallow: *?lightbox=
（AdsBot向け /_partials*, /pro-gallery-webapp/v1/galleries/* を Disallow）
User-agent: PetalBot → Disallow: /
Sitemap: https://www.japanworld.co.jp/en_en-sitemap.xml
Sitemap: https://www.japanworld.co.jp/sitemap.xml
Sitemap: https://www.japanworld.co.jp/vi_vi-sitemap.xml
Sitemap: https://www.japanworld.co.jp/zh_zh-sitemap.xml
```

### 1.2 sitemap から確認した全URL（48件）

日本語（ルート）12件:

```
/                       ← トップ
/rakihouse              楽気ハウス（施設紹介・周辺観光・サロン）
/楽気ハウス-那須         施設インデックス（Lobby/Entrance/Room/Restaurant/SPA/Convention/Salon への入口）
/room                   客室
/spa                    温泉・大浴場・露天風呂
/lobby                  ロビー
/restaurant-and-bar     レストラン＆バー
/banquethall            コンベンションホール（宴会場）
/salon                  細胞浴SALON 太古の甕
/about                  楽気ハウスの取り組み＋アクセス
/about-5                楽気ハウス会員権について
/companyprofile         会社概要
```

同一の12パスが `/en/…` `/zh/…` `/vi/…` にも存在（合計48）。
`/楽気ハウス-那須` は日本語のままのパスで4言語すべてに存在する
（例: `/en/楽気ハウス-那須` = `/en/%E6%A5%BD%E6%B0%97%E3%83%8F%E3%82%A6%E3%82%B9-%E9%82%A3%E9%A0%88`）。

全48URLの HTTP ステータスを実測 → **すべて 200**。隠しページ・非公開ページは検出されず。

### 1.3 PDF・ダウンロード資料

| URL | 内容 | サイズ |
|---|---|---|
| `/_files/ugd/64855c_46735f4f79e5460d9c353093d4e03724.pdf` | 楽気ハウス宿泊予約マニュアル（16ページ / PowerPoint由来 / 画像118点） | 1.18 MB |

トップページ（ja / en / zh / vi の4言語すべて）からリンクされている唯一のPDF。
※ 埋め込みサブセットフォントのため本文テキストの機械抽出は不可。内容の鮮度は**要目視確認**（docs/04 参照）。

---

## 2. ナビゲーション構造（言語ごとに異なる）

現行のグローバルナビは **言語によって項目数・リンク先が違う**。

| 言語 | ナビ項目 |
|---|---|
| **ja** | Home / 楽気ハウス / 楽気ハウスの取り組み / 楽気ハウス会員権について / 会社概要 （5） |
| **en** | Home / Raki House Resort Hotel / About Raki House Resort Hotel / About company （**4 — 会員権が無い**） |
| **zh** | HOME / 聚樂度假酒店-那須 / 聚樂度假酒店 / 關於聚樂度假酒店 / 聚樂度假酒店會員權 / 關於公司 （**6 — 那須ページが増えている**） |
| **vi** | Home / Raki House / Cơ cấu của Raki House / Giới thiệu về tư cách thành viên của Rak（**文字切れ**） / Đôi nét về công ty （5） |

### 2.1 内部リンク構造の致命的な問題

`/room` `/spa` `/lobby` `/restaurant-and-bar` `/banquethall` `/salon` の**6ページは、
グローバルナビから一切リンクされていない**。

リンク元は `/楽気ハウス-那須` ただ1ページのみ。そしてその `/楽気ハウス-那須` は
**ja/en/vi ではトップページからしかリンクされていない**（zh のみナビに存在）。

```
トップ ──→ /楽気ハウス-那須 ──→ /room /spa /lobby /restaurant-and-bar /banquethall /salon
              （ここが唯一の入口）
```

つまり **ホテルの主力コンテンツ（客室・温泉・食事・宴会場・サロン）がサイト構造上ほぼ孤立**している。

---

## 3. 外部サービス・外部サブドメインの役割

| ホスト | 役割（実地調査で確認） | 現行サイトからのリンク箇所 | 状態 |
|---|---|---|---|
| **www.rakinasu.com** | **楽気ハウス那須 ホテル公式サイト**（一般宿泊者向け・本サイトより情報が新しい） | トップのみ（ja/en/vi の3ページ。**zh からはリンク無し**） | 稼働中（Wix製） |
| **jwcc.japanworld.co.jp** | **JWCCS = 会員専用予約システム**（"JWCC 会員予約" / ログイン必須） | 全48ページのフッター | 稼働中（Let's Encrypt, 2026-11-01まで有効） |
| **nft.japanworld.co.jp** | **JW NFT Platform**（NFT宿泊券。React SPA） | 全48ページのヘッダー | ⚠ **TLS証明書が 2026-08-31 に失効。全ブラウザで警告** |
| www7.489pro.com | 一般宿泊予約エンジン（「Resort Hotel 楽気ハウス那須｜プラン一覧画面」） | japanworld.co.jp からは**リンクされていない**（rakinasu.com のみ） | 稼働中 |
| kantobus.info | 関東自動車 バス時刻表（一軒茶屋） | 全48ページのフッター | 稼働中 |
| www.town.nasu.lg.jp | 那須町公式（宿泊税） | japanworld.co.jp からは**リンク無し**（rakinasu.com のみ） | 稼働中 |

### 3.1 rakinasu.com には japanworld.co.jp に無い最新情報がある

rakinasu.com（同じ Japan World株式会社運営）で確認できて、japanworld.co.jp には**載っていない**情報:

- **那須町宿泊税の導入（2026年10月1日〜）** — 税額表・免除条件つきの告知
- **Esthetic Salon RICHIA**（東京・上野から楽気ハウス那須へ移転したエステサロン）
- **一般宿泊予約導線**（www7.489pro.com のプラン一覧）
- **電話受付時間 9:00〜18:00**
- **ホテル送迎バス（要事前予約）** 迎え 14:30 那須塩原駅西口ロータリー / 送り 11:00 当ホテル玄関
- **入湯税 12歳から150円**
- 車でのアクセス「那須IC より県道17号線 約12km 約20分」
- メールアドレス **info@japanworld.co.jp**

→ **japanworld.co.jp 側のホテル情報は rakinasu.com より古い**と判断できる。

---

## 4. Wix 依存の棚卸し

全48ページが以下の外部ホストへ接続している:

| ホスト | 用途 |
|---|---|
| `static.parastorage.com` | Wix ランタイム JS / CSS |
| `siteassets.parastorage.com` | Wix サイトアセット |
| `static.wixstatic.com` | 画像配信 CDN |
| `browser.sentry-cdn.com` | Wix の Sentry エラー監視 |
| `panorama.wixapps.net` | Wix のテレメトリ収集 |
| `*.wixdns.net` | www の DNS 解決先（CNAME） |

Wix 固有パス: `/_api/`, `/_partials`, `/_serverless/`, `/pro-gallery-webapp/`, `/_files/ugd/`

→ 新サイトではこれらすべてを除去し、画像は `assets/source/` に取得済み（74点 / 117 MB）。

---

## 5. SEO 実測

| 指標 | 現状 |
|---|---|
| `<title>` | 48ページ中、**英・中・越ページでも日本語タイトルのまま**が多数（例: `/en` = 「リゾート \| Japan World株式会社 \| 那須町」、`/en/room` = 「ROOM \| 楽気ハウス」、`/en/lobby` = 「ロビー \| 楽気ハウス」、`/en/spa` = 「SPA \| 楽気ハウス」） |
| `meta description` | **48ページ中 40ページで未設定**。設定済みの8ページも**全言語で同一の日本語文**（「仲間と集う楽気ハウスへようこそ。…」） |
| `og:description` | **全48ページで同じ日本語文**（英・中・越ページでも日本語） |
| `og:image` | **全48ページで同一**（JWロゴ画像 2002×1125）。ページ固有のOGP画像なし |
| `h1` | `/`（4言語）, `/rakihouse`, `/楽気ハウス-那須`, `/companyprofile`, `/en/about` などで **h1 が存在しない** |
| `canonical` | 設定あり（Wix 自動） |
| `hreflang` | 各ページ 5本（ja/en/zh/vi/x-default）— Wix が自動出力 |
| `alt` | **ほぼ全画像でファイル名がそのまま alt**（`DSC01306.JPG`, `IMG_5874_edited.jpg`, `名称未設定-1.png`, `キャプadadチャ.PNG`, `スクリーンショット 2023-10-24 11.55.10.png` など）。`alt=""` の画像も多数 |
| 構造化データ | Wix 既定のもののみ。Organization / Hotel / LodgingBusiness の JSON-LD なし |
| 重複 | `/rakihouse` と `/楽気ハウス-那須` が同一の title / description |

---

## 6. パフォーマンス実測

| 項目 | 現行 |
|---|---|
| HTML サイズ | 1ページ 500〜740 KB |
| 外部ホスト接続数 | 6以上（parastorage×2 / wixstatic / sentry-cdn / wixapps / 自ドメイン） |
| 画像原寸 | 最大 **17 MB（4032×3024 PNG）**。1 MB超が 30点以上 |
| 画像形式 | 写真を **PNG** で配信している例が多数（`956×637 PNG` で 700KB〜1.1MB） |
| JavaScript | Wix ランタイム一式（本サイトの機能要件では不要） |

---

## 7. DNS 実測（変更は一切行っていない）

詳細は `docs/06-dns-migration.md`。要点のみ:

```
japanworld.co.jp      NS    01.dnsv.jp / 02.dnsv.jp / 03.dnsv.jp / 04.dnsv.jp
japanworld.co.jp      A     23.236.62.147            （Wix の apex 転送用IP）
japanworld.co.jp      MX    10 mx.hetemail.jp        ← ★メールは heteml。絶対に維持
japanworld.co.jp      TXT   なし（SPF 未設定）
_dmarc                TXT   なし（DMARC 未設定）
www                   CNAME www218.wixdns.net
jwcc                  A     52.194.18.214            （AWS ap-northeast-1）
nft                   A     8.209.241.197            （Alibaba Cloud）
```

whois（JPRS）: 登録者 `Japan World Co.,Ltd.` / 有効期限 2027-07-31 / 最終更新 2026-08-01

---

## 8. 現行サイトから確認できた事実情報（新サイトへ転記する一次情報）

### ホテル
- 名称: Resort Hotel 楽気ハウス那須（楽気ハウス🄬）
- 住所: 〒325-0301 栃木県那須郡那須町湯本213-2721
- TEL: 0287-74-6740
- 客室: 全26室（※ `/about-5` の英・中・越版のみ「33室」と記載 → docs/04 参照）
- 施設: 温泉大浴場（男女）／露天風呂（男女）／大宴会場・中宴会場・小宴会場／細胞浴サロン 太古の甕
- 駐車場: 50台

### 会社
- 商号: Japan World株式会社 / Japan World Co., Ltd.
- TEL: 03-5846-8403
- 資本金: 6,200万円
- 代表取締役: 孫志民
- 本社所在地: **日本語版と英中越版で不一致**（docs/04 の最重要項目）
- メール: info@japanworld.co.jp（rakinasu.com の会社概要にのみ記載）

### アクセス（現行サイト記載）
- バス: 那須塩原駅西口 →（関東自動車 那須塩原駅西口〜黒磯駅西口〜那須ロープウェイ行）→ 一軒茶屋 下車
- 黒磯駅西口から約35分、一軒茶屋から徒歩20分
- 車: 東北自動車道 那須IC →那須湯本方面 → 一軒茶屋交差点を左折3km 右側
- セブンイレブン那須一軒茶屋店 ←→ バス停 徒歩約1分（100m）／ ホテル ←→ セブンイレブン 車約3分・徒歩約20分（1.5km）
  ※ rakinasu.com は「徒歩約30分」と記載 → docs/04 参照
