import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import logoMdh from '@/assets/logo-mdh.png';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Principles', href: '#principles' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  // Navbar transparan + teks putih saat masih di atas hero (belum discroll)
  const transparentTop = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: tandai section yang sedang di tengah viewport
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`relative mx-auto flex items-center justify-between px-5 md:px-6 transition-all duration-500 max-w-7xl ${
          transparentTop
            ? 'py-1 text-white'
            : 'bg-card/85 backdrop-blur-xl border border-base rounded-full shadow-lg shadow-black/5 py-2.5'
        }`}
      >
        {/* Logo MDH — di-mask pakai currentColor biar ikut warna navbar */}
        <a href="#top" aria-label="Muhammad Dimas Hadiyanto — home" className="flex items-center">
          <span
            aria-hidden="true"
            className="block h-6 md:h-7"
            style={{
              aspectRatio: '600 / 340',
              backgroundColor: 'currentColor',
              WebkitMaskImage: `url(${logoMdh})`,
              maskImage: `url(${logoMdh})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
            }}
          />
        </a>

        {/* Nav di tengah seperti ref Denis */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:grid grid-flow-col auto-cols-max gap-x-8 text-sm">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative font-medium transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                  style={{ background: 'var(--red-500)' }}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-[hsl(var(--border))] transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          <a
            href="#contact"
            className="hidden md:inline-flex bg-ink text-ink-fg text-sm font-semibold px-5 py-2 rounded-full hover:opacity-85 transition-opacity"
          >
            Contact
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden p-2 rounded-full hover:bg-[hsl(var(--border))] transition-colors cursor-pointer"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mx-5 mt-2 bg-card border border-base rounded-2xl p-4 shadow-xl flex flex-col gap-1">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium transition-colors hover:bg-[hsl(var(--border))] ${
                  isActive ? 'hl' : ''
                }`}
              >
                {isActive && (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'var(--red-500)' }}
                  />
                )}
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 text-center bg-ink text-ink-fg font-semibold px-5 py-2.5 rounded-lg"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
