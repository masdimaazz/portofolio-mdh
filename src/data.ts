// Real content for Muhammad Dimas Hadiyanto — graphic, 3D & motion designer.

export const PROFILE = {
  name: 'Muhammad Dimas Hadiyanto',
  first: 'dimas',
  role: 'Graphic & 3D Creator',
  tagline: 'a graphic designer crafting striking, memorable brand, social & 3d motion visuals',
  about:
    "I'm Muhammad Dimas Hadiyanto, a graphic designer and Multimedia Engineering graduate. I focus on branding, social campaigns, and UI/UX, grounded in research and current design trends. Let's build something memorable together!",
  about2:
    'My final project was an Augmented Reality mobile app introducing traditional West Javanese musical instruments — combining education, technology, and design into one experience.',
};

export const CONTACT = {
  email: 'masdimaaz@gmail.com',
  whatsapp: 'https://wa.me/6288215990350',
  linkedin: 'https://www.linkedin.com/in/muhammad-dimas-hadiyanto-a53b37331/',
  location: 'Jakarta, Indonesia',
  cv: '/cv-muhammad-dimas-hadiyanto.pdf',
};

export const NAV = [
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const;

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
  name: string;
  company: string;
  category: string;
  group: string;
  year: string;
  tags: string[];
  cover: string;
  images: string[];
  description: string;
  link: string;
};

const IG = {
  delisari: 'https://www.instagram.com/dsn.idn/',
  firstpage: 'https://www.instagram.com/firstpage.id/',
  kemensos: 'https://www.instagram.com/kemensosri/',
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    name: "Del's Ramadhan Campaign",
    company: 'Delisari Nusantara',
    category: 'Social Media Key Visual',
    group: 'Social',
    year: '2025',
    tags: ['Key Visual', 'Packaging', 'Campaign'],
    cover: '/projects/covers/dels-ramadhan.webp',
    images: ['/projects/covers/dels-ramadhan.webp', '/projects/del-1.webp'],
    description:
      'A warm Ramadhan key visual for Del’s Official Store — festive product hero shots, lantern and crescent motifs, and a clear call to shop the seasonal line-up.',
    link: IG.delisari,
  },
  {
    num: '02',
    name: "Del's Nocciola Display Stand",
    company: 'Delisari Nusantara',
    category: '3D POSM Design',
    group: '3D',
    year: '2025',
    tags: ['3D', 'Blender', 'Retail POSM'],
    cover: '/projects/covers/dels-stand.webp',
    images: ['/projects/covers/dels-stand.webp', '/projects/del-3.webp'],
    description:
      'A retail point-of-sale display stand for Del’s Nocciola spread, modelled and rendered in 3D to visualise the unit before production.',
    link: IG.delisari,
  },
  {
    num: '03',
    name: "Del's Recipe Tent Card",
    company: 'Delisari Nusantara',
    category: 'Print Collateral',
    group: 'Print',
    year: '2025',
    tags: ['Print', 'Layout', 'F&B'],
    cover: '/projects/covers/dels-tentcard.webp',
    images: ['/projects/covers/dels-tentcard.webp'],
    description:
      'A table tent card featuring Del’s recipe inspiration — appetising food photography paired with clean, appetite-driven layout.',
    link: IG.delisari,
  },
  {
    num: '04',
    name: "Del's Idul Adha Greeting",
    company: 'Delisari Nusantara',
    category: 'Social Media Greeting',
    group: 'Social',
    year: '2025',
    tags: ['Greeting', 'Brand', 'Social'],
    cover: '/projects/covers/dels-iduladha.webp',
    images: ['/projects/covers/dels-iduladha.webp', '/projects/del-2.webp'],
    description:
      'An Idul Adha greeting for Del’s — elegant, on-brand typography and ornament celebrating the moment with the audience.',
    link: IG.delisari,
  },
  {
    num: '05',
    name: 'Firstpage.id Content Series',
    company: 'Firstpage.id',
    category: 'LinkedIn & Instagram Feeds',
    group: 'Branding',
    year: '2025',
    tags: ['Editorial', 'Social Feeds', 'Branding'],
    cover: '/projects/covers/firstpage.webp',
    images: [
      '/projects/covers/firstpage.webp',
      '/projects/fp-1.webp',
      '/projects/fp-2.webp',
      '/projects/fp-3.webp',
    ],
    description:
      'An editorial content series for Firstpage.id across LinkedIn and Instagram — a consistent visual system that turns marketing insights into scroll-stopping feeds.',
    link: IG.firstpage,
  },
  {
    num: '06',
    name: 'Hari Anak Nasional 2023',
    company: 'Kementerian Sosial RI',
    category: 'Government Campaign',
    group: 'Social',
    year: '2023',
    tags: ['Government', 'Feed Design', 'Layout'],
    cover: '/projects/covers/kemensos.webp',
    images: [
      '/projects/covers/kemensos.webp',
      '/projects/km-1.webp',
      '/projects/km-2.webp',
      '/projects/km-3.webp',
    ],
    description:
      'Instagram feed content for the Ministry of Social Affairs’ National Children’s Day 2023 — informative, child-friendly layouts within government brand guidelines.',
    link: IG.kemensos,
  },
];

export const PROJECT_GROUPS = ['All', 'Branding', 'Social', '3D', 'Print'] as const;

// Brands & institutions worked with (dark logos → shown on the light block).
export const COMPANIES = [
  { name: 'Delisari Nusantara', logo: '/logos/companies/delisari-dark.png' },
  { name: 'Firstpage.id', logo: '/logos/companies/firstpage-dark.png' },
  { name: 'Kementerian Sosial RI', logo: '/logos/companies/kemensos.png' },
];

// Self-hosted marquee tiles (real work). 16 images split across two rows.
export const MARQUEE = Array.from(
  { length: 16 },
  (_, i) => `/marquee/m-${String(i + 1).padStart(2, '0')}.webp`,
);

// "Realizing" gallery — a curated grid of real work (reuses marquee stills).
export const REALIZING = [
  '/marquee/m-01.webp', '/marquee/m-07.webp', '/marquee/m-12.webp',
  '/marquee/m-03.webp', '/marquee/m-09.webp', '/marquee/m-14.webp',
  '/marquee/m-05.webp', '/marquee/m-11.webp',
];

export const STATS = [
  { value: 5, decimals: 0, suffix: '+', label: 'Years in design' },
  { value: 20, decimals: 0, suffix: '+', label: 'Projects delivered' },
  { value: 4, decimals: 0, suffix: '', label: 'Brands & institutions' },
  { value: 3.52, decimals: 2, suffix: '', label: 'GPA / 4.00' },
];

export const TICKER = [
  'Available for Freelance',
  'Branding',
  'Social Campaigns',
  '3D & Motion',
  'UI/UX Design',
  'Packaging',
  'Editorial Layout',
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
  { name: 'Photoshop', logo: '/logos/tools/photoshop.svg' },
  { name: 'Illustrator', logo: '/logos/tools/illustrator.svg' },
  { name: 'After Effects', logo: '/logos/tools/after-effects.svg' },
  { name: 'Premiere Pro', logo: '/logos/tools/premiere.svg' },
  { name: 'InDesign', logo: '/logos/tools/indesign.svg' },
  { name: 'Figma', logo: '/logos/tools/figma.svg' },
  { name: 'Blender', logo: '/logos/tools/blender.svg' },
  { name: 'Canva', logo: '/logos/tools/canva.svg' },
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
