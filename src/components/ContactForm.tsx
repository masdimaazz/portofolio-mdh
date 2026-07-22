import { useState } from 'react';
import { Send, Loader2, Check } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

// Form kontak → simpan ke tabel `messages` (RLS: publik insert, admin baca).
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErr(null);
    try {
      const supabase = await getSupabase();
      if (!supabase) throw new Error('Form belum aktif (Supabase belum dikonfigurasi).');
      const { error } = await supabase.from('messages').insert({ name, email, message });
      if (error) throw error;
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Gagal mengirim pesan');
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-white/50';

  if (status === 'sent') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-6 py-10 text-center"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-head text-lg font-bold uppercase tracking-tight">Pesan terkirim!</p>
        <p className="text-sm text-white/70">Terima kasih — saya akan segera membalas.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
        >
          Kirim lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-3 text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={field}
          placeholder="Nama"
          aria-label="Nama"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className={field}
          placeholder="Email"
          aria-label="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <textarea
        className={field + ' min-h-[120px] resize-y'}
        placeholder="Ceritakan proyekmu…"
        aria-label="Pesan"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {err && (
        <p
          role="alert"
          className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-xs text-white"
        >
          {err}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === 'sending' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Kirim pesan
      </button>
    </form>
  );
}
