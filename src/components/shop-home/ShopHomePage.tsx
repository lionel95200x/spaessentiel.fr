import type { Category, Product } from '@/payload-types'

import { CategoryCard } from '@/components/shop-home/CategoryCard'
import { FeaturedProductCard } from '@/components/shop-home/FeaturedProductCard'
import { ReassuranceBar } from '@/components/shop-home/ReassuranceBar'
import { Button } from '@/components/ui/button'
import {
  FeaturedProductGrid,
  ShopCategoryGrid,
  ShopHeroContent,
  ShopHeroImage,
  ShopHeroImageSlot,
  ShopHeroOverlay,
  ShopHeroSection,
  ShopHeroSubtitle,
  ShopHeroTitle,
  ShopSection,
  ShopSectionHeader,
  ShopSectionTitle,
  ShopSectionViewAll,
  ShopSplitBody,
  ShopSplitContentCol,
  ShopSplitImage,
  ShopSplitImageCol,
  ShopSplitSection,
  ShopSplitTitle,
} from '@/components/ui/shop-home-layout'
import Link from 'next/link'

type Props = {
  featuredProducts: Product[]
  categories: Category[]
}

export function ShopHomePage({ featuredProducts, categories }: Props) {
  return (
    <>
      {/* Section 1 — Hero */}
      <ShopHeroSection>
        <ShopHeroImageSlot>
          <ShopHeroImage src="/images/hero-sauna.jpg" alt="Solbad — sauna moderne" />
        </ShopHeroImageSlot>
        <ShopHeroOverlay />
        <ShopHeroContent>
          <ShopHeroSubtitle>Collection 2026</ShopHeroSubtitle>
          <ShopHeroTitle>L&apos;Art du Sauna</ShopHeroTitle>
          <Button asChild size="lg" variant="secondary">
            <Link href="/shop">Découvrir la collection</Link>
          </Button>
        </ShopHeroContent>
      </ShopHeroSection>

      {/* Section 1.5 — Réassurance */}
      <ReassuranceBar />

      {/* Section 2 — Produits phares */}
      {featuredProducts.length > 0 && (
        <ShopSection>
          <ShopSectionHeader>
            <ShopSectionTitle>Nos Produits Phares</ShopSectionTitle>
            <ShopSectionViewAll href="/shop">Voir tout</ShopSectionViewAll>
          </ShopSectionHeader>
          <FeaturedProductGrid>
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </FeaturedProductGrid>
        </ShopSection>
      )}

      {/* Section 3 — Éditoriale / Histoire */}
      <ShopSplitSection>
        <ShopSplitImageCol>
          <ShopSplitImage src="/images/editorial-sauna.jpg" alt="Solbad — intérieur sauna" />
        </ShopSplitImageCol>
        <ShopSplitContentCol>
          <ShopSplitTitle>Une tradition millénaire, réinventée</ShopSplitTitle>
          <ShopSplitBody>
            Solbad propose une sélection de produits d&apos;exception pour sublimer votre rituel de
            sauna. Des essences naturelles aux accessoires haut de gamme, chaque pièce est choisie
            avec soin.
          </ShopSplitBody>
          <Button asChild variant="outline">
            <Link href="/shop">Explorer la boutique</Link>
          </Button>
        </ShopSplitContentCol>
      </ShopSplitSection>

      {/* Section 4 — Catégories */}
      {categories.length > 0 && (
        <ShopSection>
          <ShopSectionHeader>
            <ShopSectionTitle>Explorer par Catégorie</ShopSectionTitle>
          </ShopSectionHeader>
          <ShopCategoryGrid>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ShopCategoryGrid>
        </ShopSection>
      )}
    </>
  )
}
