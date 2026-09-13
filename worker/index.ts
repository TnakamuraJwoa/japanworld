/**
 * Japan World株式会社 — Cloudflare Worker
 *
 * 役割:
 *   1. apex (japanworld.co.jp) → www へ 301（パス・クエリを保持）
 *   2. 旧URL → 新URL へ 301
 *      a. Wix 時代のページ（/rakihouse, /salon, /companyprofile …）
 *      b. ホテル中心だった前構成（/raki-house/…, /booking/, /membership/, /access/）
 *      c. 多言語（/en/… /zh/… /vi/…）→ 対応する日本語ページ
 *   3. Wix 固有パス → 410 Gone
 *   4. 末尾スラッシュの正規化
 *   5. 静的アセットの配信とセキュリティヘッダー付与
 *   6. 404 は /404.html を 404 ステータスで返す
 *
 * ⚠ 2026-09-13 コーポレートサイト化に伴い、対応表を全面的に差し替えた。
 *   多言語ページ（36URL）は廃止し、すべて日本語版へ 301 している。
 *   旧対応表は docs/03-url-migration.md を参照。
 */

export interface Env {
  ASSETS: Fetcher;
}

const CANONICAL_HOST = 'www.japanworld.co.jp';

/** かつて存在した言語プレフィックス。現在はすべて日本語ページへ送る */
const LANG_PREFIXES = ['/en', '/zh', '/vi'] as const;

/** 新サイトのパス（変更しない） */
const P = {
  home: '/',
  business: '/business/',
  wellness: '/business/wellness/',
  beauty: '/business/beauty/',
  hospitality: '/business/hospitality/',
  company: '/company/',
  news: '/news/',
  contact: '/contact/',
} as const;

/**
 * 旧スラッグ → 新パス。
 * 日本語のパスをそのまま書き、言語プレフィックス版は下で自動展開する。
 */
const SLUG_MAP: Record<string, string> = {
  /* ---- a. Wix 時代のページ ---- */
  '/rakihouse': P.hospitality,
  '/楽気ハウス-那須': P.hospitality,
  '/lobby': P.hospitality,
  '/about': P.hospitality,
  '/room': P.hospitality,
  '/spa': P.hospitality,
  '/restaurant-and-bar': P.hospitality,
  '/banquethall': P.hospitality,
  // 細胞浴SALON 太古の甕 はウェルネス事業ページへ
  '/salon': P.wellness,
  '/about-5': P.hospitality,
  '/companyprofile': P.company,

  /* ---- b. ホテル中心だった前構成 ---- */
  '/raki-house': P.hospitality,
  '/raki-house/rooms': P.hospitality,
  '/raki-house/spa': P.hospitality,
  '/raki-house/dining': P.hospitality,
  '/raki-house/banquet': P.hospitality,
  '/raki-house/nasu': P.hospitality,
  // スパ&サロンページは細胞浴とエステに分割した。主題である細胞浴側へ送る
  '/raki-house/salon': P.wellness,
  '/booking': P.hospitality,
  '/membership': P.hospitality,
  '/access': P.hospitality,
};

/** 言語に依存しない完全一致の旧URL */
const EXACT_REDIRECTS: Record<string, string> = {
  // Wix が自動生成していた sitemap 群
  '/pages-sitemap.xml': '/sitemap.xml',
  '/en_en-sitemap.xml': '/sitemap.xml',
  '/zh_zh-sitemap.xml': '/sitemap.xml',
  '/vi_vi-sitemap.xml': '/sitemap.xml',
  '/en_en-pages-sitemap.xml': '/sitemap.xml',
  '/zh_zh-pages-sitemap.xml': '/sitemap.xml',
  '/vi_vi-pages-sitemap.xml': '/sitemap.xml',

  // Wix の _files/ugd で配信していた「楽気ハウス宿泊予約マニュアル」
  '/_files/ugd/64855c_46735f4f79e5460d9c353093d4e03724.pdf':
    '/docs/raki-house-yoyaku-manual.pdf',
};

/** 旧URL全体（言語プレフィックス込み）を展開したテーブル */
const REDIRECTS: Record<string, string> = (() => {
  const table: Record<string, string> = { ...EXACT_REDIRECTS };

  // 日本語（プレフィックスなし）
  for (const [oldSlug, newPath] of Object.entries(SLUG_MAP)) {
    table[oldSlug] = newPath;
  }

  for (const prefix of LANG_PREFIXES) {
    // /en → /、/en/ → /
    table[prefix] = P.home;

    // /en/room → /business/hospitality/ のように、日本語の新パスへ送る
    for (const [oldSlug, newPath] of Object.entries(SLUG_MAP)) {
      table[`${prefix}${oldSlug}`] = newPath;
    }

    // 多言語版にも存在した現行ページ
    table[`${prefix}/company`] = P.company;

    // 言語ごとの PDF リンク（/en/_files/ugd/... 等）
    for (const [oldPath, newPath] of Object.entries(EXACT_REDIRECTS)) {
      if (oldPath.startsWith('/_files/')) {
        table[`${prefix}${oldPath}`] = newPath;
      }
    }
  }

  return table;
})();

