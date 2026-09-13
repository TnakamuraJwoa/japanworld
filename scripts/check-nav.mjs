// スマートフォン幅のドロワーメニューが実際に開閉できるかを CDP で検査する。
// ハンバーガーを本当にクリックし、開いたパネルが画面を占めていて
// リンクがタップできる（elementFromPoint で拾える）ところまで見る。
//   node scripts/check-nav.mjs [baseUrl]

import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { servePreview } from './lib/preview.mjs';
const preview = await servePreview('dist');
const BASE = process.argv[2] ?? preview.base;

// 第2段ナビのある事業ページも含める（ヘッダーが 2 段になる）
const PAGES = ['/', '/business/wellness/', '/news/', '/contact/'];
const WIDTHS = [320, 390, 414, 768];
/** メニューを開く前に、この位置までスクロールしておく */
const SCROLLS = [0, 1200];

const CHROME =
  process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// 固定ポートだと、前回の異常終了で残った Chrome に繋いでしまい黙って固まる
const PORT = 19000 + Math.floor(Math.random() * 900);
const profile = mkdtempSync(join(tmpdir(), 'nav-'));

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

// 途中で落ちても Chrome とプレビューを残さない（残すと次の実行が壊れる）
let cleanedUp = false;
const cleanup = () => {
  if (cleanedUp) return;
  cleanedUp = true;
  try {
    chrome.kill();
  } catch {}
};
process.on('exit', cleanup);
for (const ev of ['uncaughtException', 'unhandledRejection']) {
  process.on(ev, async (err) => {
    console.error(err);
    cleanup();
    await preview.close().catch(() => {});
    process.exit(1);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 50; i++) {
    try {
      const j = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome の DevTools エンドポイントに接続できませんでした');
}

const ws = new WebSocket(await getWsUrl());
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

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);
await send('Input.setIgnoreInputEvents', { ignore: false }, sessionId);

const evaluate = async (expression) => {
  const { result, exceptionDetails } = await send(
    'Runtime.evaluate',
    { expression, returnByValue: true, awaitPromise: true },
    sessionId
  );
  if (exceptionDetails) throw new Error(exceptionDetails.text + ' ' + expression.slice(0, 60));
  return result.value;
};

/**
 * ハンバーガーの中心を実際にタップする。
 * 実機と同じ touchStart → touchEnd で押す（マウスでは拾えない不具合があるため）。
 */
async function tapToggle() {
  const at = await evaluate(`(() => {
    const b = document.querySelector('[data-nav-toggle]');
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  })()`);
  if (!at) throw new Error('[data-nav-toggle] が見つかりません');
  if (at.y < 0) throw new Error(`ハンバーガーが画面外にある (y=${at.y})`);
  await send(
    'Input.dispatchTouchEvent',
    { type: 'touchStart', touchPoints: [{ x: at.x, y: at.y }] },
    sessionId
  );
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }, sessionId);
  await sleep(350);
}

// 開いた状態のドロワーを調べる
const PROBE_OPEN = `(() => {
  const de = document.documentElement;
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const vw = de.clientWidth;
  const vh = de.clientHeight;
  const r = nav.getBoundingClientRect();
  const cs = getComputedStyle(nav);
  const links = [...nav.querySelectorAll('a')];

  // 画面内に見えていて、その座標で本当に自分が拾えるリンクの数
  const tappable = links.filter((a) => {
    const lr = a.getBoundingClientRect();
    if (lr.width < 1 || lr.height < 1) return false;
    if (lr.top < 0 || lr.bottom > vh || lr.left < 0 || lr.right > vw) return false;
    const hit = document.elementFromPoint(lr.left + lr.width / 2, lr.top + lr.height / 2);
    return hit === a || a.contains(hit);
  }).length;

  // 閉じるために、開いている間もハンバーガー自身が画面内で押せること
  const hr = toggle.getBoundingClientRect();
  const hitToggle = document.elementFromPoint(hr.left + hr.width / 2, hr.top + hr.height / 2);

  return {
    vw,
    vh,
    expanded: toggle.getAttribute('aria-expanded'),
    display: cs.display,
    visibility: cs.visibility,
    opacity: Number(cs.opacity),
    rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
    links: links.length,
    tappable,
    headerTop: Math.round(document.querySelector('.site-header').getBoundingClientRect().top),
    headerH: Math.round(document.querySelector('.site-header').getBoundingClientRect().height),
    toggleTop: Math.round(hr.top),
    toggleTappable: hitToggle === toggle || toggle.contains(hitToggle),
  };
})()`;

const PROBE_CLOSED = `(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const r = nav.getBoundingClientRect();
  const cs = getComputedStyle(nav);
  return {
    expanded: toggle.getAttribute('aria-expanded'),
    shown: cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0 && r.height > 1,
    toggleShown: getComputedStyle(toggle).display !== 'none',
    bodyScrollLocked: getComputedStyle(document.body).overflow === 'hidden',
  };
})()`;

let problems = 0;
const fail = (msg) => {
  problems++;
  console.log(`    ✗ ${msg}`);
};

/**
 * 表示中のページについて、開く・閉じる一連の動きを検査する。
 * scrollBefore はメニューを開く前のスクロール位置。
 */
