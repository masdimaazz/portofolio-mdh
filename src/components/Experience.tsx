import Reveal from './Reveal';
import SectionHead from './SectionHead';
import Panel from './Panel';import { useContent } from '@/data/ContentContext';
import { companyLogo } from '@/lib/companyLogos';

export default function Experience() {
  const { experience: TIMELINE, education } = useContent();
  return (
    <div id="experience" className="py-4 md:py-6">
    <Panel variant="cream" ghost="Journey">
    <div className="mx-auto max-w-4xl p-6 sm:p-9 md:p-14">
      <Reveal className="mb-14">
        <SectionHead num="03" label="career path">
          <h2 className="type-h1">
          The <span className="hl">experience</span>
          <br />
          behind the work
          </h2>
        </SectionHead>
      </Reveal>

      <div className="relative">
        {/* Garis vertikal timeline */}
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-current/25" />

        <div className="space-y-10">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.org + item.period} delay={i * 80}>
              <div className="relative pl-8 md:pl-12">
                {/* Titik timeline */}
                <span
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 md:w-[18px] md:h-[18px] rounded-full border-2 ${
                    item.current
                      ? 'bg-accent border-transparent'
                      : 'border-current/50 bg-transparent'
                  }`}
                >
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="type-h3">{item.role}</h3>
                  <span className="text-xs font-mono text-soft">{item.period}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  {companyLogo(item.org) && (
                    <span className="grid h-6 w-10 shrink-0 place-items-center rounded bg-white p-1 ring-1 ring-black/5">
                      <img
                        src={companyLogo(item.org)}
                        alt=""
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </span>
                  )}
                  <p className="hl text-sm font-semibold">{item.org}</p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm text-soft leading-relaxed flex gap-2.5">
                      <span className="mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Pendidikan */}
      <Reveal delay={120} className="mt-14">
        <div className="panel-accent flex flex-col justify-between gap-4 rounded-lg p-7 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="type-eyebrow mb-2 text-soft">Education</p>
            <h3 className="type-h3">{education?.degree}</h3>
            <p className="text-sm text-soft mt-1">{education?.school}</p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="font-head text-2xl font-black">{education?.gpa}<span className="text-soft text-base">/4.0</span></p>
            <p className="text-xs font-mono text-soft mt-1">{education?.period}</p>
          </div>
        </div>
      </Reveal>
    </div>
    </Panel>
    </div>
  );
}
