import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * Répare les 2 produits cassés identifiés via l'API publique :
 *  - Évasion Nomad (id=27)         → ajoute prix EUR, vide compareAtPrice douteux
 *  - Capsule SAuna Arrondis (id=7) → corrige titre + slug + prix
 *
 * Prix temporaire : 3000€ (à ajuster côté admin Payload plus tard).
 */

const PRICE_3000 = 300000 // centimes — Payload stocke les prix x100

async function main() {
  const payload = await getPayload({ config })

  // ---- Évasion Nomad ------------------------------------------------------
  const nomad = await payload.update({
    collection: 'products',
    id: 27,
    data: {
      priceInEUREnabled: true,
      priceInEUR: PRICE_3000,
      compareAtPrice: null,
      _status: 'published',
    },
    overrideAccess: true,
  })
  console.log('[OK] Évasion Nomad mis à jour :', {
    id: nomad.id,
    priceInEUR: nomad.priceInEUR,
    priceInUSD: nomad.priceInUSD,
    compareAtPrice: nomad.compareAtPrice,
  })

  // ---- Capsule Sauna Arrondi ----------------------------------------------
  // On lit d'abord l'état actuel pour préserver gallery/layout (sinon la
  // validation re-déclenche sur la galerie au moment du update).
  const current = await payload.findByID({
    collection: 'products',
    id: 7,
    depth: 0,
    overrideAccess: true,
  })

  const capsule = await payload.update({
    collection: 'products',
    id: 7,
    data: {
      ...current,
      title: 'Capsule Sauna Arrondi',
      slug: 'capsule-sauna-arrondi',
      generateSlug: false,
      priceInEUREnabled: true,
      priceInEUR: PRICE_3000,
      priceInUSDEnabled: true,
      priceInUSD: PRICE_3000,
      _status: 'published',
    },
    overrideAccess: true,
  })
  console.log('[OK] Capsule Sauna Arrondi mis à jour :', {
    id: capsule.id,
    title: capsule.title,
    slug: capsule.slug,
    priceInEUR: capsule.priceInEUR,
    priceInUSD: capsule.priceInUSD,
  })
}

main()
  .catch((err) => {
    console.error('[ERREUR] Échec de la réparation :', err)
    process.exit(1)
  })
  .finally(() => process.exit(0))
