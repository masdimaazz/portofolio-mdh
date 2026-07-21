import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { client } from './client';

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
    'w-full rounded-lg border border-base bg-[hsl(var(--page))] px-3 py-2.5 text-sm outline-none focus:border-[hsl(var(--accent))]';

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-base bg-card p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--accent))] text-white">
            <Lock className="h-4 w-4" />
          </span>
          <div>
            <h1 className="font-bold leading-tight">Admin Portofolio</h1>
            <p className="text-xs text-muted">Masuk untuk mengelola konten</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={google}
          className="mb-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-base bg-card px-4 py-2.5 text-sm font-semibold hover:border-[hsl(var(--accent))]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
            />
          </svg>
          Masuk dengan Google
        </button>

        <div className="mb-4 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-[hsl(var(--border))]" />
          atau email
          <span className="h-px flex-1 bg-[hsl(var(--border))]" />
        </div>

        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="mb-5 block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Masuk
        </button>

        <a href="/" className="mt-4 block text-center text-xs text-muted hover:text-[hsl(var(--fg))]">
          ← Kembali ke situs
        </a>
      </form>
    </div>
  );
}
