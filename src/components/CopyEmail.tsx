import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { useContent } from '../content';

export default function CopyEmail() {
  const { contact } = useContent();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      window.location.href = `mailto:${contact.email}`;
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email ${contact.email}`}
      className="flex items-center gap-2.5 rounded-full border-2 border-[#D7E2EA]/40 px-5 py-2.5 text-sm font-medium text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-6 sm:py-3"
    >
      {copied ? <Check size={18} strokeWidth={2} /> : <Mail size={18} strokeWidth={1.75} />}
      {copied ? 'Copied!' : contact.email}
    </button>
  );
}
