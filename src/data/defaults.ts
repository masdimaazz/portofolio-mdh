// Data default = fallback bila Supabase belum siap / gagal.
// Bentuknya identik dengan yang di-seed ke DB, gambar pakai aset lokal.
import delsRamadhan from '@/assets/work/dels-ramadhan.webp';
import delsStand from '@/assets/work/dels-stand.webp';
import delsIdulAdha from '@/assets/work/dels-iduladha.webp';
import delsTentCard from '@/assets/work/dels-tentcard.webp';
import firstpage from '@/assets/work/firstpage.webp';
import kemensos from '@/assets/work/kemensos.webp';
// Foto profil disajikan dari /public (bukan di-bundle) supaya bisa di-<link rel=preload>
// dari index.html → LCP hero lebih cepat.
const profileImg = '/profile.webp';

export interface Profile {
  name: string;
  tagline: string;
  roles: string[];
  aboutP1: string;
  aboutP2: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  location: string;
  avatarUrl: string;
  cvUrl: string;
}
export interface Company { name: string; role: string; period: string }
export interface Project {
  title: string; company: string; category: string; year: string;
  cover: string; tags: string[]; featured?: boolean; kind?: string;
  description?: string; link?: string; images?: string[];
}
export interface Certificate { title: string; issuer: string; year: string; image: string }
export interface ExperienceItem {
  role: string; org: string; period: string; current: boolean; points: string[];
}
export interface Education { degree: string; school: string; gpa: string; period: string }
export interface Service { lead: string; rest: string; description: string }
export interface Principle { title: string; body: string }
export interface Skill { name: string; pct: number }
export interface Software { label: string; color: string }
export interface Stat { value: number; decimals: number; suffix: string; label: string }

export interface Content {
  profile: Profile;
  companies: Company[];
  projects: Project[];
  certificates: Certificate[];
  experience: ExperienceItem[];
  education: Education | null;
  services: Service[];
  principles: Principle[];
  skills: Skill[];
  software: Software[];
  stats: Stat[];
  marquee: string[];
}

