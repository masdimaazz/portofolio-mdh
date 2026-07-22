// Spinner loading (Uiverse) — lingkaran SVG beranimasi. Dipakai untuk lazy/loading.
export default function Spinner({ className = '' }: { className?: string }) {
  return (
    <span className={`app-spinner ${className}`} role="status" aria-label="Memuat">
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </span>
  );
}

// Loader satu layar penuh (untuk Suspense fallback / verifikasi sesi).
export function PageSpinner() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#05061a]">
      <Spinner />
    </div>
  );
}
