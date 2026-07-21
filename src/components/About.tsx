import Reveal from './Reveal';
import Badge from './Badge';
import Panel from './Panel';
import Starburst from './Starburst';

const WHAT_I_DO = [
  'Branding & logo design',
  'UI/UX & responsive design',
  'Social media & campaign visuals',
  '3D product & POSM design',
];

export default function About() {
  return (
    <div id="about" className="py-6 md:py-10">
      <Panel variant="cream" ghost="Creating">
        <div className="p-6 sm:p-9 md:p-14">
          <Reveal>
            <div className="flex items-center justify-between">
              <Badge label="about dimas" />
              <Starburst size={26} />
            </div>
            <h2 className="type-h1 mt-6 max-w-4xl">
              Creative direction for{' '}
              <span className="hl">bold, memorable</span> brands
            </h2>
          </Reveal>

          <div className="mt-12 grid items-start gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="type-lead text-soft">
                I'm Muhammad Dimas Hadiyanto — a graphic designer and Multimedia
                Engineering graduate from Politeknik Negeri Media Kreatif Jakarta.
                My work spans brand visuals, packaging, social campaigns, and
                UI/UX, always grounded in research and current design trends.
              </p>
              <p className="type-lead mt-4 text-soft">
                My final project was an Augmented Reality mobile app introducing
                traditional West Javanese musical instruments — combining
                education, technology, and design into one experience.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="type-eyebrow mb-4 text-soft">What I do</h3>
              <ul className="divide-y divide-current/15 border-y border-current/15">
                {WHAT_I_DO.map((s) => (
                  <li key={s} className="type-h3 flex items-center gap-3 py-3.5">
                    <Starburst size={16} />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Panel>
    </div>
  );
}
