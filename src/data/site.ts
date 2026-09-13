/**
 * サイト共通の設定と事業者情報。
 *
 * ⚠ ここに書かれた住所・電話番号・料金などは、すべて現行サイト
 *   （www.japanworld.co.jp / www.rakinasu.com / jwcc.japanworld.co.jp）
 *   からの転記です。推測で補ったものはありません。
 *   出典と、確認が必要な項目は docs/04-content-review.md を参照してください。
 *
 * 2026-09-13 コーポレートサイト化に伴い、日本語単独サイトへ変更。
 * 多言語（en / zh / vi）の型と辞書は撤去し、旧URLは worker 側で 301 している。
 */

export const SITE = {
  origin: 'https://www.japanworld.co.jp',
  name: 'Japan World株式会社',
  nameEn: 'Japan World Co., Ltd.',
  /** 著作権表記の開始年（現行サイトのフッター「© 2021 by Japan World 株式会社」に合わせる） */
  copyrightYear: 2021,
  /** 全ページ共通のディスクリプション末尾などに使う短い説明 */
  tagline: '健康と、美しさと、暮らしのそばに。',
} as const;

/**
 * ⚠⚠ 要確認事項 #1 — 本社所在地 ⚠⚠
 *
 * 現行サイト群で本社所在地の表記が 2 種類に割れています。
 *
 *   A) 〒110-0005 東京都台東区上野6-1-6 203
 *      … japanworld.co.jp の日本語版 /companyprofile
 *      … rakinasu.com の /companyprofile
 *
 *   B) 〒110-0005 東京都台東区上野2-7-13 JWビル2F
 *      … japanworld.co.jp の英語版・中国語版・ベトナム語版 /companyprofile
 *      … jwcc.japanworld.co.jp（会員予約システム）の /company/
 *
 * 2026-09-13 の外部調査で、山梨県公式観光サイトほか複数の宿泊予約サイトが
 * 「JWビル 2-7-13」側を運営会社所在地として掲載していることを確認しました。
 * B が新しい可能性がさらに高まりましたが、一次情報での確証がないため
 * 引き続き「現在 japanworld.co.jp の日本語ページに出ている値（A）」を採用しています。
 *
 * B に切り替える場合は、下の `street` と `addressFull` の 2 行だけを書き換えてください。
 * 住所はこのファイル以外にハードコードされていません。
 *
 *   street:      '上野2-7-13 JWビル2F',
 *   addressFull: '東京都台東区上野2-7-13 JWビル2F',
 */
export const COMPANY = {
  name: 'Japan World株式会社',
  nameEn: 'Japan World Co., Ltd.',
  postal: '110-0005',
  region: '東京都',
  locality: '台東区',
  street: '上野6-1-6 203',
  addressFull: '東京都台東区上野6-1-6 203',
  tel: '03-5846-8403',
  telHref: '+81358468403',
  /** rakinasu.com の会社概要にのみ記載。旧 japanworld.co.jp には未掲載だった。 */
  email: 'info@japanworld.co.jp',
  capital: '6,200万円',
  ceo: '孫志民',
} as const;

/**
 * 登記上の事業内容。現行サイト /companyprofile からの転記。
 * ⚠ 重複していた「各種イベントの企画、制作、運営、管理」は 1 回に整理済み（docs/04 #11）。
 * ⚠ この一覧に「システム開発」は含まれていません。
 */
export const COMPANY_BUSINESS: readonly string[] = [
  'リゾートホテル施設運営　会員権販売',
  '広告、宣伝に関する企画並びに制作、販売',
  '旅行業法に基づく旅行業及び旅行業者代理業',
  '海外進出企業の業務提携支援及びコンサルティング事業',
  '不動産の売買、賃貸、管理及びその仲介業',
  '会員権の売買、保有及び運用',
  '各種イベントの企画、制作、運営、管理',
  'リラクゼーションサロンの経営',
  '越境ECサイトの運営及び管理',
  '教育事業に関する企画、調査、運営',
] as const;

/**
 * 事業の運営会社。
 *
 * ⚠ 2026-09-13 最終確認:
 *     細胞浴SALON「太古の甕」 … JWORLD CO.,LTD の事業
 *     エステ事業（Esthetic Salon RICHIA） … JWORLD CO.,LTD の事業
 *     Resort Hotel 楽気ハウス那須 … Japan World株式会社の事業
 *
 *   上の2事業を Japan World株式会社の直接事業として書かないでください。
 *
 * ⚠ ただし、本文で運営会社をいちいち断らない方針です。
 *   運営会社の明記は **フッターの1箇所だけ**（src/components/Footer.astro）。
 *   各ページの本文では「館内にサロンを併設している」という施設の事実だけを書き、
 *   当社が運営しているとは書かない、という書き分けにしています。
 *
 * ⚠ Japan World株式会社と JWORLD CO.,LTD の資本関係・持株比率・グループ構成は
 *   確認できていないため、一切記載していません。
 */
