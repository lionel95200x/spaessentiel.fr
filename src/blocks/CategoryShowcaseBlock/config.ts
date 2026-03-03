import type { Block } from 'payload'

export const CategoryShowcaseBlock: Block = {
  slug: 'categoryShowcase',
  interfaceName: 'CategoryShowcaseBlock',
  labels: {
    plural: 'Category Showcases',
    singular: 'Category Showcase',
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Catégorie',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      label: 'Nombre de produits',
      admin: { step: 1 },
    },
  ],
}
