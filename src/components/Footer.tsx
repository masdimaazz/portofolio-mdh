import { MessageCircle, Linkedin, MapPin, GraduationCap, Download } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactForm from './ContactForm';
import CopyEmail from './CopyEmail';
import { CONTACT, PROFILE, EDUCATION } from '../data';
import { useI18n } from '../i18n';

const LINKS = [
  { icon: MessageCircle, label: 'WhatsApp', href: CONTACT.whatsapp },
  { icon: Linkedin, label: 'LinkedIn', href: CONTACT.linkedin },
];

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-5 pb-10 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-light uppercase tracking-widest text-[#D7E2EA]/50">
            {t.footer.work}
          </p>
          <h2
            className="hero-heading mt-4 font-black uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)' }}
          >
            {t.footer.getInTouch}
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <FadeIn delay={0.1} className="flex flex-col gap-4">
            <p className="max-w-sm font-light leading-relaxed text-[#D7E2EA]/60">
              {t.footer.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <CopyEmail />
              {LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border-2 border-[#D7E2EA]/40 px-5 py-2.5 text-sm font-medium text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-6 sm:py-3"
                >
                  <Icon size={18} strokeWidth={1.75} />
                  {label}
                </a>
              ))}
              <a
                href={CONTACT.cv}
                download
                className="flex items-center gap-2.5 rounded-full bg-[#D7E2EA] px-5 py-2.5 text-sm font-semibold text-[#0C0C0C] transition-transform duration-200 hover:scale-105 sm:px-6 sm:py-3"
              >
                <Download size={18} strokeWidth={2} />
                {t.footer.downloadCV}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>

        <FadeIn
          delay={0.15}
          className="mt-14 grid gap-6 border-t border-[#D7E2EA]/15 pt-8 text-[#D7E2EA]/60 sm:grid-cols-2"
        >
          <div className="flex items-start gap-3">
            <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" />
            <span className="text-sm sm:text-base">{CONTACT.location}</span>
          </div>
          <div className="flex items-start gap-3">
            <GraduationCap size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" />
            <span className="text-sm sm:text-base">
              {EDUCATION.degree}
              <br />
              <span className="text-[#D7E2EA]/40">
                {EDUCATION.school} · GPA {EDUCATION.gpa} · {EDUCATION.period}
              </span>
            </span>
          </div>
        </FadeIn>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[#D7E2EA]/15 pt-6 text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:flex-row">
          <span className="flex items-center gap-3">
            <img src="/logo-mdh.png" alt="" className="h-6 w-auto opacity-80" />
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>Graphic · 3D · Motion · UI/UX</span>
        </div>
      </div>
    </footer>
  );
}