/**
 * 対応表に無い多言語URLの受け皿。
 * /en/ 配下のどのパスであっても、最低限トップページへは着地させる。
 */
function languageFallback(pathname: string): string | undefined {
  for (const prefix of LANG_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return P.home;
  }
  return undefined;
}

/** 移行後は存在しない Wix 固有パス（410 Gone を返してクロールを止める） */
const GONE_PREFIXES = [
  '/_api/',
  '/_partials',
  '/_serverless/',
  '/pro-gallery-webapp/',
  '/_functions/',
  '/_files/',
];

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // 外部リソースを一切読み込まない静的サイトのため self に限定できる。
  // 画像のみ data: を許可（将来のインライン SVG 等に備える）。
  'Content-Security-Policy': [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; '),
};

function redirect(url: URL, pathname: string, keepQuery = true): Response {
  const target = new URL(url.toString());
  target.protocol = 'https:';
  target.hostname = CANONICAL_HOST;
  target.port = '';
  // 非ASCIIを含むパスは URL 側でエンコードされる
  target.pathname = pathname;
  if (!keepQuery) target.search = '';
  return new Response(null, {
    status: 301,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'public, max-age=3600',
      ...SECURITY_HEADERS,
    },
  });
}

/** Cache-Control を中身の種類に応じて決める */
function cacheControlFor(pathname: string): string {
  if (/\.(webp|avif|png|jpe?g|gif|svg|ico|woff2?)$/i.test(pathname)) {
    // 画像はファイル名が変わらない限り内容も変わらない運用
    return 'public, max-age=604800, stale-while-revalidate=86400';
  }
  if (/\.(css|js)$/i.test(pathname)) {
    // Astro がハッシュ付きファイル名で出力するため長期キャッシュ可
    return 'public, max-age=31536000, immutable';
  }
  if (/\.pdf$/i.test(pathname)) {
    return 'public, max-age=86400';
  }
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    return 'public, max-age=3600';
  }
  // HTML は毎回検証させる（更新が即時反映されるように）
  return 'public, max-age=0, must-revalidate';
}

function withHeaders(res: Response, pathname: string): Response {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
  out.headers.set('Cache-Control', cacheControlFor(pathname));
  return out;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ---- 1. HTTP メソッドの制限 ----
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD', ...SECURITY_HEADERS },
      });
    }

    let pathname: string;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      pathname = url.pathname;
    }

    // ---- 2. apex → www（パス・クエリを保持） ----
    if (url.hostname !== CANONICAL_HOST && url.hostname.endsWith('japanworld.co.jp')) {
      return redirect(url, pathname);
    }

    // ---- 3. Wix のライトボックス用クエリを落とす ----
    if (url.searchParams.has('lightbox')) {
      return redirect(url, pathname, false);
    }

    // ---- 4. 旧URL → 新URL ----
    //        大文字小文字の揺れと末尾スラッシュの有無を吸収する。
    //        日本語スラッグ（/楽気ハウス-那須）は toLowerCase の影響を受けない。
    const lower = pathname.toLowerCase();
    const stripped = lower.length > 1 && lower.endsWith('/') ? lower.slice(0, -1) : lower;

    const mapped = REDIRECTS[lower] ?? REDIRECTS[stripped];
    if (mapped) {
      return redirect(url, mapped);
    }

    // 対応表に無い旧多言語URLも、トップへ着地させる（404 にしない）
    const langFallback = languageFallback(stripped);
    if (langFallback) {
      return redirect(url, langFallback);
    }

    // ---- 5. Wix 固有パス → 410 Gone（ただしリダイレクト対象の _files は除く） ----
    if (GONE_PREFIXES.some((p) => lower.startsWith(p))) {
      return new Response('Gone', {
        status: 410,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS },
      });
    }

    // ---- 6. 末尾スラッシュの正規化（ファイル以外は必ず付ける） ----
    const isFile = /\.[a-z0-9]+$/i.test(pathname);
    if (!isFile && !pathname.endsWith('/')) {
      return redirect(url, `${pathname}/`);
    }

    // ---- 7. 静的アセットを返す ----
    const assetRes = await env.ASSETS.fetch(request);

    if (assetRes.status === 404) {
      const notFound = await env.ASSETS.fetch(new URL('/404.html', url.origin));
      return new Response(notFound.body, {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          ...SECURITY_HEADERS,
        },
      });
    }

    return withHeaders(assetRes, pathname);
  },
} satisfies ExportedHandler<Env>;
