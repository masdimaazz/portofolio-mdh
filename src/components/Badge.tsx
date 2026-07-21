// Label bracket gaya Silva: [ about · silva ]
interface BadgeProps {
  num?: string;
  label: string;
  className?: string;
}

export default function Badge({ num, label, className = '' }: BadgeProps) {
  return (
    <span className={`type-eyebrow inline-flex items-center gap-2 ${className}`}>
      <span className="opacity-50">[</span>
      {num && <span className="hl font-bold">{num}</span>}
      <span>{label}</span>
      <span className="opacity-50">]</span>
    </span>
  );
}
