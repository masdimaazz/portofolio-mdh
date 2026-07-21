import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.resolve('src/assets/work');
const MAX_W = 1600;

const files = await readdir(DIR);
let beforeTotal = 0;
let afterTotal = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const full = path.join(DIR, file);
  const before = (await stat(full)).size;
  const tmp = full + '.tmp';

  const img = sharp(full).resize({
    width: MAX_W,
    withoutEnlargement: true,
  });

  if (ext === '.png') {
    // Tetap PNG (jaga transparansi), kuantisasi + kompres kuat
    await img.png({ compressionLevel: 9, quality: 80, effort: 10, palette: true }).toFile(tmp);
  } else {
    // JPEG mozjpeg kualitas 78
    await img.jpeg({ quality: 78, mozjpeg: true }).toFile(tmp);
  }

  await unlink(full);
  await rename(tmp, full);

  const after = (await stat(full)).size;
  beforeTotal += before;
  afterTotal += after;
  console.log(
    `${file.padEnd(22)} ${(before / 1024).toFixed(0).padStart(5)}KB -> ${(after / 1024).toFixed(0).padStart(5)}KB`
  );
}

console.log(
  `\nTOTAL ${(beforeTotal / 1024 / 1024).toFixed(2)}MB -> ${(afterTotal / 1024 / 1024).toFixed(2)}MB  (-${(100 - (afterTotal / beforeTotal) * 100).toFixed(0)}%)`
);
