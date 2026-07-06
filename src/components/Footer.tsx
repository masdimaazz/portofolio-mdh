import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-base">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display font-extrabold text-lg">
          dimas<span className="accent">.</span>
        </p>
        <p className="text-sm text-muted order-last sm:order-none">
          © {new Date().getFullYear()} Muhammad Dimas Hadiyanto. Crafted in Jakarta.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-[hsl(var(--fg))] transition-colors"
        >
          Back to top <ArrowUp className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
