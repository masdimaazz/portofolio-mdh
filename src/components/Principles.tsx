import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Reveal from './Reveal';
import Badge from './Badge';
import Panel from './Panel';

const PRINCIPLES = [
  {
    title: 'Clarity above excess',
    body: 'Every element earns its place. I strip away the noise so the message lands instantly — legible, focused, and honest.',
  },
  {
    title: 'Aesthetic with purpose',
    body: 'Beauty that serves the brand, never decoration for its own sake. Each visual choice supports a clear intent.',
  },
  {
    title: 'Research-driven thinking',
    body: 'Design grounded in user insight and current visual culture — decisions backed by context, not guesswork.',
  },
  {
    title: 'Built beyond trends',
    body: 'Systems and identities made to stay relevant, not just fashionable. Work that still holds up years later.',
  },
];

export default function Principles() {
  // Satu baris terbuka pada satu waktu (default: yang pertama)
  const [open, setOpen] = useState(0);

  return (
    <div id="principles" className="py-6 md:py-10">
      <Panel variant="cream" ghost="Approach">
        <div className="p-6 sm:p-9 md:p-14">
          <Reveal className="mb-10">
            <div className="flex items-center justify-between">
              <Badge label="core principles" />
              <span className="type-eyebrow opacity-60">[ ** ]</span>
            </div>
            <h2 className="type-h1 mt-6">
              Principles of
              <br />
              <span className="hl">approach</span>
            </h2>
          </Reveal>

          <div className="border-t border-current/15">
            {PRINCIPLES.map((p, i) => {
              const isOpen = open === i;
              const panelId = `principle-panel-${i}`;
              const btnId = `principle-btn-${i}`;
              return (
                <Reveal key={p.title} delay={i * 60}>
                  <div
                    className={`rounded-[1.25rem] border-b border-current/15 transition-colors ${
                      isOpen ? 'panel-red my-2 border-transparent' : ''
                    }`}
                  >
                    <h3>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center gap-5 px-4 py-5 text-left md:px-6 md:py-6"
                      >
                        <span className="type-list shrink-0 text-2xl md:text-3xl">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="type-h3 flex-1 text-lg md:text-xl">
                          {p.title}
                        </span>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-current/30">
                          {isOpen ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      hidden={!isOpen}
                      className="px-4 pb-6 md:px-6"
                    >
                      <p className="max-w-2xl pl-[3.25rem] text-sm leading-relaxed text-soft md:text-base">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Panel>
    </div>
  );
}
