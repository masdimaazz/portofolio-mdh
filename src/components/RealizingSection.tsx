import FadeIn from './FadeIn';
import { REALIZING, CONTACT } from '../data';

export default function RealizingSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 md:flex-row md:items-end">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Realizing
          </h2>
          <p className="max-w-sm font-light uppercase tracking-wide text-[#D7E2EA]/50">
            a selection of visuals, campaigns and renders brought to life
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {REALIZING.map((src, i) => (
            <FadeIn
              key={src}
              delay={(i % 4) * 0.08}
              className={`overflow-hidden rounded-2xl sm:rounded-3xl ${
                i % 5 === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ minHeight: i % 5 === 0 ? '100%' : '180px' }}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12 flex justify-center">
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-[#D7E2EA]/40 px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
          >
            See more work
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
