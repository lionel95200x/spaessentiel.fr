import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'megaMenuSections',
          type: 'array',
          label: 'Mega menu sections',
          maxRows: 4,
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'sectionTitle',
              type: 'text',
              label: 'Titre de section',
            },
            {
              name: 'links',
              type: 'array',
              label: 'Liens',
              maxRows: 8,
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
      maxRows: 6,
    },
  ],
}
