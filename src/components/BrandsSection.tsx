import FadeIn from './FadeIn';
import { COMPANIES } from '../data';
import { useI18n } from '../i18n';

export default function BrandsSection() {
  const { t } = useI18n();
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20">
      <FadeIn className="mx-auto max-w-5xl">
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-[#0C0C0C]/40 sm:mb-12">
          {t.brands.trusted}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 md:gap-x-20">
          {COMPANIES.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.1}>
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="h-8 w-auto max-w-[180px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 md:h-12"
              />
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
