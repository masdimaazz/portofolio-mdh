import { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { client } from './client';

// Set true HANYA setelah provider Google diaktifkan di Supabase
// (Authentication → Providers → Google) + OAuth credential dari Google Cloud.
const GOOGLE_ENABLED = false;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const c = await client();
      const { error } = await c.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange di AdminApp yang lanjut ke dashboard
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login gagal');
      setBusy(false);
    }
  }

  // Login via Google OAuth → balik ke /admin. Email hasil login harus ada di tabel `admins`.
  async function google() {
    setError(null);
    try {
      const c = await client();
      const { error } = await c.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/admin` },
      });
      if (error) throw error;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login Google gagal');
    }
  }

  const inputCls =
    'w-full rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-white/45';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#dfe3ea] p-4 sm:p-8">
      {/* Latar blueprint tipis + corner registration marks (gaya teknis referensi) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <span aria-hidden className="absolute left-5 top-5 h-4 w-4 border-l border-t border-black/25" />
      <span aria-hidden className="absolute right-5 top-5 h-4 w-4 border-r border-t border-black/25" />
      <span aria-hidden className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-black/25" />
      <span aria-hidden className="absolute bottom-5 right-5 h-4 w-4 border-b border-r border-black/25" />
      <span aria-hidden className="absolute left-10 top-6 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 sm:block">
        Portfolio · CMS
      </span>
      <span aria-hidden className="absolute bottom-6 right-10 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 sm:block">
        © {new Date().getFullYear()} MDH
      </span>

      {/* "App" dark mengambang */}
      <div className="relative z-10 flex w-full max-w-4xl overflow-hidden rounded-[1.5rem] bg-[#0a1024] shadow-2xl shadow-black/30 ring-1 ring-black/5 md:min-h-[540px]">
        {/* Kolom kiri: brand/visual */}
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-10 md:flex">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)' }}
          />

          <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> [ Portfolio CMS ]
          </div>

          <div className="relative">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">// secure area</p>
            <h1
              className="font-head font-black uppercase leading-[0.9] text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              Admin
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Access
              </span>
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Kelola seluruh konten portofolio — proyek, sertifikat, pesan — dari satu tempat.
            </p>
          </div>

          <div className="relative flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-lg font-black text-[#0a1024]">
              M
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">v1.0 — 2026</span>
          </div>
        </div>

        {/* Kolom kanan: form */}
        <div className="flex w-full flex-col justify-center bg-[#0e1526] p-8 sm:p-10 md:w-1/2">
          {/* Header ringkas untuk mobile */}
          <div className="mb-6 flex items-center gap-2.5 md:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-base font-black text-[#0a1024]">
              M
            </span>
            <div>
              <p className="font-head text-sm font-bold uppercase text-white">Admin Portofolio</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Portfolio CMS</p>
            </div>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">[ 01 · sign in ]</p>
          <h2 className="mt-2 font-head text-2xl font-bold text-white">Welcome back</h2>

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-6">
            {GOOGLE_ENABLED && (
              <>
                <button
                  type="button"
                  onClick={google}
                  className="mb-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
                  </svg>
                  Masuk dengan Google
                </button>
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  <span className="h-px flex-1 bg-white/15" /> atau <span className="h-px flex-1 bg-white/15" />
                </div>
              </>
            )}

            <label className="mb-3 block">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                className={inputCls}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="mb-5 block">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className={inputCls}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              disabled={busy}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Masuk
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <a
            href="/"
            className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white/80"
          >
            ← kembali ke situs
          </a>
        </div>
      </div>
    </div>
  );
}
