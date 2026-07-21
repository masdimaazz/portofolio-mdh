-- ============================================================
--  Portofolio MDH — Skema Admin (Supabase / Postgres)
--  Jalankan di Supabase SQL Editor saat mulai Fase 0.
--  Idempotent sedapat mungkin (aman dijalankan ulang).
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- helper: updated_at ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ---------- allowlist admin ----------
create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);

-- cek apakah user yang login termasuk admin
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

-- ============================================================
--  TABEL KONTEN
-- ============================================================

-- profile: satu baris (id = 1)
create table if not exists public.profile (
  id            int primary key default 1,
  name          text,
  tagline       text,
  roles         text[] default '{}',
  hero_headline text,
  about_p1      text,
  about_p2      text,
  email         text,
  whatsapp      text,
  linkedin      text,
  location      text,
  avatar_url    text,
  cv_url        text,
  updated_at    timestamptz not null default now(),
  constraint profile_single_row check (id = 1)
);

create table if not exists public.companies (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text,
  period     text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  title      text not null,
  category   text,
  year       text,
  cover_url  text,
  tags       text[] not null default '{}',
  featured   boolean not null default false,
  published  boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id         uuid primary key default gen_random_uuid(),
  role       text,
  org        text,
  period     text,
  current    boolean not null default false,
  points     text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id         uuid primary key default gen_random_uuid(),
  degree     text,
  school     text,
  gpa        text,
  period     text,
  sort_order int not null default 0
);

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  lead        text,
  rest        text,
  description text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.principles (
  id         uuid primary key default gen_random_uuid(),
  title      text,
  body       text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  pct        int check (pct between 0 and 100),
  sort_order int not null default 0
);

create table if not exists public.software (
  id         uuid primary key default gen_random_uuid(),
  label      text,
  color      text,
  sort_order int not null default 0
);

create table if not exists public.stats (
  id         uuid primary key default gen_random_uuid(),
  value      numeric,
  decimals   int not null default 0,
  suffix     text not null default '',
  label      text,
  sort_order int not null default 0
);

create table if not exists public.marquee_items (
  id         uuid primary key default gen_random_uuid(),
  text       text,
  sort_order int not null default 0
);

-- ---------- trigger updated_at ----------
do $$
declare t text;
begin
  foreach t in array array[
    'profile','companies','projects','experience','services','principles'
  ] loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ============================================================
--  ROW LEVEL SECURITY
--  Publik: hanya SELECT. Tulis: hanya is_admin().
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'profile','companies','projects','experience','education',
    'services','principles','skills','software','stats','marquee_items'
  ] loop
    execute format('alter table public.%I enable row level security;', t);

    -- baca publik (projects dikecualikan di bawah)
    execute format('drop policy if exists "public read" on public.%I;', t);
    if t <> 'projects' then
      execute format('create policy "public read" on public.%I for select using (true);', t);
    end if;

    -- tulis admin
    execute format('drop policy if exists "admin write" on public.%I;', t);
    execute format(
      'create policy "admin write" on public.%I for all
       using (public.is_admin()) with check (public.is_admin());', t);
  end loop;
end $$;

-- projects: publik hanya lihat yang published; admin lihat semua
drop policy if exists "public read published" on public.projects;
create policy "public read published" on public.projects
  for select using (published = true or public.is_admin());

-- ============================================================
--  STORAGE (bucket publik untuk gambar)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "portfolio public read"  on storage.objects;
drop policy if exists "portfolio admin write"  on storage.objects;
drop policy if exists "portfolio admin update" on storage.objects;
drop policy if exists "portfolio admin delete" on storage.objects;

create policy "portfolio public read" on storage.objects
  for select using (bucket_id = 'portfolio');
create policy "portfolio admin write" on storage.objects
  for insert with check (bucket_id = 'portfolio' and public.is_admin());
create policy "portfolio admin update" on storage.objects
  for update using (bucket_id = 'portfolio' and public.is_admin());
create policy "portfolio admin delete" on storage.objects
  for delete using (bucket_id = 'portfolio' and public.is_admin());

-- ============================================================
--  LANGKAH MANUAL SETELAH INI
--  1. Authentication → Providers → matikan public sign-up.
--  2. Buat user owner (Auth → Users → Add user, mis. masdimaaz@gmail.com).
--  3. insert into public.admins (email) values ('masdimaaz@gmail.com');
--  4. insert into public.profile (id) values (1) on conflict do nothing;
--  5. Seed konten (lihat docs/ADMIN_PLAN.md Fase 1).
-- ============================================================
