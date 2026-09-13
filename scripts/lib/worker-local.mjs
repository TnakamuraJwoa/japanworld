/**
 * worker/index.ts をサーバー無しでローカル実行する。
 *
 * ASSETS バインディングを dist/ で肩代わりし、Worker の fetch ハンドラを直接呼ぶ。
 * リダイレクト・404・**セキュリティヘッダー（CSP）** まで本番と同じ経路を通るので、
 * 「dist を素で配信したら動くが、Worker 越しだと動かない」たぐいの不具合を
 * ローカルで捕まえられる。
 *
 * check-redirects / preview（nav・overflow・shots の検査）から使う。
 *
 * ⚠ worker/index.ts は TypeScript。Node 22.18 以降 / 24 は既定で型を剥がして読める。
 *   それより古い Node では `node --experimental-strip-types` が必要。
 */
import fs from 'node:fs';
import path from 'node:path';

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

/**
 * @param {string} dist 配信するビルド成果物のディレクトリ
 * @returns {Promise<{ fetch: (input: string | Request, init?: RequestInit) => Promise<Response>, missing: string[] }>}
 *   missing … ASSETS で見つからなかったパス（検査側が「参照切れ」として報告する）
 */
export async function createLocalWorker(dist = 'dist') {
  const mod = await import('../../worker/index.ts');
  const missing = [];

  const ASSETS = {
    async fetch(request) {
      // Workers の Fetcher.fetch は Request / URL / 文字列のいずれも受け取る
      const href =
        typeof request === 'string' ? request : request instanceof URL ? request.href : request.url;
      const url = new URL(href);
      const p = decodeURIComponent(url.pathname);
      const candidates = p.endsWith('/') ? [p + 'index.html'] : [p, p + '/index.html', p + '.html'];
      for (const c of candidates) {
        const file = path.join(dist, c);
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          return new Response(fs.readFileSync(file), {
            status: 200,
            headers: { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' },
          });
        }
      }
      // Worker 自身が 404 ページを取りに来る分は「参照切れ」ではない
      if (p !== '/404.html') missing.push(p);
      return new Response('Not Found', { status: 404 });
    },
  };

  const env = { ASSETS };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  return {
    missing,
    fetch: (input, init) =>
      mod.default.fetch(input instanceof Request ? input : new Request(input, init), env, ctx),
  };
}
