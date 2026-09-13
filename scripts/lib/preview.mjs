/**
 * dist/ をローカルで配信する最小サーバー。
 * スクリーンショット・横スクロール検査の両方から使う。
 */
import http from 'node:http';
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

/** dist/ を配信して { base, missing, close } を返す */
export async function servePreview(dist = 'dist', port = 0) {
  /** 配信できなかったパス。検査側から参照する */
  const missing = [];

  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const candidates = p.endsWith('/') ? [p + 'index.html'] : [p, p + '/index.html'];
    for (const c of candidates) {
      const file = path.join(dist, c);
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, {
          'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream',
        });
        return res.end(fs.readFileSync(file));
      }
    }
    // 参照先が無いこと自体が不具合なので、黙って隠さず記録する
    missing.push(p);
    const notFound = path.join(dist, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not Found');
  });

  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  const { port: actual } = server.address();
  return {
    base: `http://127.0.0.1:${actual}`,
    missing,
    close: () => new Promise((r) => server.close(r)),
  };
}
