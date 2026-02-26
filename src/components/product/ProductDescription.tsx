'use client'
import type { Product, Variant } from '@/payload-types'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import { RichText } from '@/components/RichText'
import { StockIndicator } from '@/components/product/StockIndicator'
import { VariantSelector } from '@/components/product/VariantSelector'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import React, { Suspense } from 'react'

export function ProductDescription({ product }: { product: Product }) {
  const { currency } = useCurrency()
  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)

  if (hasVariants) {
    const priceField = `priceIn${currency.code}` as keyof Variant
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === 'object')
      .sort((a, b) => {
        if (
          typeof a === 'object' &&
          typeof b === 'object' &&
          priceField in a &&
          priceField in b &&
          typeof a[priceField] === 'number' &&
          typeof b[priceField] === 'number'
        ) {
          return a[priceField] - b[priceField]
        }
        return 0
      }) as Variant[]

    const lowestVariant = variantsOrderedByPrice[0][priceField]
    const highestVariant = variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceField]
    if (
      variantsOrderedByPrice &&
      typeof lowestVariant === 'number' &&
      typeof highestVariant === 'number'
    ) {
      lowestAmount = lowestVariant
      highestAmount = highestVariant
    }
  } else if (product[priceField] && typeof product[priceField] === 'number') {
    amount = product[priceField]
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl font-light leading-tight tracking-tight">
          {product.title}
        </h1>
        <div className="font-mono text-xl">
          {hasVariants ? (
            <Price highestAmount={highestAmount} lowestAmount={lowestAmount} />
          ) : (
            <Price amount={amount} />
          )}
        </div>
      </div>

      {product.description ? (
        <RichText
          className="text-sm leading-relaxed text-muted-foreground"
          data={product.description}
          enableGutter={false}
        />
      ) : null}

      <hr className="border-border" />

      {hasVariants && (
        <>
          <Suspense fallback={null}>
            <VariantSelector product={product} />
          </Suspense>
          <hr className="border-border" />
        </>
      )}

      <Suspense fallback={null}>
        <StockIndicator product={product} />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart product={product} />
      </Suspense>
    </div>
  )
}
