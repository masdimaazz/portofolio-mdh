// Real content for Muhammad Dimas Hadiyanto — graphic, 3D & motion designer.

export const PROFILE = {
  name: 'Muhammad Dimas Hadiyanto',
  first: 'dimas',
  role: 'Graphic & 3D Creator',
  tagline: 'a graphic designer crafting striking, memorable brand, social & 3d motion visuals',
  about:
    "I'm Muhammad Dimas Hadiyanto, a graphic designer and Multimedia Engineering graduate. I focus on branding, social campaigns, and UI/UX, grounded in research and current design trends. Let's build something memorable together!",
};

export const CONTACT = {
  email: 'masdimaaz@gmail.com',
  whatsapp: 'https://wa.me/6288215990350',
  linkedin: 'https://www.linkedin.com/in/muhammad-dimas-hadiyanto-a53b37331/',
  location: 'Jakarta, Indonesia',
};

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: CONTACT.whatsapp },
];

export const SERVICES = [
  {
    num: '01',
    name: 'Brand Identity',
    desc: 'Distinctive logos, systems and guidelines that make brands instantly recognisable across every touchpoint.',
  },
  {
    num: '02',
    name: 'Social & Campaigns',
    desc: 'Scroll-stopping key visuals, feeds and ad creatives tuned to each platform and audience.',
  },
  {
    num: '03',
    name: 'Digital Experience',
    desc: 'Research-driven, accessible UI/UX and web design — from wireframes to polished front-ends.',
  },
  {
    num: '04',
    name: '3D & Motion',
    desc: 'Eye-catching 3D POSM, packaging renders and micro-animations that add life to a brand.',
  },
];

export type Project = {
  num: string;
  category: string;
  name: string;
  col1: [string, string];
  col2: string;
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    category: 'Client · F&B',
    name: 'Delisari Nusantara',
    col1: ['/projects/del-1.webp', '/projects/del-2.webp'],
    col2: '/projects/del-3.webp',
  },
  {
    num: '02',
    category: 'Client · Editorial',
    name: 'Firstpage.id',
    col1: ['/projects/fp-1.webp', '/projects/fp-2.webp'],
    col2: '/projects/fp-3.webp',
  },
  {
    num: '03',
    category: 'Government',
    name: 'Kementerian Sosial RI',
    col1: ['/projects/km-1.webp', '/projects/km-2.webp'],
    col2: '/projects/km-3.webp',
  },
];

// Self-hosted marquee tiles (real work). 16 images split across two rows.
export const MARQUEE = Array.from(
  { length: 16 },
  (_, i) => `/marquee/m-${String(i + 1).padStart(2, '0')}.webp`,
);