export const DEFAULTS: Content = {
  profile: {
    name: 'Muhammad Dimas Hadiyanto',
    tagline: 'Graphic Designer · Motion Graphic · UI/UX & Editor',
    roles: ['Graphic Designer', 'Motion Graphic', 'UI/UX', 'Editor'],
    aboutP1:
      "I'm Muhammad Dimas Hadiyanto — a graphic designer and Multimedia Engineering graduate from Politeknik Negeri Media Kreatif Jakarta. My work spans brand visuals, packaging, social campaigns, and UI/UX, always grounded in research and current design trends.",
    aboutP2:
      'My final project was an Augmented Reality mobile app introducing traditional West Javanese musical instruments — combining education, technology, and design into one experience.',
    email: 'masdimaaz@gmail.com',
    whatsapp: '6288215990350',
    linkedin: 'https://www.linkedin.com/in/muhammad-dimas-hadiyanto-a53b37331/',
    location: 'Jakarta, Indonesia',
    avatarUrl: profileImg,
    cvUrl: '',
  },
  companies: [
    { name: 'Delisari Nusantara', role: 'Creative Marketing · F&B Brand', period: '2025' },
    { name: 'Firstpage.id', role: 'Graphic Design · Content Series', period: '2025' },
    { name: 'Kementerian Sosial RI', role: 'Graphic Design · Government', period: '2023' },
  ],
  projects: [
    { title: "Del's Ramadhan Campaign", company: 'Delisari Nusantara', category: 'Social Media Key Visual', year: '2025', cover: delsRamadhan, tags: ['Key Visual', 'Packaging', 'Campaign'], featured: true, kind: 'Branding' },
    { title: "Del's Nocciola Display Stand", company: 'Delisari Nusantara', category: '3D POSM Design', year: '2025', cover: delsStand, tags: ['3D', 'Blender', 'Retail POSM'], kind: '3D' },
    { title: "Del's Recipe Tent Card", company: 'Delisari Nusantara', category: 'Print Collateral', year: '2025', cover: delsTentCard, tags: ['Print', 'Layout', 'F&B'], kind: 'Print' },
    { title: "Del's Idul Adha Greeting", company: 'Delisari Nusantara', category: 'Social Media Greeting', year: '2025', cover: delsIdulAdha, tags: ['Greeting', 'Brand', 'Social'], kind: 'Social' },
    { title: 'Firstpage.id Content Series', company: 'Firstpage.id', category: 'LinkedIn & Instagram Feeds', year: '2025', cover: firstpage, tags: ['Editorial', 'Social Feeds', 'Branding'], kind: 'Social' },
    { title: 'Hari Anak Nasional 2023', company: 'Kementerian Sosial RI', category: 'Government Campaign', year: '2023', cover: kemensos, tags: ['Government', 'Feed Design', 'Layout'], kind: 'Social' },
  ],
  certificates: [],
  experience: [
    { role: 'Creative Marketing Intern', org: 'PT. Delisari Nusantara', period: 'May 2025 – Jul 2025', current: false, points: ['Produced visual promo materials — catalogs, product packaging, and social media content.', 'Contributed creative ideas to boost brand engagement on digital platforms.', 'Adapted design trends and market insight into on-target output.'] },
    { role: 'Graphic Design Intern', org: 'Firstpage.id', period: 'Jan 2025 – Jul 2025', current: false, points: ['Designed Instagram feed content for Firstpage.id.', 'Created LinkedIn feed visuals and editorial layouts.', 'Delivered role-specific work with measurable engagement results.'] },
    { role: 'Social Media Staff', org: 'Karang Taruna', period: 'Oct 2024 – Present', current: true, points: ['Design visual content (posters, feeds, stories) for social, religious, and youth activities.', 'Write informative, engaging captions and copywriting.', 'Document activities for promotion and digital archives.'] },
    { role: 'Graphic Design Intern', org: 'Kementerian Sosial RI', period: 'Feb 2023 – Jul 2023', current: false, points: ['Designed Instagram feed content for the Ministry of Social Affairs.', 'Managed the social media content timeline.', 'Rebranded the HLUN 2022 logo and Instagram feed branding.'] },
  ],
  education: { degree: 'Applied Bachelor — Multimedia Engineering Technology', school: 'Politeknik Negeri Media Kreatif Jakarta', gpa: '3.52', period: 'Aug 2020 – Nov 2024' },
  services: [
    { lead: 'Brand', rest: 'Identity', description: 'Distinctive logos, systems and guidelines that make brands instantly recognisable across every touchpoint.' },
    { lead: 'Social &', rest: 'Campaigns', description: 'Scroll-stopping key visuals, feeds and ad creatives tuned to each platform and audience.' },
    { lead: 'Digital', rest: 'Experience', description: 'Research-driven, accessible UI/UX and web design — from wireframes to polished front-ends.' },
    { lead: '3D &', rest: 'Motion', description: 'Eye-catching 3D POSM, packaging renders and micro-animations that add life to a brand.' },
  ],
  principles: [
    { title: 'Clarity above excess', body: 'Every element earns its place. I strip away the noise so the message lands instantly — legible, focused, and honest.' },
    { title: 'Aesthetic with purpose', body: 'Beauty that serves the brand, never decoration for its own sake. Each visual choice supports a clear intent.' },
    { title: 'Research-driven thinking', body: 'Design grounded in user insight and current visual culture — decisions backed by context, not guesswork.' },
    { title: 'Built beyond trends', body: 'Systems and identities made to stay relevant, not just fashionable. Work that still holds up years later.' },
  ],
  skills: [
    { name: 'Illustrator', pct: 92 }, { name: 'Photoshop', pct: 88 }, { name: 'Canva', pct: 95 },
    { name: 'After Effects', pct: 80 }, { name: 'Premiere Pro', pct: 82 }, { name: 'Blender', pct: 70 },
  ],
  software: [
    { label: 'Ps', color: '#31A8FF' }, { label: 'Ai', color: '#FF9A00' }, { label: 'Ae', color: '#9999FF' },
    { label: 'Pr', color: '#EA77FF' }, { label: 'Id', color: '#FF3366' }, { label: 'Fig', color: '#A259FF' },
    { label: 'Bl', color: '#EA7600' }, { label: 'Cv', color: '#00C4CC' },
  ],
  stats: [
    { value: 5, decimals: 0, suffix: '+', label: 'Years in design' },
    { value: 20, decimals: 0, suffix: '+', label: 'Projects delivered' },
    { value: 4, decimals: 0, suffix: '', label: 'Brands & institutions' },
    { value: 3.52, decimals: 2, suffix: '', label: 'GPA / 4.0' },
  ],
  marquee: ['Branding', 'Social Campaigns', 'UI / UX Design', '3D & Motion', 'Packaging', 'Editorial Layout'],
};
