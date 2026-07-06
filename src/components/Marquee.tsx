const ITEMS = [
  'UI / UX Design',
  'Branding',
  'Web Development',
  '3D & Motion',
  'Design Systems',
  'Prototyping',
];

// Pita berjalan sebagai transisi antar section
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="py-8 border-y border-base overflow-hidden select-none">
      <div className="flex w-max marquee-track">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-display font-bold text-2xl md:text-4xl text-muted">
              {item}
            </span>
            <span className="accent text-2xl md:text-4xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
