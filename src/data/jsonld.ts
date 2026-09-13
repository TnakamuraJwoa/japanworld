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

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: COMPANY.name,
    alternateName: COMPANY.nameEn,
    url: SITE.origin,
    logo: abs('/images/brand/jw-mark-384.webp'),
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
    sameAs: [EXTERNAL.hotelSite, EXTERNAL.members],
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
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.summary,
    datePublished: item.publishedAt,
    mainEntityOfPage: abs(`${pathFor('news')}${item.id}/`),
    publisher: { '@id': ORGANIZATION_ID },
    author: { '@id': ORGANIZATION_ID },
  };
}

export function breadcrumbs(trail: { key: RouteKey; name: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(pathFor(item.key)),
    })),
  };
}

/** パンくずの一部が固定ページでない場合（お知らせ詳細など）に使う汎用版 */
export function breadcrumbsRaw(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
