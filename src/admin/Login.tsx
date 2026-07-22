import { useEffect, useRef, useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { client } from './client';
import logoMdh from '@/assets/logo-mdh.png';

// Set true HANYA setelah provider Google diaktifkan di Supabase.
const GOOGLE_ENABLED = false;

// Frasa yang menggambarkan situs (kinetic typography, berganti otomatis).
const PHRASES = ['Branding & identity', 'Social campaigns', 'UI/UX & web design', '3D & motion'];

// Partikel cahaya melayang (posisi deterministik biar stabil antar-render).
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 6.1 + 4) % 96,
  bottom: (i * 13) % 55,
  size: 2 + (i % 3),
  dur: 9 + (i % 5) * 2,
  delay: -((i * 1.7) % 12),
}));

const logoMask = {
  aspectRatio: '600 / 340',
  backgroundColor: '#eef2ff',
  WebkitMaskImage: `url(${logoMdh})`,
  maskImage: `url(${logoMdh})`,
  WebkitMaskRepeat: 'no-repeat' as const,
  maskRepeat: 'no-repeat' as const,
  WebkitMaskPosition: 'left center',
  maskPosition: 'left center',
  WebkitMaskSize: 'contain' as const,
  maskSize: 'contain' as const,
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phrase, setPhrase] = useState(0);

  const cursorRef = useRef<HTMLDivElement>(null);

  // Kinetic typography — ganti frasa tiap 2.2 dtk
  useEffect(() => {
    const t = setInterval(() => setPhrase((v) => (v + 1) % PHRASES.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Cursor kustom + ripple saat klik (motion latar berjalan sendiri via CSS)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    const onClick = (e: MouseEvent) => {
      const r = document.createElement('div');
      r.className = 'login-ripple';
      r.style.left = e.clientX + 'px';
      r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 700);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const c = await client();
      const { error } = await c.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login gagal');
      setBusy(false);
    }
  }

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
    'w-full rounded-[10px] border border-white/12 bg-white/[0.05] px-3.5 py-2.5 text-sm text-[#f4f7ff] placeholder-[#5f6a92] outline-none transition-colors focus:border-[#2563eb] focus:bg-[rgba(37,99,235,0.08)]';

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden md:cursor-none"
      style={{
        background:
          'radial-gradient(120% 90% at 85% 15%, #1c2a63 0%, #0a0e2a 42%, #05061a 78%)',
      }}
    >
      {/* Beam cahaya — menyapu terus-menerus */}
      <div
        className="login-beam pointer-events-none absolute -top-[20%] right-[-6%] h-[160%] w-[34%] blur-[6px]"
        style={{ background: 'linear-gradient(180deg, rgba(96,165,250,0.14), rgba(37,99,235,0.03) 60%, transparent)' }}
      />
      <div
        className="login-beam pointer-events-none absolute -top-[20%] right-[52%] h-[160%] w-[24%] blur-[6px]"
        style={{ background: 'linear-gradient(180deg, rgba(96,165,250,0.14), rgba(37,99,235,0.03) 60%, transparent)', animationDuration: '11s', animationDelay: '-3s' }}
      />
      <div
        className="login-beam pointer-events-none absolute -top-[20%] right-[30%] h-[160%] w-[18%] blur-[6px]"
        style={{ background: 'linear-gradient(180deg, rgba(96,165,250,0.14), rgba(37,99,235,0.03) 60%, transparent)', animationDuration: '13s', animationDelay: '-6s' }}
      />

      {/* Orb cahaya melayang */}
      <div
        className="login-orb pointer-events-none absolute left-[10%] top-[20%] h-80 w-80 rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)' }}
      />
      <div
        className="login-orb-2 pointer-events-none absolute right-[8%] bottom-[8%] h-96 w-96 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)' }}
      />

      {/* Partikel cahaya melayang naik */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="login-particle absolute rounded-full bg-blue-300/50"
            style={{
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: '0 0 6px rgba(147,197,253,0.6)',
            }}
          />
        ))}
      </div>

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Brand kiri-atas */}
      <div className="login-reveal absolute left-8 top-8 z-10 md:left-12 md:top-10">
        <span aria-hidden className="block h-5" style={logoMask} />
        <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-[#7fa8f5]">
          portfolio cms
        </span>
      </div>

      {/* Konten tengah: kinetic headline + panel */}
      <div className="relative z-10 flex w-full flex-col items-center gap-11 px-4">
        <div className="login-reveal text-center" style={{ animationDelay: '0.15s' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            Graphic designer crafting
          </p>
          <div className="mt-3 flex min-h-[1.35em] items-center justify-center">
            <h2
              key={phrase}
              className="role-in font-head font-black uppercase leading-none tracking-tight"
              style={{
                fontSize: 'clamp(1.6rem, 4.2vw, 2.6rem)',
                background: 'linear-gradient(100deg, #93c5fd, #818cf8 45%, #c084fc)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 24px rgba(129,140,248,0.35))',
              }}
            >
              {PHRASES[phrase]}
            </h2>
          </div>
        </div>

        {/* Glass panel */}
        <form
          onSubmit={submit}
          className="login-reveal w-full max-w-[380px] rounded-[18px] border border-white/10 bg-white/[0.045] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          style={{ animationDelay: '0.3s' }}
        >
          <h1
            className="font-head text-xl font-bold text-[#f4f7ff]"
            style={{ textShadow: '0 0 20px rgba(96,165,250,0.3)' }}
          >
            Selamat datang kembali
          </h1>
          <p className="mt-1.5 text-[13.5px] text-[#a8b2d6]">
            Masuk untuk mengelola konten portofolio.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mt-6">
            {GOOGLE_ENABLED && (
              <button
                type="button"
                onClick={google}
                className="mb-4 inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
                </svg>
                Masuk dengan Google
              </button>
            )}

            <label className="mb-4 block">
              <span className="mb-1.5 block text-[12.5px] font-medium text-[#c3cbe8]">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="nama@email.com"
                className={inputCls}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="mb-5 block">
              <span className="mb-1.5 block text-[12.5px] font-medium text-[#c3cbe8]">Kata sandi</span>
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
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-px disabled:opacity-60"
              style={{
                background: 'linear-gradient(180deg, #3b7bf0, #2563eb)',
                boxShadow: '0 6px 20px rgba(37,99,235,0.35)',
              }}
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
          </div>

          <div className="mt-5 text-center text-[12.5px] text-[#7f88ab]">
            <a href="/" className="text-[#7fa8f5] hover:underline">
              ← Kembali ke situs
            </a>
          </div>
        </form>
      </div>

      {/* URL glow bawah (gaya penutup GIF) */}
      <div
        className="login-reveal pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest"
        style={{
          animationDelay: '0.5s',
          background: 'linear-gradient(100deg, #60a5fa, #a78bfa, #f0abfc)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(147,197,253,0.4))',
        }}
      >
        portofolio-mdh.vercel.app
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.6) 100%)' }}
      />

      {/* Cursor kustom (desktop) */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
        style={{ filter: 'drop-shadow(0 0 6px rgba(147,197,253,0.8))' }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26">
          <path
            d="M2 2 L2 20 L7 15 L11 22 L14 20.5 L10 13.5 L17 13 Z"
            fill="#f4f7ff"
            stroke="#2563eb"
            strokeWidth="0.6"
          />
        </svg>
      </div>
    </div>
  );
}
