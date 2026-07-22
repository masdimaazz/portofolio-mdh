import { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export interface Project {
  title: string;
  company?: string;
  category: string;
  year: string;
  cover: string;
  tags: string[];
  description?: string;
  link?: string;
  images?: string[];
}

interface ProjectModalProps {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectModal({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Galeri = cover + gambar tambahan (buang yang kosong/duplikat)
  const gallery = [project.cover, ...(project.images || [])].filter(
    (v, i, a) => v && a.indexOf(v) === i
  );
  const [activeImg, setActiveImg] = useState(0);
  // Reset ke gambar pertama tiap ganti proyek
  useEffect(() => {
    setActiveImg(0);
  }, [index]);

  // Sekali saat mount: kunci scroll, fokus ke tombol tutup, kembalikan fokus saat unmount
  useEffect(() => {
    const prevFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove('no-scroll');
      prevFocused?.focus?.();
    };
  }, []);

  // Keyboard: Esc menutup, panah pindah proyek, Tab dikurung di dalam modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
        aria-label="Close project"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="panel-cream relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg shadow-2xl md:flex-row"
      >
        {/* Gambar + galeri */}
        <div className="flex flex-col md:w-3/5">
          <div className="relative flex-1">
            <img
              src={gallery[activeImg] || project.cover}
              alt={project.title}
              decoding="async"
              className="h-56 w-full object-cover sm:h-72 md:h-full"
            />
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto bg-black/5 p-2">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`Gambar ${i + 1}`}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded transition-opacity ${
                    i === activeImg ? 'ring-2 ring-[hsl(var(--accent))]' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="type-eyebrow hl">[ project ]</span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project"
              className="grid h-10 w-10 place-items-center rounded-full border border-current/25 transition-colors hover:bg-current/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 id="project-modal-title" className="type-h3 mt-5 text-2xl md:text-3xl">
            {project.title}
          </h2>
          {project.company && <p className="mt-2 text-sm font-semibold hl">{project.company}</p>}
          <p className="mt-1 text-sm text-soft">{project.category}</p>
          <p className="mt-1 font-mono text-xs text-soft">{project.year}</p>

          {project.description && (
            <p className="mt-4 text-sm leading-relaxed text-soft">{project.description}</p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-current/25 px-3 py-1 text-xs font-medium text-soft"
              >
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-fg transition-opacity hover:opacity-90"
            >
              View project <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {/* Navigasi prev/next */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-8">
            <button
              onClick={onPrev}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="h-4 w-4" /> Prev
            </button>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
