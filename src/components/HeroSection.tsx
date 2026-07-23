import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import { NAV, PROFILE } from '../data';
import { useI18n } from '../i18n';

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
      >
        {NAV.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {t.nav[link.key]}
          </a>
        ))}
      </FadeIn>

      {/* Hero heading */}
      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
        >
          Hi, i&apos;m {PROFILE.first}
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <div className="flex flex-col gap-3">
          <FadeIn delay={0.3} y={20}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/25 bg-[#D7E2EA]/[0.06] px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-widest text-[#D7E2EA] sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              {t.hero.available}
            </span>
          </FadeIn>
          <FadeIn
            as="p"
            delay={0.35}
            y={20}
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {t.hero.tagline}
          </FadeIn>
        </div>

        <FadeIn delay={0.5} y={20}>
          <Magnet padding={70} strength={4}>
            <ContactButton />
          </Magnet>
        </FadeIn>
      </div>

      {/* Hero portrait — centering lives on a plain wrapper so Framer Motion's
          inline transform (used by FadeIn) doesn't cancel the -translate-x-1/2. */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="/portrait.png"
              alt={`${PROFILE.name}, ${PROFILE.role}`}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
