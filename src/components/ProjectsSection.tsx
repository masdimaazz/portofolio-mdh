import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import { PROJECTS, type Project } from '../data';

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
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
        {/* Top row */}
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
          <LiveProjectButton />
        </div>

        {/* Tags */}
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

        {/* Cover */}
        <div className="mt-5 overflow-hidden rounded-[28px] sm:rounded-[38px] md:rounded-[46px]">
          <img
            src={project.cover}
            alt={project.name}
            loading="lazy"
            className="w-full object-cover"
            style={{ height: 'clamp(240px, 42vh, 460px)' }}
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <h2
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      <div className="mx-auto max-w-5xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}
