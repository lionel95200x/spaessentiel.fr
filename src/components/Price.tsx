'use client'
import React from 'react'
import { useLocalizedCurrency } from '@/hooks/useLocalizedCurrency'

type BaseProps = {
  className?: string
  as?: 'span' | 'p'
}

type PriceFixed = {
  amount: number
  compareAtPrice?: number
  highestAmount?: never
  lowestAmount?: never
}

type PriceRange = {
  amount?: never
  compareAtPrice?: never
  highestAmount: number
  lowestAmount: number
}

type Props = BaseProps & (PriceFixed | PriceRange)

export const Price = ({
  amount,
  compareAtPrice,
  className,
  highestAmount,
  lowestAmount,
  as = 'p',
}: Props & React.ComponentProps<'p'>) => {
  const { formatPrice, formatPriceRange } = useLocalizedCurrency()

  const Element = as

  if (typeof amount === 'number') {
    const isOnSale = typeof compareAtPrice === 'number' && compareAtPrice > amount
    return (
      <Element className={className} suppressHydrationWarning>
        {isOnSale && (
          <span className="line-through text-muted-foreground mr-2 text-sm">
            {formatPrice(compareAtPrice)}
          </span>
        )}
        <span>{formatPrice(amount)}</span>
      </Element>
    )
  }

  if (highestAmount && highestAmount !== lowestAmount) {
    return (
      <Element className={className} suppressHydrationWarning>
        {formatPriceRange(lowestAmount, highestAmount)}
      </Element>
    )
  }

  if (lowestAmount) {
    return (
      <Element className={className} suppressHydrationWarning>
        {formatPrice(lowestAmount)}
      </Element>
    )
  }

  return null
}
