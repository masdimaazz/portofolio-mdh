import { useI18n } from '../i18n';

// Infinite marquee strip of keywords. The row is duplicated so the CSS
// translateX(-50%) loop is seamless.
export default function TextTicker() {
  const { t } = useI18n();
  const row = [...t.ticker, ...t.ticker];
  return (
    <div className="border-y border-[#D7E2EA]/10 bg-[#0C0C0C] py-6 sm:py-8">
      <div className="flex overflow-hidden">
        <div className="ticker-track flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          {row.map((word, i) => (
            <span key={i} className="flex shrink-0 items-center gap-8 sm:gap-12">
              <span
                className="font-black uppercase tracking-tight text-[#D7E2EA]/85"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                {word}
              </span>
              <span className="text-[#7621B0]" style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
