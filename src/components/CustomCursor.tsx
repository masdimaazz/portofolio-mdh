import { useEffect, useRef, useState } from 'react';

// Desktop-only decorative ring that trails the pointer and grows over
// interactive elements. Skipped on touch devices and when reduced motion is on.
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest('a, button, input, textarea, [role="button"]');
      if (ringRef.current)
        ringRef.current.style.setProperty('--s', interactive ? '2.1' : '1');
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(var(--s, 1))`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300] h-8 w-8 rounded-full border border-[#D7E2EA]/60 mix-blend-difference"
      style={{ transition: 'transform 0.05s linear', willChange: 'transform' }}
    />
  );
}
