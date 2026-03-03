import type { Category, Media } from '@/payload-types'
import type { DefaultDocumentIDType } from 'payload'

import { FeaturedProductCard } from '@/components/shop-home/FeaturedProductCard'
import { Media as MediaComponent } from '@/components/Media'
import {
  FeaturedProductGrid,
  ImagePlaceholder,
  ShopCategoryBannerSection,
  ShopHeroContent,
  ShopHeroImageSlot,
  ShopHeroOverlay,
  ShopHeroSubtitle,
  ShopHeroTitle,
  ShopSection,
  ShopSectionHeader,
  ShopSectionTitle,
  ShopSectionViewAll,
} from '@/components/ui/shop-home-layout'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

type Props = {
  id?: DefaultDocumentIDType
  category: number | Category
  limit?: number | null
}

export const CategoryShowcaseBlockComponent: React.FC<Props> = async ({
  category: categoryProp,
  limit: limitFromProps,
}) => {
  const limit = limitFromProps ?? 4
  const payload = await getPayload({ config: configPromise })

  const categoryId = typeof categoryProp === 'object' ? categoryProp.id : categoryProp

  const categoryResult = await payload.findByID({
    collection: 'categories',
    id: categoryId,
    depth: 1,
  })

  if (!categoryResult) return null

  const productsResult = await payload.find({
    collection: 'products',
    depth: 1,
    limit,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { categories: { contains: categoryResult.id } },
      ],
    },
  })

  const banner = typeof categoryResult.banner === 'object' ? (categoryResult.banner as Media) : null

  return (
    <>
      <ShopCategoryBannerSection>
        <ShopHeroImageSlot>
          {banner ? (
            <MediaComponent
              resource={banner}
              imgClassName="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </ShopHeroImageSlot>
        <ShopHeroOverlay />
        <ShopHeroContent>
          <ShopHeroSubtitle>Univers</ShopHeroSubtitle>
          <ShopHeroTitle>{categoryResult.title}</ShopHeroTitle>
        </ShopHeroContent>
      </ShopCategoryBannerSection>

      {productsResult.docs.length > 0 && (
        <ShopSection>
          <ShopSectionHeader>
            <ShopSectionTitle>{categoryResult.title}</ShopSectionTitle>
            <ShopSectionViewAll href={`/category/${categoryResult.slug}`}>
              Voir tout
            </ShopSectionViewAll>
          </ShopSectionHeader>
          <FeaturedProductGrid>
            {productsResult.docs.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </FeaturedProductGrid>
        </ShopSection>
      )}
    </>
  )
}
