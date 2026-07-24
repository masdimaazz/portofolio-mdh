import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '../data';
import { useI18n } from '../i18n';

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  // Reset to the first image whenever a new project opens.
  useEffect(() => {
    setActive(0);
  }, [project]);

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#0C0C0C] sm:rounded-[40px]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2EA]/30 bg-[#0C0C0C]/70 text-[#D7E2EA] backdrop-blur-md transition-colors hover:bg-[#D7E2EA]/15"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto">
              {/* Main image */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#141414]">
                <img
                  src={project.images[active]}
                  alt={`${project.name} — image ${active + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-5 pt-4 sm:px-8">
                  {project.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                        i === active ? 'border-[#D7E2EA]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Details */}
              <div className="flex flex-col gap-4 p-5 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/50">
                      {project.category} · {project.year}
                    </p>
                    <h3
                      className="mt-1 font-medium uppercase text-[#D7E2EA]"
                      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-sm text-[#D7E2EA]/60">{project.company}</p>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
                  >
                    {t.projects.live} <ExternalLink size={16} />
                  </a>
                </div>

                {project.description && (
                  <p className="max-w-2xl font-light leading-relaxed text-[#D7E2EA]/75">
                    {project.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
