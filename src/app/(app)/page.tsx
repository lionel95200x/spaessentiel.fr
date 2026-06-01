import type { Metadata } from 'next'

import { ShopHomePage } from '@/components/shop-home/ShopHomePage'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Spa Essentiel — Votre espace bien-être sur mesure',
  description:
    'Découvrez notre sélection de spas, saunas, hammams et bains balnéo. Créez votre espace bien-être sur mesure sur spaessentiel.fr.',
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [productsResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'products',
      depth: 1,
      limit: 4,
      pagination: false,
      where: {
        _status: { equals: 'published' },
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 1,
      limit: 6,
      pagination: false,
    }),
  ])

  return (
    <ShopHomePage featuredProducts={productsResult.docs} categories={categoriesResult.docs} />
  )
}
