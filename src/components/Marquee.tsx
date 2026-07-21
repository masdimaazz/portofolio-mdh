const ITEMS = [
  'Branding',
  'Social Campaigns',
  'UI / UX Design',
  '3D & Motion',
  'Packaging',
  'Editorial Layout',
];

// Pita merah berjalan dengan pemisah bintang — transisi antar section
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="mx-2 mt-3 overflow-hidden rounded-full py-3.5 select-none sm:mx-4" style={{ background: 'var(--red-500)' }} aria-hidden="true">
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
