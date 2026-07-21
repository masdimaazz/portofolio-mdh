import { ArrowUpRight, Mail } from 'lucide-react';
import Panel from './Panel';
import Starburst from './Starburst';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-dimas-hadiyanto-a53b37331/' },
  { label: 'WhatsApp', href: 'https://wa.me/6288215990350' },
  { label: 'Email', href: 'mailto:masdimaaz@gmail.com' },
];

export default function Contact() {
  return (
    <div id="contact" className="py-6 md:py-10">
      <Panel variant="accent">
        <div className="relative px-6 py-20 text-center sm:px-9 md:px-16 md:py-28">
          <Starburst size={54} className="absolute left-[12%] top-[18%] hidden sm:block" />
          <Starburst size={44} className="absolute right-[14%] bottom-[20%] hidden sm:block" />

          <p className="type-eyebrow text-soft">[ 05 · let's work together ]</p>
          <h2 className="type-mega mt-6">
            Have a project
            <br />
            in <span className="text-white">mind?</span>
          </h2>
          <p className="type-lead mx-auto mt-7 max-w-md text-soft">
            Open to graphic design roles and freelance projects. Based in
            Jakarta, Indonesia — let's create something great together.
          </p>
          <a
            href="mailto:masdimaaz@gmail.com"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-opacity hover:opacity-85 sm:text-lg"
          >
            <Mail className="h-5 w-5" />
            masdimaaz@gmail.com
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </a>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full border border-current/30 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white hover:text-black"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
