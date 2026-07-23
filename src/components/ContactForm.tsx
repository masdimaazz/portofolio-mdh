import { useState, type FormEvent } from 'react';
import { Send, Check } from 'lucide-react';
import { CONTACT } from '../data';
import { getSupabase } from '../lib/supabase';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const openMailDraft = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Project inquiry from ${form.name || 'website'}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Preferred path: store in the shared `messages` table so it lands in the
    // same admin inbox as the main portfolio. If Supabase isn't reachable or
    // its RLS rejects the insert, fall back to a pre-filled email draft so the
    // visitor is never blocked.
    const supabase = await getSupabase().catch(() => null);
    if (supabase) {
      const { error } = await supabase
        .from('messages')
        .insert({ name: form.name, email: form.email, message: form.message });
      if (!error) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        return;
      }
    }

    openMailDraft();
    setStatus('idle');
  };

  const inputClass =
    'w-full rounded-2xl border border-[#D7E2EA]/25 bg-[#D7E2EA]/[0.04] px-5 py-3.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 outline-none transition-colors focus:border-[#D7E2EA]/60';

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:gap-4">
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Your name
          </label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={update('name')}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="sr-only">
            Your email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            value={form.email}
            onChange={update('email')}
            className={inputClass}
          />
        </div>
      </div>
      <label htmlFor="cf-message" className="sr-only">
        Your message
      </label>
      <textarea
        id="cf-message"
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
