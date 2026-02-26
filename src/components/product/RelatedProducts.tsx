import type { Media, Product } from '@/payload-types'

import { GridTileImage } from '@/components/Grid/tile'
import {
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
        {products.map((product) => (
          <ProductRelatedItem key={product.id}>
            <Link href={`/products/${product.slug}`} className="relative block h-full w-full">
              <GridTileImage
                label={{
                  amount: product.priceInUSD!,
                  title: product.title,
                }}
                media={product.meta?.image as Media}
              />
            </Link>
          </ProductRelatedItem>
        ))}
      </ProductRelatedList>
    </ProductRelatedSection>
  )
}
