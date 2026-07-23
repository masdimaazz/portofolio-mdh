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
  { label: 'Contact', href: '#contact' },
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

export const STATS = [
  { value: '5+', label: 'Years in design' },
  { value: '20+', label: 'Projects delivered' },
  { value: '4', label: 'Brands & institutions' },
  { value: '3.52', label: 'GPA / 4.00' },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'Creative Marketing Intern',
    org: 'PT. Delisari Nusantara',
    period: 'May 2025 – Jul 2025',
    points: [
      'Produced visual promo materials — catalogs, product packaging, and social media content.',
      'Contributed creative ideas to boost brand engagement on digital platforms.',
      'Adapted design trends and market insight into on-target output.',
    ],
  },
  {
    role: 'Graphic Design Intern',
    org: 'Firstpage.id',
    period: 'Jan 2025 – Jul 2025',
    points: [
      'Designed Instagram feed content for Firstpage.id.',
      'Created LinkedIn feed visuals and editorial layouts.',
      'Delivered role-specific work with measurable engagement results.',
    ],
  },
  {
    role: 'Social Media Staff',
    org: 'Karang Taruna',
    period: 'Oct 2024 – Present',
    current: true,
    points: [
      'Design visual content (posters, feeds, stories) for social, religious, and youth activities.',
      'Write informative, engaging captions and copywriting.',
      'Document activities for promotion and digital archives.',
    ],
  },
  {
    role: 'Graphic Design Intern',
    org: 'Kementerian Sosial RI',
    period: 'Feb 2023 – Jul 2023',
    points: [
      'Designed Instagram feed content for the Ministry of Social Affairs.',
      'Managed the social media content timeline.',
      'Rebranded the HLUN 2022 logo and Instagram feed branding.',
    ],
  },
];

export const SKILLS = [
  { name: 'Illustrator', pct: 92 },
  { name: 'Photoshop', pct: 88 },
  { name: 'Canva', pct: 95 },
  { name: 'After Effects', pct: 80 },
  { name: 'Premiere Pro', pct: 82 },
  { name: 'Blender', pct: 70 },
];

export const SOFTWARE = [
  { label: 'Ps', name: 'Photoshop', color: '#31A8FF' },
  { label: 'Ai', name: 'Illustrator', color: '#FF9A00' },
  { label: 'Ae', name: 'After Effects', color: '#9999FF' },
  { label: 'Pr', name: 'Premiere Pro', color: '#EA77FF' },
  { label: 'Id', name: 'InDesign', color: '#FF3366' },
  { label: 'Fig', name: 'Figma', color: '#A259FF' },
  { label: 'Bl', name: 'Blender', color: '#EA7600' },
  { label: 'Cv', name: 'Canva', color: '#00C4CC' },
];

export const PRINCIPLES = [
  {
    title: 'Clarity above excess',
    body: 'Every element earns its place. I strip away the noise so the message lands instantly — legible, focused, and honest.',
  },
  {
    title: 'Aesthetic with purpose',
    body: 'Beauty that serves the brand, never decoration for its own sake. Each visual choice supports a clear intent.',
  },
  {
    title: 'Research-driven thinking',
    body: 'Design grounded in user insight and current visual culture — decisions backed by context, not guesswork.',
  },
  {
    title: 'Built beyond trends',
    body: 'Systems and identities made to stay relevant, not just fashionable. Work that still holds up years later.',
  },
];

export const EDUCATION = {
  degree: 'Applied Bachelor — Multimedia Engineering Technology',
  school: 'Politeknik Negeri Media Kreatif Jakarta',
  gpa: '3.52',
  period: 'Aug 2020 – Nov 2024',
};
