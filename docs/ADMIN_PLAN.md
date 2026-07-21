# Admin Panel — Rencana Teknis (Portofolio MDH)

> Status: **RANCANGAN** (belum diimplementasi). Dibangun "nanti".
> Stack target: **Supabase** (Postgres + Auth + Storage + RLS) + situs Vite/React yang sudah ada.
> Tujuan: semua konten portofolio bisa diedit dari `/admin` tanpa menyentuh kode.

---

## 1. Gambaran arsitektur

```
┌───────────────┐      baca (anon key + RLS)      ┌────────────────────┐
│  Situs publik  │  ─────────────────────────────▶ │                    │
│  (Vite SPA)    │                                  │     Supabase       │
├───────────────┤      tulis (sesi login owner)    │  Postgres + Auth   │
│  /admin panel  │  ◀─────────────────────────────▶ │  Storage + RLS     │
└───────────────┘                                  └────────────────────┘
```

- **Situs publik**: komponen yang sekarang hardcoded (Work, Experience, About, Services, Skills, Stats, Principles, Hero/Contact) diubah membaca dari Supabase saat runtime (dengan skeleton loading + fallback ke data default bila fetch gagal).
- **Admin panel**: route `/admin`, dilindungi Supabase Auth. Form CRUD untuk tiap jenis konten + upload gambar ke Storage + atur urutan (`sort_order`).
- **Keamanan**: publik hanya boleh **SELECT** (via RLS). Tulis/hapus hanya untuk email yang terdaftar di tabel `admins`.

---

## 2. Skema database

Detail DDL lengkap ada di **`docs/admin-schema.sql`** (siap jalankan di Supabase SQL Editor). Ringkas:

| Tabel | Isi | Catatan |
|---|---|---|
| `profile` | nama, tagline, roles[], headline hero, bio About, email, WA, LinkedIn, lokasi, avatar_url, cv_url | **single row** (id=1) |
| `companies` | perusahaan (name, role, period) | untuk grup Work |
| `projects` | judul, kategori, tahun, cover_url, tags[], featured, published | FK → `companies` |
| `experience` | role, org, period, current, points[] | timeline karier |
| `education` | degree, school, gpa, period | kartu edukasi |
| `services` | lead, rest, description | daftar layanan |
| `principles` | title, body | accordion prinsip |
| `skills` | name, pct (0–100) | progress bar |
| `software` | label (Ps/Ai/…), color | chip aplikasi |
| `stats` | value, decimals, suffix, label | angka besar |
| `marquee_items` | text | pita berjalan |

Semua tabel (kecuali `profile`) punya `id uuid`, `sort_order int`, `created_at`, `updated_at`.
Bucket Storage: **`portfolio`** (public read) untuk cover proyek, logo, favicon, avatar.

---

## 3. Auth & RLS

- **Supabase Auth** email/password. Buat 1 akun owner (mis. `masdimaaz@gmail.com`). **Matikan public sign-up** (Dashboard → Authentication → Providers → disable email signups; owner dibuat manual).
- Tabel **`admins(email)`** = allowlist. Fungsi `is_admin()` cek `auth.jwt()->>'email'` ada di `admins`.
- **Policy per tabel**:
  - `SELECT`: publik (anon) boleh. Khusus `projects` dibatasi `published = true`.
  - `INSERT/UPDATE/DELETE`: hanya `is_admin()`.
- **Storage**: bucket `portfolio` → public read; write/update/delete hanya `is_admin()`.

> Anon key **aman** ditaruh di frontend karena semua penulisan dijaga RLS. Service-role key **hanya** untuk skrip seed, jangan pernah masuk ke bundle frontend.

---

## 4. Perubahan pada frontend

### 4a. Routing
Router (`react-router-dom`) **dicopot** saat balik ke single-page. Untuk admin, **pasang lagi** dengan pemisahan:
- `/` → situs publik single-page (seperti sekarang)
- `/admin/login` → form login
- `/admin` → dashboard (protected; redirect ke login bila belum auth)

