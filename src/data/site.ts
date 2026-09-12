/**
 * サイト共通の設定と事業者情報。
 *
 * ⚠ ここに書かれた住所・電話番号・料金などは、すべて現行サイト
 *   （www.japanworld.co.jp / www.rakinasu.com / jwcc.japanworld.co.jp）
 *   からの転記です。推測で補ったものはありません。
 *   出典と、確認が必要な項目は docs/04-content-review.md を参照してください。
 */

export const SITE = {
  origin: 'https://www.japanworld.co.jp',
  name: 'Japan World株式会社',
  nameEn: 'Japan World Co., Ltd.',
  /** 著作権表記の開始年（現行サイトのフッター「© 2021 by Japan World 株式会社」に合わせる） */
  copyrightYear: 2021,
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
 * どちらが正しいかは外部からは判断できないため、
 * 「現在 japanworld.co.jp の日本語ページに出ている値（A）」を既定値とし、
 * 全言語でこの 1 つの値に統一しています（会社の所在地はひとつであるため）。
 *
 * B が正しい場合は、この COMPANY の `street` / `addressFull` と、
 * すぐ下の COMPANY_I18N の `address`（4言語分）を書き換えてください。
 * 住所はこのファイル以外にはハードコードされていません。
 *
 *   COMPANY.street       : '上野2-7-13 JWビル2F'
 *   COMPANY.addressFull  : '東京都台東区上野2-7-13 JWビル2F'
 *   COMPANY_I18N.ja      : '東京都台東区上野2-7-13 JWビル2F'
 *   COMPANY_I18N.en      : 'JW Building 2F, 2-7-13 Ueno, Taito-ku, Tokyo'
 *   COMPANY_I18N.zh      : '東京都台東區上野2-7-13 JW大樓2F'
 *   COMPANY_I18N.vi      : 'Tòa nhà JW 2F, 2-7-13 Ueno, Taito-ku, Tokyo'
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
  /** rakinasu.com の会社概要にのみ記載。japanworld.co.jp には未掲載だった。 */
  email: 'info@japanworld.co.jp',
  capital: '6,200万円',
  capitalEn: '62 million yen',
  ceo: '孫志民',
  ceoEn: 'Sun Zhimin',
} as const;

/**
 * 会社情報の言語別表記。
 * 数値・事実は COMPANY と同一で、表記（文字種・語順）だけが言語ごとに異なる。
 *
 * ⚠ 要確認 #1 で本社所在地を変更する場合は、COMPANY.street / COMPANY.addressFull に加えて
 *   下の address を 4 言語分そろえて書き換えてください。
 *   （例: 上野2-7-13 JWビル2F → 'Ueno 2-7-13, JW Building 2F' / '上野2-7-13 JW大樓2F'）
 */
export const COMPANY_I18N: Record<Lang, { name: string; address: string; capital: string; ceo: string }> = {
  ja: {
    name: 'Japan World株式会社',
    address: '東京都台東区上野6-1-6 203',
    capital: '6,200万円',
    ceo: '孫志民',
  },
  en: {
    name: 'Japan World Co., Ltd.',
    address: 'Room 203, 6-1-6 Ueno, Taito-ku, Tokyo',
    capital: '62 million yen',
    ceo: 'Sun Zhimin',
  },
  zh: {
    name: 'Japan World股份有限公司',
    address: '東京都台東區上野6-1-6 203',
    capital: '6,200萬日元',
    ceo: '孫志民',
  },
  vi: {
    name: 'Công ty Japan World',
    address: 'Phòng 203, 6-1-6 Ueno, Taito-ku, Tokyo',
    capital: '62 triệu yên',
    ceo: 'Sun Zhimin',
  },
};

/** ホテル所在地の言語別表記（内容は同一、文字種のみ異なる） */
export const HOTEL_ADDRESS_I18N: Record<Lang, string> = {
  ja: '栃木県那須郡那須町湯本213-2721',
  en: '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi',
  zh: '櫪木縣那須郡那須町湯本213-2721',
  vi: '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi',
};

export const HOTEL = {
  name: 'Resort Hotel 楽気ハウス那須',
  shortName: '楽気ハウス那須',
  nameEn: 'Resort Hotel Raki House Nasu',
  postal: '325-0301',
  region: '栃木県',
  addressFull: '栃木県那須郡那須町湯本213-2721',
  addressEn: '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi',
  tel: '0287-74-6740',
  telHref: '+81287746740',
  /** rakinasu.sakura.ne.jp（参考サイト）フッター記載 */
  fax: '0287-74-6741',
  /** rakinasu.com 記載。japanworld.co.jp には未掲載。 */
  telHours: '9:00〜18:00',
  /** 現行サイト日本語版 /rakihouse・/about-5 および rakinasu.com が一致して「26室」 */
  rooms: 26,
  /** 現行サイト日本語版 /banquethall・/楽気ハウス-那須 が「200人規模」 */
  banquetCapacity: 200,
  parking: 50,
  /** Google Maps は外部リンクとして利用 */
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=%E6%A0%83%E6%9C%A8%E7%9C%8C%E9%82%A3%E9%A0%88%E9%83%A1%E9%82%A3%E9%A0%88%E7%94%BA%E6%B9%AF%E6%9C%AC213-2721',
  geo: { lat: 37.0, lng: 140.0 }, // ← 未検証のため JSON-LD では使用していない
} as const;

/**
 * 外部サービス。japanworld.co.jp の再構築対象ではなく、リンク先として扱う。
 */
