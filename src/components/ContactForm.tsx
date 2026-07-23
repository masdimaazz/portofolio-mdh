import { useState, type FormEvent } from 'react';
import { Send, Check } from 'lucide-react';
import { CONTACT } from '../data';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // No async endpoint configured → open a pre-filled email draft instead.
    if (!CONTACT.formEndpoint) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        `Project inquiry from ${form.name || 'website'}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-[#D7E2EA]/25 bg-[#D7E2EA]/[0.04] px-5 py-3.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 outline-none transition-colors focus:border-[#D7E2EA]/60';

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:gap-4">
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <input
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={update('name')}
          className={inputClass}
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={form.email}
          onChange={update('email')}
          className={inputClass}
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder="Tell me about your project…"
        value={form.message}
        onChange={update('message')}
        className={`${inputClass} resize-none`}
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2.5 rounded-full bg-[#D7E2EA] px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-[#0C0C0C] transition-transform duration-200 hover:scale-105 disabled:opacity-60"
        >
          {status === 'sent' ? (
            <>
              <Check size={18} strokeWidth={2.25} /> Sent
            </>
          ) : (
            <>
              <Send size={18} strokeWidth={2} />
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </>
          )}
        </button>
        {status === 'sent' && (
          <span className="text-sm text-[#D7E2EA]/70">Thanks — I&apos;ll get back to you soon.</span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-400">
            Something went wrong. Email me at {CONTACT.email}.
          </span>
        )}
      </div>
    </form>
  );
}
