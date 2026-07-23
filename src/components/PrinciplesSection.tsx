import FadeIn from './FadeIn';
import { PRINCIPLES } from '../data';

export default function PrinciplesSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
      <h2
        className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Principles
      </h2>

      <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-2">
        {PRINCIPLES.map((p, i) => (
          <FadeIn
            key={p.title}
            delay={i * 0.1}
            className="flex flex-col gap-4 rounded-[32px] border-2 border-[#D7E2EA]/30 p-7 sm:rounded-[40px] sm:p-9 md:p-10"
          >
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              0{i + 1}
            </span>
            <h3
              className="font-medium uppercase text-[#D7E2EA]"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
            >
              {p.title}
            </h3>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/60"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
            >
              {p.body}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
