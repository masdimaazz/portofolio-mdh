import { useContent } from '@/data/ContentContext';
import RotatingRole from './RotatingRole';

export default function Hero() {
  const { profile } = useContent();
  const words = profile.name.split(' ');
  const mid = Math.floor(words.length / 2); // kata tengah di-highlight

  return (
    <section id="top">
      <div className="relative flex min-h-[80vh] flex-col overflow-hidden bg-[#0a1024]">
        {/* Foto subjek + duotone biru */}
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          width={1080}
          height={1350}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
        {/* Overlay navy — vignette halus, tanpa glow-blob */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,16,36,0.72) 0%, rgba(10,16,36,0.88) 100%)',
          }}
        />
        {/* Garis grid tipis untuk tekstur editorial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Watermark raksasa */}
        <span
          className="ghost pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/[0.04]"
          style={{ fontSize: '22vw' }}
        >
          Portfolio
        </span>

        {/* Konten tengah */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]" />
            Available for work
          </span>
          <p className="type-eyebrow text-white/70">
            <span className="hl">•</span> Hi, I'm
          </p>
          <h1
            className="mt-4 font-head font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 8rem)' }}
          >
            {words.map((w, i) => (
              <span key={i} className={i === mid ? 'hl' : undefined}>
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className="mt-6 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest text-white/70 sm:text-base">
            <span className="text-white/45">I'm a</span>
            <RotatingRole roles={profile.roles} />
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              My Project
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              About me
            </a>
          </div>
        </div>

        {/* Footer strip hero */}
        <div className="relative z-10 flex items-center justify-between px-6 pb-6 text-white/50 sm:px-9 md:px-12">
          <span className="font-mono text-xs uppercase tracking-widest">
            Based in {profile.location}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
