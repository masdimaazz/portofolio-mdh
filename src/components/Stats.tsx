import { Clock, FolderCheck, Building2, GraduationCap, Sparkles } from 'lucide-react';
import type { ComponentType } from 'react';
import Panel from './Panel';
import SectionHead from './SectionHead';
import { useContent } from '@/data/ContentContext';

// Pilih ikon berdasar kata kunci label (data stat dari DB).
function iconFor(label: string): ComponentType<{ className?: string }> {
  const l = label.toLowerCase();
  if (l.includes('year')) return Clock;
  if (l.includes('project')) return FolderCheck;
  if (l.includes('brand') || l.includes('client') || l.includes('institution')) return Building2;
  if (l.includes('gpa') || l.includes('ipk')) return GraduationCap;
  return Sparkles;
}

export default function Stats() {
  const { stats: STATS } = useContent();

  return (
    <div id="stats">
      <Panel variant="accent">
        <div className="px-6 py-16 sm:px-9 sm:py-20 md:px-14 md:py-24">
          <SectionHead label="my experience" className="mb-10" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => {
              const Icon = iconFor(s.label);
              return (
                <div
                  key={s.label}
                  className="flex flex-col gap-4 rounded-lg border border-current/20 bg-current/[0.04] p-5 md:p-6"
                >
                  <Icon className="h-6 w-6 opacity-70" />
                  <div
                    className="font-head font-black leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                  >
                    {s.value.toFixed(s.decimals)}
                    {s.suffix}
                  </div>
                  <div className="text-sm text-soft">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>
    </div>
  );
}
