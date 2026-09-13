// CDP でデバイスエミュレーションを行い、フルページのスクリーンショットを撮る。
//   node scripts/shots.mjs <出力ディレクトリ> [baseUrl]

import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = process.argv[2];
import { servePreview } from './lib/preview.mjs';
const preview = await servePreview('dist');
const BASE = process.argv[3] ?? preview.base;
if (!OUT) {
  console.error('使い方: node scripts/shots.mjs <出力ディレクトリ> [baseUrl]');
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const SHOTS = [
  { name: 'desktop-home', path: '/', width: 1440, mobile: false },
  { name: 'desktop-business', path: '/business/', width: 1440, mobile: false },
  { name: 'desktop-wellness', path: '/business/wellness/', width: 1440, mobile: false },
  { name: 'desktop-beauty', path: '/business/beauty/', width: 1440, mobile: false },
  { name: 'desktop-hospitality', path: '/business/hospitality/', width: 1440, mobile: false },
  { name: 'desktop-company', path: '/company/', width: 1440, mobile: false },
  { name: 'desktop-news', path: '/news/', width: 1440, mobile: false },
  { name: 'desktop-news-detail', path: '/news/nasu-accommodation-tax-2026/', width: 1440, mobile: false },
  { name: 'desktop-contact', path: '/contact/', width: 1440, mobile: false },
  { name: 'mobile-home', path: '/', width: 390, mobile: true },
  { name: 'mobile-business', path: '/business/', width: 390, mobile: true },
  { name: 'mobile-wellness', path: '/business/wellness/', width: 390, mobile: true },
  { name: 'mobile-beauty', path: '/business/beauty/', width: 390, mobile: true },
  { name: 'mobile-hospitality', path: '/business/hospitality/', width: 390, mobile: true },
  { name: 'mobile-company', path: '/company/', width: 390, mobile: true },
  { name: 'mobile-news', path: '/news/', width: 390, mobile: true },
  { name: 'mobile-contact', path: '/contact/', width: 390, mobile: true },
  { name: 'mobile-404', path: '/nope/', width: 390, mobile: true },
];

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 19334;
const profile = mkdtempSync(join(tmpdir(), 'shot-'));

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  try {
    wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json())
      .webSocketDebuggerUrl;
  } catch {}
  if (!wsUrl) await sleep(200);
}

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
const send = (method, params = {}, sessionId) => {
  const id = ++msgId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
};

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);

// captureBeyondViewport はビューポート外の遅延読み込み画像を発火させないため、
// 撮影前にページ全体をスクロールし、すべての画像の読み込みを待つ。
const LOAD_ALL = `(async () => {
  for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager';
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
  await Promise.all(
    [...document.images].map((i) => (i.complete ? null : i.decode().catch(() => {})))
  );
  return { total: document.images.length, pending: [...document.images].filter((i) => !i.complete).length };
})()`;

for (const s of SHOTS) {
  await send(
    'Emulation.setDeviceMetricsOverride',
    {
      width: s.width,
      height: 900,
      deviceScaleFactor: s.mobile ? 2 : 1,
      mobile: s.mobile,
      screenWidth: s.width,
      screenHeight: 900,
    },
    sessionId
  );
  await send('Page.navigate', { url: BASE + s.path }, sessionId);
  await sleep(600);

  const probe = await send(
    'Runtime.evaluate',
    { expression: LOAD_ALL, awaitPromise: true, returnByValue: true },
    sessionId
  );
  const { total, pending } = probe.result.value;

  // captureBeyondViewport は縦に長いページだと下部をラスタライズしないことがあるため、
  // ビューポート自体をページ全高にしてから撮る。
  const { result: heightResult } = await send(
    'Runtime.evaluate',
    { expression: 'document.documentElement.scrollHeight', returnByValue: true },
    sessionId
  );
  const fullHeight = Math.min(heightResult.value, 30000);

  await send(
    'Emulation.setDeviceMetricsOverride',
    {
      width: s.width,
      height: fullHeight,
      deviceScaleFactor: s.mobile ? 2 : 1,
      mobile: s.mobile,
      screenWidth: s.width,
      screenHeight: fullHeight,
    },
    sessionId
  );
  await sleep(900);

  const { data } = await send(
    'Page.captureScreenshot',
    { format: 'png', optimizeForSpeed: false },
    sessionId
  );
  const file = join(OUT, `${s.name}.png`);
  writeFileSync(file, Buffer.from(data, 'base64'));
  console.log(
    `${s.name.padEnd(20)} ${String(s.width).padStart(4)}px  ${String(
      (Buffer.from(data, 'base64').length / 1024).toFixed(0)
    ).padStart(5)}KB  img ${total - pending}/${total}`
  );
}

ws.close();
chrome.kill();
await preview.close();
