import { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import LiveProjectButton from './LiveProjectButton';
import ProjectModal from './ProjectModal';
import { PROJECTS, PROJECT_GROUPS, type Project } from '../data';
import { useI18n } from '../i18n';

function ProjectCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: (p: Project) => void;
}) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="sticky top-24 h-[88vh] md:top-28">
      <motion.article
        style={{ scale, top: `${index * 22}px` }}
        className="relative overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm">
                {project.category} · {project.year}
              </span>
              <span
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}
              >
                {project.name}
              </span>
              <span className="text-sm font-light text-[#D7E2EA]/60">{project.company}</span>
            </div>
          </div>
          <LiveProjectButton href={project.link} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cover — click to open the detail lightbox */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.name}`}
          className="group mt-5 block w-full overflow-hidden rounded-[28px] sm:rounded-[38px] md:rounded-[46px]"
        >
          <span className="relative block">
            <img
              src={project.cover}
              alt={project.name}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ height: 'clamp(240px, 42vh, 460px)' }}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] bg-[#0C0C0C]/60 px-6 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] backdrop-blur-sm">
                <Maximize2 size={16} /> {t.projects.view}
              </span>
            </span>
          </span>
        </button>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<(typeof PROJECT_GROUPS)[number]>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.group === filter)),
    [filter],
  );

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <h2
        className="hero-heading mb-8 text-center font-black uppercase leading-none tracking-tight sm:mb-10 md:mb-12"
        style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
      >
        {t.projects.title}
      </h2>

      {/* Category filter */}
      <div className="mb-14 flex flex-wrap items-center justify-center gap-2 sm:mb-20 sm:gap-3">
        {PROJECT_GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setFilter(g)}
            aria-pressed={filter === g}
            className={`rounded-full border-2 px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 sm:text-sm ${
              filter === g
                ? 'border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C]'
                : 'border-[#D7E2EA]/30 text-[#D7E2EA]/70 hover:border-[#D7E2EA]/60 hover:text-[#D7E2EA]'
            }`}
          >
            {t.projects.filters[g]}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            total={filtered.length}
            onOpen={setSelected}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
