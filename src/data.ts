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
  // Optional: paste a Formspree endpoint (https://formspree.io/f/xxxx) to make
  // the contact form submit asynchronously. Empty = fall back to a mailto: draft.
  formEndpoint: '',
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
  name: string;
  company: string;
  category: string;
  year: string;
  tags: string[];
  cover: string;
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    name: "Del's Ramadhan Campaign",
    company: 'Delisari Nusantara',
    category: 'Social Media Key Visual',
    year: '2025',
    tags: ['Key Visual', 'Packaging', 'Campaign'],
    cover: '/projects/covers/dels-ramadhan.webp',
  },
  {
    num: '02',
    name: "Del's Nocciola Display Stand",
    company: 'Delisari Nusantara',
    category: '3D POSM Design',
    year: '2025',
    tags: ['3D', 'Blender', 'Retail POSM'],
    cover: '/projects/covers/dels-stand.webp',
  },
  {
    num: '03',
    name: "Del's Recipe Tent Card",
    company: 'Delisari Nusantara',
    category: 'Print Collateral',
    year: '2025',
    tags: ['Print', 'Layout', 'F&B'],
    cover: '/projects/covers/dels-tentcard.webp',
  },
  {
    num: '04',
    name: "Del's Idul Adha Greeting",
    company: 'Delisari Nusantara',
    category: 'Social Media Greeting',
    year: '2025',
    tags: ['Greeting', 'Brand', 'Social'],
    cover: '/projects/covers/dels-iduladha.webp',
  },
  {
    num: '05',
    name: 'Firstpage.id Content Series',
    company: 'Firstpage.id',
    category: 'LinkedIn & Instagram Feeds',
    year: '2025',
    tags: ['Editorial', 'Social Feeds', 'Branding'],
    cover: '/projects/covers/firstpage.webp',
  },
  {
    num: '06',
    name: 'Hari Anak Nasional 2023',
    company: 'Kementerian Sosial RI',
    category: 'Government Campaign',
    year: '2023',
    tags: ['Government', 'Feed Design', 'Layout'],
    cover: '/projects/covers/kemensos.webp',
  },
];

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
