/**
 * JSON-LD。実在が確認できた情報だけを使う。
 * 緯度経度・星評価・価格帯・チェックイン時刻などは現行サイトに記載がないため出力しない。
 *
 * コーポレートサイト化に伴い、Organization を全ページ共通の中心に据え、
 * LodgingBusiness はホスピタリティ事業ページでのみ出力する。
 */
import { SITE, COMPANY, HOTEL, EXTERNAL, pathFor, type RouteKey } from './site';

const abs = (p: string) => new URL(p, SITE.origin).href;

export const ORGANIZATION_ID = abs('/#organization');
export const HOTEL_ID = abs('/#hotel');

/**
 * Japan World株式会社。全ページに出力する中心ノード。
 *
 * ⚠ 出力しているのはサイト本文に書かれている事実だけです。
 *   設立年（foundingDate）・従業員数・法人番号は確認できていないため出力していません。
 *
 * ⚠ 登記上の事業内容 10 項目を knowsAbout として出力してはいけません。
 *   細胞浴とエステは JWORLD CO.,LTD の事業であり、当社の事業として
 *   構造化データで主張しないという方針です（docs/07 §2.1）。
 */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: COMPANY.name,
    // 登記上の正式名称。Google に法人として同定させるための要。
    legalName: COMPANY.name,
    alternateName: COMPANY.nameEn,
    // 検索結果・ナレッジパネルで会社の説明として使われうる一文
    description: `${COMPANY.name}は、東京・上野に本社を置き、栃木県・那須高原でリゾートホテル「${HOTEL.name}」を運営する会社です。`,
    url: SITE.origin,
    logo: {
      '@type': 'ImageObject',
      url: abs('/images/brand/jw-mark-384.webp'),
      width: 384,
      height: 384,
    },
    image: abs('/images/hero/corporate-resort-1280.webp'),
    telephone: COMPANY.tel,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      postalCode: COMPANY.postal,
      addressRegion: COMPANY.region,
      addressLocality: COMPANY.locality,
      streetAddress: COMPANY.street,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: COMPANY.tel,
      email: COMPANY.email,
      areaServed: 'JP',
      availableLanguage: ['Japanese'],
    },
    // 当社が運営するホテルの公式サイト。
    // ⚠ jwcc.japanworld.co.jp はログインが必要な会員向け予約システムで、
    //   法人を同定する情報が無いため sameAs には入れない。
    sameAs: [EXTERNAL.hotelSite],
  };
}

export function lodgingBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': HOTEL_ID,
    name: HOTEL.name,
    alternateName: HOTEL.nameEn,
    url: abs(pathFor('hospitality')),
    telephone: HOTEL.tel,
    faxNumber: HOTEL.fax,
    image: [
      abs('/images/hotel/exterior-1600.webp'),
      abs('/images/spa/daiyokujo-wide-1600.webp'),
      abs('/images/rooms/window-view-1600.webp'),
    ],
    numberOfRooms: HOTEL.rooms,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      postalCode: HOTEL.postal,
      addressRegion: HOTEL.region,
      streetAddress: '那須郡那須町湯本213-2721',
    },
    parentOrganization: { '@id': ORGANIZATION_ID },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: '温泉大浴場', value: true },
      { '@type': 'LocationFeatureSpecification', name: '露天風呂', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'レストラン', value: true },
      { '@type': 'LocationFeatureSpecification', name: '宴会場', value: true },
      { '@type': 'LocationFeatureSpecification', name: '無料Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: '駐車場', value: true },
    ],
  };
}

export function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: SITE.origin,
    name: SITE.name,
    inLanguage: 'ja',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/** お知らせ詳細ページ用 */
export function newsArticle(item: {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
}) {
  const url = abs(`${pathFor('news')}${item.id}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.summary,
    datePublished: item.publishedAt,
    inLanguage: 'ja',
    // Article 系はサムネイルがあるほうが検索結果で扱われやすい。
    // お知らせ個別の画像は持たないため、OGP と同じ画像を使う。
    image: [abs('/images/lobby/atrium-2000.webp')],
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': abs('/#website') },
    publisher: { '@id': ORGANIZATION_ID },
    author: { '@id': ORGANIZATION_ID },
  };
}

/**
 * パンくずの構造化データ。
 *
 * ⚠ 先頭の「ホーム」は呼び出し側では渡さず、ここで必ず付ける。
 *   画面に出ているパンくず（src/components/Breadcrumbs.astro）も
 *   ホームから始まるため、見た目と構造化データを一致させるための処理。
 *   （Google は両者が食い違うパンくずを無視することがある）
 */
export function breadcrumbs(trail: { key: RouteKey; name: string }[]) {
  return breadcrumbsRaw(trail.map((item) => ({ name: item.name, path: pathFor(item.key) })));
}

/** パンくずの一部が固定ページでない場合（お知らせ詳細など）に使う汎用版 */
export function breadcrumbsRaw(trail: { name: string; path: string }[]) {
  const full = [{ name: 'ホーム', path: pathFor('home') }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
