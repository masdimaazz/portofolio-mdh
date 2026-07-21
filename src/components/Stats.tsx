import Panel from './Panel';
import SectionHead from './SectionHead';
import { useContent } from '@/data/ContentContext';

export default function Stats() {
  const { stats: STATS } = useContent();

  return (
    <div id="stats" className="py-4 md:py-6">
      <Panel variant="accent">
        <div className="p-6 sm:p-9 md:p-14">
          <SectionHead label="my experience" className="mb-8" />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="font-head font-black leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                >
                  {s.value.toFixed(s.decimals)}
                  {s.suffix}
                </div>
                <div className="mt-2 text-sm text-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
