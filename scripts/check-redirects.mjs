/**
 * Worker のリダイレクト・ステータスを検証する。
 * 旧 Wix サイトの 48 URL すべてと、Wix 固有パス・正規化ルールを網羅する。
 *
 * 既定では worker/index.ts の fetch ハンドラを直接呼ぶ（サーバー不要）:
 *
 *   node --experimental-strip-types scripts/check-redirects.mjs
 *
 * 実際に起動した wrangler dev に対して検査することもできる:
 *
 *   npx wrangler dev --port 8788 --local     （別ターミナル）
 *   node --experimental-strip-types scripts/check-redirects.mjs http://127.0.0.1:8788
 */
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.argv[2] ?? null;
const CANON = 'https://www.japanworld.co.jp';
const DIST = 'dist';

// ---------------------------------------------------------------------------
// BASE 未指定なら worker を直接呼ぶ。dist/ を読む ASSETS スタブを用意する。
// ---------------------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

function assetsStub() {
  return {
    async fetch(request) {
      // Workers の Fetcher.fetch は Request / URL / 文字列のいずれも受け取る
      const href =
        typeof request === 'string' ? request : request instanceof URL ? request.href : request.url;
      const url = new URL(href);
      const p = decodeURIComponent(url.pathname);
      const candidates = p.endsWith('/') ? [p + 'index.html'] : [p, p + '/index.html', p + '.html'];
      for (const c of candidates) {
        const file = path.join(DIST, c);
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          return new Response(fs.readFileSync(file), {
            status: 200,
            headers: { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' },
          });
        }
      }
      return new Response('Not Found', { status: 404 });
    },
  };
}

let call;
if (BASE) {
  call = (url, init) => fetch(BASE + url, { ...init, redirect: 'manual' });
} else {
  const mod = await import('../worker/index.ts');
  const env = { ASSETS: assetsStub() };
  call = (url, init) =>
    mod.default.fetch(new Request(CANON + url, init), env, {
      waitUntil() {},
      passThroughOnException() {},
    });
}

/** 廃止した言語プレフィックス。いずれも日本語ページへ送る */
const LANGS = ['/en', '/zh', '/vi'];

const P = {
  home: '/',
  business: '/business/',
  wellness: '/business/wellness/',
  beauty: '/business/beauty/',
  hospitality: '/business/hospitality/',
  company: '/company/',
  news: '/news/',
  contact: '/contact/',
};

/**
 * 旧スラッグ → 新パス。
 * a) Wix 時代のページ、b) ホテル中心だった前構成 の両方を含む。
 */
const SLUGS = [
  // a. Wix 時代
  ['/rakihouse', P.hospitality],
  ['/楽気ハウス-那須', P.hospitality],
  ['/lobby', P.hospitality],
  ['/about', P.hospitality],
  ['/room', P.hospitality],
  ['/spa', P.hospitality],
  ['/restaurant-and-bar', P.hospitality],
  ['/banquethall', P.hospitality],
  ['/salon', P.wellness],
  ['/about-5', P.hospitality],
  ['/companyprofile', P.company],

  // b. ホテル中心だった前構成
  ['/raki-house', P.hospitality],
  ['/raki-house/rooms', P.hospitality],
  ['/raki-house/spa', P.hospitality],
  ['/raki-house/dining', P.hospitality],
  ['/raki-house/banquet', P.hospitality],
  ['/raki-house/nasu', P.hospitality],
  ['/raki-house/salon', P.wellness],
  ['/booking', P.hospitality],
  ['/membership', P.hospitality],
  ['/access', P.hospitality],
];

/** [パス, 期待ステータス, 期待Location（301/302のとき）] */
const CASES = [];

// --- 1. 旧ページURL（日本語）---
for (const [oldSlug, newPath] of SLUGS) {
  CASES.push([oldSlug, 301, `${CANON}${newPath}`]);
  CASES.push([`${oldSlug}/`, 301, `${CANON}${newPath}`]);
}

// --- 2. 多言語URL → 対応する日本語ページ ---
for (const lang of LANGS) {
  CASES.push([lang, 301, `${CANON}${P.home}`]);
  CASES.push([`${lang}/`, 301, `${CANON}${P.home}`]);
  CASES.push([`${lang}/company`, 301, `${CANON}${P.company}`]);
  for (const [oldSlug, newPath] of SLUGS) {
    CASES.push([`${lang}${oldSlug}`, 301, `${CANON}${newPath}`]);
  }
  // 対応表に無い多言語URLもトップへ着地させる（404 にしない）
  CASES.push([`${lang}/whatever/deep/path`, 301, `${CANON}${P.home}`]);
}

// --- 3. 新URL は 200 ---
const NEW_PATHS = [
  P.home,
  P.business,
  P.wellness,
  P.beauty,
  P.hospitality,
  P.company,
  P.news,
  P.contact,
  '/news/nasu-accommodation-tax-2026/',
];
for (const p of NEW_PATHS) {
  CASES.push([p, 200, null]);
}

