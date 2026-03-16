import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  labels: {
    plural: 'FAQ Blocks',
    singular: 'FAQ Block',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Questions / Réponses',
      minRows: 1,
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Réponse',
          required: true,
        },
      ],
    },
  ],
}
