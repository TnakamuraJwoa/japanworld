import type { APIRoute } from 'astro';
import { SITE, ROUTE_KEYS, pathFor } from '../data/site';
import { getAllNewsIds, getTotalPages } from '../data/news';

/**
 * 日本語サイトのみの sitemap。
 * 多言語（/en/ /zh/ /vi/）は廃止し、worker/index.ts で日本語版へ 301 している。
 */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const paths: { loc: string; priority: string; changefreq: string }[] = [];

  for (const route of ROUTE_KEYS) {
    paths.push({
      loc: pathFor(route),
      priority: route === 'home' ? '1.0' : route === 'business' ? '0.9' : '0.8',
      changefreq: route === 'news' ? 'weekly' : 'monthly',
    });
  }

  // お知らせ一覧の2ページ目以降
  const totalPages = getTotalPages();
  for (let p = 2; p <= totalPages; p++) {
    paths.push({ loc: `${pathFor('news')}page/${p}/`, priority: '0.4', changefreq: 'weekly' });
  }

  // お知らせ詳細
  for (const id of getAllNewsIds()) {
    paths.push({ loc: `${pathFor('news')}${id}/`, priority: '0.6', changefreq: 'yearly' });
  }

  const urls = paths
    .map(
      ({ loc, priority, changefreq }) => `  <url>
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
