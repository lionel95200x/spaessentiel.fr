import type { Product, Variant } from '@/payload-types'

import { ProductBadge } from '@/components/ui/product-layout'
import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      <ProductBadge>Top Vente</ProductBadge>
      {image ? (
        <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
          <Media
            className="absolute inset-0 w-full h-full"
            height={600}
            imgClassName="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            resource={image}
            width={400}
          />
        </div>
      ) : (
        <div className="aspect-[3/4] bg-secondary" />
      )}

      <div className="mt-4 flex justify-between items-start gap-4">
        <div className="font-serif text-lg font-light tracking-wide text-foreground leading-snug">
          {title}
        </div>

        {typeof price === 'number' && (
          <div className="font-mono text-xs text-muted-foreground pt-1 shrink-0">
            <Price amount={price} />
          </div>
        )}
      </div>
    </Link>
  )
}
