import sharp from 'sharp';
import path from 'node:path';

// Bikin banner share 1200×630 (Open Graph / Twitter) dari data profil.
// Jalankan: node generate-og.mjs  → public/og-image.png
const OUT = path.resolve('public/og-image.png');
const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#0a1024" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a1024"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="120" cy="500" r="260" fill="#3b82f6" opacity="0.16"/>
  <circle cx="1080" cy="120" r="220" fill="#2563eb" opacity="0.14"/>

  <text x="80" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="26"
        letter-spacing="8" font-weight="700" fill="#93c5fd">• PORTFOLIO</text>

  <text x="78" y="315" font-family="Segoe UI, Arial, sans-serif" font-size="96"
        font-weight="800" fill="#ffffff" letter-spacing="-2"
        textLength="1044" lengthAdjust="spacingAndGlyphs">MUHAMMAD DIMAS</text>
  <text x="78" y="425" font-family="Segoe UI, Arial, sans-serif" font-size="96"
        font-weight="800" fill="#3b82f6" letter-spacing="-2">HADIYANTO</text>

  <text x="80" y="540" font-family="Consolas, monospace" font-size="30"
        letter-spacing="2" fill="#cbd5e1">Graphic Designer · Motion · UI/UX · Editor</text>

  <text x="80" y="595" font-family="Consolas, monospace" font-size="22"
        letter-spacing="3" fill="#64748b">JAKARTA, INDONESIA</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log('OG image ditulis →', OUT);
