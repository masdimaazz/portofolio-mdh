// Bintang letup (8-titik tajam) — aksen khas Silva
interface StarburstProps {
  color?: string;
  size?: number;
  className?: string;
  spin?: boolean;
}

export default function Starburst({
  color = 'var(--brand-500)',
  size = 28,
  className = '',
  spin = false,
}: StarburstProps) {
  // 16 titik bergantian panjang-pendek membentuk kilau tajam
  const points = Array.from({ length: 16 }, (_, i) => {
    const angle = (Math.PI / 8) * i;
    const r = i % 2 === 0 ? 50 : 19;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${spin ? 'spin-slow' : ''} ${className}`}
      aria-hidden="true"
    >
      <polygon points={points} fill={color} />
    </svg>
  );
}
