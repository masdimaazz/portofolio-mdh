import { ArrowUpRight, Mail } from 'lucide-react';
import Panel from './Panel';
import { useContent } from '@/data/ContentContext';

// lucide v1 tak punya ikon brand → pakai SVG inline untuk LinkedIn & WhatsApp.
function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function Whatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.5 9.5 0 0 1-4.85-1.33l-.35-.2-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.05C2.53 6.74 6.79 2.5 12.05 2.5c2.53 0 4.9.99 6.69 2.77a9.4 9.4 0 0 1 2.77 6.68c0 5.26-4.28 9.55-9.47 9.55zM20.52 3.45A11.44 11.44 0 0 0 12.04.5C5.7.5.54 5.65.54 12c0 2.02.53 3.99 1.53 5.73L.44 23.5l5.9-1.55a11.46 11.46 0 0 0 5.7 1.45h.01c6.34 0 11.5-5.15 11.5-11.5 0-3.07-1.2-5.96-3.03-8.45z" />
    </svg>
  );
}

export default function Contact() {
  const { profile } = useContent();
  const socials = [
    { label: 'LinkedIn', handle: profile.name, href: profile.linkedin, Icon: Linkedin, external: true },
    { label: 'WhatsApp', handle: `+${profile.whatsapp}`, href: `https://wa.me/${profile.whatsapp}`, Icon: Whatsapp, external: true },
    { label: 'Email', handle: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  ];

  return (
    <div id="contact">
      <Panel variant="accent">
        <div className="relative px-6 py-20 text-center sm:px-9 md:px-16 md:py-28">
          <p className="type-eyebrow text-soft">[ 05 · let's work together ]</p>
          <h2 className="type-mega mt-6">
            Have a project
            <br />
            in <span className="text-white">mind?</span>
          </h2>
          <p className="type-lead mx-auto mt-7 max-w-md text-soft">
            Open to graphic design roles and freelance projects. Based in {profile.location} — let's
            create something great together.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-opacity hover:opacity-85 sm:text-lg"
          >
            <Mail className="h-5 w-5" />
            {profile.email}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </a>

          {/* Kartu kontak ber-ikon */}
          <div className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
            {socials.map(({ label, handle, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-left text-white transition-colors hover:bg-white hover:text-black"
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block truncate text-xs text-white/70 group-hover:text-black/60">
                    {handle}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </a>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
