import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import SectionHead from './SectionHead';
import Panel from './Panel';
import Reveal from './Reveal';
import { useContent } from '@/data/ContentContext';

export default function Certificates() {
  const { certificates } = useContent();
  const [open, setOpen] = useState<number | null>(null);

  // Esc menutup lightbox + kunci scroll saat terbuka
  useEffect(() => {
    if (open === null) return;
    document.body.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Sembunyikan seluruh section bila belum ada data
  if (!certificates.length) return null;
  const active = open !== null ? certificates[open] : null;

  return (
    <div id="certificates">
      <Panel variant="cream" ghost="Certified">
        <div className="px-6 py-16 sm:px-9 sm:py-20 md:px-14 md:py-24">
          <SectionHead label="certificates">
            <h2 className="type-h1">
              Proof of <span className="hl">craft</span>
            </h2>
          </SectionHead>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c, i) => (
              <Reveal key={c.title + i} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => c.image && setOpen(i)}
                  aria-label={`Lihat sertifikat: ${c.title}`}
                  className="hover-lift block h-full w-full overflow-hidden rounded-lg border border-current/15 text-left hover:border-current/35"
                >
                  {c.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-current/[0.03]">
                      <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="type-h3 text-base">{c.title}</h3>
                    <p className="mt-1 text-sm text-soft">
                      {c.issuer}
                      {c.issuer && c.year ? ' · ' : ''}
                      {c.year}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-sm"
            aria-label="Tutup"
            onClick={() => setOpen(null)}
          />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col">
            <button
              onClick={() => setOpen(null)}
              aria-label="Tutup"
              className="absolute -top-11 right-0 grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/80">
              {active.title}
              {active.issuer ? ` — ${active.issuer}` : ''}
              {active.year ? ` (${active.year})` : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
