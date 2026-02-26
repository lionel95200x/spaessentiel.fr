import type { Media } from '@/payload-types'

import { Grid } from '@/components/Grid'
import { Media as MediaComponent } from '@/components/Media'
import { ProductGridItem } from '@/components/ProductGridItem'
import {
  ImagePlaceholder,
  ShopHeroContent,
  ShopHeroImageSlot,
  ShopHeroOverlay,
  ShopHeroSection,
  ShopHeroSubtitle,
  ShopHeroTitle,
  ShopSection,
  ShopSectionHeader,
  ShopSectionTitle,
  ShopSectionViewAll,
} from '@/components/ui/shop-home-layout'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const category = result.docs[0]
  if (!category) return {}

  return {
    title: category.title,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const categoryResult = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const category = categoryResult.docs[0]
  if (!category) notFound()

  const productsResult = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    depth: 1,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { categories: { contains: category.id } },
      ],
    },
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
    },
    sort: 'title',
  })

  const image = typeof category.image === 'object' ? (category.image as Media) : null

  return (
    <>
      <ShopHeroSection>
        <ShopHeroImageSlot>
          {image ? (
            <MediaComponent
              resource={image}
              imgClassName="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </ShopHeroImageSlot>
        <ShopHeroOverlay />
        <ShopHeroContent>
          <ShopHeroTitle>{category.title}</ShopHeroTitle>
          {category.description && (
            <ShopHeroSubtitle>{category.description}</ShopHeroSubtitle>
          )}
        </ShopHeroContent>
      </ShopHeroSection>

      <ShopSection>
        <ShopSectionHeader>
          <ShopSectionTitle>
            {productsResult.docs.length} produit{productsResult.docs.length !== 1 ? 's' : ''}
          </ShopSectionTitle>
          <ShopSectionViewAll href="/shop">Voir toute la boutique</ShopSectionViewAll>
        </ShopSectionHeader>

        {productsResult.docs.length > 0 ? (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsResult.docs.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <p>Aucun produit dans cette catégorie.</p>
        )}
      </ShopSection>
    </>
  )
}
