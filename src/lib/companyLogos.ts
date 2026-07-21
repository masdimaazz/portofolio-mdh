import delisari from '@/assets/logos/companies/delisari-dark.png';
import firstpage from '@/assets/logos/companies/firstpage-dark.png';
import kemensos from '@/assets/logos/companies/kemensos.png';

// Cocokkan nama perusahaan/organisasi (dari DB, bisa "PT. Delisari Nusantara",
// "Kementerian Sosial RI", dll.) → logo lokal. Balikan undefined bila tak ada.
export function companyLogo(name?: string): string | undefined {
  if (!name) return undefined;
  const n = name.toLowerCase();
  if (n.includes('delisari')) return delisari;
  if (n.includes('firstpage')) return firstpage;
  if (n.includes('sosial') || n.includes('kemensos')) return kemensos;
  return undefined;
}
