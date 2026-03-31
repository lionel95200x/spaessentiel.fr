'use client'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'

/**
 * Hook personnalisé qui combine PayloadCMS currency + formatage français
 * Résout le problème de position du symbole € (doit être à droite en français)
 */
export const useLocalizedCurrency = () => {
  const { currency, setCurrency } = useCurrency()

  /**
   * Formate un prix selon les conventions françaises
   * @param amount - Montant en centimes (format PayloadCMS)
   * @returns Prix formaté "1 234,56 €" (€ à droite, format français)
   */
  const formatPrice = (amount: number): string => {
    // PayloadCMS stocke les montants en centimes, on divise par 100
    const priceInEuros = amount / 100

    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR', // Force EUR même si backend est en USD
    }).format(priceInEuros)
  }

  /**
   * Formate une fourchette de prix
   */
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