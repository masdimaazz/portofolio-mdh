import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import Panel from './Panel';import ProjectModal from './ProjectModal';
import { useContent } from '@/data/ContentContext';
import { companyLogo } from '@/lib/companyLogos';

export default function Work() {
  // Proyek & perusahaan dari Supabase (fallback ke default)
  const { projects: PROJECTS, companies: COMPANIES } = useContent();
  // Indeks proyek (global) yang dibuka di modal
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const move = (dir: number) =>
    setOpenIndex((i) => (i === null ? i : (i + dir + PROJECTS.length) % PROJECTS.length));

  // Filter berdasar tipe (kind); tab hanya muncul bila ada data kind
  const [filter, setFilter] = useState<string>('All');
  const kinds = [
    'All',
    ...Array.from(new Set(PROJECTS.map((p) => p.kind).filter((k): k is string => Boolean(k)))),
  ];

  return (
    <div id="work">
      <Panel variant="cream" ghost="Selected">
        <div className="px-6 py-16 sm:px-9 sm:py-20 md:px-14 md:py-24">
          <Reveal className="mb-12">
            <SectionHead num="01" label="selected work">
              <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="type-h1">
                Work, grouped
                <br />
                by <span className="hl">company</span>
              </h2>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-soft transition-opacity hover:opacity-70"
              >
                Work with me <ArrowUpRight className="h-4 w-4" />
              </a>
              </div>
            </SectionHead>
          </Reveal>

          {/* Tab filter tipe */}
          {kinds.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setFilter(k)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    filter === k
                      ? 'border-transparent bg-ink text-ink-fg'
                      : 'border-current/25 text-soft hover:border-current/50'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          )}

          {/* Satu blok per perusahaan — hanya yang punya proyek sesuai filter, dinomori ulang berurutan */}
          <div className="space-y-16">
            {COMPANIES.map((co) => ({
              co,
              // proyek perusahaan ini beserta indeks globalnya (untuk modal)
              items: PROJECTS.map((p, gi) => ({ p, gi })).filter(
                (x) => x.p.company === co.name && (filter === 'All' || x.p.kind === filter)
              ),
            }))
              .filter((g) => g.items.length > 0)
              .map(({ co, items }, ci) => {
                return (
                <Reveal key={co.name}>
                  <div>
                    {/* Header perusahaan */}
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-current/15 pb-4">
                      <div className="flex items-center gap-4">
                        {companyLogo(co.name) && (
                          <span className="grid h-12 w-20 shrink-0 place-items-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
                            <img
                              src={companyLogo(co.name)}
                              alt={co.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain"
                            />
                          </span>
                        )}
                        <span className="type-list text-2xl hl md:text-3xl">
                          {String(ci + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="type-h3 text-xl md:text-2xl">{co.name}</h3>
                          <p className="mt-1 text-sm text-soft">{co.role}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-soft">
                        {co.period} · {items.length} project{items.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Grid proyek perusahaan */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
                      {items.map(({ p, gi }) => (
                        <button
                          key={p.title}
                          type="button"
                          onClick={() => setOpenIndex(gi)}
                          aria-label={`View project: ${p.title}`}
                          className={`group block h-full w-full text-left ${
                            p.featured ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <div
                            className={`relative overflow-hidden rounded-lg ${
                              p.featured ? 'aspect-[16/9]' : 'aspect-square'
                            }`}
                          >
                            <img
                              src={p.cover}
                              alt={p.title}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <span className="absolute left-4 top-4 font-mono text-xs text-white/90">
                              ({String(gi + 1).padStart(2, '0')})
                            </span>
                            {/* CTA muncul saat hover (gaya ekizr) */}
                            <span className="absolute bottom-4 left-4 inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                              View Project <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                          <div className="flex items-start justify-between gap-4 px-1 pt-4">
                            <div>
                              <h4 className="type-h3">{p.title}</h4>
                              <p className="mt-1 text-sm text-soft">{p.category}</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {p.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-full border border-current/20 px-3 py-1 text-xs font-medium text-soft"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="shrink-0 font-mono text-xs text-soft">{p.year}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Panel>

      {openIndex !== null && (
        <ProjectModal
          project={PROJECTS[openIndex]}
          index={openIndex}
          total={PROJECTS.length}
          onClose={() => setOpenIndex(null)}
          onPrev={() => move(-1)}
          onNext={() => move(1)}
        />
      )}
    </div>
  );
}
