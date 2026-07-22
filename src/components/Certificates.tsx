import SectionHead from './SectionHead';
import Panel from './Panel';
import Reveal from './Reveal';
import { useContent } from '@/data/ContentContext';

export default function Certificates() {
  const { certificates } = useContent();
  // Sembunyikan seluruh section bila belum ada data
  if (!certificates.length) return null;

  return (
    <div id="certificates">
      <Panel variant="cream" ghost="Certified">
        <div className="px-6 py-16 sm:px-9 sm:py-20 md:px-14 md:py-24">
          <SectionHead label="certificates">
            <h2 className="type-h1">
              Proof of <span className="hl">craft</span>
            </h2>
          </SectionHead>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c, i) => (
              <Reveal key={c.title + i} delay={i * 60}>
                <div className="hover-lift h-full overflow-hidden rounded-lg border border-current/15 hover:border-current/35">
                  {c.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-current/[0.03]">
                      <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="type-h3 text-base">{c.title}</h3>
                    <p className="mt-1 text-sm text-soft">
                      {c.issuer}
                      {c.issuer && c.year ? ' · ' : ''}
                      {c.year}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