Admin di-*lazy load* (`React.lazy`) supaya tidak menambah bundle situs publik.

### 4b. Data layer
- `src/lib/supabase.ts` → client dari `@supabase/supabase-js` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Hook per konten: `useProjects()`, `useExperience()`, `useProfile()`, dst. — fetch + cache ringan + `loading`/`error`.
- Tiap komponen publik menerima data dari hook; **fallback** ke konstanta default (data sekarang) bila fetch gagal → situs tak pernah kosong.
- Skeleton loading untuk section yang menunggu data.

### 4c. Admin panel (komponen)
- `AdminLayout` (sidebar: Profile · Companies · Projects · Experience · Education · Services · Principles · Skills · Software · Stats · Marquee)
- Tiap entitas: **List** (urut `sort_order`, tombol naik/turun, publish toggle) + **Form** (create/edit) + hapus (dengan konfirmasi).
- **Upload gambar**: input file → `supabase.storage.from('portfolio').upload()` → simpan public URL ke kolom `cover_url`/`avatar_url`. Preview + kompres sisi klien (opsional, reuse pola `sharp`? — di browser pakai canvas).
- Proteksi route via `onAuthStateChange`.

### 4d. SEO
Situs jadi client-rendered → konten tak ada di HTML awal. Untuk portofolio umumnya OK. Kalau perlu SEO kuat nanti: pertimbangkan prerender (vite-plugin-ssg) atau pindah ke Next.js. **Di luar scope awal.**

---

## 5. Environment & deploy

`.env` (lokal) dan **Vercel → Project Settings → Environment Variables**:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
Service-role key **hanya** di mesin lokal untuk seed (jangan di Vercel/bundle).

---

## 6. Rencana bertahap (saat "nanti" mulai)

- [ ] **Fase 0 — Supabase**: buat project, jalankan `admin-schema.sql`, buat bucket `portfolio`, buat akun owner + isi `admins`.
- [ ] **Fase 1 — Seed**: isi tabel dari data hardcoded sekarang (Work/Experience/dll) + upload gambar `src/assets/work/*` ke Storage.
- [ ] **Fase 2 — Read layer**: pasang supabase-js, ubah **Projects** jadi dinamis (bukti konsep) + skeleton + fallback.
- [ ] **Fase 3 — Semua section dinamis**: Experience, About/Hero, Services, Skills, Stats, Principles, Marquee.
- [ ] **Fase 4 — Auth admin**: react-router lagi, `/admin/login`, protected `/admin`.
- [ ] **Fase 5 — CRUD**: form per entitas + upload + reorder + publish.
- [ ] **Fase 6 — Polish & deploy**: env di Vercel, uji end-to-end, deploy.

---

## 7. Mapping konten sekarang → tabel

| Komponen sekarang | Sumber data hardcoded | Tabel tujuan |
|---|---|---|
| `Hero.tsx` | teks nama/role | `profile` |
| `About.tsx` | 2 paragraf bio, "What I do" | `profile` (+ `services`/list) |
| `Work.tsx` | `PROJECTS`, `COMPANIES` | `projects`, `companies` |
| `Experience.tsx` | `TIMELINE`, edukasi | `experience`, `education` |
| `Services.tsx` | `SERVICES` | `services` |
| `Principles.tsx` | `PRINCIPLES` | `principles` |
| `Skills.tsx` | `SKILLS`, `SOFTWARE` | `skills`, `software` |
| `Stats.tsx` | `STATS` | `stats` |
| `Marquee.tsx` | `ITEMS` | `marquee_items` |
| `Contact.tsx`/`Footer.tsx` | email/WA/LinkedIn | `profile` |

---

## 8. Estimasi
Fase 0–1 (setup + seed): ½ hari. Fase 2–3 (dinamis): 1 hari. Fase 4–5 (admin CRUD): 1–2 hari. Total ± 3 hari kerja.

> Saat siap membangun, mulai dari **Fase 0** dan jalankan `docs/admin-schema.sql` di Supabase.
