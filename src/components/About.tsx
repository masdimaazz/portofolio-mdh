import Reveal from './Reveal';

const STACK = [
  'Illustrator', 'Photoshop', 'After Effects', 'Figma',
  'Blender', 'InDesign', 'Canva', 'Premiere Pro',
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 mx-auto max-w-6xl px-5 md:px-6">
      <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest accent mb-3">About me</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Design that solves problems, not just decorates.
          </h2>
          <p className="mt-7 text-muted leading-relaxed">
            I'm a graphic designer and Multimedia Engineering graduate from
            Politeknik Negeri Media Kreatif Jakarta. My background spans brand
            visuals, packaging, social campaigns, and UI/UX — always grounded in
            user research and current design trends.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            My final project was an Augmented Reality mobile app introducing
            traditional West Javanese musical instruments — where I combined
            education, technology, and design into one experience.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-8">
            <div>
              <h3 className="font-display font-bold text-lg mb-4">What I do</h3>
              <ul className="space-y-3">
                {[
                  'Branding & logo design',
                  'UI/UX & responsive design',
                  'Social media & campaign visuals',
                  '3D product & POSM design',
                ].map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Tools I use</h3>
              <div className="flex flex-wrap gap-2">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="text-sm font-medium px-3.5 py-1.5 rounded-full bg-card border border-base"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
