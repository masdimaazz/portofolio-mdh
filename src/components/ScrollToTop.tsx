import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Tombol kembali ke atas — muncul setelah scroll cukup jauh (gaya ekizr).
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
      className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink text-ink-fg shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
