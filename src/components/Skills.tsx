import Badge from './Badge';
import Panel from './Panel';
import Starburst from './Starburst';
import { useReveal } from '@/hooks/useReveal';
import { useContent } from '@/data/ContentContext';
import photoshop from '@/assets/logos/photoshop.svg';
import illustrator from '@/assets/logos/illustrator.svg';
import afterEffects from '@/assets/logos/after-effects.svg';
import premiere from '@/assets/logos/premiere.svg';
import indesign from '@/assets/logos/indesign.svg';
import figma from '@/assets/logos/figma.svg';
import blender from '@/assets/logos/blender.svg';
import canva from '@/assets/logos/canva.svg';

// Peta label software (dari DB) → logo brand asli + nama lengkap (alt/title).
const LOGO: Record<string, string> = {
  Ps: photoshop, Ai: illustrator, Ae: afterEffects, Pr: premiere,
  Id: indesign, Fig: figma, Bl: blender, Cv: canva,
};
const NAME: Record<string, string> = {
  Ps: 'Adobe Photoshop', Ai: 'Adobe Illustrator', Ae: 'Adobe After Effects',
  Pr: 'Adobe Premiere Pro', Id: 'Adobe InDesign', Fig: 'Figma', Bl: 'Blender', Cv: 'Canva',
};

// Peta nama skill (dari DB) → logo brand, untuk ikon di samping progress bar.
const SKILL_LOGO: Record<string, string> = {
  illustrator: illustrator, photoshop, canva,
  'after effects': afterEffects, 'premiere pro': premiere, premiere,
  blender, indesign, figma,
};

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

          {/* Deret logo software */}
          <div className="mt-10 flex flex-wrap gap-3">
            {SOFTWARE.map((s) => {
              const logo = LOGO[s.label];
              const name = NAME[s.label] || s.label;
              return logo ? (
                <span
                  key={s.label}
                  title={name}
                  className="grid h-12 w-12 place-items-center rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-1"
                >
                  <img
                    src={logo}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                // Fallback: chip warna teks (kalau ada label tanpa logo)
                <span
                  key={s.label}
                  className="grid h-12 w-12 place-items-center rounded-xl font-head text-sm font-black text-white shadow-lg"
                  style={{ background: s.color }}
                  title={s.label}
                >
                  {s.label}
                </span>
              );
            })}
          </div>

          {/* Progress bar skill */}
          <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {SKILLS.map((s, i) => {
              const logo = SKILL_LOGO[s.name.toLowerCase().trim()];
              return (
              <div key={s.name}>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    {logo && (
                      <img src={logo} alt="" className="h-5 w-5 rounded object-contain" loading="lazy" />
                    )}
                    {s.name}
                  </span>
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
              );
            })}
          </div>
        </div>
      </Panel>
    </div>
  );
}
