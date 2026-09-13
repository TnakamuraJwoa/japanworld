/**
 * dist/ の HTML に含まれるインラインスクリプトの CSP ハッシュを数え上げる。
 *
 * ビルド後の生成（scripts/build-csp-hashes.mjs）と、
 * 検証（scripts/check-all.mjs [13]）の両方から使う。
 *
 * 対象にするのは「ブラウザが実行する」スクリプトだけ:
 *   - src を持たない
 *   - type が無い / "module" / JavaScript 系
 * JSON-LD（type="application/ld+json"）は実行されないため CSP の対象外。
 *
 * ハッシュは <script> の中身そのもの（前後の空白も含む）に対する SHA-256 を
 * base64 にしたもの。CSP はこの文字列と 1 バイトも違わない中身だけを許可する。
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** 実行されるインラインスクリプトか */
function isExecutableInline(attrs) {
  if (/\bsrc\s*=/.test(attrs)) return false;
  const type = (attrs.match(/\btype\s*=\s*"([^"]*)"/i) ?? [])[1];
  if (!type) return true;
  return type === 'module' || /javascript|ecmascript/i.test(type);
}

/**
 * @returns {{ hashes: string[], scripts: { hash: string, bytes: number, type: string, pages: string[] }[] }}
 *   hashes は重複を除いてソート済み。
 */
export function collectInlineScriptHashes(dist = 'dist') {
  const byHash = new Map();

  for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
    const html = fs.readFileSync(file, 'utf8');
    const page = '/' + path.relative(dist, file).split(path.sep).join('/');
    for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!isExecutableInline(m[1])) continue;
      const body = m[2];
      const hash = 'sha256-' + crypto.createHash('sha256').update(body, 'utf8').digest('base64');
      if (!byHash.has(hash)) {
        const type = (m[1].match(/\btype\s*=\s*"([^"]*)"/i) ?? [])[1] ?? '';
        byHash.set(hash, { hash, bytes: Buffer.byteLength(body, 'utf8'), type, pages: [] });
      }
      byHash.get(hash).pages.push(page);
    }
  }

  const scripts = [...byHash.values()].sort((a, b) => (a.hash < b.hash ? -1 : 1));
  return { hashes: scripts.map((s) => s.hash), scripts };
}

/** 生成済みファイル（worker/csp-hashes.generated.ts）からハッシュを読む */
export function readGeneratedHashes(file = 'worker/csp-hashes.generated.ts') {
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, 'utf8');
  return [...src.matchAll(/'(sha256-[A-Za-z0-9+/=]+)'/g)].map((m) => m[1]).sort();
}
