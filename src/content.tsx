import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSupabase } from './lib/supabase';
import {
  PROJECTS as D_PROJECTS,
  EXPERIENCE as D_EXPERIENCE,
  EDUCATION as D_EDUCATION,
  SKILLS as D_SKILLS,
  PROFILE,
  CONTACT as D_CONTACT,
  type Project,
  type Experience,
} from './data';

// The 3D site reads editable data from the SAME Supabase tables the admin CMS
// manages. Anything empty/unreachable falls back to the bundled defaults, so
// the site never regresses before the admin content is filled in.

type Contact = {
  email: string;
  whatsapp: string;
  linkedin: string;
  location: string;
  cv: string;
  name: string;
  portrait: string;
};

export type Content = {
  loaded: boolean;
  projects: Project[];
  experience: Experience[];
  education: typeof D_EDUCATION;
  skills: typeof D_SKILLS;
  contact: Contact;
};

const DEFAULTS: Content = {
  loaded: false,
  projects: D_PROJECTS,
  experience: D_EXPERIENCE,
  education: D_EDUCATION,
  skills: D_SKILLS,
  contact: {
    email: D_CONTACT.email,
    whatsapp: D_CONTACT.whatsapp,
    linkedin: D_CONTACT.linkedin,
    location: D_CONTACT.location,
    cv: D_CONTACT.cv,
    name: PROFILE.name,
    portrait: '/portrait.png',
  },
};

const ContentContext = createContext<Content>(DEFAULTS);
export const useContent = () => useContext(ContentContext);

// ---- DB row shapes (snake_case) ----
interface ProfileRow {
  name?: string; email?: string; whatsapp?: string; linkedin?: string;
  location?: string; avatar_url?: string; cv_url?: string;
}
interface CompanyRow { id: string; name: string }
interface ProjectRow {
  title: string; company_id: string; category: string; year: string;
  cover_url: string; tags?: string[]; kind?: string; description?: string;
  link?: string; images?: string[];
}
interface ExperienceRow { role: string; org: string; period: string; current?: boolean; points?: string[] }
interface EducationRow { degree: string; school: string; gpa: string; period: string }
interface SkillRow { name: string; pct: number }

const nonEmpty = (arr: unknown): arr is unknown[] => Array.isArray(arr) && arr.length > 0;

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(DEFAULTS);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = await getSupabase();
      if (!supabase || !active) return;
      try {
        const [prof, comp, proj, exp, edu, sk] = await Promise.all([
          supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
          supabase.from('companies').select('id,name'),
          supabase.from('projects').select('*').eq('published', true).order('sort_order'),
          supabase.from('experience').select('*').order('sort_order'),
          supabase.from('education').select('*').order('sort_order'),
          supabase.from('skills').select('*').order('sort_order'),
        ]);
        if (!active) return;

        const companyById = new Map<string, string>(
          ((comp.data ?? []) as CompanyRow[]).map((c) => [c.id, c.name]),
        );

        const next: Content = { ...DEFAULTS, loaded: true };

        const p = prof.data as ProfileRow | null;
        next.contact = {
          email: p?.email || DEFAULTS.contact.email,
          whatsapp: p?.whatsapp ? `https://wa.me/${p.whatsapp}` : DEFAULTS.contact.whatsapp,
          linkedin: p?.linkedin || DEFAULTS.contact.linkedin,
          location: p?.location || DEFAULTS.contact.location,
          cv: p?.cv_url || DEFAULTS.contact.cv,
          name: p?.name || DEFAULTS.contact.name,
          portrait: p?.avatar_url || DEFAULTS.contact.portrait,
        };

        if (nonEmpty(proj.data)) {
          // Match by title so admin edits (list/cover/tags/order/publish) win,
          // while rich fields not yet filled in the CMS (description, gallery,
          // link, group) fall back to the bundled defaults — no regression.
          const defByName = new Map(D_PROJECTS.map((p) => [p.name, p]));
          next.projects = (proj.data as ProjectRow[]).map((r, i) => {
            const def = defByName.get(r.title);
            const dbImages = (r.images ?? []).filter(Boolean);
            const gallery = dbImages.length
              ? [r.cover_url, ...dbImages]
              : [r.cover_url, ...(def?.images?.slice(1) ?? [])];
            return {
              num: String(i + 1).padStart(2, '0'),
              name: r.title,
              company: companyById.get(r.company_id) ?? def?.company ?? '',
              category: r.category || def?.category || '',
              group: r.kind || def?.group || 'Branding',
              year: r.year || def?.year || '',
              tags: r.tags && r.tags.length ? r.tags : def?.tags ?? [],
              cover: r.cover_url || def?.cover || '',
              images: gallery.filter(Boolean),
              description: r.description || def?.description || '',
              link: r.link || def?.link || next.contact.linkedin,
            };
          });
        }

        if (nonEmpty(exp.data)) {
          next.experience = (exp.data as ExperienceRow[]).map((r) => ({
            role: r.role,
            org: r.org,
            period: r.period,
            current: r.current,
            points: r.points ?? [],
          }));
        }
        if (nonEmpty(edu.data)) {
          const e = (edu.data as EducationRow[])[0];
          next.education = { degree: e.degree, school: e.school, gpa: e.gpa, period: e.period };
        }
        if (nonEmpty(sk.data)) {
          next.skills = (sk.data as SkillRow[]).map((r) => ({ name: r.name, pct: r.pct }));
        }

        setContent(next);
      } catch {
        /* keep DEFAULTS on any failure */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
