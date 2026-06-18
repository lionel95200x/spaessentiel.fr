import type { Metadata } from 'next'

import { AboutPage } from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'Qui sommes-nous',
  description:
    "Spa Essentiel sélectionne des spas, saunas et bains nordiques haut de gamme et vous accompagne en français, du choix du modèle à l'installation. Garantie 5 ans et SAV dédié.",
}

export default function QuiSommesNous() {
  return <AboutPage />
}
