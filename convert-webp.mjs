import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Konversi semua gambar work (.jpg/.png) ke .webp beriring — kualitas 80,
// dibatasi lebar 1600px. File asli dibiarkan (tak dipakai bundle bila import
// sudah diarahkan ke .webp). Jalankan: node convert-webp.mjs
const DIR = path.resolve('src/assets/work');
const MAX_W = 1600;

const files = await readdir(DIR);
let beforeTotal = 0;
let afterTotal = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const full = path.join(DIR, file);
  const out = full.replace(/\.(jpe?g|png)$/i, '.webp');
  const before = (await stat(full)).size;

  await sharp(full)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(out);

  const after = (await stat(out)).size;
  beforeTotal += before;
  afterTotal += after;
  console.log(
    `${file.padEnd(22)} ${(before / 1024).toFixed(0).padStart(5)}KB -> ${(after / 1024).toFixed(0).padStart(5)}KB  ${path.basename(out)}`
  );
}

console.log(
  `\nTOTAL ${(beforeTotal / 1024 / 1024).toFixed(2)}MB -> ${(afterTotal / 1024 / 1024).toFixed(2)}MB  (-${(100 - (afterTotal / beforeTotal) * 100).toFixed(0)}%)`
);
