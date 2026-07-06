import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import profile from '@/assets/work/profile.jpg';

export default function Hero() {
  // Parallax halus dari posisi kursor buat kesan dinamis
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Blob gradient background dinamis */}
      <div
        className="pointer-events-none absolute -top-40 -left-32 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-40 float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)), transparent 65%)',
          transform: `translate(${pos.x * 20}px, ${pos.y * 20}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, #ff7eb3, transparent 65%)',
          transform: `translate(${pos.x * -24}px, ${pos.y * -24}px)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full px-5 md:px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open for design opportunities
          </div>
          <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl">
            Graphic
            <br />
            <span className="gradient-text">designer</span> &amp;
            <br />
            visual storyteller
          </h1>
          <p className="mt-7 text-base md:text-lg text-muted max-w-md leading-relaxed">
            I'm Muhammad Dimas Hadiyanto — a Multimedia Engineering graduate
            crafting brand visuals, social campaigns, and UI/UX for brands and
            institutions across Jakarta.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              View my work
              <ArrowUpRight className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full border border-base hover:bg-[hsl(var(--card))] transition-colors"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8">
            {[
              ['5+', 'Years in design'],
              ['4', 'Brands & institutions'],
              ['3.52', 'GPA / 4.0'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display font-extrabold text-2xl md:text-3xl">{n}</div>
                <div className="text-xs text-muted mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait card */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div
            className="relative"
            style={{ transform: `translate(${pos.x * -12}px, ${pos.y * -12}px)` }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/20 blur-2xl" />
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-[2rem] overflow-hidden border border-base shadow-2xl">
              <img src={profile} alt="Muhammad Dimas Hadiyanto" className="w-full h-full object-cover" />
            </div>
            {/* Badge muter */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-card border border-base shadow-xl flex items-center justify-center spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                <defs>
                  <path id="circlePath" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
                </defs>
                <text className="text-[8px] uppercase tracking-[0.22em] fill-[hsl(var(--muted))] font-mono">
                  <textPath href="#circlePath">
                    · graphic design · branding · ui/ux ·
                  </textPath>
                </text>
              </svg>
              <ArrowDown className="w-5 h-5 accent" />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hidden md:flex flex-col items-center gap-1 text-xs"
      >
        <span className="font-mono tracking-widest">SCROLL</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
