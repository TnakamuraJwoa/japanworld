/**
 * Japan World株式会社 — Cloudflare Worker
 *
 * 役割:
 *   1. ホスト正規化・旧URL解決・末尾スラッシュ・?lightbox= を
 *      **1回の 301 にまとめる**（リダイレクトチェーンを作らない）
 *   2. 旧URL → 新URL へ 301
 *      a. Wix 時代のページ（/rakihouse, /salon, /companyprofile …）
 *      b. ホテル中心だった前構成（/raki-house/…, /booking/, /membership/, /access/）
 *      c. 多言語（/en/… /zh/… /vi/…）→ 対応する日本語ページ
 *   3. 廃止ページ・Wix 固有パス → 410 Gone
 *   4. 静的アセットの配信とセキュリティヘッダー付与
 *   5. 404 は /404.html を 404 ステータスで返す
 *
 * ⚠ 2026-09-13 コーポレートサイト化に伴い、対応表を全面的に差し替えた。
 *
 * ⚠ 2026-09-13 SEO 改修（docs/08-seo-audit.md）:
 *     - 対応表に無い /en/ /zh/ /vi/ 配下を **トップページへ 301 していた処理を撤去**した。
 *       関連の無いページをまとめてトップへ送ると Google に soft 404 と判定され、
 *       トップページの評価まで下げるため、素直に 404 を返す。
 *     - 旧 Wix の廃止ページ（/甲斐路-home ／ /blog-feed.xml）を 410 Gone に追加。
 *       /甲斐路-home は別会社へ売却済みの施設のページ。301 にしない（下記 GONE_PATHS 参照）。
 *     - apex→www と旧URL解決を統合し、1 ホップで最終URLへ着地させる。
 *     - 統合先ページの該当セクションへ着地するようフラグメントを付けた。
 */

export interface Env {
  ASSETS: Fetcher;
}

/**
 * インラインスクリプトの SHA-256（`npm run build` が dist/ から生成する）。
 *
 * ⚠ 2026-09-13 本番でスマートフォンのメニューが開かない不具合の原因。
 *   script-src 'self' は **インラインスクリプトを一切許可しない**。
 *   このサイトはメニューとスクロール表示の JS を HTML に埋め込んでいるため、
 *   ハッシュを載せないとブラウザが実行を拒否する（Chrome のコンソールに
 *   "Executing inline script violates ... script-src 'self'" が出る）。
 *   'unsafe-inline' で逃げると CSP が骨抜きになるので、ハッシュで個別に許可する。
 *   詳細は docs/10-csp-inline-scripts.md。
 */
import { CSP_SCRIPT_HASHES } from './csp-hashes.generated.ts';

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
 * 統合先ページ内のセクション。
 *
 * 旧サイトで独立していたページ（客室・温泉・宴会場・会員権・予約）は
 * /business/hospitality/ 1ページへ統合した。1ページにまとまった分、
 * 旧URLから来た人がページ最上部に落ちると目的の情報まで遠い。
 * フラグメントを付けて該当セクションへ着地させる。
 *
 * ⚠ Google はフラグメントを無視して /business/hospitality/ として索引するため、
 *   URL の正規化・評価の集約には影響しない（純粋に着地位置の改善）。
 *   id は src/pages/business/hospitality.astro 側と対応させること。
 */
const H = {
  facilities: `${P.hospitality}#facilities`,
  booking: `${P.hospitality}#booking`,
  membership: `${P.hospitality}#membership`,
} as const;

/**
 * 旧スラッグ → 新パス。
 * 日本語のパスをそのまま書き、言語プレフィックス版は下で自動展開する。
 */
