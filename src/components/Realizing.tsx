import Reveal from './Reveal';
import Badge from './Badge';
import Panel from './Panel';import delsRamadhan from '@/assets/work/dels-ramadhan.webp';
import delsStand from '@/assets/work/dels-stand.webp';
import firstpage from '@/assets/work/firstpage.webp';
import kemensos from '@/assets/work/kemensos.webp';
import delsTentCard from '@/assets/work/dels-tentcard.webp';
import delsIdulAdha from '@/assets/work/dels-iduladha.webp';

// Kolase foto acak-tumpang tindih — tiap item punya span & geser sendiri
const SHOTS = [
  { img: delsRamadhan, area: 'col-span-2 md:col-span-4 md:row-span-2', shift: '' },
  { img: firstpage, area: 'col-span-1 md:col-span-3', shift: 'md:translate-y-6' },
  { img: kemensos, area: 'col-span-1 md:col-span-5 md:row-span-2', shift: 'md:-translate-y-4' },
  { img: delsStand, area: 'col-span-1 md:col-span-3', shift: 'md:-translate-y-2' },
  { img: delsTentCard, area: 'col-span-1 md:col-span-4', shift: 'md:translate-y-4' },
  { img: delsIdulAdha, area: 'col-span-2 md:col-span-5', shift: '' },
];

export default function Realizing() {
  return (
    <div id="realizing" className="py-6 md:py-10">
      <Panel variant="cream" ghost="Realizing">
        <div className="p-6 sm:p-9 md:p-14">
          <Reveal>
            <div className="flex items-start justify-between gap-6">
              <Badge label="dimas project" />
              <div className="text-right">
                <h2 className="type-h1">
                  The art of
                  <br />
                  <span className="hl">realizing</span>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Kolase */}
          <Reveal delay={80}>
            <div className="mt-12 grid auto-rows-[8rem] grid-cols-2 gap-3 sm:auto-rows-[10rem] md:grid-cols-12 md:gap-4">
              {SHOTS.map((s, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-[1.25rem] ${s.area} ${s.shift}`}
                >
                  <img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Statement raksasa */}
          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <h3
                className="font-display uppercase leading-[0.82] tracking-mega"
                style={{ fontSize: 'clamp(3rem, 13vw, 11rem)' }}
              >
                <span className="hl">Bold</span> desire
              </h3>

            </div>
          </Reveal>
        </div>
      </Panel>
    </div>
  );
}
