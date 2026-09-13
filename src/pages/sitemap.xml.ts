import type { APIRoute } from 'astro';
import { SITE, ROUTE_KEYS, pathFor, type RouteKey } from '../data/site';
import { getAllNewsIds, getNews, getNewsItem, getTotalPages } from '../data/news';

/**
 * 日本語サイトのみの sitemap。
 * 多言語（/en/ /zh/ /vi/）は廃止し、worker/index.ts で日本語版へ 301 している。
 *
 * ⚠ lastmod にビルド日時を入れないこと。
 *   毎回のビルドで全URLが「更新された」と申告することになり、
 *   実際に更新したページの信号が埋もれてしまう。
 *   固定ページは CONTENT_UPDATED、お知らせは記事の公開日を使う。
 */

/**
 * 固定ページの内容を最後に更新した日（YYYY-MM-DD）。
 *
 * ★ 運用: トップ・事業紹介・会社情報などの本文を書き換えたら、この日付を更新してください。
 *   お知らせを足しただけのときは変更不要です（お知らせ側の日付が使われます）。
 */
const CONTENT_UPDATED = '2026-09-13';

const today = () => new Date().toISOString().slice(0, 10);

/** 未来日は sitemap では無視されるため、当日までに丸める */
const clamp = (date: string) => (date > today() ? today() : date);

/** 固定ページの lastmod。お知らせ一覧だけは最新記事の公開日に追随させる */
function lastmodFor(route: RouteKey): string {
  if (route === 'news') {
    const latest = getNews({ limit: 1 }).contents[0];
    return latest ? clamp(latest.publishedAt) : CONTENT_UPDATED;
  }
  return CONTENT_UPDATED;
}

export const GET: APIRoute = () => {
  const paths: { loc: string; lastmod: string; priority: string; changefreq: string }[] = [];

  for (const route of ROUTE_KEYS) {
    paths.push({
      loc: pathFor(route),
      lastmod: lastmodFor(route),
      priority: route === 'home' ? '1.0' : route === 'business' ? '0.9' : '0.8',
      changefreq: route === 'news' ? 'weekly' : 'monthly',
    });
  }

  // お知らせ一覧の2ページ目以降
  const totalPages = getTotalPages();
  for (let p = 2; p <= totalPages; p++) {
    paths.push({
      loc: `${pathFor('news')}page/${p}/`,
      lastmod: lastmodFor('news'),
      priority: '0.4',
      changefreq: 'weekly',
    });
  }

  // お知らせ詳細
  for (const id of getAllNewsIds()) {
    const item = getNewsItem(id);
    paths.push({
      loc: `${pathFor('news')}${id}/`,
      lastmod: item ? clamp(item.publishedAt) : CONTENT_UPDATED,
      priority: '0.6',
      changefreq: 'yearly',
    });
  }

  const urls = paths
    .map(
      ({ loc, lastmod, priority, changefreq }) => `  <url>
    <loc>${new URL(loc, SITE.origin).href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
