import type { Metadata } from 'next'

import { ContactPage } from '@/components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contactez-nous',
  description:
    "Contactez Spa Essentiel : téléphone, email et horaires. Notre équipe vous accompagne sur le choix, l'installation et le suivi de votre spa, sauna ou bain nordique.",
}

export default function Contact() {
  return <ContactPage />
}
