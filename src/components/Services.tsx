import Reveal from './Reveal';
import Badge from './Badge';
import Panel from './Panel';import { useContent } from '@/data/ContentContext';

export default function Services() {
  const { services: SERVICES } = useContent();
  return (
    <div id="services" className="py-4 md:py-6">
      <Panel variant="accent" ghost="Not Just">
        <div className="p-6 sm:p-9 md:p-14">
          <Reveal>
            <Badge label="dimas services" />
            <h2 className="type-h1 mt-6">
              Services that
              <br />
              drive <span className="text-white">brands</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.lead + s.rest}
                delay={i * 80}
                className={i % 2 === 1 ? 'lg:mt-14' : ''}
              >
                <div className="group panel-cream flex h-full flex-col rounded-lg p-7 transition-transform duration-300 hover:-translate-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="type-h3 text-xl leading-tight md:text-2xl">
                      {s.lead}
                      <br />
                      <span className="hl">{s.rest}</span>
                    </h3>
                    <div className="flex flex-col items-end gap-3">

                      <span className="type-eyebrow text-soft">
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                    </div>
                  </div>
                  <p className="mt-8 text-sm leading-relaxed text-soft">{s.description}</p>
                  <a
                    href="#contact"
                    className="type-eyebrow mt-6 inline-block hl transition-opacity hover:opacity-70"
                  >
                    [ discover ]
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
