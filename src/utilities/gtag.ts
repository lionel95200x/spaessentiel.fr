declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

const GOOGLE_ADS_ID = 'AW-18036369451'
const GOOGLE_ADS_CONVERSION_LABEL = 'g9yhCKS-lo4cEKvQtJhD'

export function gtagPurchase({
  orderId,
  value,
  currency = 'EUR',
}: {
  orderId: string
  value: number
  currency?: string
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    value,
    currency,
    transaction_id: orderId,
  })
}

export function gtagAddToCart({
  value,
  currency = 'EUR',
  items,
}: {
  value: number
  currency?: string
  items: { id: string; name: string; price: number; quantity: number }[]
}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'add_to_cart', {
    send_to: GOOGLE_ADS_ID,
    value,
    currency,
    items,
  })
}
