import Reveal from './Reveal';

// Timeline pengalaman — data asli dari CV
const TIMELINE = [
  {
    role: 'Creative Marketing Intern',
    org: 'PT. Delisari Nusantara',
    period: 'May 2025 – Jul 2025',
    current: false,
    points: [
      'Produced visual promo materials — catalogs, product packaging, and social media content.',
      'Contributed creative ideas to boost brand engagement on digital platforms.',
      'Adapted design trends and market insight into on-target output.',
    ],
  },
  {
    role: 'Graphic Design Intern',
    org: 'Firstpage.id',
    period: 'Jan 2025 – Jul 2025',
    current: false,
    points: [
      'Designed Instagram feed content for Firstpage.id.',
      'Created LinkedIn feed visuals and editorial layouts.',
      'Delivered role-specific work with measurable engagement results.',
    ],
  },
  {
    role: 'Social Media Staff',
    org: 'Karang Taruna',
    period: 'Oct 2024 – Present',
    current: true,
    points: [
      'Design visual content (posters, feeds, stories) for social, religious, and youth activities.',
      'Write informative, engaging captions and copywriting.',
      'Document activities for promotion and digital archives.',
    ],
  },
  {
    role: 'Graphic Design Intern',
    org: 'Kementerian Sosial RI',
    period: 'Feb 2023 – Jul 2023',
    current: false,
    points: [
      'Designed Instagram feed content for the Ministry of Social Affairs.',
      'Managed the social media content timeline.',
      'Rebranded the HLUN 2022 logo and Instagram feed branding.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 mx-auto max-w-4xl px-5 md:px-6">
      <Reveal className="mb-14">
        <p className="font-mono text-xs uppercase tracking-widest accent mb-3">Career path</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
          Experience
        </h2>
      </Reveal>

      <div className="relative">
        {/* Garis vertikal timeline */}
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-[hsl(var(--border))]" />

        <div className="space-y-10">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.org + item.period} delay={i * 80}>
              <div className="relative pl-8 md:pl-12">
                {/* Titik timeline */}
                <span
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 md:w-[18px] md:h-[18px] rounded-full border-2 ${
                    item.current
                      ? 'bg-accent border-transparent'
                      : 'bg-card border-[hsl(var(--border))]'
                  }`}
                >
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display font-bold text-xl">{item.role}</h3>
                  <span className="text-xs font-mono text-muted">{item.period}</span>
                </div>
                <p className="accent font-semibold text-sm mt-0.5">{item.org}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm text-muted leading-relaxed flex gap-2.5">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[hsl(var(--muted))] shrink-0" />
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
        <div className="rounded-3xl border border-base bg-card p-7 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">Education</p>
            <h3 className="font-display font-bold text-lg">
              Applied Bachelor — Multimedia Engineering Technology
            </h3>
            <p className="text-sm text-muted mt-1">
              Politeknik Negeri Media Kreatif Jakarta
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="font-display font-extrabold text-2xl">3.52<span className="text-muted text-base">/4.0</span></p>
            <p className="text-xs font-mono text-muted mt-1">Aug 2020 – Nov 2024</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
