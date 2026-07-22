import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';

// Client Supabase untuk admin (persist session default aktif → tetap login setelah refresh).
export async function client(): Promise<SupabaseClient> {
  const c = await getSupabase();
  if (!c) {
    throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY.');
  }
  return c;
}

const MAX_UPLOAD = 20 * 1024 * 1024; // 20MB batas file mentah

type Compressed = { blob: Blob; ext: string; type: string };

// Kompres gambar sisi-klien: resize (maks lebar) + encode WebP.
// SVG/GIF dilewati (vektor/animasi). Kalau hasil malah lebih besar, pakai asli.
async function compressImage(file: File, maxW = 1600, quality = 0.82): Promise<Compressed> {
  const rawExt = (file.name.split('.').pop() || 'bin').toLowerCase();
  const passthrough: Compressed = { blob: file, ext: rawExt, type: file.type || 'application/octet-stream' };

  if (file.type === 'image/svg+xml' || file.type === 'image/gif' || !file.type.startsWith('image/')) {
    return passthrough;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxW / bitmap.width);
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return passthrough;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/webp', quality));
    if (!blob || blob.size >= file.size) return passthrough;
    return { blob, ext: 'webp', type: 'image/webp' };
  } catch {
    return passthrough;
  }
}

// Upload gambar (dikompres dulu) ke bucket publik `portfolio`, balikan public URL.
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (file.size > MAX_UPLOAD) {
    throw new Error(`Ukuran file terlalu besar (maks ${MAX_UPLOAD / 1024 / 1024}MB).`);
  }
  const c = await client();
  const { blob, ext, type } = await compressImage(file);
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await c.storage
    .from('portfolio')
    .upload(path, blob, { upsert: true, cacheControl: '31536000', contentType: type });
  if (error) throw error;
  return c.storage.from('portfolio').getPublicUrl(path).data.publicUrl;
}
