const phone = '01 23 45 67 89'

export const CONTACT = {
  phone,
  phoneHref: `tel:${phone.replace(/\s/g, '')}`,
  hours: {
    days: 'Lun — Ven',
    morning: '8h – 12h',
    afternoon: '13h – 17h',
  },
}
