import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import TextTicker from './components/TextTicker';
import ServicesSection from './components/ServicesSection';
import ExperienceSection from './components/ExperienceSection';
import BrandsSection from './components/BrandsSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import RealizingSection from './components/RealizingSection';
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
    <>
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <StatsSection />
        <TextTicker />
        {/* Continuous white block: Services → Experience → Brands → Skills */}
        <ServicesSection />
      <ExperienceSection />
      <BrandsSection />
      <SkillsSection />
        <ProjectsSection />
        <RealizingSection />
        <PrinciplesSection />
        <Footer />
      </main>
      <ScrollToTop />
      <Analytics />
    </>
  );
}
