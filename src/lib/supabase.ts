import type { SupabaseClient } from '@supabase/supabase-js';

// Client Supabase untuk situs + admin panel.
// Kredensial dari env (VITE_*). Anon key aman di frontend karena dijaga RLS.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseEnv = Boolean(url && anonKey);

// Cache promise-nya biar createClient cuma jalan sekali walau dipanggil berulang.
let clientPromise: Promise<SupabaseClient | null> | null = null;

// Load @supabase/supabase-js secara DINAMIS → tidak ikut bundle awal (~100KB).
// Baru di-fetch dari network saat env terisi & konten butuh data DB.
// Balikan null bila env kosong → komponen fallback ke DEFAULTS tanpa crash.
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!hasSupabaseEnv) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url as string, anonKey as string)
    );
  }
  return clientPromise;
}
