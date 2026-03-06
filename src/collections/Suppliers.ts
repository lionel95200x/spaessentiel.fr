import type { CollectionConfig } from 'payload'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'categories'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'commercialName',
      type: 'text',
    }
  ],
}
