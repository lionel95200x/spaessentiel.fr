import type { Media, Product } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'
import {
  FeaturedProductCardRoot,
  FeaturedProductImageSlot,
  FeaturedProductPrice,
  FeaturedProductTitle,
  ImagePlaceholder,
} from '@/components/ui/shop-home-layout'
import Link from 'next/link'

export function FeaturedProductCard({ product }: { product: Product }) {
  const firstGalleryItem = product.gallery?.[0]
  const image =
    firstGalleryItem && typeof firstGalleryItem.image === 'object'
      ? (firstGalleryItem.image as Media)
      : null

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
        </FeaturedProductImageSlot>
        <FeaturedProductTitle>{product.title}</FeaturedProductTitle>
        {typeof product.priceInUSD === 'number' && (
          <FeaturedProductPrice>{product.priceInUSD} €</FeaturedProductPrice>
        )}
      </FeaturedProductCardRoot>
    </Link>
  )
}
