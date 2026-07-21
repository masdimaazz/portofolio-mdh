import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';

// Client Supabase untuk admin (persist session default aktif → tetap login setelah refresh).
export async function client(): Promise<SupabaseClient> {
  const c = await getSupabase();
  if (!c) {
    throw new Error(
      'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY.'
    );
  }
  return c;
}

// Upload gambar ke bucket publik `portfolio`, balikan public URL siap simpan ke DB.
export async function uploadImage(file: File, folder: string): Promise<string> {
  const c = await client();
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await c.storage
    .from('portfolio')
    .upload(path, file, { upsert: true, cacheControl: '31536000', contentType: file.type });
  if (error) throw error;
  return c.storage.from('portfolio').getPublicUrl(path).data.publicUrl;
}
