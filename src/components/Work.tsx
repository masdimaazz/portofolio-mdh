import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import Panel from './Panel';
import Starburst from './Starburst';
import ProjectModal from './ProjectModal';
import delsRamadhan from '@/assets/work/dels-ramadhan.jpg';
import delsStand from '@/assets/work/dels-stand.png';
import delsIdulAdha from '@/assets/work/dels-iduladha.jpg';
import delsTentCard from '@/assets/work/dels-tentcard.jpg';
import firstpage from '@/assets/work/firstpage.jpg';
import kemensos from '@/assets/work/kemensos.jpg';

// Diurutkan mengelompok per perusahaan (Delisari → Firstpage → Kemensos)
const PROJECTS = [
  {
    title: "Del's Ramadhan Campaign",
    company: 'Delisari Nusantara',
    category: 'Social Media Key Visual',
    year: '2025',
    img: delsRamadhan,
    tags: ['Key Visual', 'Packaging', 'Campaign'],
    featured: true,
  },
  {
    title: "Del's Nocciola Display Stand",
    company: 'Delisari Nusantara',
    category: '3D POSM Design',
    year: '2025',
    img: delsStand,
    tags: ['3D', 'Blender', 'Retail POSM'],
  },
  {
    title: "Del's Recipe Tent Card",
    company: 'Delisari Nusantara',
    category: 'Print Collateral',
    year: '2025',
    img: delsTentCard,
    tags: ['Print', 'Layout', 'F&B'],
  },
  {
    title: "Del's Idul Adha Greeting",
    company: 'Delisari Nusantara',
    category: 'Social Media Greeting',
    year: '2025',
    img: delsIdulAdha,
    tags: ['Greeting', 'Brand', 'Social'],
  },
  {
    title: 'Firstpage.id Content Series',
    company: 'Firstpage.id',
    category: 'LinkedIn & Instagram Feeds',
    year: '2025',
    img: firstpage,
    tags: ['Editorial', 'Social Feeds', 'Branding'],
  },
  {
    title: 'Hari Anak Nasional 2023',
    company: 'Kementerian Sosial RI',
    category: 'Government Campaign',
    year: '2023',
    img: kemensos,
    tags: ['Government', 'Feed Design', 'Layout'],
  },
];

// Metadata tiap perusahaan (urutan = urutan tampil)
const COMPANIES = [
  { name: 'Delisari Nusantara', role: 'Creative Marketing · F&B Brand', period: '2025' },
  { name: 'Firstpage.id', role: 'Graphic Design · Content Series', period: '2025' },
  { name: 'Kementerian Sosial RI', role: 'Graphic Design · Government', period: '2023' },
];

export default function Work() {
  // Indeks proyek (global) yang dibuka di modal
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const move = (dir: number) =>
    setOpenIndex((i) => (i === null ? i : (i + dir + PROJECTS.length) % PROJECTS.length));

  return (
    <div id="work" className="py-6 md:py-10">
      <Panel variant="cream" ghost="Selected">
        <div className="p-6 sm:p-9 md:p-14">
          <Reveal className="mb-12">
            <div className="flex items-center justify-between">
              <Badge num="01" label="selected work" />
              <Starburst size={26} />
            </div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
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
          </Reveal>

          {/* Satu blok per perusahaan */}
          <div className="space-y-16">
            {COMPANIES.map((co, ci) => {
              // Ambil proyek perusahaan ini beserta indeks globalnya (untuk modal)
              const items = PROJECTS.map((p, gi) => ({ p, gi })).filter(
                (x) => x.p.company === co.name
              );
              return (
                <Reveal key={co.name}>
                  <div>
                    {/* Header perusahaan */}
                    <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/15 pb-4">
                      <div className="flex items-baseline gap-4">
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
                            className={`relative overflow-hidden rounded-[1.5rem] ${
                              p.featured ? 'aspect-[16/9]' : 'aspect-square'
                            }`}
                          >
                            <img
                              src={p.img}
                              alt={p.title}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                              <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <span className="absolute left-4 top-4 font-mono text-xs text-white/90">
                              ({String(gi + 1).padStart(2, '0')})
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
