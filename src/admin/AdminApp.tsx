import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { client } from './client';
import Login from './Login';
import Dashboard from './Dashboard';
import { PageSpinner } from '@/components/Spinner';

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Paksa tema gelap + judul tab untuk area admin
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.title = 'Admin — Portofolio MDH';
  }, []);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | undefined;
    (async () => {
      const c = await client();
      const { data } = await c.auth.getSession();
      setSession(data.session);
      setReady(true);
      sub = c.auth.onAuthStateChange((_e, s) => {
        setSession(s);
        setIsAdmin(null); // re-verifikasi saat sesi berubah
      }).data.subscription;
    })();
    return () => sub?.unsubscribe();
  }, []);

  // Verifikasi user termasuk allowlist admin (RLS is_admin()); bila bukan → sign out
  useEffect(() => {
    if (!session) return;
    (async () => {
      const c = await client();
      const { data, error } = await c.rpc('is_admin');
      if (error || !data) {
        setIsAdmin(false);
        setNotice('Akun ini tidak terdaftar sebagai admin.');
        await c.auth.signOut();
      } else {
        setIsAdmin(true);
        setNotice(null);
      }
    })();
  }, [session]);

  if (!ready) {
    return <PageSpinner />;
  }

  if (!session || isAdmin === false) {
    return (
      <>
        {notice && (
          <div className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            {notice}
          </div>
        )}
        <Login />
      </>
    );
  }

  if (isAdmin === null) {
    return <PageSpinner />;
  }

  return <Dashboard email={session.user.email || ''} />;
}
