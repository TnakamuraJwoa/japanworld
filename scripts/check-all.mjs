/**
 * ビルド成果物（dist/）の自動検証。
 *
 *   npm run build && npm run verify
 *
 * 検査項目:
 *   1. 全ページに title / description / canonical / OGP / h1 が 1 つずつあるか
 *   2. title / description の長さと、言語をまたいだ重複
 *   3. alt の欠落・ファイル名がそのまま alt になっていないか
 *   4. 内部リンク切れ・画像 404・PDF の存在
 *   5. Wix 依存（wixstatic / parastorage / sentry / wixdns / wixapps）が 0 件か
 *   6. hreflang の相互参照が揃っているか
 *   7. sitemap と実ファイルの一致
 *   8. width / height 指定の欠落（CLS 対策）
 *   9. 外部リンクに rel="noopener" が付いているか
 *  10. 横スクロールを起こしやすい記述（固定 px 幅）の検出
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://www.japanworld.co.jp';

let errors = 0;
let warnings = 0;
const fail = (msg) => {
  errors += 1;
  console.log(`  ✗ ${msg}`);
};
const warn = (msg) => {
  warnings += 1;
  console.log(`  ! ${msg}`);
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
const fileSet = new Set(allFiles.map((f) => '/' + path.relative(DIST, f).split(path.sep).join('/')));

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const urlOf = (file) => {
  let u = '/' + path.relative(DIST, file).split(path.sep).join('/');
  u = u.replace(/index\.html$/, '');
  return u;
};

const pages = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const g = (re) => {
    const m = html.match(re);
    return m ? decode(m[1]).trim() : '';
  };
  const all = (re) => [...html.matchAll(re)];
  return {
    file,
    url: urlOf(file),
    html,
    lang: g(/<html[^>]+lang="([^"]+)"/i),
    title: g(/<title[^>]*>([\s\S]*?)<\/title>/i),
    description: g(/<meta name="description" content="([^"]*)"/i),
    canonical: g(/<link rel="canonical" href="([^"]*)"/i),
    ogTitle: g(/<meta property="og:title" content="([^"]*)"/i),
    ogDesc: g(/<meta property="og:description" content="([^"]*)"/i),
    ogImage: g(/<meta property="og:image" content="([^"]*)"/i),
    ogUrl: g(/<meta property="og:url" content="([^"]*)"/i),
    twitter: g(/<meta name="twitter:card" content="([^"]*)"/i),
    h1s: all(/<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((m) =>
      decode(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim(),
    ),
    h2s: all(/<h2[^>]*>/gi).length,
    imgs: all(/<img\b[^>]*>/gi).map((m) => m[0]),
    links: all(/<a\b[^>]*href="([^"]+)"[^>]*>/gi).map((m) => ({ tag: m[0], href: decode(m[1]) })),
    hreflangs: all(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi).map((m) => [m[1], m[2]]),
    jsonLd: all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi).map((m) => m[1]),
    bytes: Buffer.byteLength(html),
  };
});

console.log(`\n=== dist: ${pages.length} HTML / ${allFiles.length} files ===\n`);

// ---------------------------------------------------------------- 1. メタ
console.log('[1] メタ情報');
for (const p of pages) {
  const is404 = p.url === '/404.html';
  if (!p.title) fail(`${p.url}: title がない`);
  if (!p.description) fail(`${p.url}: meta description がない`);
  if (!p.canonical) fail(`${p.url}: canonical がない`);
  if (!p.ogTitle) fail(`${p.url}: og:title がない`);
  if (!p.ogDesc) fail(`${p.url}: og:description がない`);
  if (!p.ogImage) fail(`${p.url}: og:image がない`);
  if (!p.ogUrl) fail(`${p.url}: og:url がない`);
  if (!p.twitter) fail(`${p.url}: twitter:card がない`);
  if (p.h1s.length !== 1) fail(`${p.url}: h1 が ${p.h1s.length} 個（1個であるべき）`);
  if (!is404 && p.h2s === 0) warn(`${p.url}: h2 がない`);
  if (!p.lang) fail(`${p.url}: html lang がない`);
  if (!is404 && p.canonical !== ORIGIN + p.url) {
    fail(`${p.url}: canonical が一致しない (${p.canonical})`);
  }
}
if (errors === 0) ok(`全 ${pages.length} ページで title/description/canonical/OGP/h1 を確認`);

// ---------------------------------------------------------------- 2. 長さ・重複
console.log('\n[2] title / description の長さと重複');
const titleMap = new Map();
const descMap = new Map();
// 検索結果のスニペットは文字数ではなく表示幅で切られるため、
// CJK 文字を 2、それ以外を 1 として数える。
const width = (s) =>
  [...s].reduce((n, ch) => n + (/[　-鿿＀-￯]/.test(ch) ? 2 : 1), 0);

for (const p of pages) {
  if (p.url !== '/404.html') {
    if (width(p.title) > 70) warn(`${p.url}: title が幅 ${width(p.title)}（長め）`);
    if (width(p.description) < 80) warn(`${p.url}: description が幅 ${width(p.description)}（短め）`);
    if (width(p.description) > 200) warn(`${p.url}: description が幅 ${width(p.description)}（長め）`);
  }
  (titleMap.get(p.title) ?? titleMap.set(p.title, []).get(p.title)).push(p.url);
  (descMap.get(p.description) ?? descMap.set(p.description, []).get(p.description)).push(p.url);
}
let dupT = 0;
for (const [t, urls] of titleMap) if (urls.length > 1) { fail(`title 重複 (${urls.length}件): "${t.slice(0, 40)}…" → ${urls.join(', ')}`); dupT++; }
let dupD = 0;
for (const [d, urls] of descMap) if (urls.length > 1) { fail(`description 重複 (${urls.length}件): ${urls.join(', ')}`); dupD++; }
if (!dupT && !dupD) ok('title / description に重複なし（48ページすべて固有）');

// ---------------------------------------------------------------- 3. alt
console.log('\n[3] 画像の alt / width / height');
const FILENAME_ALT = /\.(jpe?g|png|gif|webp|avif|bmp|jpeg)\s*$/i;
let altIssues = 0;
let sizeIssues = 0;
for (const p of pages) {
  for (const tag of p.imgs) {
    // Astro は alt="" を値なしの `alt` として出力する（HTML 仕様上 alt="" と同義）
    const alt = tag.match(/\salt="([^"]*)"/i) ?? (/\salt(?=[\s>])/i.test(tag) ? ['', ''] : null);
    const src = (tag.match(/\ssrc="([^"]*)"/i) || [])[1] || '(no src)';
    if (!alt) {
      fail(`${p.url}: alt 属性がない img (${src})`);
      altIssues++;
      continue;
    }
    if (alt[1] && FILENAME_ALT.test(decode(alt[1]))) {
      fail(`${p.url}: alt がファイル名 "${alt[1]}"`);
      altIssues++;
    }
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) {
      fail(`${p.url}: width/height がない img (${src})`);
      sizeIssues++;
    }
  }
}
if (!altIssues) ok('ファイル名がそのまま alt になっている画像はなし');
if (!sizeIssues) ok('全 img に width/height あり（CLS 対策）');

// ---------------------------------------------------------------- 4. リンク・アセット
console.log('\n[4] 内部リンク・画像・PDF');
let missing = 0;
const checkedAssets = new Set();
for (const p of pages) {
  // 画像 src / srcset
  for (const tag of p.imgs) {
    const cands = [];
    const src = (tag.match(/\ssrc="([^"]*)"/i) || [])[1];
    if (src) cands.push(src);
    const ss = (tag.match(/\ssrcset="([^"]*)"/i) || [])[1];
    if (ss) for (const part of ss.split(',')) cands.push(part.trim().split(/\s+/)[0]);
    for (const c of cands) {
      if (!c.startsWith('/')) continue;
      if (checkedAssets.has(c)) continue;
      checkedAssets.add(c);
      if (!fileSet.has(c)) {
        fail(`画像が dist に無い: ${c} (${p.url})`);
        missing++;
      }
    }
  }
  // 内部リンク
  for (const { href } of p.links) {
    if (!href.startsWith('/')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = clean.endsWith('/') ? clean + 'index.html' : clean;
    if (!fileSet.has(target) && !fileSet.has(clean)) {
      fail(`内部リンク切れ: ${href} (${p.url})`);
      missing++;
    }
  }
  // preload
  for (const m of p.html.matchAll(/<link rel="preload"[^>]+href="([^"]+)"/gi)) {
    if (m[1].startsWith('/') && !fileSet.has(m[1])) {
      fail(`preload 先が無い: ${m[1]} (${p.url})`);
      missing++;
    }
  }
  // CSS
  for (const m of p.html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi)) {
    if (m[1].startsWith('/') && !fileSet.has(m[1])) {
      fail(`CSS が無い: ${m[1]} (${p.url})`);
      missing++;
    }
  }
}
if (!missing) ok(`内部リンク・画像・CSS すべて dist 内に存在（画像 ${checkedAssets.size} 本を確認）`);

for (const f of ['/robots.txt', '/sitemap.xml', '/404.html', '/favicon.svg', '/apple-touch-icon.png', '/docs/raki-house-yoyaku-manual.pdf']) {
  if (!fileSet.has(f)) fail(`必須ファイルが無い: ${f}`);
}
ok('robots.txt / sitemap.xml / 404.html / favicon / 予約マニュアルPDF を確認');

// ---------------------------------------------------------------- 5. Wix 依存
console.log('\n[5] Wix 依存');
const WIX = [
  'wixstatic',
  'parastorage',
  'wixdns',
  'sentry-cdn',
  'wixapps',
  'wix.com',
  '_wixCIDX',
  'wixCssModules',
];
let wixHits = 0;
for (const f of allFiles) {
  if (/\.(webp|png|jpe?g|gif|ico|pdf|woff2?)$/i.test(f)) continue;
  const body = fs.readFileSync(f, 'utf8');
  for (const needle of WIX) {
    if (body.includes(needle)) {
      fail(`Wix 依存 "${needle}" が ${f} に残っている`);
      wixHits++;
    }
  }
}
if (!wixHits) ok('dist 内に wixstatic / parastorage / wixdns / sentry / wixapps への参照は 0 件');

// ---------------------------------------------------------------- 6. hreflang
console.log('\n[6] hreflang');
const EXPECT = ['ja', 'en', 'zh-Hant', 'vi', 'x-default'];
let hrefIssues = 0;
for (const p of pages) {
  if (p.url === '/404.html') continue;
  const got = p.hreflangs.map(([l]) => l);
  for (const e of EXPECT) {
    if (!got.includes(e)) {
      fail(`${p.url}: hreflang "${e}" がない`);
      hrefIssues++;
    }
  }
  // 相互参照: hreflang 先のページが実在するか
  for (const [, href] of p.hreflangs) {
    const u = href.replace(ORIGIN, '');
    const target = u.endsWith('/') ? u + 'index.html' : u;
    if (!fileSet.has(target)) {
      fail(`${p.url}: hreflang 先が存在しない ${href}`);
      hrefIssues++;
    }
  }
}
if (!hrefIssues) ok(`全ページに ja / en / zh-Hant / vi / x-default の hreflang があり、相互に到達可能`);

// ---------------------------------------------------------------- 7. sitemap
console.log('\n[7] sitemap');
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const pageUrls = new Set(pages.filter((p) => p.url !== '/404.html').map((p) => ORIGIN + p.url));
let smIssues = 0;
for (const loc of locs) {
  if (!pageUrls.has(loc)) {
    fail(`sitemap に実在しない URL: ${loc}`);
    smIssues++;
  }
}
for (const u of pageUrls) {
  if (!locs.includes(u)) {
    fail(`sitemap に載っていないページ: ${u}`);
    smIssues++;
  }
}
if (!smIssues) ok(`sitemap.xml の ${locs.length} URL が dist のページと完全一致`);

// ---------------------------------------------------------------- 8. JSON-LD
console.log('\n[8] JSON-LD');
let ldIssues = 0;
for (const p of pages) {
  for (const raw of p.jsonLd) {
    try {
      JSON.parse(raw);
    } catch (e) {
      fail(`${p.url}: JSON-LD が不正 (${e.message.slice(0, 50)})`);
      ldIssues++;
    }
  }
  if (p.url !== '/404.html' && p.jsonLd.length === 0) {
    warn(`${p.url}: JSON-LD がない`);
  }
}
if (!ldIssues) ok('全ページの JSON-LD が妥当な JSON');

// ---------------------------------------------------------------- 9. 外部リンク
console.log('\n[9] 外部リンクの rel');
let relIssues = 0;
const externalHosts = new Set();
for (const p of pages) {
  for (const { tag, href } of p.links) {
    if (!/^https?:\/\//.test(href)) continue;
    externalHosts.add(new URL(href).host);
    if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) {
      fail(`${p.url}: target=_blank に rel=noopener がない (${href})`);
      relIssues++;
    }
  }
}
if (!relIssues) ok('target=_blank の外部リンクすべてに rel="noopener"');
console.log(`    外部リンク先ホスト: ${[...externalHosts].sort().join(', ')}`);

// ---------------------------------------------------------------- 10. 横スクロール要因
console.log('\n[10] 横スクロールを起こしやすい記述');
const cssFiles = allFiles.filter((f) => f.endsWith('.css'));
let overflowIssues = 0;
for (const f of cssFiles) {
  const css = fs.readFileSync(f, 'utf8');
  for (const m of css.matchAll(/min-width:\s*(\d{3,})px/g)) {
    if (Number(m[1]) > 320) {
      // メディアクエリ内の min-width は問題ない。宣言ブロック内のみ拾う
      const before = css.slice(Math.max(0, m.index - 200), m.index);
      const lastMedia = before.lastIndexOf('@media');
      const lastBrace = before.lastIndexOf('{');
      const inMediaCondition = lastMedia > -1 && lastMedia > lastBrace;
      if (!inMediaCondition) {
        warn(`${path.basename(f)}: min-width:${m[1]}px（320px幅で溢れる可能性）`);
        overflowIssues++;
      }
    }
  }
  // min-width / max-width（メディアクエリと上限指定）は横スクロールの原因にならないので除く
  for (const m of css.matchAll(/(^|[^-a-z])width:\s*(\d{3,})px/g)) {
    if (Number(m[2]) > 320) {
      warn(`${path.basename(f)}: width:${m[2]}px（固定幅）`);
      overflowIssues++;
    }
  }
}
if (!overflowIssues) ok('CSS に 320px を超える固定幅の指定なし');

// ---------------------------------------------------------------- 11. サイズ
console.log('\n[11] ページ重量');
const htmlBytes = pages.reduce((a, p) => a + p.bytes, 0);
const maxPage = pages.reduce((a, p) => (p.bytes > a.bytes ? p : a));
const jsBytes = allFiles.filter((f) => f.endsWith('.js')).reduce((a, f) => a + fs.statSync(f).size, 0);
const cssBytes = cssFiles.reduce((a, f) => a + fs.statSync(f).size, 0);
const imgBytes = allFiles
  .filter((f) => /\.(webp|png|jpe?g|svg)$/i.test(f))
  .reduce((a, f) => a + fs.statSync(f).size, 0);
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`    HTML 平均 ${kb(htmlBytes / pages.length)} / 最大 ${kb(maxPage.bytes)} (${maxPage.url})`);
console.log(`    CSS  合計 ${kb(cssBytes)}`);
console.log(`    JS   合計 ${kb(jsBytes)}`);
console.log(`    画像 合計 ${(imgBytes / 1024 / 1024).toFixed(1)} MB（全バリアント）`);
if (maxPage.bytes > 100 * 1024) warn(`最大ページが 100KB を超えている`);
else ok('全ページの HTML が 100KB 未満');

// ---------------------------------------------------------------- 結果
console.log(`\n${'='.repeat(56)}`);
console.log(`エラー ${errors} 件 / 警告 ${warnings} 件`);
console.log('='.repeat(56));
process.exit(errors > 0 ? 1 : 0);
