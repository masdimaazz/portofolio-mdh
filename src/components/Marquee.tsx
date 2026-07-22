import { useContent } from '@/data/ContentContext';

// Pita berjalan dengan pemisah bintang — transisi antar section
export default function Marquee() {
  const { marquee } = useContent();
  const row = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden py-3.5 select-none border-y border-black/10" style={{ background: 'var(--brand-700)' }} aria-hidden="true">
      <div className="flex w-max marquee-track">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-head text-lg font-bold uppercase tracking-wide text-white md:text-2xl">
              {item}
            </span>
            <span className="text-lg text-white md:text-2xl">✳</span>
          </div>
        ))}
      </div>
    </div>
  );
}
