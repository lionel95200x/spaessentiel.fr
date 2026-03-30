'use client'

import { Product, Variant } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { CircleCheck, CircleAlert, CircleX } from 'lucide-react'

type Props = {
  product: Product
}

export const StockIndicator: React.FC<Props> = ({ product }) => {
  const searchParams = useSearchParams()

  const variants = product.variants?.docs

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants?.length) {
      const variantId = searchParams.get('variant')
      const validVariant = variants.find((variant) => {
        if (typeof variant === 'object') {
          return String(variant.id) === variantId
        }
        return String(variant) === variantId
      })

      if (validVariant && typeof validVariant === 'object') {
        return validVariant
      }
    }

    return undefined
  }, [product.enableVariants, searchParams, variants])

  const stockQuantity = useMemo(() => {
    if (product.enableVariants) {
      if (selectedVariant) {
        return selectedVariant.inventory ?? 0
      }
      return 0
    }
    return product.inventory ?? 0
  }, [product.enableVariants, selectedVariant, product.inventory])

  if (product.enableVariants && !selectedVariant) {
    return null
  }

  if (stockQuantity <= 0) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5">
        <CircleX className="size-3.5 text-destructive" />
        <span className="font-mono text-xs font-medium uppercase tracking-wide text-destructive">
          Rupture de stock
        </span>
      </div>
    )
  }

  if (stockQuantity < 10) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5">
        <CircleAlert className="size-3.5 text-warning" />
        <span className="font-mono text-xs font-medium uppercase tracking-wide text-warning">
          Plus que {stockQuantity} en stock
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5">
      <CircleCheck className="size-3.5 text-success" />
      <span className="font-mono text-xs font-medium uppercase tracking-wide text-success">
        En stock
      </span>
    </div>
  )
}
