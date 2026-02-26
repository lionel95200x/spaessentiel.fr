const phone = '01 34 24 50 90'

export const CONTACT = {
  phone,
  phoneHref: `tel:${phone.replace(/\s/g, '')}`,
  email: {
    label: 'Nous écrire',
    href: 'mailto:contact@spaessentiel.fr',
  },
  address: {
    company: 'Spa Essentiel',
    street: '9 chaussée Jules César,',
    building: 'Bâtiment 304',
    postal: '95520 OSNY',
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
  copyrightStartYear: 2005,
}
