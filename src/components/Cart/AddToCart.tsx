'use client'

import { Button } from '@/components/ui/button'
import type { Product, Variant } from '@/payload-types'

import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { toast } from 'sonner'
type Props = {
  product: Product
}

export function AddToCart({ product }: Props) {
  const { addItem, cart, isLoading } = useCart()
  const searchParams = useSearchParams()

  const variants = product.variants?.docs || []

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
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

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      addItem({
        product: product.id,
        variant: selectedVariant?.id ?? undefined,
      }).then(() => {
        toast.success('Article ajouté au panier.')
      })
    },
    [addItem, product, selectedVariant],
  )

  const isOutOfStock = useMemo<boolean>(() => {
    if (product.enableVariants) {
      if (!selectedVariant) return false
      return !selectedVariant.inventory || selectedVariant.inventory <= 0
    }
    return !product.inventory || product.inventory <= 0
  }, [product.enableVariants, product.inventory, selectedVariant])

  const disabled = useMemo<boolean>(() => {
    if (isOutOfStock) return true

    const existingItem = cart?.items?.find((item) => {
      const productID = typeof item.product === 'object' ? item.product?.id : item.product
      const variantID = item.variant
        ? typeof item.variant === 'object'
          ? item.variant?.id
          : item.variant
        : undefined

      if (productID === product.id) {
        if (product.enableVariants) {
          return variantID === selectedVariant?.id
        }
        return true
      }
    })

    if (existingItem) {
      const existingQuantity = existingItem.quantity

      if (product.enableVariants) {
        return existingQuantity >= (selectedVariant?.inventory || 0)
      }
      return existingQuantity >= (product.inventory || 0)
    }

    if (product.enableVariants && !selectedVariant) {
      return true
    }

    return false
  }, [isOutOfStock, selectedVariant, cart?.items, product])

  return (
    <Button
      aria-label={isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
      variant={isOutOfStock ? 'outline' : 'cta'}
      size="lg"
      disabled={disabled || isLoading}
      onClick={addToCart}
      type="submit"
    >
      {isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
    </Button>
  )
}
