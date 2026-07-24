import { useEffect, useRef } from 'react';

// Floating 3D render objects that drift on their own and parallax toward the
// pointer at different depths — a lightweight interactive 3D layer behind the
// hero portrait. No WebGL, so it stays fast on every device.
// Positioned along the clear vertical edges (between the heading and the
// bottom bar), away from the nav, tagline and CTA button.
const OBJECTS = [
  { src: '/decor/moon.png', pos: 'top-[34%] left-[3%] sm:left-[5%]', size: 'w-12 sm:w-16 md:w-24', depth: 26, delay: '0s' },
  { src: '/decor/lego.png', pos: 'top-[32%] right-[3%] sm:right-[5%]', size: 'w-14 sm:w-20 md:w-28', depth: 44, delay: '1.2s' },
  { src: '/decor/smiley.png', pos: 'top-[62%] left-[3%] sm:left-[6%]', size: 'w-12 sm:w-16 md:w-20', depth: 20, delay: '2.1s' },
  { src: '/decor/cursor.png', pos: 'top-[58%] right-[4%] sm:right-[6%]', size: 'w-12 sm:w-16 md:w-20', depth: 36, delay: '0.6s' },
];

export default function Hero3D() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const el = layerRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]'));
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      items.forEach((it) => {
        const d = Number(it.dataset.depth);
        it.style.transform = `translate3d(${-cx * d}px, ${-cy * d}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {OBJECTS.map((o) => (
        <div
          key={o.src}
          data-depth={o.depth}
          className={`absolute ${o.pos}`}
          style={{ willChange: 'transform' }}
        >
          <img
            src={o.src}
            alt=""
            className={`float-obj h-auto ${o.size} opacity-90 drop-shadow-[0_10px_30px_rgba(118,33,176,0.25)]`}
            style={{ animationDelay: o.delay }}
          />
        </div>
      ))}
    </div>
  );
}