// --- 4. Wix 固有パス ---
CASES.push([
  '/_files/ugd/64855c_46735f4f79e5460d9c353093d4e03724.pdf',
  301,
  `${CANON}/docs/raki-house-yoyaku-manual.pdf`,
]);
CASES.push([
  '/en/_files/ugd/64855c_46735f4f79e5460d9c353093d4e03724.pdf',
  301,
  `${CANON}/docs/raki-house-yoyaku-manual.pdf`,
]);
CASES.push(['/pages-sitemap.xml', 301, `${CANON}/sitemap.xml`]);
CASES.push(['/en_en-sitemap.xml', 301, `${CANON}/sitemap.xml`]);
CASES.push(['/zh_zh-sitemap.xml', 301, `${CANON}/sitemap.xml`]);
CASES.push(['/vi_vi-sitemap.xml', 301, `${CANON}/sitemap.xml`]);
CASES.push(['/en_en-pages-sitemap.xml', 301, `${CANON}/sitemap.xml`]);
CASES.push(['/_api/v1/thing', 410, null]);
CASES.push(['/_partials/foo', 410, null]);
CASES.push(['/pro-gallery-webapp/v1/galleries/x', 410, null]);
CASES.push(['/_serverless/abc', 410, null]);
CASES.push(['/_functions/abc', 410, null]);

// --- 5. 正規化 ---
CASES.push(['/RAKIHOUSE', 301, `${CANON}${P.hospitality}`]);
CASES.push(['/RakiHouse', 301, `${CANON}${P.hospitality}`]);
CASES.push(['/SALON', 301, `${CANON}${P.wellness}`]);
CASES.push(['/EN/ABOUT-5', 301, `${CANON}${P.hospitality}`]);
CASES.push(['/business/wellness', 301, `${CANON}${P.wellness}`]);
CASES.push(['/company', 301, `${CANON}${P.company}`]);
CASES.push(['/news', 301, `${CANON}${P.news}`]);
CASES.push(['/booking?utm_source=x', 301, `${CANON}${P.hospitality}?utm_source=x`]);
CASES.push(['/?lightbox=abc', 301, `${CANON}/`]);

// --- 6. 静的ファイル ---
CASES.push(['/robots.txt', 200, null]);
CASES.push(['/sitemap.xml', 200, null]);
CASES.push(['/docs/raki-house-yoyaku-manual.pdf', 200, null]);
CASES.push(['/favicon.svg', 200, null]);

// --- 7. 存在しないパス ---
CASES.push(['/nope/', 404, null]);
CASES.push(['/old/thing/', 404, null]);

let pass = 0;
let fail = 0;
const failures = [];

console.log(`\nリダイレクト検査  base=${BASE}  ケース数=${CASES.length}\n${'='.repeat(72)}`);

for (const [path, expectStatus, expectLocation] of CASES) {
  let res;
  try {
    res = await call(path);
  } catch (e) {
    fail += 1;
    failures.push(`${path} → 接続エラー (${e.message})`);
    continue;
  }

  const status = res.status;
  const location = res.headers.get('location');

  let bad = null;
  if (status !== expectStatus) {
    bad = `status ${status}（期待 ${expectStatus}）`;
  } else if (expectLocation && location !== expectLocation) {
    bad = `Location ${location}（期待 ${expectLocation}）`;
  }

  if (bad) {
    fail += 1;
    failures.push(`${path}  →  ${bad}`);
  } else {
    pass += 1;
  }
}

console.log(`OK ${pass} / NG ${fail}`);
if (failures.length) {
  console.log('\n--- 失敗したケース ---');
  for (const f of failures) console.log(`  ✗ ${f}`);
}
console.log('='.repeat(72));

// --- 8. セキュリティヘッダー ---
console.log('\nセキュリティヘッダー（/ に対して）');
const head = await call('/');
const WANT = [
  'content-security-policy',
  'x-content-type-options',
  'referrer-policy',
  'x-frame-options',
  'permissions-policy',
  'strict-transport-security',
];
let hdrFail = 0;
for (const h of WANT) {
  const v = head.headers.get(h);
  if (v) console.log(`  ✓ ${h}: ${v.slice(0, 72)}${v.length > 72 ? '…' : ''}`);
  else {
    console.log(`  ✗ ${h} がない`);
    hdrFail += 1;
  }
}
console.log(`  Cache-Control: ${head.headers.get('cache-control')}`);

const img = await call('/images/hotel/exterior-1024.webp');
console.log(`  画像の Cache-Control: ${img.headers.get('cache-control')}`);

// --- 9. メソッド制限 ---
const post = await call('/', { method: 'POST' });
console.log(`\nPOST / → ${post.status}（期待 405）`);
if (post.status !== 405) hdrFail += 1;

process.exit(fail + hdrFail > 0 ? 1 : 0);
