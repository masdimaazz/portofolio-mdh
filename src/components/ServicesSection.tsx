import FadeIn from './FadeIn';
import { SERVICES } from '../data';
import { useI18n } from '../i18n';

export default function ServicesSection() {
  const { t } = useI18n();
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-12 text-center font-black uppercase text-[#0C0C0C] sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
      >
        {t.services.title}
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.num}
            delay={i * 0.1}
            className="flex items-start gap-4 border-t py-8 last:border-b sm:gap-8 sm:py-10 md:py-12"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.num}
            </span>
            <div className="flex flex-1 flex-col gap-3 pt-1">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {t.services.items[i].name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {t.services.items[i].desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
