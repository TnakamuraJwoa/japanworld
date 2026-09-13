/**
 * ⚠ 自動生成ファイル。手で編集しないこと。
 *
 *   npm run build  →  scripts/build-csp-hashes.mjs が dist/ から生成する。
 *
 * dist/ の HTML に埋め込まれているインラインスクリプトの SHA-256。
 * worker/index.ts が Content-Security-Policy の script-src に載せる。
 * 中身が 1 バイトでも変わるとハッシュも変わり、古いハッシュのままだと
 * ブラウザがスクリプトを実行しない（＝スマートフォンのメニューが開かない）。
 *
 * 生成日時: 2026-09-13T12:49:26.373Z
 *   sha256-aMXvDcDLfQFhPvzV5B2hPm8ffE/HuDXIndy5gNvxViE=   1130 bytes  type="(none)"  10 pages
 *   sha256-wSa0hyPf3VnJFanSG2s099Mj49N7zCmmoB0xF2cPymE=    943 bytes  type="module"  10 pages
 */
export const CSP_SCRIPT_HASHES = [
  'sha256-aMXvDcDLfQFhPvzV5B2hPm8ffE/HuDXIndy5gNvxViE=',
  'sha256-wSa0hyPf3VnJFanSG2s099Mj49N7zCmmoB0xF2cPymE=',
] as const;
