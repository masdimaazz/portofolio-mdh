import SectionHead from './SectionHead';
import Panel from './Panel';
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

// Peta nama skill (dari DB) → logo brand, untuk ikon kecil di daftar skill.
const SKILL_LOGO: Record<string, string> = {
  illustrator: illustrator, photoshop, canva,
  'after effects': afterEffects, 'premiere pro': premiere, premiere,
  blender, indesign, figma,
};

// Angka % diterjemahkan jadi level — lebih jujur & editorial ketimbang progress bar.
function level(pct: number): string {
  if (pct >= 90) return 'Expert';
  if (pct >= 80) return 'Advanced';
  if (pct >= 70) return 'Intermediate';
  return 'Familiar';
}

export default function Skills() {
  const { skills: SKILLS, software: SOFTWARE } = useContent();

  return (
    <div id="skills">
      <Panel variant="cream" ghost="Toolkit">
        <div className="px-6 py-16 sm:px-9 sm:py-20 md:px-14 md:py-24">
          <SectionHead label="skills & software">
            <h2 className="type-h1">
              The <span className="hl">tools</span> behind
              <br />
              every project
            </h2>
          </SectionHead>

          {/* Deret logo software — tile & padding seragam agar konsisten */}
          <div className="mt-10 flex flex-wrap gap-3">
            {SOFTWARE.map((s) => {
              const logo = LOGO[s.label];
              const name = NAME[s.label] || s.label;
              return logo ? (
                <span
                  key={s.label}
                  title={name}
                  className="grid h-12 w-12 place-items-center overflow-hidden rounded-lg bg-white p-2.5 ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
                >
                  <img src={logo} alt={name} loading="lazy" className="max-h-full max-w-full object-contain" />
                </span>
              ) : (
                <span
                  key={s.label}
                  className="grid h-12 w-12 place-items-center rounded-lg font-head text-sm font-black text-white"
                  style={{ background: s.color }}
                  title={s.label}
                >
                  {s.label}
                </span>
              );
            })}
          </div>

          {/* Daftar skill gaya indeks: nama · titik-titik · level */}
          <dl className="mt-12 grid gap-x-14 border-t border-current/12 sm:grid-cols-2">
            {SKILLS.map((s) => {
              const logo = SKILL_LOGO[s.name.toLowerCase().trim()];
              return (
                <div
                  key={s.name}
                  className="flex items-center gap-3 border-b border-current/12 py-3.5"
                >
                  {logo && (
                    <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded bg-white p-1 ring-1 ring-black/10">
                      <img src={logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                    </span>
                  )}
                  <dt className="font-head text-base font-bold uppercase tracking-tight">{s.name}</dt>
                  <span
                    aria-hidden="true"
                    className="mb-1 flex-1 self-end border-b border-dotted border-current/30"
                  />
                  <dd className="font-mono text-xs uppercase tracking-widest text-soft">
                    {level(s.pct)}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Panel>
    </div>
  );
}
