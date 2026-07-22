import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSupabase } from '@/lib/supabase';
import { DEFAULTS, type Content } from './defaults';

const ContentContext = createContext<Content>(DEFAULTS);

// Hook konsumsi konten (dari Supabase bila ada, kalau tidak pakai DEFAULTS)
export function useContent(): Content {
  return useContext(ContentContext);
}

// ---- Bentuk baris DB (snake_case) — dipetakan ke tipe Content di bawah ----
interface ProfileRow {
  name?: string; tagline?: string; roles?: string[];
  about_p1?: string; about_p2?: string; email?: string; whatsapp?: string;
  linkedin?: string; location?: string; avatar_url?: string; cv_url?: string;
}
interface CompanyRow { id: string; name: string; role: string; period: string }
interface ProjectRow {
  title: string; company_id: string; category: string; year: string;
  cover_url: string; tags?: string[]; featured?: boolean; kind?: string;
  description?: string; link?: string; images?: string[];
}
interface CertificateRow { title: string; issuer?: string; year?: string; image_url?: string }
interface ExperienceRow { role: string; org: string; period: string; current: boolean; points?: string[] }
interface EducationRow { degree: string; school: string; gpa: string; period: string }
interface ServiceRow { lead: string; rest: string; description: string }
interface PrincipleRow { title: string; body: string }
interface SkillRow { name: string; pct: number }
interface SoftwareRow { label: string; color: string }
interface StatRow { value: number | string; decimals: number; suffix: string; label: string }
interface MarqueeRow { text: string }

// Ambil array terurut & petakan; balikan fallback bila kosong/gagal
function pick<R, T>(rows: unknown, fallback: T[], map: (r: R) => T): T[] {
  const arr = Array.isArray(rows) ? (rows as R[]) : [];
  return arr.length ? arr.map(map) : fallback;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  // Mulai dari DEFAULTS → situs langsung tampil, lalu di-swap dengan data DB
  const [content, setContent] = useState<Content>(DEFAULTS);

  useEffect(() => {
    let active = true;

    (async () => {
      // Import client-nya dinamis; null bila env kosong → tetap pakai DEFAULTS
      const supabase = await getSupabase();
      if (!supabase || !active) return;
      try {
        const [prof, comp, proj, cert, exp, edu, srv, prin, sk, sw, st, mq] = await Promise.all([
          supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
          supabase.from('companies').select('*').order('sort_order'),
          supabase.from('projects').select('*').eq('published', true).order('sort_order'),
          supabase.from('certificates').select('*').order('sort_order'),
          supabase.from('experience').select('*').order('sort_order'),
          supabase.from('education').select('*').order('sort_order'),
          supabase.from('services').select('*').order('sort_order'),
          supabase.from('principles').select('*').order('sort_order'),
          supabase.from('skills').select('*').order('sort_order'),
          supabase.from('software').select('*').order('sort_order'),
          supabase.from('stats').select('*').order('sort_order'),
          supabase.from('marquee_items').select('*').order('sort_order'),
        ]);
        if (!active) return;

        // peta company_id → nama (untuk menempel ke proyek)
        const companies = (comp.data ?? []) as CompanyRow[];
        const companyById = new Map<string, string>(companies.map((c) => [c.id, c.name]));

        const p = prof.data as ProfileRow | null;
        const e = (edu.data?.[0] ?? null) as EducationRow | null;

        setContent({
          profile: p
            ? {
                name: p.name ?? DEFAULTS.profile.name,
                tagline: p.tagline ?? DEFAULTS.profile.tagline,
                roles: p.roles?.length ? p.roles : DEFAULTS.profile.roles,
                aboutP1: p.about_p1 ?? DEFAULTS.profile.aboutP1,
                aboutP2: p.about_p2 ?? DEFAULTS.profile.aboutP2,
                email: p.email ?? DEFAULTS.profile.email,
                whatsapp: p.whatsapp ?? DEFAULTS.profile.whatsapp,
                linkedin: p.linkedin ?? DEFAULTS.profile.linkedin,
                location: p.location ?? DEFAULTS.profile.location,
                avatarUrl: p.avatar_url ?? DEFAULTS.profile.avatarUrl,
                cvUrl: p.cv_url ?? DEFAULTS.profile.cvUrl,
              }
            : DEFAULTS.profile,
          companies: pick<CompanyRow, Content['companies'][number]>(comp.data, DEFAULTS.companies, (c) => ({
            name: c.name, role: c.role, period: c.period,
          })),
          projects: pick<ProjectRow, Content['projects'][number]>(proj.data, DEFAULTS.projects, (r) => ({
            title: r.title,
            company: companyById.get(r.company_id) || '',
            category: r.category,
            year: r.year,
            cover: r.cover_url,
            tags: r.tags || [],
            featured: r.featured,
            kind: r.kind,
            description: r.description ?? '',
            link: r.link ?? '',
            images: r.images || [],
          })),
          certificates: pick<CertificateRow, Content['certificates'][number]>(cert.data, DEFAULTS.certificates, (r) => ({
            title: r.title, issuer: r.issuer ?? '', year: r.year ?? '', image: r.image_url ?? '',
          })),
          experience: pick<ExperienceRow, Content['experience'][number]>(exp.data, DEFAULTS.experience, (r) => ({
            role: r.role, org: r.org, period: r.period, current: r.current, points: r.points || [],
          })),
          education: e
            ? { degree: e.degree, school: e.school, gpa: e.gpa, period: e.period }
            : DEFAULTS.education,
          services: pick<ServiceRow, Content['services'][number]>(srv.data, DEFAULTS.services, (r) => ({
            lead: r.lead, rest: r.rest, description: r.description,
          })),
          principles: pick<PrincipleRow, Content['principles'][number]>(prin.data, DEFAULTS.principles, (r) => ({
            title: r.title, body: r.body,
          })),
          skills: pick<SkillRow, Content['skills'][number]>(sk.data, DEFAULTS.skills, (r) => ({ name: r.name, pct: r.pct })),
          software: pick<SoftwareRow, Content['software'][number]>(sw.data, DEFAULTS.software, (r) => ({ label: r.label, color: r.color })),
          stats: pick<StatRow, Content['stats'][number]>(st.data, DEFAULTS.stats, (r) => ({
            value: Number(r.value), decimals: r.decimals, suffix: r.suffix, label: r.label,
          })),
          marquee: pick<MarqueeRow, string>(mq.data, DEFAULTS.marquee, (r) => r.text),
        });
      } catch {
        // biarkan DEFAULTS bila ada error
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
