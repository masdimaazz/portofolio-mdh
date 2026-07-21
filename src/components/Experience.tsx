import Reveal from './Reveal';
import Badge from './Badge';
import Panel from './Panel';
import Starburst from './Starburst';

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
    <div id="experience" className="py-6 md:py-10">
    <Panel variant="cream" ghost="Journey">
    <div className="mx-auto max-w-4xl p-6 sm:p-9 md:p-14">
      <Reveal className="mb-14">
        <div className="flex items-center justify-between">
          <Badge num="03" label="career path" />
          <Starburst size={26} />
        </div>
        <h2 className="type-h1 mt-6">
          The <span className="hl">experience</span>
          <br />
          behind the work
        </h2>
      </Reveal>

      <div className="relative">
        {/* Garis vertikal timeline */}
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-current/25" />

        <div className="space-y-10">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.org + item.period} delay={i * 80}>
              <div className="relative pl-8 md:pl-12">
                {/* Titik timeline */}
                <span
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 md:w-[18px] md:h-[18px] rounded-full border-2 ${
                    item.current
                      ? 'bg-accent border-transparent'
                      : 'border-current/50 bg-transparent'
                  }`}
                >
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="type-h3">{item.role}</h3>
                  <span className="text-xs font-mono text-soft">{item.period}</span>
                </div>
                <p className="hl font-semibold text-sm mt-0.5">{item.org}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm text-soft leading-relaxed flex gap-2.5">
                      <span className="mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
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
        <div className="panel-red flex flex-col justify-between gap-4 rounded-[1.25rem] p-7 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="type-eyebrow mb-2 text-soft">Education</p>
            <h3 className="type-h3">
              Applied Bachelor — Multimedia Engineering Technology
            </h3>
            <p className="text-sm text-soft mt-1">
              Politeknik Negeri Media Kreatif Jakarta
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="font-head text-2xl font-black">3.52<span className="text-soft text-base">/4.0</span></p>
            <p className="text-xs font-mono text-soft mt-1">Aug 2020 – Nov 2024</p>
          </div>
        </div>
      </Reveal>
    </div>
    </Panel>
    </div>
  );
}
