import { useEffect, useState } from 'react';
import { ContentProvider } from '@/data/ContentContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';

import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import Work from '@/components/Work';
import Realizing from '@/components/Realizing';
import Services from '@/components/Services';
import Principles from '@/components/Principles';
import Contact from '@/components/Contact';

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Navigasi anchor tanpa mengotori URL dengan "#..." — scroll mulus, URL tetap bersih
  useEffect(() => {
    const cleanUrl = () =>
      window.history.replaceState(null, '', window.location.pathname + window.location.search);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      e.preventDefault();
      if (href === '#') return; // placeholder, jangan lompat
      const id = href.slice(1);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
      const el = document.getElementById(id);
      if (id === 'top' || !el) window.scrollTo({ top: 0, behavior });
      else el.scrollIntoView({ behavior, block: 'start' });
      cleanUrl();
    };

    // Bersihkan juga bila halaman dibuka dengan hash di URL
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView(), 0);
      cleanUrl();
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <ContentProvider>
    <div className="relative min-h-screen">
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById('main');
          el?.focus();
          el?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-fg"
      >
        Skip to content
      </button>
      <ScrollProgress />
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Certificates />
        <Work />
        <Realizing />
        <Services />
        <Principles />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
    </ContentProvider>
  );
}

export default App;
