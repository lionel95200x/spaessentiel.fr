import type { Media, Product } from '@/payload-types'

import { GridTileImage } from '@/components/Grid/tile'
import {
  ProductBadge,
  ProductRelatedItem,
  ProductRelatedList,
  ProductRelatedSection,
  ProductRelatedTitle,
} from '@/components/ui/product-layout'
import Link from 'next/link'

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <ProductRelatedSection>
      <ProductRelatedTitle>Produits similaires</ProductRelatedTitle>
      <ProductRelatedList>
        {products.map((product) => {
          const galleryImage = product.gallery?.[0]?.image
          const image =
            typeof galleryImage === 'object'
              ? galleryImage
              : (product.meta?.image as Media | undefined)

          return (
            <ProductRelatedItem key={product.id}>
              <Link href={`/products/${product.slug}`} className="relative block h-full w-full">
                {image && (
                  <GridTileImage
                    label={{
                      amount: product.priceInUSD!,
                      title: product.title,
                    }}
                    media={image}
                    badge={product.isBestseller ? <ProductBadge>Top Vente</ProductBadge> : undefined}
                  />
                )}
              </Link>
            </ProductRelatedItem>
          )
        })}
      </ProductRelatedList>
    </ProductRelatedSection>
  )
}
