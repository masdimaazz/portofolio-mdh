import type { ReactNode } from 'react';

// Panel mengambang bersudut membulat di atas halaman (gaya Silva).
// `ghost` = teks watermark raksasa yang tampak di balik panel.
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
    <section id={id} className="relative mx-auto max-w-[120rem] px-3 sm:px-6">
      {ghost && (
        <span className="ghost absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-[26vw]">
          {ghost}
        </span>
      )}
      <div
        className={`relative z-10 mx-auto max-w-[92rem] overflow-hidden rounded-lg border border-current/10 ${
          variant === 'accent' ? 'panel-accent' : 'panel-cream'
        } ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
