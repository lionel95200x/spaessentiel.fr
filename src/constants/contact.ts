const phone = '06 23 88 15 14'

export const CONTACT = {
  phone,
  phoneHref: `tel:${phone.replace(/\s/g, '')}`,
  email: {
    label: 'Nous écrire',
    href: 'mailto:contact@spaessentiel.fr',
  },
  address: {
    company: 'Spa Essentiel',
    street: '45 rue de Vaugirard',
    postal: '75006 Paris',
    country: 'France',
  },
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/spaessentiel' },
    { label: 'Youtube', href: 'https://www.youtube.com/spaessentiel' },
    { label: 'Instagram', href: 'https://www.instagram.com/spaessentiel' },
  ],
  hours: {
    days: 'Lun — Ven',
    morning: '8h – 12h',
    afternoon: '13h – 17h',
  },
  copyrightStartYear: 2026,
}
