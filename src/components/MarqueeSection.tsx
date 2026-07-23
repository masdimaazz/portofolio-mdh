import { useEffect, useRef } from 'react';
import { MARQUEE } from '../data';

const ROW1 = MARQUEE.slice(0, 8);
const ROW2 = MARQUEE.slice(8);

const tripled = <T,>(arr: T[]) => [...arr, ...arr, ...arr];

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="rounded-2xl object-cover"
      style={{ width: 420, height: 270, flex: '0 0 auto' }}
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Drive the marquee straight from scroll into the DOM via rAF — no React
  // re-render per frame, and at most one layout write per animation frame.
  useEffect(() => {
    let raf = 0;
    let queued = false;
    const apply = () => {
      queued = false;
      const el = sectionRef.current;
      if (!el) return;
      const shift = (window.scrollY - el.offsetTop + window.innerHeight) * 0.3 - 200;
      if (row1Ref.current) row1Ref.current.style.transform = `translate3d(${shift}px,0,0)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translate3d(${-shift}px,0,0)`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
        {tripled(ROW1).map((src, i) => (
          <Tile key={`r1-${i}`} src={src} />
        ))}
      </div>
      <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
        {tripled(ROW2).map((src, i) => (
          <Tile key={`r2-${i}`} src={src} />
        ))}
      </div>
    </section>
  );
}