const SLUG_MAP: Record<string, string> = {
  /* ---- a. Wix 時代のページ ---- */
  '/rakihouse': P.hospitality,
  '/楽気ハウス-那須': P.hospitality,
  '/lobby': H.facilities,
  '/about': P.hospitality,
  '/room': H.facilities,
  '/spa': H.facilities,
  '/restaurant-and-bar': H.facilities,
  '/banquethall': H.facilities,
  // 細胞浴SALON 太古の甕 はウェルネス事業ページへ
  '/salon': P.wellness,
  // 楽気ハウス会員権。統合先の該当セクションへ
  '/about-5': H.membership,
  '/companyprofile': P.company,

  /* ---- b. ホテル中心だった前構成 ---- */
  '/raki-house': P.hospitality,
  '/raki-house/rooms': H.facilities,
  '/raki-house/spa': H.facilities,
  '/raki-house/dining': H.facilities,
  '/raki-house/banquet': H.facilities,
  '/raki-house/nasu': P.hospitality,
  // スパ&サロンページは細胞浴とエステに分割した。主題である細胞浴側へ送る
  '/raki-house/salon': P.wellness,
  '/booking': H.booking,
  '/membership': H.membership,
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
 * 廃止した言語プレフィックスの配下かどうか。
 *
 * 対応表（REDIRECTS）に載っている 12 ページは各言語とも日本語版へ 301 する。
 * ここで拾うのは **対応表に無いパス**で、そういうURLは元々存在しなかったか、
 * 対応する日本語ページが無いもの。トップページへ送らず 404 を返す。
 */
function isRetiredLanguagePath(pathname: string): boolean {
  return LANG_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
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

/**
 * 廃止したページ。代替となる新ページが無いため 301 せず 410 Gone を返す。
 *
 * ⚠ `/甲斐路-home` … 「楽気ハウス甲斐路」（山梨）のページ。
 *   2023-03 時点では公開されていた（Internet Archive で 200 を確認）が、
 *   2026-09 の旧サイト調査時点では sitemap から外れていた。
 *
 *   **楽気ハウス甲斐路は別会社へ売却済みで、現在の Japan World株式会社とは
 *   関係がありません**（2026-09-13 ご確認済み）。したがって当社サイトに
 *   対応ページは存在せず、今後も作りません。
 *
 *   → 代替ページなしの廃止として 410 Gone。
 *
 *   ⚠ この行を消して 301 に変えないでください。
 *     - `/business/hospitality/`（那須）へ送る … 別施設への誤誘導になる
 *     - 売却先の `kaiji.co.jp` へ送る … 当社と無関係のドメインへ
 *       当社ドメインの評価を渡すことになる
 *   ⚠ 甲斐路を新サイトの事業として復活させないでください。
 *     `npm run verify` の [12] が、ビルド成果物に「甲斐路 / kaiji」が
 *     混入していないか毎回検査します。
 *
 * ⚠ `/blog-feed.xml` … Wix のブログ RSS フィード。
 *   新サイトにブログは無い（お知らせは /news/）。
 *   フィードの代替にならないため 301 せず 410。
 */
const GONE_PATHS = ['/甲斐路-home', '/blog-feed.xml'];

/** 言語プレフィックス版まで展開した 410 対象 */
const GONE_EXACT: Set<string> = new Set(
  GONE_PATHS.flatMap((p) => [p, ...LANG_PREFIXES.map((prefix) => `${prefix}${p}`)]),
);

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // 外部リソースを一切読み込まない静的サイトのため self に限定できる。
  // 画像のみ data: を許可（将来のインライン SVG 等に備える）。
  //
  // script-src: 'self' だけではインラインスクリプトが動かない（上の import の注記参照）。
  //   ビルドごとに生成したハッシュを並べ、そのビルドの HTML に埋め込まれた
  //   スクリプトだけを許可する。ハッシュが 0 件のときは 'self' のみ（＝インライン禁止）。
  'Content-Security-Policy': [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    ["script-src 'self'", ...CSP_SCRIPT_HASHES.map((h) => `'${h}'`)].join(' '),
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; '),
};

/**
 * 301 を返す。
 *
 * `to` は `/business/hospitality/` でも `/business/hospitality/#membership` でも良い。
 * ホスト・プロトコルはここで必ず正規化するので、apex からの流入も
 * 「旧URL → 最終URL」の 1 ホップで終わる。
 */
function redirect(url: URL, to: string, keepQuery = true): Response {
  const hashAt = to.indexOf('#');
  const target = new URL(url.toString());
  target.protocol = 'https:';
  target.hostname = CANONICAL_HOST;
  target.port = '';
  // 非ASCIIを含むパスは URL 側でエンコードされる
  target.pathname = hashAt === -1 ? to : to.slice(0, hashAt);
  target.hash = hashAt === -1 ? '' : to.slice(hashAt);
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

function gone(): Response {
  return new Response('Gone', {
    status: 410,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS },
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

    // 大文字小文字の揺れと末尾スラッシュの有無を吸収してから照合する。
    // 日本語スラッグ（/楽気ハウス-那須）は toLowerCase の影響を受けない。
    const lower = pathname.toLowerCase();
    const stripped = lower.length > 1 && lower.endsWith('/') ? lower.slice(0, -1) : lower;

    // ---- 2. 廃止ページ・Wix 固有パス → 410 Gone ----
    //        （301 の判定より前に置く。リダイレクト対象の _files/ugd の PDF は
    //          下の REDIRECTS で拾うため、ここでは GONE_PREFIXES と衝突しないよう
    //          先に対応表を確認する）
    const mapped = REDIRECTS[lower] ?? REDIRECTS[stripped];

    if (!mapped) {
      if (GONE_EXACT.has(stripped) || GONE_PREFIXES.some((p) => lower.startsWith(p))) {
        return gone();
      }

      // ---- 3. 対応表に無い旧多言語URL → 404 ----
      //        「関連の無いページをまとめてトップへ 301」は soft 404 と判定されるため行わない。
      //        末尾スラッシュの正規化より前に返し、404 までに 301 を挟まないようにする。
      if (isRetiredLanguagePath(stripped)) {
        return notFound(env, url);
      }
    }

    // ---- 4. 転送先を 1 つに決める ----
    //        旧URL対応表 → 末尾スラッシュ正規化 の順に解決し、
    //        ホスト正規化とあわせて **1 回の 301** で最終URLへ送る。
    const isFile = /\.[a-z0-9]+$/i.test(pathname);
    const normalized = !isFile && !pathname.endsWith('/') ? `${pathname}/` : pathname;
    const target = mapped ?? normalized;

    // Wix のライトボックス用クエリは意味を持たないので落とす
    const dropQuery = url.searchParams.has('lightbox');
    // apex（japanworld.co.jp）や http からの流入は www + https へ寄せる。
    // Cloudflare 側の Always Use HTTPS に頼らず、Worker でも https を担保する。
    // workers.dev やローカルの検証ホストは対象外にして、そのまま動かす。
    const ownDomain = url.hostname.endsWith('japanworld.co.jp');
    const wrongOrigin = ownDomain && (url.hostname !== CANONICAL_HOST || url.protocol !== 'https:');

    if (wrongOrigin || target !== pathname || dropQuery) {
      return redirect(url, target, !dropQuery);
    }

    // ---- 5. 静的アセットを返す ----
    const assetRes = await env.ASSETS.fetch(request);

    if (assetRes.status === 404) {
      return notFound(env, url);
    }

    return withHeaders(assetRes, pathname);
  },
} satisfies ExportedHandler<Env>;

/** /404.html を 404 ステータスで返す */
async function notFound(env: Env, url: URL): Promise<Response> {
  const res = await env.ASSETS.fetch(new URL('/404.html', url.origin));
  return new Response(res.body, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      ...SECURITY_HEADERS,
    },
  });
}
