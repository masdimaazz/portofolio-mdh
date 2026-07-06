import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between px-5 md:px-6 transition-all duration-500 max-w-6xl ${
          scrolled
            ? 'bg-card/80 backdrop-blur-xl border border-base rounded-full shadow-lg shadow-black/5 py-2.5'
            : 'py-1'
        }`}
      >
        <a href="#top" className="font-display font-extrabold text-lg tracking-tight">
          dimas<span className="accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted hover:text-[hsl(var(--fg))] transition-colors"
            >
              {l.label}
            </a>
          ))}
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
            className="hidden md:inline-flex bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Let's talk
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden p-2 rounded-full hover:bg-[hsl(var(--border))] transition-colors cursor-pointer"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mx-5 mt-2 bg-card border border-base rounded-2xl p-4 shadow-xl flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg font-medium hover:bg-[hsl(var(--border))] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 text-center bg-accent text-white font-semibold px-5 py-2.5 rounded-lg"
          >
            Let's talk
          </a>
        </div>
      )}
    </header>
  );
}
