import Badge from './Badge';
import Panel from './Panel';
import Starburst from './Starburst';
import { useReveal } from '@/hooks/useReveal';
import { useContent } from '@/data/ContentContext';

export default function Skills() {
  const { skills: SKILLS, software: SOFTWARE } = useContent();
  // Bar terisi saat section masuk viewport
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div id="skills" className="py-6 md:py-10">
      <Panel variant="cream" ghost="Toolkit">
        <div ref={ref} className="p-6 sm:p-9 md:p-14">
          <div className="flex items-center justify-between">
            <Badge label="skills & software" />
            <Starburst size={26} />
          </div>
          <h2 className="type-h1 mt-6">
            The <span className="hl">tools</span> behind
            <br />
            every project
          </h2>

          {/* Deret ikon software */}
          <div className="mt-10 flex flex-wrap gap-3">
            {SOFTWARE.map((s) => (
              <span
                key={s.label}
                className="grid h-12 w-12 place-items-center rounded-xl font-head text-sm font-black text-white shadow-lg"
                style={{ background: s.color }}
                title={s.label}
              >
                {s.label}
              </span>
            ))}
          </div>

          {/* Progress bar skill */}
          <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {SKILLS.map((s, i) => (
              <div key={s.name}>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span>{s.name}</span>
                  <span className="text-soft">{s.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-current/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: shown ? `${s.pct}%` : '0%',
                      background: 'var(--brand-500)',
                      transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
