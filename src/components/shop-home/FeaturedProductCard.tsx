import type { Media, Product } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'
import { OutOfStockOverlay } from '@/components/ui/product-layout'
import {
  FeaturedProductCardRoot,
  FeaturedProductImageSlot,
  FeaturedProductPrice,
  FeaturedProductTitle,
  ImagePlaceholder,
} from '@/components/ui/shop-home-layout'
import Link from 'next/link'

function isOutOfStock(product: Product): boolean {
  if (product.enableVariants) {
    const variants = product.variants?.docs
    if (!variants?.length) return true
    return variants.every((variant) => {
      if (typeof variant !== 'object') return true
      return !variant.inventory || variant.inventory <= 0
    })
  }
  return !product.inventory || product.inventory <= 0
}

export function FeaturedProductCard({ product }: { product: Product }) {
  const firstGalleryItem = product.gallery?.[0]
  const image =
    firstGalleryItem && typeof firstGalleryItem.image === 'object'
      ? (firstGalleryItem.image as Media)
      : null

  const outOfStock = isOutOfStock(product)

  return (
    <Link href={`/products/${product.slug}`}>
      <FeaturedProductCardRoot>
        <FeaturedProductImageSlot>
          {image ? (
            <MediaComponent
              resource={image}
              imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder />
          )}
          {outOfStock && <OutOfStockOverlay />}
        </FeaturedProductImageSlot>
        <FeaturedProductTitle>{product.title}</FeaturedProductTitle>
        {typeof product.priceInUSD === 'number' && (
          <FeaturedProductPrice>{product.priceInUSD} €</FeaturedProductPrice>
        )}
      </FeaturedProductCardRoot>
    </Link>
  )
}
