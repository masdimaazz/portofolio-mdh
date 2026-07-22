import { useState } from 'react';
import { LogOut, ExternalLink } from 'lucide-react';
import { ENTITIES } from './config';
import { client } from './client';
import EntityEditor from './EntityEditor';
import AdminMessages from './AdminMessages';
import AdminOverview from './AdminOverview';

export default function Dashboard({ email }: { email: string }) {
  const [active, setActive] = useState<string>('overview');
  const isOverview = active === 'overview';
  const isMessages = active === 'messages';
  const entity = ENTITIES.find((e) => e.table === active);

  async function logout() {
    const c = await client();
    await c.auth.signOut();
  }

  const navItemCls = (on: boolean) =>
    `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
      on ? 'bg-[hsl(var(--accent))] font-semibold text-white' : 'hover:bg-[hsl(var(--border))]'
    }`;

  return (
    <div className="relative min-h-screen">
      {/* Latar ambient gelap ber-glow (gaya blur-admin) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 15% 0%, hsl(var(--accent) / 0.16), transparent 60%), radial-gradient(50% 45% at 100% 10%, hsl(265 80% 60% / 0.14), transparent 60%), hsl(var(--page))',
        }}
      />
      {/* Topbar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-card/60 px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--accent))] text-xs font-bold text-white">
            M
          </span>
          <span className="font-semibold">Admin Portofolio</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-sm text-muted hover:text-[hsl(var(--fg))] sm:inline-flex"
          >
            Lihat situs <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <span className="hidden text-sm text-muted md:inline">{email}</span>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-base px-3 py-1.5 text-sm hover:border-[hsl(var(--accent))]"
          >
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-20 space-y-0.5">
            <button onClick={() => setActive('overview')} className={navItemCls(isOverview)}>
              <span className="text-base">📊</span>
              Overview
            </button>
            <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Content
            </p>
            {ENTITIES.map((e) => (
              <button key={e.table} onClick={() => setActive(e.table)} className={navItemCls(active === e.table)}>
                <span className="text-base">{e.icon}</span>
                {e.label}
              </button>
            ))}
            <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Inbox
            </p>
            <button onClick={() => setActive('messages')} className={navItemCls(isMessages)}>
              <span className="text-base">📨</span>
              Messages
            </button>
          </nav>
        </aside>

        {/* Nav mobile */}
        <div className="mb-4 w-full md:hidden">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full rounded-lg border border-base bg-card px-3 py-2.5 text-sm"
          >
            <option value="overview">📊 Overview</option>
            <optgroup label="Content">
              {ENTITIES.map((e) => (
                <option key={e.table} value={e.table}>
                  {e.icon} {e.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Inbox">
              <option value="messages">📨 Messages</option>
            </optgroup>
          </select>
        </div>

        {/* Konten */}
        <main className="min-w-0 flex-1">
          {isOverview ? (
            <AdminOverview onNavigate={setActive} />
          ) : isMessages ? (
            <AdminMessages />
          ) : entity ? (
            <EntityEditor key={entity.table} entity={entity} />
          ) : null}
        </main>
      </div>
    </div>
  );
}
