// Definisi entitas & field → menggerakkan editor CRUD generik.
// Menambah kolom cukup di sini, tak perlu bikin komponen baru.

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'tags' // array pendek, dipisah koma (chip)
  | 'list' // array kalimat, satu per baris
  | 'image' // upload → public URL
  | 'color'
  | 'select' // FK dropdown
  | 'choice'; // pilihan statis (dropdown)

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  optionsFrom?: string; // untuk 'select': nama tabel sumber (id + labelKey)
  optionLabel?: string; // kolom label di tabel sumber
  imageFolder?: string; // untuk 'image': folder di Storage
  choices?: string[]; // untuk 'choice': daftar opsi statis
}

export interface Entity {
  table: string;
  label: string;
  icon: string; // emoji sidebar
  single?: boolean; // profile: satu baris id=1
  titleKey?: string; // kolom untuk judul di list
  subtitleKey?: string; // kolom untuk sub-judul di list
  publishKey?: string; // kolom boolean toggle publish (projects)
  fields: Field[];
  defaultRow: Record<string, unknown>;
}

export const ENTITIES: Entity[] = [
  {
    table: 'profile',
    label: 'Profile',
    icon: '👤',
    single: true,
    fields: [
      { key: 'name', label: 'Nama', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'roles', label: 'Roles', type: 'tags', help: 'Pisahkan dengan koma' },
      { key: 'hero_headline', label: 'Hero headline', type: 'text' },
      { key: 'about_p1', label: 'About — paragraf 1', type: 'textarea' },
      { key: 'about_p2', label: 'About — paragraf 2', type: 'textarea' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'whatsapp', label: 'WhatsApp', type: 'text', help: 'Format 62xxx' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
      { key: 'location', label: 'Lokasi', type: 'text' },
      { key: 'avatar_url', label: 'Foto profil', type: 'image', imageFolder: 'avatar' },
      { key: 'cv_url', label: 'CV URL', type: 'text' },
    ],
    defaultRow: { id: 1 },
  },
  {
    table: 'companies',
    label: 'Companies',
    icon: '🏢',
    titleKey: 'name',
    subtitleKey: 'role',
    fields: [
      { key: 'name', label: 'Nama perusahaan', type: 'text' },
      { key: 'role', label: 'Peran', type: 'text' },
      { key: 'period', label: 'Periode', type: 'text' },
    ],
    defaultRow: { name: '', role: '', period: '' },
  },
  {
    table: 'projects',
    label: 'Projects',
    icon: '🎨',
    titleKey: 'title',
    subtitleKey: 'category',
    publishKey: 'published',
    fields: [
      { key: 'title', label: 'Judul', type: 'text' },
      {
        key: 'company_id',
        label: 'Perusahaan',
        type: 'select',
        optionsFrom: 'companies',
        optionLabel: 'name',
      },
      { key: 'category', label: 'Kategori (deskripsi)', type: 'text' },
      {
        key: 'kind',
        label: 'Tipe (untuk filter)',
        type: 'choice',
        choices: ['Branding', 'Social', 'Print', '3D', 'Motion', 'UI/UX'],
      },
      { key: 'year', label: 'Tahun', type: 'text' },
      { key: 'cover_url', label: 'Cover', type: 'image', imageFolder: 'projects' },
      { key: 'tags', label: 'Tags', type: 'tags', help: 'Pisahkan dengan koma' },
      { key: 'featured', label: 'Featured (kartu besar)', type: 'boolean' },
      { key: 'published', label: 'Published (tampil di situs)', type: 'boolean' },
    ],
    defaultRow: {
      title: '',
      company_id: null,
      category: '',
      kind: '',
      year: '',
      cover_url: '',
      tags: [],
      featured: false,
      published: true,
    },
  },
  {
    table: 'certificates',
    label: 'Certificates',
    icon: '📜',
    titleKey: 'title',
    subtitleKey: 'issuer',
    fields: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'issuer', label: 'Penerbit', type: 'text' },
      { key: 'year', label: 'Tahun', type: 'text' },
      { key: 'image_url', label: 'Gambar sertifikat', type: 'image', imageFolder: 'certificates' },
    ],
    defaultRow: { title: '', issuer: '', year: '', image_url: '' },
  },
  {
    table: 'experience',
    label: 'Experience',
    icon: '💼',
    titleKey: 'role',
    subtitleKey: 'org',
    fields: [
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'org', label: 'Organisasi', type: 'text' },
      { key: 'period', label: 'Periode', type: 'text' },
      { key: 'current', label: 'Sedang berjalan', type: 'boolean' },
      { key: 'points', label: 'Poin', type: 'list', help: 'Satu poin per baris' },
    ],
    defaultRow: { role: '', org: '', period: '', current: false, points: [] },
  },
  {
    table: 'education',
    label: 'Education',
    icon: '🎓',
    titleKey: 'degree',
    subtitleKey: 'school',
    fields: [
      { key: 'degree', label: 'Gelar / Program', type: 'text' },
      { key: 'school', label: 'Sekolah / Kampus', type: 'text' },
      { key: 'gpa', label: 'IPK', type: 'text' },
      { key: 'period', label: 'Periode', type: 'text' },
    ],
    defaultRow: { degree: '', school: '', gpa: '', period: '' },
  },
  {
    table: 'services',
    label: 'Services',
    icon: '🛠️',
    titleKey: 'lead',
    subtitleKey: 'rest',
    fields: [
      { key: 'lead', label: 'Judul (baris 1)', type: 'text' },
      { key: 'rest', label: 'Judul (baris 2)', type: 'text' },
      { key: 'description', label: 'Deskripsi', type: 'textarea' },
    ],
    defaultRow: { lead: '', rest: '', description: '' },
  },
  {
    table: 'principles',
    label: 'Principles',
    icon: '📐',
    titleKey: 'title',
    subtitleKey: 'body',
    fields: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'body', label: 'Isi', type: 'textarea' },
    ],
    defaultRow: { title: '', body: '' },
  },
  {
    table: 'skills',
    label: 'Skills',
    icon: '📊',
    titleKey: 'name',
    subtitleKey: 'pct',
    fields: [
      { key: 'name', label: 'Nama skill', type: 'text' },
      { key: 'pct', label: 'Persentase (0–100)', type: 'number' },
    ],
    defaultRow: { name: '', pct: 0 },
  },
  {
    table: 'software',
    label: 'Software',
    icon: '🧩',
    titleKey: 'label',
    subtitleKey: 'color',
    fields: [
      { key: 'label', label: 'Label (Ps/Ai/…)', type: 'text' },
      { key: 'color', label: 'Warna', type: 'color' },
    ],
    defaultRow: { label: '', color: '#3b82f6' },
  },
  {
    table: 'stats',
    label: 'Stats',
    icon: '🔢',
    titleKey: 'label',
    subtitleKey: 'value',
    fields: [
      { key: 'value', label: 'Nilai', type: 'number' },
      { key: 'decimals', label: 'Jumlah desimal', type: 'number' },
      { key: 'suffix', label: 'Suffix (mis. +)', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
    ],
    defaultRow: { value: 0, decimals: 0, suffix: '', label: '' },
  },
  {
    table: 'marquee_items',
    label: 'Marquee',
    icon: '🎞️',
    titleKey: 'text',
    fields: [{ key: 'text', label: 'Teks', type: 'text' }],
    defaultRow: { text: '' },
  },
];
