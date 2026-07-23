import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import FadeIn from './FadeIn';
import { STATS } from '../data';
import { useI18n } from '../i18n';

function CountUp({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useI18n();
  return (
    <section className="bg-[#0C0C0C] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1} className="text-center">
            <div
              className="hero-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </div>
            <div className="mt-3 text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
              {t.stats[i]}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
