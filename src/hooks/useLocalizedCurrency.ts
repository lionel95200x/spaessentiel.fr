'use client'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'

/**
 * Hook qui formate les prix selon les conventions françaises
 * (symbole devise à droite, espace insécable, virgule décimale)
 *
 * Utilise la devise active fournie par PayloadCMS (`useCurrency`).
 */
export const useLocalizedCurrency = () => {
  const { currency, setCurrency } = useCurrency()

  const code = currency.code
  const decimals = currency.decimals
  const divisor = Math.pow(10, decimals)

  /**
   * @param amount - Montant en plus petite unité (centimes pour EUR/USD)
   * @returns Prix formaté en français — ex: "1 234,56 €"
   */
  const formatPrice = (amount: number): string => {
    const value = amount / divisor

    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: code,
    }).format(value)
  }

  const formatPriceRange = (lowestAmount: number, highestAmount: number): string => {
    const low = formatPrice(lowestAmount)
    const high = formatPrice(highestAmount)
    return `${low} - ${high}`
  }

  return {
    currency,
    setCurrency,
    formatPrice,
    formatPriceRange,
  }
}
