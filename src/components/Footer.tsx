import logoMdh from '@/assets/logo-mdh.png';

const COLUMNS = [
  {
    title: 'Navigate',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#about' },
      { label: 'Experience', href: '#experience' },
      { label: 'Services', href: '#services' },
      { label: 'Principles', href: '#principles' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-dimas-hadiyanto-a53b37331/' },
      { label: 'WhatsApp', href: 'https://wa.me/6288215990350' },
      { label: 'Email', href: 'mailto:masdimaaz@gmail.com' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'masdimaaz@gmail.com', href: 'mailto:masdimaaz@gmail.com' },
      { label: '+62 882-1599-0350', href: 'https://wa.me/6288215990350' },
      { label: 'Jakarta, Indonesia', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-2 pb-6 sm:px-4">
      <div className="panel-accent overflow-hidden rounded-lg px-6 pt-14 sm:px-9 md:rounded-xl md:px-14 md:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            {/* Logo MDH (di-mask currentColor) */}
            <span
              aria-hidden="true"
              className="block h-9"
              style={{
                aspectRatio: '600 / 340',
                backgroundColor: 'currentColor',
                WebkitMaskImage: `url(${logoMdh})`,
                maskImage: `url(${logoMdh})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
            <p className="mt-4 max-w-xs text-sm text-soft">
              Available for design roles &amp; remote freelance projects.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="type-eyebrow mb-4 text-soft">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-underline text-sm font-medium opacity-90 hover:opacity-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark raksasa penutup */}
        <h2
          className="mt-10 text-center font-head font-black uppercase leading-[0.8] tracking-tighter md:mt-6"
          style={{ fontSize: 'clamp(3.5rem, 24vw, 17rem)' }}
        >
          Dimas
        </h2>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-current/20 py-6 text-xs text-soft sm:flex-row">
          <p>Bold visuals, crafted in Jakarta.</p>
          <p>© {new Date().getFullYear()} Muhammad Dimas Hadiyanto. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-medium transition-opacity hover:opacity-70"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
