import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import delsRamadhan from '@/assets/work/dels-ramadhan.jpg';
import delsStand from '@/assets/work/dels-stand.png';
import delsIdulAdha from '@/assets/work/dels-iduladha.jpg';
import delsTentCard from '@/assets/work/dels-tentcard.jpg';
import firstpage from '@/assets/work/firstpage.jpg';
import kemensos from '@/assets/work/kemensos.jpg';

const PROJECTS = [
  {
    title: "Del's Ramadhan Campaign",
    category: 'Delisari Nusantara · Social Media Key Visual',
    year: '2025',
    img: delsRamadhan,
    tags: ['Key Visual', 'Packaging', 'Campaign'],
    featured: true,
  },
  {
    title: "Del's Nocciola Display Stand",
    category: 'Delisari Nusantara · 3D POSM Design',
    year: '2025',
    img: delsStand,
    tags: ['3D', 'Blender', 'Retail POSM'],
  },
  {
    title: 'Firstpage.id Content Series',
    category: 'Firstpage.id · LinkedIn & Instagram',
    year: '2025',
    img: firstpage,
    tags: ['Editorial', 'Social Feeds', 'Branding'],
  },
  {
    title: 'Hari Anak Nasional 2023',
    category: 'Kementerian Sosial RI · Campaign',
    year: '2023',
    img: kemensos,
    tags: ['Government', 'Feed Design', 'Layout'],
  },
  {
    title: "Del's Recipe Tent Card",
    category: 'Delisari Nusantara · Print Collateral',
    year: '2025',
    img: delsTentCard,
    tags: ['Print', 'Layout', 'F&B'],
  },
  {
    title: "Del's Idul Adha Greeting",
    category: 'Delisari Nusantara · Social Media',
    year: '2025',
    img: delsIdulAdha,
    tags: ['Greeting', 'Brand', 'Social'],
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32 mx-auto max-w-6xl px-5 md:px-6">
      <Reveal className="flex items-end justify-between gap-6 mb-14">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest accent mb-3">Selected work</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
            Featured projects
          </h2>
        </div>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-[hsl(var(--fg))] transition-colors whitespace-nowrap"
        >
          Work with me <ArrowUpRight className="w-4 h-4" />
        </a>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 3) * 100}
            className={p.featured ? 'sm:col-span-2' : ''}
          >
            <a
              href="#"
              className="group block rounded-3xl overflow-hidden border border-base bg-card hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 h-full"
            >
              <div
                className={`relative overflow-hidden ${
                  p.featured ? 'aspect-[16/9]' : 'aspect-square'
                }`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display font-bold text-lg md:text-xl">{p.title}</h3>
                  <span className="text-xs font-mono text-muted shrink-0">{p.year}</span>
                </div>
                <p className="text-sm text-muted mt-1">{p.category}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-3 py-1 rounded-full border border-base text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
