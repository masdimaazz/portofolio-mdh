import { Palette, Code2, Box, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const SERVICES = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'End-to-end product design from research and wireframes to polished, accessible interfaces.',
  },
  {
    icon: Code2,
    title: 'Development',
    desc: 'Pixel-perfect front-ends in React & TypeScript with smooth, performant interactions.',
  },
  {
    icon: Box,
    title: '3D & Motion',
    desc: 'Eye-catching 3D visuals and micro-animations that bring interfaces to life.',
  },
  {
    icon: Sparkles,
    title: 'Brand Identity',
    desc: 'Distinctive logos, systems and guidelines that make brands instantly recognisable.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 mx-auto max-w-6xl px-5 md:px-6">
      <Reveal className="max-w-2xl mb-14">
        <p className="font-mono text-xs uppercase tracking-widest accent mb-3">Services</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
          How I can help you
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <div className="group h-full p-7 rounded-3xl border border-base bg-card hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 transition-all duration-400">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
