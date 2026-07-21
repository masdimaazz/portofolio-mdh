import type { ReactNode } from 'react';

// Pita warna full-bleed (edge-to-edge) dipisah garis rambut — gaya spread majalah.
// `ghost` = teks watermark raksasa di balik pita. Padding isi diberikan oleh anak.
interface PanelProps {
  children: ReactNode;
  variant?: 'cream' | 'accent';
  ghost?: string;
  id?: string;
  className?: string;
}

export default function Panel({
  children,
  variant = 'cream',
  ghost,
  id,
  className = '',
}: PanelProps) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden border-t border-current/20 ${
        variant === 'accent' ? 'panel-accent' : 'panel-cream'
      } ${className}`}
    >
      {ghost && (
        <span className="ghost absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-[14vw]">
          {ghost}
        </span>
      )}
      {/* Isi dibatasi lebar & dipusatkan; padding horizontal datang dari anak */}
      <div className="relative z-10 mx-auto max-w-[84rem]">{children}</div>
    </section>
  );
}
