import { Banner } from '@payloadcms/ui'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

export const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Spa Essentiel — CMS</h4>
      </Banner>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Pages</strong> — Créer et gérer les pages du site. Blocks disponibles :{' '}
          <code>splitBlock</code>, <code>content</code>, <code>cta</code>, <code>banner</code>,{' '}
          <code>mediaBlock</code>, <code>carousel</code>, <code>threeItemGrid</code>,{' '}
          <code>formBlock</code>.
        </li>
        <li>
          <strong>Produits</strong> — Gérer le catalogue, les variantes (taille, couleur) et les
          catégories.
        </li>
        <li>
          <strong>Médias</strong> — Images stockées sur S3. Uploader ici avant de les référencer
          dans une page ou un produit.
        </li>
        <li>
          <strong>Header / Footer</strong> — Globals Payload. Modifier les liens de navigation
          depuis ici.
        </li>
        <li>
          <strong>Primitifs UI</strong> — Tout le style du site passe par{' '}
          <code>src/components/ui/shop-home-layout.tsx</code>. Ne jamais mettre de Tailwind dans un
          block ou une page feature.
        </li>
      </ul>
    </div>
  )
}