async function checkOneCase(label, scrollBefore) {
  // 1. 初期状態は閉じている
  const closed0 = await evaluate(PROBE_CLOSED);
  if (!closed0.toggleShown) fail(`${label}: ハンバーガーが表示されていない`);
  if (closed0.shown) fail(`${label}: 初期状態でメニューが開いている`);

  // 2. タップで開く
  await tapToggle();
  const open = await evaluate(PROBE_OPEN);
  if (open.expanded !== 'true') fail(`${label}: aria-expanded が ${open.expanded}`);
  if (open.display === 'none' || open.visibility === 'hidden' || open.opacity === 0) {
    fail(
      `${label}: パネルが非表示 ` +
        `(display=${open.display} visibility=${open.visibility} opacity=${open.opacity})`
    );
  }
  if (open.rect.height < 240) {
    fail(
      `${label}: パネルの高さが ${open.rect.height}px しかない` +
        `（top=${open.rect.top} 画面高 ${open.vh}px）`
    );
  }
  if (open.rect.width < open.vw - 1) {
    fail(`${label}: パネル幅 ${open.rect.width}px が画面幅 ${open.vw}px に足りない`);
  }
  if (open.tappable < open.links) {
    fail(`${label}: タップできるリンクが ${open.tappable}/${open.links} 本`);
  }
  // ヘッダーが画面外へ逃げると、閉じるための × ごと消えてしまう
  if (open.headerTop !== 0) {
    fail(`${label}: 開いた瞬間にヘッダーが top=${open.headerTop}px へ動いた`);
  }
  if (!open.toggleTappable) {
    fail(`${label}: 開いている間にハンバーガーが押せない (top=${open.toggleTop}px)`);
  }
  // パネルの上端はヘッダーの下端に隙間なく続くこと
  if (Math.abs(open.rect.top - open.headerH) > 1) {
    fail(`${label}: パネル上端 ${open.rect.top}px とヘッダー下端 ${open.headerH}px がずれている`);
  }

  // 3. スクロールが背面に抜けないか
  const locked = await evaluate(`(() => {
    const y0 = window.scrollY;
    window.scrollBy(0, 400);
    const moved = window.scrollY !== y0;
    window.scrollTo(0, y0);
    return !moved;
  })()`);
  if (!locked) fail(`${label}: メニューを開いても背面がスクロールする`);

  // 4. もう一度タップで閉じる
  await tapToggle();
  const closed1 = await evaluate(PROBE_CLOSED);
  if (closed1.expanded !== 'false') fail(`${label}: 閉じても aria-expanded が ${closed1.expanded}`);
  if (closed1.shown) fail(`${label}: 2回目のタップで閉じない`);
  if (closed1.bodyScrollLocked) fail(`${label}: 閉じたのに body のスクロールが固定されたまま`);

  // 閉じたら、開く前に読んでいた位置へ戻っていること
  const scrollAfter = await evaluate('Math.round(window.scrollY)');
  if (Math.abs(scrollAfter - scrollBefore) > 1) {
    fail(`${label}: 閉じたらスクロール位置が ${scrollBefore}px から ${scrollAfter}px へ動いた`);
  }

  // 5. Escape で閉じる
  await tapToggle();
  for (const type of ['keyDown', 'keyUp']) {
    await send(
      'Input.dispatchKeyEvent',
      { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 },
      sessionId
    );
  }
  await sleep(300);
  const closed2 = await evaluate(PROBE_CLOSED);
  if (closed2.shown) fail(`${label}: Escape で閉じない`);
}

console.log(`\nスマホ版メニュー検査  base=${BASE}\n${'='.repeat(70)}`);

for (const width of WIDTHS) {
  await send(
    'Emulation.setDeviceMetricsOverride',
    { width, height: 780, deviceScaleFactor: 1, mobile: true, screenWidth: width, screenHeight: 780 },
    sessionId
  );
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }, sessionId);

  for (const page of PAGES) {
    // 実際の利用では、少し読み進めてからメニューを開くことが多い。
    // 下までスクロールした状態も必ず見る（sticky なヘッダーが絡む）
    for (const scrollFirst of SCROLLS) {
      await send('Page.navigate', { url: BASE + page }, sessionId);
      await sleep(500);
      if (scrollFirst) {
        await evaluate(`window.scrollTo({ top: ${scrollFirst}, behavior: 'instant' })`);
        await sleep(250);
      }
      const label =
        `幅 ${String(width).padStart(3)}px ${page.padEnd(22)}` +
        (scrollFirst ? `${scrollFirst}px スクロール後` : '先頭');
      const before = problems;
      const scrollBefore = await evaluate('Math.round(window.scrollY)');

      try {
        await checkOneCase(label, scrollBefore);
      } catch (err) {
        // ここで落ちても残りの幅・ページは見たいので、1件の失敗として続ける
        fail(`${label}: ${err.message}`);
      }

      if (problems === before) console.log(`✓ ${label}`);
    }
  }
}

// PC 幅ではハンバーガーが消え、ナビが常時表示されていること
await send(
  'Emulation.setDeviceMetricsOverride',
  { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1280, screenHeight: 900 },
  sessionId
);
await send('Emulation.setTouchEmulationEnabled', { enabled: false }, sessionId);
await send('Page.navigate', { url: BASE + '/' }, sessionId);
await sleep(500);
const desktop = await evaluate(PROBE_CLOSED);
if (desktop.toggleShown) fail('幅 1280px: PC 幅なのにハンバーガーが出ている');
if (!desktop.shown) fail('幅 1280px: PC 幅でナビが表示されていない');
if (problems === 0) console.log('✓ 幅 1280px /            PC 幅はハンバーガーなし・ナビ常時表示');

console.log('='.repeat(70));

// 参照先が見つからなかったファイルがあれば、それも報告する
const missing = [...new Set(preview.missing)];
if (missing.length) {
  console.log(`\n配信できなかった参照 ${missing.length} 件:`);
  for (const m of missing) console.log(`    - ${m}`);
}

console.log(problems === 0 ? '\n✓ スマホ版メニューは正常に開閉します\n' : `\n✗ ${problems} 件\n`);

ws.close();
chrome.kill();
await preview.close();
process.exit(problems === 0 ? 0 : 1);
