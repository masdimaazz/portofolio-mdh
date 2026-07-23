import { useI18n, type Lang } from '../i18n';

const LANGS: Lang[] = ['en', 'id'];

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      className={`flex items-center rounded-full border border-[#D7E2EA]/25 p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider transition-colors ${
            lang === l ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
