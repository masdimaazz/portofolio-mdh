import { useCallback, useEffect, useState } from 'react';
import { FolderCheck, GraduationCap, Mail, Building2, Loader2, ArrowUpRight } from 'lucide-react';
import type { ComponentType } from 'react';
import { client } from './client';

interface StatCard {
  key: string;
  table: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  grad: string;
}

const CARDS: StatCard[] = [
  { key: 'projects', table: 'projects', label: 'Projects', icon: FolderCheck, grad: 'from-blue-500 to-indigo-600' },
  { key: 'certificates', table: 'certificates', label: 'Certificates', icon: GraduationCap, grad: 'from-violet-500 to-purple-600' },
  { key: 'messages', table: 'messages', label: 'Messages', icon: Mail, grad: 'from-emerald-500 to-teal-600' },
  { key: 'companies', table: 'companies', label: 'Companies', icon: Building2, grad: 'from-amber-500 to-orange-600' },
];

type Recent = { id: string; name: string; email: string; created_at: string; read: boolean };

export default function AdminOverview({ onNavigate }: { onNavigate: (table: string) => void }) {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [unread, setUnread] = useState<number | null>(null);
  const [recent, setRecent] = useState<Recent[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const c = await client();
    const next: Record<string, number | null> = {};
    await Promise.all(
      CARDS.map(async (card) => {
        try {
          const { count } = await c
            .from(card.table)
            .select('*', { count: 'exact', head: true });
          next[card.key] = count ?? 0;
        } catch {
          next[card.key] = null; // tabel belum ada (mis. belum jalankan SQL)
        }
      })
    );
    setCounts(next);
    try {
      const { count } = await c
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false);
      setUnread(count ?? 0);
      const { data } = await c
        .from('messages')
        .select('id,name,email,created_at,read')
        .order('created_at', { ascending: false })
        .limit(4);
      setRecent((data as Recent[]) || []);
    } catch {
      setUnread(null);
      setRecent([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-sm text-muted">Ringkasan konten & pesan situs</p>
      </div>

      {/* Kartu statistik berwarna */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const val = counts[card.key];
          return (
            <button
              key={card.key}
              onClick={() => onNavigate(card.table)}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${card.grad} p-5 text-left text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1`}
            >
              <Icon className="mb-6 h-6 w-6 opacity-90" />
              <div className="font-head text-4xl font-black leading-none">
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : val === null ? (
                  '—'
                ) : (
                  val
                )}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm font-medium text-white/85">
                {card.label}
                {card.key === 'messages' && unread ? (
                  <span className="ml-1 rounded-full bg-white/25 px-1.5 text-xs">{unread} baru</span>
                ) : null}
              </div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-80" />
            </button>
          );
        })}
      </div>

      {/* Pesan terbaru */}
      <div className="mt-8 rounded-xl border border-white/10 bg-card/50 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Pesan terbaru</h2>
          <button
            onClick={() => onNavigate('messages')}
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-[hsl(var(--fg))]"
          >
            Lihat semua <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin" /> Memuat…
          </div>
        ) : recent.length === 0 ? (
          <p className="text-sm text-muted">Belum ada pesan masuk.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {recent.map((m) => (
              <li key={m.id} className="flex items-center gap-3 py-2.5">
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--accent))]" />}
                <span className="font-medium">{m.name}</span>
                <span className="truncate text-sm text-muted">{m.email}</span>
                <span className="ml-auto shrink-0 font-mono text-xs text-muted">
                  {new Date(m.created_at).toLocaleDateString('id-ID')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
