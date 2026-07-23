import { Mail, MessageCircle, Linkedin, MapPin, GraduationCap } from 'lucide-react';
import FadeIn from './FadeIn';
import { CONTACT, PROFILE, EDUCATION } from '../data';

const LINKS = [
  { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MessageCircle, label: 'WhatsApp', href: CONTACT.whatsapp },
  { icon: Linkedin, label: 'LinkedIn', href: CONTACT.linkedin },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-5 pb-10 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-light uppercase tracking-widest text-[#D7E2EA]/50">
            Let&apos;s work together
          </p>
          <h2
            className="hero-heading mt-4 font-black uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)' }}
          >
            Get in touch
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 flex flex-wrap gap-3 sm:gap-4">
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
        </FadeIn>

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

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-[#D7E2EA]/15 pt-6 text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>Graphic · 3D · Motion · UI/UX</span>
        </div>
      </div>
    </footer>
  );
}
