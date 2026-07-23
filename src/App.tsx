import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import PrinciplesSection from './components/PrinciplesSection';
import Footer from './components/Footer';

export default function App() {
  // Deep-link support: honor a #section hash once the target has mounted
  // (the browser's own initial jump fires before React renders the element).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, []);

  return (
    <main className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <StatsSection />
      {/* Continuous white block: Services → Experience → Skills */}
      <ServicesSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <PrinciplesSection />
      <Footer />
    </main>
  );
}
