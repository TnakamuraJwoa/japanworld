import type { APIRoute } from 'astro';
import { SITE, LANGS, LANG_META, ROUTE_KEYS, pathFor } from '../data/site';

/**
 * 48 URL（4言語 × 12ページ）を 1 本の sitemap にまとめ、
 * 各 URL に xhtml:link の hreflang を付ける。
 * Wix は言語ごとに 4 本の sitemap を吐き、hreflang は sitemap 側に無かった。
 */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = LANGS.flatMap((lang) =>
    ROUTE_KEYS.map((route) => {
      const loc = new URL(pathFor(lang, route), SITE.origin).href;
      const alternates = [
        ...LANGS.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${LANG_META[l].hreflang}" href="${new URL(
              pathFor(l, route),
              SITE.origin,
            ).href}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL(
          pathFor('ja', route),
          SITE.origin,
        ).href}"/>`,
      ].join('\n');

      // トップと主要導線を高めに
      const priority =
        route === 'home' ? '1.0' : ['hotel', 'booking', 'membership', 'access'].includes(route) ? '0.8' : '0.6';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
    }),
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
