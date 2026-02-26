import { ShopHomePage } from '@/components/shop-home/ShopHomePage'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function ShopHome() {
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
    <ShopHomePage
      featuredProducts={productsResult.docs}
      categories={categoriesResult.docs}
    />
  )
}
