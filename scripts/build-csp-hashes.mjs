/**
 * dist/ のインラインスクリプトの SHA-256 を worker/csp-hashes.generated.ts に書き出す。
 *
 *   npm run build   （astro build のあとに自動で走る）
 *
 * なぜ必要か:
 *   Worker が返す Content-Security-Policy は script-src 'self' で、
 *   'self' は **インラインスクリプトを許可しない**。
 *   このサイトはハンバーガーメニューとスクロール表示の JS を
 *   外部ファイルにせず HTML に埋め込んでいるため、ハッシュを CSP に載せないと
 *   本番でメニューが開かなくなる（2026-09-13 に実際に起きた。docs/10 参照）。
 *
 *   'unsafe-inline' を足せば動くが、CSP の意味が無くなる。
 *   ハッシュ方式なら「このビルドで生成したスクリプトだけ」を許可できる。
 *
 * ⚠ 生成物はコミットする（src/data/images.generated.ts と同じ扱い）。
 *   wrangler deploy は dist/ と一緒にこのファイルもバンドルするので、
 *   `npm run build` → `npm run deploy` の順で実行すれば HTML と CSP は必ず一致する。
 *   `npm run verify` の [13] が、dist と生成物の食い違いを検出する。
 */
import fs from 'node:fs';
import { collectInlineScriptHashes } from './lib/csp-hashes.mjs';

const DIST = 'dist';
const OUT = 'worker/csp-hashes.generated.ts';

if (!fs.existsSync(DIST)) {
  console.error(`${DIST}/ がありません。先に astro build を実行してください。`);
  process.exit(1);
}

const { hashes, scripts } = collectInlineScriptHashes(DIST);

// ページごとに中身の違うスクリプトが増えると CSP ヘッダーが肥大化する。
// 現状は「ハンバーガー」「スクロール表示」の 2 本が全ページ共通。
if (hashes.length > 8) {
  console.warn(
    `! インラインスクリプトの種類が ${hashes.length} 件あります。` +
      'ページごとに中身が変わるスクリプトが無いか確認してください。',
  );
}

const body = `/**
 * ⚠ 自動生成ファイル。手で編集しないこと。
 *
 *   npm run build  →  scripts/build-csp-hashes.mjs が dist/ から生成する。
 *
 * dist/ の HTML に埋め込まれているインラインスクリプトの SHA-256。
 * worker/index.ts が Content-Security-Policy の script-src に載せる。
 * 中身が 1 バイトでも変わるとハッシュも変わり、古いハッシュのままだと
 * ブラウザがスクリプトを実行しない（＝スマートフォンのメニューが開かない）。
 *
 * 生成日時: ${new Date().toISOString()}
${scripts.map((s) => ` *   ${s.hash}  ${String(s.bytes).padStart(5)} bytes  type="${s.type || '(none)'}"  ${s.pages.length} pages`).join('\n')}
 */
export const CSP_SCRIPT_HASHES = [
${hashes.map((h) => `  '${h}',`).join('\n')}
] as const;
`;

const before = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
// 生成日時の行以外が同じなら書き換えない（無意味な差分を作らない）
const strip = (s) => s.replace(/^ \* 生成日時: .*$/m, '');
if (strip(before) !== strip(body)) {
  fs.writeFileSync(OUT, body);
  console.log(`${OUT} を更新しました（${hashes.length} 件）`);
} else {
  console.log(`${OUT} は最新です（${hashes.length} 件）`);
}
for (const s of scripts) {
  console.log(`  ${s.hash}  ${s.bytes} bytes  type="${s.type || '(none)'}"  ${s.pages.length} ページ`);
}
