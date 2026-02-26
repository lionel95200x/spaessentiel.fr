import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Découvrez notre sélection de spas, saunas, hammams et bains balnéo. Créez votre espace bien-être sur mesure.',
  images: [
    {
      url: '/og-image.jpg',
    },
  ],
  siteName: 'Spa Essentiel',
  title: 'Spa Essentiel',
}

export const mergeOpenGraph = (og?: Partial<Metadata['openGraph']>): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