export const EXTERNAL = {
  /**
   * 楽気ハウス那須 ホテルサイト（Japan World株式会社運営）。
   * 施設情報・季節の特集・那須町宿泊税のお知らせなどが載っている。
   * 「サイトを見る」系のリンク（フッターの関連サイト・会社概要）で使う。
   */
  hotelSite: 'https://www.rakinasu.com/',
  /**
   * 一般のお客様の宿泊予約先（予約エンジン／プラン一覧）。
   * 「予約する」CTA はすべてここへ送る。言語別は bookingUrl() を使う。
   */
  booking: 'https://www7.489pro.com/asp/489/menu.asp?id=09420002&lan=JPN',
  /** JWCCS 会員専用予約システム */
  members: 'https://jwcc.japanworld.co.jp/',
  membersTerms: 'https://jwcc.japanworld.co.jp/terms/',
  membersPrivacy: 'https://jwcc.japanworld.co.jp/policy_terms/',
  /** JW NFT Platform ⚠ 2026-08-31 に TLS 証明書が失効。docs/04 参照 */
  nft: 'https://nft.japanworld.co.jp/',
  /** 関東自動車 バス時刻表（那須塩原駅西口 → 一軒茶屋） */
  busTimetable:
    'https://kantobus.info/fromto/result/?week=1&from_no=8424&from_type=B&to_no=8464&to_type=B&f_from_type=1&f_from=%E9%82%A3%E9%A0%88&f_to_type=&f_to=&f_to_genre=',
  /** 那須町公式サイト（宿泊税） */
  nasuTown: 'https://www.town.nasu.lg.jp/0040/info-0000004012-1.html',
} as const;

/**
 * 公開サイトの導線の出し分け。
 *
 * `nftLink`
 *   JW NFT Platform（nft.japanworld.co.jp）への導線を出すかどうか。
 *
 *   ⚠ 2026-09-11 時点で nft.japanworld.co.jp の TLS 証明書が失効しています
 *     （*.japanworld.co.jp / DigiCert RapidSSL / notAfter 2026-08-31）。
 *     このままリンクするとブラウザのセキュリティ警告へ利用者を誘導することになるため、
 *     false にして全ページから導線を外しています。
 *
 *   証明書を更新したら、この 1 行を true に戻すだけで復旧します。
 *   影響範囲:
 *     - フッター「関連サイト」の JW NFT Platform（全ページ）
 *     - 予約導線カード「NFT宿泊券をお持ちの方」（トップ / 宿泊予約ページ）
 *     - 会社概要「関連サイト」カード
 *   文言（t.booking.nftTitle / nftBody / nftCta、t.footer.nftLabel、
 *   pages.company.group の nft 項目）と EXTERNAL.nft はすべて残してあります。
 */
export const FEATURES = {
  nftLink: false,
} as const;

/** 現行サイトからそのまま引き継ぐ PDF */
export const BOOKING_MANUAL = {
  href: '/docs/raki-house-yoyaku-manual.pdf',
  bytes: 1_182_176,
} as const;

export type Lang = 'ja' | 'en' | 'zh' | 'vi';

export const LANGS: readonly Lang[] = ['ja', 'en', 'zh', 'vi'] as const;

export const LANG_META: Record<Lang, { label: string; htmlLang: string; hreflang: string; ogLocale: string }> = {
  ja: { label: '日本語', htmlLang: 'ja', hreflang: 'ja', ogLocale: 'ja_JP' },
  en: { label: 'English', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US' },
  zh: { label: '繁體中文', htmlLang: 'zh-Hant', hreflang: 'zh-Hant', ogLocale: 'zh_TW' },
  vi: { label: 'Tiếng Việt', htmlLang: 'vi', hreflang: 'vi', ogLocale: 'vi_VN' },
};

/** ページキー → 言語非依存のパス断片 */
export const ROUTES = {
  home: '',
  hotel: 'raki-house/',
  rooms: 'raki-house/rooms/',
  spa: 'raki-house/spa/',
  dining: 'raki-house/dining/',
  banquet: 'raki-house/banquet/',
  salon: 'raki-house/salon/',
  nasu: 'raki-house/nasu/',
  booking: 'booking/',
  membership: 'membership/',
  access: 'access/',
  company: 'company/',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/**
 * 一般のお客様向け宿泊予約（予約エンジン）のURL。
 *
 * 予約エンジンは lan= で表示言語を切り替えられるが、実測したところ
 *   lan=JPN → 「プラン一覧画面」（日本語）
 *   lan=ENG → 「Package list」（英語）
 *   lan=CHN → 日本語表示に戻る（中国語版は用意されていない）
 * のため、英語のみ ENG を使い、中国語・ベトナム語は日本語版を指す。
 */
export function bookingUrl(lang: Lang): string {
  const code = lang === 'en' ? 'ENG' : 'JPN';
  return `https://www7.489pro.com/asp/489/menu.asp?id=09420002&lan=${code}`;
}

/** 言語とページキーから絶対パスを組み立てる（日本語はプレフィックスなし） */
export function pathFor(lang: Lang, key: RouteKey): string {
  const tail = ROUTES[key];
  return lang === 'ja' ? `/${tail}` : `/${lang}/${tail}`;
}

/** 楽気ハウス配下のサブナビに出すページ */
export const HOTEL_SECTION: RouteKey[] = ['hotel', 'rooms', 'spa', 'dining', 'banquet', 'salon', 'nasu'];

/** グローバルナビに出すページ（全言語共通の構成） */
export const MAIN_NAV: RouteKey[] = ['hotel', 'booking', 'membership', 'access', 'company'];
