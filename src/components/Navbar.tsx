import { useEffect, useState } from 'react';
import { NAV } from '../data';
import { useI18n } from '../i18n';
import LangToggle from './LangToggle';

const SECTION_IDS = NAV.filter((n) => n.href.startsWith('#')).map((n) =>
  n.href.slice(1),
);

export default function Navbar() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  // Reveal the floating bar once the hero has scrolled out of view.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section currently owns the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[110] transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-4 border-b border-[#D7E2EA]/10 bg-[#0C0C0C]/75 px-5 py-3 backdrop-blur-md sm:px-8 md:px-10"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
          aria-label="Back to top"
        >
          <img src="/logo-mdh.png" alt="Muhammad Dimas Hadiyanto" className="h-6 w-auto sm:h-7" />
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4 sm:gap-7">
            {NAV.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.key}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`rounded text-xs font-medium uppercase tracking-wider transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] sm:text-sm ${
                      isActive ? 'text-[#D7E2EA]' : 'text-[#D7E2EA]/55 hover:text-[#D7E2EA]'
                    }`}
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              );
            })}
          </ul>
          <LangToggle />
        </div>
      </nav>
    </header>
  );
}
