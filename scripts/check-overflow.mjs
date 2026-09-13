// 各ページを複数の画面幅でレンダリングし、横スクロールを起こしている要素を特定する。
// Chrome を --remote-debugging-port で起動し、CDP 経由で計測する。
//   node scripts/check-overflow.mjs [baseUrl]

import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { servePreview } from './lib/preview.mjs';
const preview = await servePreview('dist');
const BASE = process.argv[2] ?? preview.base;
const WIDTHS = [320, 360, 390, 414, 600, 768, 900, 1280];
const PAGES = [
  '/',
  '/business/',
  '/business/wellness/',
  '/business/beauty/',
  '/business/hospitality/',
  '/company/',
  '/news/',
  '/news/nasu-accommodation-tax-2026/',
  '/contact/',
  '/nope/',
];

const CHROME =
  process.env.CHROME_PATH ??
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const PORT = 19333;
const profile = mkdtempSync(join(tmpdir(), 'ovf-'));

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--disable-extensions',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const j = await r.json();
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome の DevTools エンドポイントに接続できませんでした');
}

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  }
};
function send(method, params = {}, sessionId) {
  const id = ++msgId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

// ページを1つ開いてセッションを張る
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);

// 横方向にはみ出している要素を列挙するスクリプト
const PROBE = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const out = { vw, scrollWidth: de.scrollWidth, offenders: [] };
  if (de.scrollWidth <= vw + 1) return out;
  const seen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      // 親も同じだけはみ出していれば親のほうが原因なので子は省く
      const p = el.parentElement;
      if (p) {
        const pr = p.getBoundingClientRect();
        if (pr.right > vw + 1 && Math.abs(pr.right - r.right) < 2) continue;
      }
      const sel = el.tagName.toLowerCase() +
        (el.id ? '#' + el.id : '') +
        (el.className && typeof el.className === 'string'
          ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.')
          : '');
      const key = sel + Math.round(r.right);
      if (seen.has(key)) continue;
      seen.add(key);
      out.offenders.push({
        sel,
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        text: (el.textContent || '').trim().slice(0, 40),
      });
    }
  }
  out.offenders = out.offenders.slice(0, 8);
  return out;
})()`;

let problems = 0;
console.log(`\n横スクロール検査  base=${BASE}\n${'='.repeat(70)}`);

for (const page of PAGES) {
  const results = [];
  for (const width of WIDTHS) {
    await send(
      'Emulation.setDeviceMetricsOverride',
      { width, height: 900, deviceScaleFactor: 1, mobile: width < 900 },
      sessionId
    );
    await send('Page.navigate', { url: BASE + page }, sessionId);
    await sleep(450);
    const { result } = await send(
      'Runtime.evaluate',
      { expression: PROBE, returnByValue: true },
      sessionId
    );
    const v = result.value;
    if (v.scrollWidth > v.vw + 1) {
      problems++;
      results.push({ width, ...v });
    }
  }

  if (results.length === 0) {
    console.log(`✓ ${page.padEnd(18)} 全幅で横スクロールなし`);
  } else {
    console.log(`✗ ${page}`);
    for (const r of results) {
      console.log(`    幅 ${r.width}px → scrollWidth ${r.scrollWidth}px (+${r.scrollWidth - r.vw})`);
      for (const o of r.offenders) {
        console.log(`        ${o.sel}  left=${o.left} right=${o.right} w=${o.width}  "${o.text}"`);
      }
    }
  }
}

console.log('='.repeat(70));
console.log(problems === 0 ? '\n✓ 横スクロールは検出されませんでした\n' : `\n✗ ${problems} 件\n`);

ws.close();
chrome.kill();
await preview.close();
process.exit(problems === 0 ? 0 : 1);
