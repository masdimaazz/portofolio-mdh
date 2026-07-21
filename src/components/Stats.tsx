import { useEffect, useState } from 'react';
import Panel from './Panel';
import Badge from './Badge';
import { useReveal } from '@/hooks/useReveal';
import { useContent } from '@/data/ContentContext';

// Angka menghitung naik dari 0 saat masuk viewport
function Counter({
  value,
  decimals,
  suffix,
  run,
}: {
  value: number;
  decimals: number;
  suffix: string;
  run: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    // Hormati kurangi-gerak: langsung tampilkan nilai akhir
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const dur = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <span>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { stats: STATS } = useContent();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div id="stats" className="py-6 md:py-10">
      <Panel variant="accent">
        <div ref={ref} className="p-6 sm:p-9 md:p-14">
          <Badge label="my experience" />
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="font-head font-black leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                >
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} run={shown} />
                </div>
                <div className="mt-2 text-sm text-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
