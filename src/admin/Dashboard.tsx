import { useState } from 'react';
import { LogOut, ExternalLink } from 'lucide-react';
import { ENTITIES } from './config';
import { client } from './client';
import EntityEditor from './EntityEditor';
import AdminMessages from './AdminMessages';

export default function Dashboard({ email }: { email: string }) {
  const [active, setActive] = useState(ENTITIES[0].table);
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
    <div className="min-h-screen">
      {/* Topbar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base bg-card/90 px-4 py-3 backdrop-blur md:px-6">
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
        <aside className="hidden w-52 shrink-0 md:block">
          <nav className="sticky top-20 space-y-1">
            {ENTITIES.map((e) => (
              <button key={e.table} onClick={() => setActive(e.table)} className={navItemCls(active === e.table)}>
                <span>{e.icon}</span>
                {e.label}
              </button>
            ))}
            <button onClick={() => setActive('messages')} className={navItemCls(isMessages)}>
              <span>📨</span>
              Messages
            </button>
          </nav>
        </aside>

        {/* Nav mobile */}
        <div className="mb-4 w-full md:hidden">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full rounded-lg border border-base bg-card px-3 py-2 text-sm"
          >
            {ENTITIES.map((e) => (
              <option key={e.table} value={e.table}>
                {e.icon} {e.label}
              </option>
            ))}
            <option value="messages">📨 Messages</option>
          </select>
        </div>

        {/* Konten */}
        <main className="min-w-0 flex-1">
          {isMessages ? (
            <AdminMessages />
          ) : entity ? (
            <EntityEditor key={entity.table} entity={entity} />
          ) : null}
        </main>
      </div>
    </div>
  );
}
