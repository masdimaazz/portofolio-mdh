import FadeIn from './FadeIn';
import { useI18n } from '../i18n';
import { useContent } from '../content';

export default function ExperienceSection() {
  const { t } = useI18n();
  const { experience: EXPERIENCE } = useContent();
  return (
    <section
      id="experience"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
    >
      <h2
        className="mb-12 text-center font-black uppercase text-[#0C0C0C] sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.experience.title}
      </h2>

      <div className="mx-auto max-w-5xl">
        {EXPERIENCE.map((exp, i) => (
          <FadeIn
            key={`${exp.org}-${exp.role}`}
            delay={i * 0.08}
            className="grid gap-4 border-t py-8 sm:py-10 md:grid-cols-[1fr_1.4fr] md:gap-10 md:py-12"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
                >
                  {exp.role}
                </span>
                {exp.current && (
                  <span className="rounded-full bg-[#0C0C0C] px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-white">
                    {t.experience.now}
                  </span>
                )}
              </div>
              <div className="text-sm font-medium text-[#0C0C0C]/80 sm:text-base">
                {exp.org}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-[#0C0C0C]/45 sm:text-sm">
                {exp.period}
              </div>
            </div>
            <ul className="flex flex-col gap-2.5">
              {exp.points.map((p) => (
                <li
                  key={p}
                  className="relative pl-5 font-light leading-relaxed text-[#0C0C0C]/70"
                  style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}
                >
                  <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-[#0C0C0C]/40" />
                  {p}
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
