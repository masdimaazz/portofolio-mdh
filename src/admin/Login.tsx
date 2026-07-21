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
