// Label section gaya editorial: garis pendek · nomor · label (tanpa bracket/pill).
interface BadgeProps {
  num?: string;
  label: string;
  className?: string;
}

export default function Badge({ num, label, className = '' }: BadgeProps) {
  return (
    <span className={`type-eyebrow inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="h-px w-7 bg-current/40" />
      {num && <span className="hl font-bold">{num}</span>}
      <span className="text-soft">{label}</span>
    </span>
  );
}
