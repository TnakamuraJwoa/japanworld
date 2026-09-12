import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.japanworld.co.jp',
  output: 'static',
  outDir: './dist',
  trailingSlash: 'always',
  build: {
    // /raki-house/ → raki-house/index.html
    // Cloudflare Workers Static Assets の既定の解決と相性が良い
    format: 'directory',
    inlineStylesheets: 'never',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  // 日本語がURLに入らない設計にしたため、Astro 側の i18n ルーティングは使わず
  // src/pages/[...slug].astro で全言語を生成している。
});
