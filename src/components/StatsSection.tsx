import FadeIn from './FadeIn';
import { STATS } from '../data';

export default function StatsSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
            <div
              className="hero-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              {stat.value}
            </div>
            <div className="mt-3 text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
              {stat.label}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
