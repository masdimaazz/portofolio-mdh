import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'id';

type Dict = {
  nav: { about: string; services: string; projects: string; contact: string };
  hero: { available: string; tagline: string };
  about: { title: string; p1: string; p2: string; contactBtn: string; cvBtn: string };
  stats: string[];
  ticker: string[];
  services: { title: string; items: { name: string; desc: string }[] };
  experience: { title: string; now: string };
  brands: { trusted: string };
  skills: { title: string; tools: string };
  projects: {
    title: string;
    filters: Record<string, string>;
    view: string;
    live: string;
  };
  realizing: { title: string; subtitle: string; seeMore: string };
  principles: { title: string; items: { title: string; body: string }[] };
  footer: { work: string; getInTouch: string; intro: string; downloadCV: string };
  form: {
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    thanks: string;
  };
};

export const TRANSLATIONS: Record<Lang, Dict> = {
  en: {
    nav: { about: 'About', services: 'Services', projects: 'Projects', contact: 'Contact' },
    hero: {
      available: 'Available for work',
      tagline: 'a graphic designer crafting striking, memorable brand, social & 3d motion visuals',
    },
    about: {
      title: 'About me',
      p1: "I'm Muhammad Dimas Hadiyanto, a graphic designer and Multimedia Engineering graduate. I focus on branding, social campaigns, and UI/UX, grounded in research and current design trends. Let's build something memorable together!",
      p2: 'My final project was an Augmented Reality mobile app introducing traditional West Javanese musical instruments — combining education, technology, and design into one experience.',
      contactBtn: 'Contact Me',
      cvBtn: 'Download CV',
    },
    stats: ['Years in design', 'Projects delivered', 'Brands & institutions', 'GPA / 4.00'],
    ticker: [
      'Available for Freelance',
      'Branding',
      'Social Campaigns',
      '3D & Motion',
      'UI/UX Design',
      'Packaging',
      'Editorial Layout',
    ],
    services: {
      title: 'Services',
      items: [
        {
          name: 'Brand Identity',
          desc: 'Distinctive logos, systems and guidelines that make brands instantly recognisable across every touchpoint.',
        },
        {
          name: 'Social & Campaigns',
          desc: 'Scroll-stopping key visuals, feeds and ad creatives tuned to each platform and audience.',
        },
        {
          name: 'Digital Experience',
          desc: 'Research-driven, accessible UI/UX and web design — from wireframes to polished front-ends.',
        },
        {
          name: '3D & Motion',
          desc: 'Eye-catching 3D POSM, packaging renders and micro-animations that add life to a brand.',
        },
      ],
    },
    experience: { title: 'Experience', now: 'Now' },
    brands: { trusted: 'Trusted by brands & institutions' },
    skills: { title: 'Skills', tools: 'Tools' },
    projects: {
      title: 'Projects',
      filters: { All: 'All', Branding: 'Branding', Social: 'Social', '3D': '3D', Print: 'Print' },
      view: 'View project',
      live: 'Live Project',
    },
    realizing: {
      title: 'Realizing',
      subtitle: 'a selection of visuals, campaigns and renders brought to life',
      seeMore: 'See more work',
    },
    principles: {
      title: 'Principles',
      items: [
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
      ],
    },
    footer: {
      work: "Let's work together",
      getInTouch: 'Get in touch',
      intro: 'Have a project in mind or just want to say hello? Drop a message or reach me directly.',
      downloadCV: 'Download CV',
    },
    form: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me about your project…',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Sent',
      thanks: "Thanks — I'll get back to you soon.",
    },
  },
  id: {
    nav: { about: 'Tentang', services: 'Layanan', projects: 'Proyek', contact: 'Kontak' },
    hero: {
      available: 'Tersedia untuk proyek',
      tagline: 'desainer grafis yang merancang visual brand, sosial & motion 3d yang menarik dan berkesan',
    },
    about: {
      title: 'Tentang saya',
      p1: 'Saya Muhammad Dimas Hadiyanto, desainer grafis dan lulusan Teknik Multimedia. Saya fokus pada branding, kampanye media sosial, dan UI/UX, berlandaskan riset dan tren desain terkini. Mari wujudkan sesuatu yang berkesan bersama!',
      p2: 'Proyek akhir saya adalah aplikasi mobile Augmented Reality yang memperkenalkan alat musik tradisional Jawa Barat — memadukan edukasi, teknologi, dan desain dalam satu pengalaman.',
      contactBtn: 'Hubungi Saya',
      cvBtn: 'Unduh CV',
    },
    stats: ['Tahun berkarya', 'Proyek diselesaikan', 'Brand & institusi', 'IPK / 4.00'],
    ticker: [
      'Terbuka untuk Freelance',
      'Branding',
      'Kampanye Sosial',
      '3D & Motion',
      'Desain UI/UX',
      'Kemasan',
      'Tata Letak Editorial',
    ],
    services: {
      title: 'Layanan',
      items: [
        {
          name: 'Identitas Brand',
          desc: 'Logo, sistem, dan panduan khas yang membuat brand langsung dikenali di setiap titik sentuh.',
        },
        {
          name: 'Sosial & Kampanye',
          desc: 'Key visual, feed, dan materi iklan yang memikat, disesuaikan dengan tiap platform dan audiens.',
        },
        {
          name: 'Pengalaman Digital',
          desc: 'UI/UX dan desain web berbasis riset dan mudah diakses — dari wireframe hingga front-end yang rapi.',
        },
        {
          name: '3D & Motion',
          desc: 'POSM 3D, render kemasan, dan mikro-animasi memikat yang menghidupkan sebuah brand.',
        },
      ],
    },
    experience: { title: 'Pengalaman', now: 'Kini' },
    brands: { trusted: 'Dipercaya brand & institusi' },
    skills: { title: 'Keahlian', tools: 'Perangkat' },
    projects: {
      title: 'Proyek',
      filters: { All: 'Semua', Branding: 'Branding', Social: 'Sosial', '3D': '3D', Print: 'Cetak' },
      view: 'Lihat proyek',
      live: 'Live Project',
    },
    realizing: {
      title: 'Realizing',
      subtitle: 'kumpulan visual, kampanye, dan render yang diwujudkan',
      seeMore: 'Lihat karya lain',
    },
    principles: {
      title: 'Prinsip',
      items: [
        {
          title: 'Jernih tanpa berlebihan',
          body: 'Setiap elemen punya alasan. Saya buang kebisingan agar pesan langsung tersampaikan — terbaca, fokus, dan jujur.',
        },
        {
          title: 'Estetika yang bertujuan',
          body: 'Keindahan yang melayani brand, bukan sekadar hiasan. Tiap pilihan visual mendukung maksud yang jelas.',
        },
        {
          title: 'Berbasis riset',
          body: 'Desain berpijak pada wawasan pengguna dan budaya visual terkini — keputusan didukung konteks, bukan tebakan.',
        },
        {
          title: 'Melampaui tren',
          body: 'Sistem dan identitas yang dibuat agar tetap relevan, bukan hanya modis. Karya yang tetap bertahan bertahun-tahun.',
        },
      ],
    },
    footer: {
      work: 'Mari berkolaborasi',
      getInTouch: 'Hubungi saya',
      intro: 'Punya proyek atau sekadar ingin menyapa? Kirim pesan atau hubungi saya langsung.',
      downloadCV: 'Unduh CV',
    },
    form: {
      name: 'Nama kamu',
      email: 'Email kamu',
      message: 'Ceritakan tentang proyekmu…',
      send: 'Kirim pesan',
      sending: 'Mengirim…',
      sent: 'Terkirim',
      thanks: 'Terima kasih — saya akan segera membalas.',
    },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en' || saved === 'id') setLangState(saved);
    else if (navigator.language.toLowerCase().startsWith('id')) setLangState('id');
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
