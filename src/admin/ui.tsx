import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

// ---- Toast (feedback aksi) — pub/sub sederhana ----
type ToastItem = { id: number; msg: string; type: 'success' | 'error' };
let listeners: Array<(t: ToastItem) => void> = [];
let counter = 0;

export function toast(msg: string, type: 'success' | 'error' = 'success') {
  const t = { id: ++counter, msg, type };
  listeners.forEach((l) => l(t));
}

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);
  useEffect(() => {
    const l = (t: ToastItem) => {
      setItems((cur) => [...cur, t]);
      setTimeout(() => setItems((cur) => cur.filter((x) => x.id !== t.id)), 3200);
    };
    listeners.push(l);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-[80] flex flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className={`login-reveal flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-xl ${
            t.type === 'error' ? 'border-red-400/40 bg-red-500/20' : 'border-emerald-400/40 bg-emerald-500/20'
          }`}
        >
          <span
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
              t.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
            }`}
          >
            {t.type === 'error' ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ---- Skeleton (loading) ----
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`} />;
}
