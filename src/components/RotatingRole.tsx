import { useEffect, useState } from 'react';

// Role yang berganti otomatis (gaya ekizr, tapi selaras tema). Fade-slide tiap
// pergantian; animasi auto-nonaktif saat prefers-reduced-motion (diatur di CSS).
export default function RotatingRole({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <span key={i} className="role-in hl inline-block">
      {roles[i] ?? ''}
    </span>
  );
}
