import { Download } from 'lucide-react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import { PROFILE, CONTACT } from '../data';

const ABOUT_TEXT = PROFILE.about;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {/* Decorative corner objects */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <img src="/decor/moon.png" alt="" className="h-auto w-full" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <img src="/decor/lego.png" alt="" className="h-auto w-full" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <img src="/decor/smiley.png" alt="" className="h-auto w-full" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <img src="/decor/cursor.png" alt="" className="h-auto w-full" />
      </FadeIn>

      {/* Content */}
      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <AnimatedText
              text={ABOUT_TEXT}
              className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            />
            <AnimatedText
              text={PROFILE.about2}
              className="max-w-[560px] text-center font-light leading-relaxed text-[#D7E2EA]/80"
              style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.15rem)' }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ContactButton />
          <a
            href={CONTACT.cv}
            download
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#D7E2EA]/40 px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:px-11 md:py-4 md:text-base"
          >
            <Download size={18} strokeWidth={1.75} />
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

