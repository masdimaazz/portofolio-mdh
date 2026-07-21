import { useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

export interface Project {
  title: string;
  company?: string;
  category: string;
  year: string;
  cover: string;
  tags: string[];
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
        className="panel-cream relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.5rem] shadow-2xl md:flex-row"
      >
        {/* Gambar */}
        <div className="relative md:w-3/5">
          <img
            src={project.cover}
            alt={project.title}
            decoding="async"
            className="h-56 w-full object-cover sm:h-72 md:h-full"
          />
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Detail */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
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
          {project.company && (
            <p className="mt-2 text-sm font-semibold hl">{project.company}</p>
          )}
          <p className="mt-1 text-sm text-soft">{project.category}</p>
          <p className="mt-1 font-mono text-xs text-soft">{project.year}</p>

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
