import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProductSeoBlock: Block = {
  slug: 'productSeoBlock',
  interfaceName: 'ProductSeoBlock',
  labels: {
    singular: 'Section SEO Produit',
    plural: 'Sections SEO Produit',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la section',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu SEO (500 mots)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
        ],
      }),
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image produit',
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      label: 'Position de l\'image',
      options: [
        { label: 'Image à gauche', value: 'left' },
        { label: 'Image à droite', value: 'right' },
      ],
    },
  ],
}
