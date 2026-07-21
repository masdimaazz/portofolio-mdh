import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
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

  return (
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
        <Work />
        <Realizing />
        <Services />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