export const OPERATORS = {
  japanworld: {
    name: 'Japan World株式会社',
  },
  jworld: {
    name: 'JWORLD CO.,LTD（ジェイワールド株式会社）',
    shortName: 'JWORLD CO.,LTD',
  },
} as const;

export type OperatorKey = keyof typeof OPERATORS;

export const HOTEL = {
  name: 'Resort Hotel 楽気ハウス那須',
  shortName: '楽気ハウス那須',
  nameEn: 'Resort Hotel Raki House Nasu',
  postal: '325-0301',
  region: '栃木県',
  addressFull: '栃木県那須郡那須町湯本213-2721',
  tel: '0287-74-6740',
  telHref: '+81287746740',
  /** rakinasu.sakura.ne.jp（参考サイト）フッター記載 */
  fax: '0287-74-6741',
  /** rakinasu.com 記載 */
  telHours: '9:00〜18:00',
  /** 現行サイト /rakihouse・/about-5 および rakinasu.com が一致して「26室」 */
  rooms: 26,
  /** 現行サイト /banquethall・/楽気ハウス-那須 が「200人規模」 */
  banquetCapacity: 200,
  parking: 50,
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=%E6%A0%83%E6%9C%A8%E7%9C%8C%E9%82%A3%E9%A0%88%E9%83%A1%E9%82%A3%E9%A0%88%E7%94%BA%E6%B9%AF%E6%9C%AC213-2721',
} as const;

/**
 * 外部サービス。japanworld.co.jp の再構築対象ではなく、リンク先として扱う。
 */
export const EXTERNAL = {
  /** 楽気ハウス那須 ホテル公式サイト（Japan World株式会社運営・宿泊情報の正典） */
  hotelSite: 'https://www.rakinasu.com/',
  /** 一般のお客様の宿泊予約（予約エンジン） */
  booking: 'https://www7.489pro.com/asp/489/menu.asp?id=09420002&lan=JPN',
  /** JWCCS 会員専用予約システム */
  members: 'https://jwcc.japanworld.co.jp/',
  /** 細胞浴SALON 太古の甕 の公式サイト（運営: JWORLD CO.,LTD） */
  saibouyoku: 'https://www.saibouyoku.com/',
  /** JW NFT Platform ⚠ 2026-08-31 に TLS 証明書が失効。docs/04 参照 */
  nft: 'https://nft.japanworld.co.jp/',
} as const;

/**
 * 公開サイトの導線の出し分け。
 *
 * `nftLink`
 *   JW NFT Platform（nft.japanworld.co.jp）への導線を出すかどうか。
 *
 *   ⚠ 2026-09-13 時点で nft.japanworld.co.jp の TLS 証明書が失効しています
 *     （*.japanworld.co.jp / DigiCert RapidSSL / notAfter 2026-08-31）。
 *     このままリンクするとブラウザのセキュリティ警告へ利用者を誘導することになるため、
 *     false にして全ページから導線を外しています。
 *     証明書を更新したら、この 1 行を true に戻すだけで復旧します。
 */
export const FEATURES = {
  nftLink: false,
} as const;

/** 現行サイトからそのまま引き継ぐ PDF */
export const BOOKING_MANUAL = {
  href: '/docs/raki-house-yoyaku-manual.pdf',
  bytes: 1_182_176,
} as const;

/* ------------------------------------------------------------------ *
 *  ルーティング
 * ------------------------------------------------------------------ */

/** ページキー → ルート直下からのパス断片 */
export const ROUTES = {
  home: '',
  business: 'business/',
  wellness: 'business/wellness/',
  beauty: 'business/beauty/',
  hospitality: 'business/hospitality/',
  company: 'company/',
  news: 'news/',
  contact: 'contact/',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/** ページキーから絶対パスを組み立てる */
export function pathFor(key: RouteKey): string {
  return `/${ROUTES[key]}`;
}

/** ナビゲーション／パンくずのラベル */
export const ROUTE_LABEL: Record<RouteKey, string> = {
  home: 'ホーム',
  business: '事業紹介',
  wellness: 'ウェルネス',
  beauty: 'ビューティー',
  hospitality: 'ホスピタリティ',
  company: '会社情報',
  news: 'お知らせ',
  contact: 'お問い合わせ',
};

/** グローバルナビに出すページ */
export const MAIN_NAV: RouteKey[] = ['business', 'company', 'news', 'contact'];

/**
 * 事業紹介配下のサブナビ。
 * 当社の事業である hospitality を先に置き、館内施設のサロン2件をその後に並べる。
 */
export const BUSINESS_SECTION: RouteKey[] = ['business', 'hospitality', 'wellness', 'beauty'];
