import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  ShopHeroContent,
  ShopHeroImage,
  ShopHeroImageSlot,
  ShopHeroOverlay,
  ShopHeroSection,
  ShopHeroSubtitle,
  ShopHeroTitle,
} from '@/components/ui/shop-home-layout'

export default function NotFound() {
  return (
    <ShopHeroSection>
      <ShopHeroImageSlot>
        <ShopHeroImage src="/images/spa-winter-404.jpg" alt="Spa dans la neige - Page non trouvée" />
      </ShopHeroImageSlot>
      <ShopHeroOverlay />
      <ShopHeroContent>
        <ShopHeroSubtitle>Erreur 404</ShopHeroSubtitle>
        <ShopHeroTitle>Oups ! Cette page a pris un bain de glace ! 🧊</ShopHeroTitle>
        <p className="text-lg mb-6 text-white/90 max-w-md text-center">
          Il semblerait que cette page soit aussi introuvable qu'un maillot de bain
          dans un bain nordique à -20°C !
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">Découvrir nos produits</Link>
          </Button>
        </div>
      </ShopHeroContent>
    </ShopHeroSection>
  )
}
