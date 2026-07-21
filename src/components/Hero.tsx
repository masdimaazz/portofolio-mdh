import profile from '@/assets/work/profile.jpg';

export default function Hero() {
  return (
    <section id="top" className="px-2 pt-20 sm:px-4 md:pt-24">
      <div className="relative mx-auto flex min-h-[88vh] max-w-[100rem] flex-col overflow-hidden rounded-[1.5rem] bg-[#0a1024] md:rounded-[2.5rem]">
        {/* Foto subjek + duotone biru */}
        <img
          src={profile}
          alt="Muhammad Dimas Hadiyanto"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
        {/* Overlay navy + glow biru */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(59,130,246,0.45), rgba(10,16,36,0.92) 60%)',
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#3b82f6]/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#2563eb]/25 blur-[120px]" />

        {/* Watermark raksasa */}
        <span
          className="ghost pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/[0.04]"
          style={{ fontSize: '22vw' }}
        >
          Portfolio
        </span>

        {/* Konten tengah */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center text-white">
          <p className="type-eyebrow text-white/70">
            <span className="hl">•</span> Hi, I'm
          </p>
          <h1
            className="mt-4 font-head font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 8rem)' }}
          >
            Muhammad <span className="hl">Dimas</span>
            <br />
            Hadiyanto
          </h1>
          <p className="mt-6 font-mono text-sm uppercase tracking-widest text-white/70 sm:text-base">
            Graphic Designer &nbsp;|&nbsp; Motion Graphic &nbsp;|&nbsp; UI/UX &amp; Editor
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
          <span className="font-mono text-xs uppercase tracking-widest">Based in Jakarta, ID</span>
          <span className="font-mono text-xs uppercase tracking-widest">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
