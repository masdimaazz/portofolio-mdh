import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { REALIZING, CONTACT } from '../data';
import { useI18n } from '../i18n';

export default function RealizingSection() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % REALIZING.length));
      if (e.key === 'ArrowLeft')
        setOpen((i) => (i === null ? i : (i - 1 + REALIZING.length) % REALIZING.length));
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const step = (d: number) =>
    setOpen((i) => (i === null ? i : (i + d + REALIZING.length) % REALIZING.length));

  return (
    <section className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 md:flex-row md:items-end">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            {t.realizing.title}
          </h2>
          <p className="max-w-sm font-light uppercase tracking-wide text-[#D7E2EA]/50">
            {t.realizing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {REALIZING.map((src, i) => (
            <FadeIn
              key={src}
              delay={(i % 4) * 0.08}
              className={`overflow-hidden rounded-2xl sm:rounded-3xl ${
                i % 5 === 0 ? 'row-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open image ${i + 1}`}
                className="group block h-full w-full"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: i % 5 === 0 ? '100%' : '180px' }}
                />
              </button>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12 flex justify-center">
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-[#D7E2EA]/40 px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
          >
            {t.realizing.seeMore}
          </a>
        </FadeIn>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setOpen(null)} aria-hidden />
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/15"
            >
              <X size={22} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/15 sm:left-6"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/15 sm:right-6"
            >
              <ChevronRight size={24} />
            </button>
            <motion.img
              key={open}
              src={REALIZING[open]}
              alt={`Work ${open + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative z-[1] max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
