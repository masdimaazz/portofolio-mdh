import { ArrowUpRight, Mail } from 'lucide-react';
import Reveal from './Reveal';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/muhammad-dimas-hadiyanto' },
  { label: 'WhatsApp', href: 'https://wa.me/6288215990350' },
  { label: 'Email', href: 'mailto:masdimaaz@gmail.com' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 mx-auto max-w-6xl px-5 md:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-base bg-card px-6 py-16 md:px-16 md:py-24 text-center">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent)), transparent 65%)' }}
          />
          <p className="relative font-mono text-xs uppercase tracking-widest accent mb-5">
            Let's work together
          </p>
          <h2 className="relative font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]">
            Have a project<br className="hidden sm:block" /> in mind?
          </h2>
          <p className="relative mt-6 text-muted max-w-md mx-auto">
            Open to graphic design roles and freelance projects. Based in
            Jakarta, Indonesia — let's create something great together.
          </p>
          <a
            href="mailto:masdimaaz@gmail.com"
            className="relative group mt-10 inline-flex items-center gap-3 bg-accent text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            <Mail className="w-5 h-5" />
            masdimaaz@gmail.com
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </a>

          <div className="relative mt-12 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm font-medium px-5 py-2.5 rounded-full border border-base hover:bg-accent hover:text-white hover:border-transparent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
