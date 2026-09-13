/**
 * dist/ をローカルで配信する最小サーバー。
 * スクリーンショット・横スクロール検査・スマホメニュー検査から使う。
 *
 * ⚠ 配信は **worker/index.ts を通す**（scripts/lib/worker-local.mjs）。
 *   以前は dist/ のファイルをそのまま返していたため、Worker が付ける
 *   Content-Security-Policy がローカル検査に掛からず、
 *   「ローカルでは開くのに本番ではメニューが開かない」を見逃した（docs/10）。
 *   本番と同じヘッダー付きで配信することで、Chrome の CSP 判定まで検査に含める。
 */
import http from 'node:http';
import { createLocalWorker } from './worker-local.mjs';

const CANON = 'https://www.japanworld.co.jp';

/** dist/ を配信して { base, missing, close } を返す */
export async function servePreview(dist = 'dist', port = 0) {
  const worker = await createLocalWorker(dist);
  let base = '';

  const server = http.createServer(async (req, res) => {
    try {
      // Worker は本番ホスト名で判断する箇所があるため、正規ホストとして呼ぶ
      const r = await worker.fetch(CANON + req.url, { method: req.method });
      const headers = {};
      for (const [k, v] of r.headers) {
        // 末尾スラッシュ補完などの 301 は本番URLを指すので、ローカルへ戻す
        headers[k] = k.toLowerCase() === 'location' ? v.replace(CANON, base) : v;
      }
      res.writeHead(r.status, headers);
      res.end(Buffer.from(await r.arrayBuffer()));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(String(err && err.stack ? err.stack : err));
    }
  });

  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  const { port: actual } = server.address();
  base = `http://127.0.0.1:${actual}`;
  return {
    base,
    /** 配信できなかったパス。検査側から参照する */
    missing: worker.missing,
    close: () => new Promise((r) => server.close(r)),
  };
}
