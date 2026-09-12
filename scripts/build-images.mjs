/**
 * assets/source/ の原画像から public/images/ の配信用 WebP を生成する。
 *
 *   node scripts/build-images.mjs
 *
 * - 各画像を複数幅で書き出し、<img srcset> から使えるようにする
 * - CLS を防ぐため、最大幅の実寸を src/data/images.generated.ts に書き出す
 * - 原画像（assets/source/）は一切変更しない
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGES, DEFAULT_WIDTHS, EXCLUDED } from './image-manifest.mjs';

const SRC_DIR = 'assets/source';
const OUT_DIR = 'public/images';
const DATA_OUT = 'src/data/images.generated.ts';

const force = process.argv.includes('--force');

async function main() {
  const entries = [];
  let written = 0;
  let skipped = 0;
  let bytesOut = 0;
  let bytesIn = 0;

  for (const img of IMAGES) {
    const srcPath = path.join(SRC_DIR, img.src);
    if (!fs.existsSync(srcPath)) {
      console.error(`  !! 原画像が見つかりません: ${img.src} (${img.name})`);
      process.exitCode = 1;
      continue;
    }
    bytesIn += fs.statSync(srcPath).size;

    const widths = [...(img.w ?? DEFAULT_WIDTHS)].sort((a, b) => a - b);
    const meta = await sharp(srcPath).metadata();
    const outDir = path.join(OUT_DIR, path.dirname(img.name));
    fs.mkdirSync(outDir, { recursive: true });

    const variants = [];
    for (const w of widths) {
      // 原画像より大きくはしない
      const target = Math.min(w, meta.width);
      const outFile = path.join(OUT_DIR, `${img.name}-${w}.webp`);
      if (!force && fs.existsSync(outFile)) {
        skipped += 1;
      } else {
        let pipe = sharp(srcPath).resize({ width: target, withoutEnlargement: true });
        if (!img.contain) pipe = pipe.rotate();
        await pipe.webp({ quality: img.contain ? 90 : 80, effort: 5 }).toFile(outFile);
        written += 1;
      }
      const st = fs.statSync(outFile);
      bytesOut += st.size;
      const vm = await sharp(outFile).metadata();
      variants.push({ w: vm.width, h: vm.height, bytes: st.size });
    }

    const largest = variants[variants.length - 1];
    entries.push({
      name: img.name,
      alt: img.alt,
      widths,
      width: largest.w,
      height: largest.h,
    });
  }

  // ---- src/data/images.generated.ts ----
  const ts = `// scripts/build-images.mjs が自動生成。直接編集しないこと。
// 代替テキストの編集は scripts/image-manifest.mjs 側で行う。

export type ImageEntry = {
  /** public/images/<name>-<w>.webp */
  name: string;
  /** 日本語の代替テキスト（既定値） */
  alt: string;
  /** 生成済みの横幅 */
  widths: number[];
  /** 最大幅バリアントの実寸（width/height 属性・aspect-ratio 用） */
  width: number;
  height: number;
};

export const IMAGES = ${JSON.stringify(
    Object.fromEntries(entries.map((e) => [e.name, e])),
    null,
    2,
  )} as const satisfies Record<string, ImageEntry>;

export type ImageName = keyof typeof IMAGES;
`;
  fs.mkdirSync(path.dirname(DATA_OUT), { recursive: true });
  fs.writeFileSync(DATA_OUT, ts, 'utf8');

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
  console.log(`画像: ${IMAGES.length} 点 / バリアント ${written} 生成, ${skipped} 既存`);
  console.log(`  原画像 合計 ${mb(bytesIn)} → 配信用 合計 ${mb(bytesOut)}`);
  console.log(`  未使用（意図的に除外）: ${EXCLUDED.length} 点`);
  console.log(`  → ${DATA_OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
