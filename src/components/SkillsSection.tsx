import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { SOFTWARE } from '../data';
import { useI18n } from '../i18n';
import { useContent } from '../content';

export default function SkillsSection() {
  const { t } = useI18n();
  const { skills: SKILLS } = useContent();
  return (
    <section
      id="skills"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
    >
      <h2
        className="mb-12 text-center font-black uppercase text-[#0C0C0C] sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.skills.title}
      </h2>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Proficiency bars */}
        <div className="flex flex-col gap-6">
          {SKILLS.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.06}>
              <div className="mb-2 flex items-baseline justify-between">
                <span
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)' }}
                >
                  {skill.name}
                </span>
                <span className="text-sm font-light text-[#0C0C0C]/50">{skill.pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#0C0C0C]/10">
                <motion.div
                  className="h-full rounded-full bg-[#0C0C0C]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.pct}%` }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Software toolkit */}
        <div>
          <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-[#0C0C0C]/50">
            {t.skills.tools}
          </h3>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {SOFTWARE.map((sw, i) => (
              <FadeIn key={sw.name} delay={i * 0.05} className="flex flex-col items-center gap-2">
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.03] p-3 transition-transform duration-200 hover:scale-105 sm:p-4">
                  <img
                    src={sw.logo}
                    alt={sw.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-center text-[0.65rem] font-light uppercase tracking-wide text-[#0C0C0C]/50">
                  {sw.name}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
