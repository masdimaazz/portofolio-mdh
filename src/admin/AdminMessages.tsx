import { useCallback, useEffect, useState } from 'react';
import { Trash2, Loader2, RefreshCw, Mail } from 'lucide-react';
import { client } from './client';

type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

export default function AdminMessages() {
  const [rows, setRows] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const c = await client();
      const { data, error } = await c
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRows((data as Msg[]) || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat pesan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(m: Msg) {
    try {
      const c = await client();
      await c.from('messages').update({ read: !m.read }).eq('id', m.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal update');
    }
  }

  async function remove(m: Msg) {
    if (!confirm('Hapus pesan ini?')) return;
    try {
      const c = await client();
      await c.from('messages').delete().eq('id', m.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menghapus');
    }
  }

  const unread = rows.filter((r) => !r.read).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted">
            {rows.length} pesan{unread ? ` · ${unread} belum dibaca` : ''}
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-lg border border-base px-3 py-1.5 text-sm hover:border-[hsl(var(--accent))]"
        >
          <RefreshCw className="h-4 w-4" /> Muat ulang
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {error} — pastikan tabel <code>messages</code> sudah dibuat (jalankan SQL-nya).
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> Memuat…
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-base px-4 py-10 text-center text-sm text-muted">
          Belum ada pesan masuk.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border p-4 backdrop-blur-xl ${
                m.read ? 'border-white/10 bg-card/50' : 'border-[hsl(var(--accent))] bg-card/60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                  )}
                  <span className="font-semibold">{m.name}</span>
                  <a href={`mailto:${m.email}`} className="text-sm text-muted hover:underline">
                    {m.email}
                  </a>
                </div>
                <span className="font-mono text-xs text-muted">
                  {new Date(m.created_at).toLocaleString('id-ID')}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`mailto:${m.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-base px-3 py-1.5 text-xs hover:border-[hsl(var(--accent))]"
                >
                  <Mail className="h-3.5 w-3.5" /> Balas
                </a>
                <button
                  onClick={() => toggleRead(m)}
                  className="rounded-lg border border-base px-3 py-1.5 text-xs hover:border-[hsl(var(--accent))]"
                >
                  {m.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                </button>
                <button
                  onClick={() => remove(m)}
                  className="ml-auto rounded-lg p-1.5 text-muted hover:text-red-400"
                  aria-label="Hapus"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
