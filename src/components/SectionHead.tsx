import type { ReactNode } from 'react';
import Badge from './Badge';

// Header section gaya editorial/majalah: garis rule penuh di atas, label di kolom
// kiri sempit, judul di kolom utama (asimetris). Tanpa children → hanya label.
interface SectionHeadProps {
  num?: string;
  label: string;
  children?: ReactNode;
  className?: string;
}

export default function SectionHead({ num, label, children, className = '' }: SectionHeadProps) {
  return (
    <div
      className={`grid gap-x-10 gap-y-5 border-t border-current/15 pt-6 md:grid-cols-[13rem_1fr] ${className}`}
    >
      <div className="md:pt-1.5">
        <Badge num={num} label={label} />
      </div>
      {children ? <div className="min-w-0">{children}</div> : <div className="hidden md:block" />}
    </div>
  );
}
