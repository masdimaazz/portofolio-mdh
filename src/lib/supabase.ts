import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Client Supabase untuk situs + admin panel.
// Kredensial dari env (VITE_*). Anon key aman di frontend karena dijaga RLS.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Null bila env belum diisi → komponen bisa fallback ke data default tanpa crash.
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseReady = Boolean(supabase);
