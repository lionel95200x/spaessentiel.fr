import Link from 'next/link'

import {
  BreadcrumbBar,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb de navigation.
 *
 * Payload CMS + nested-docs : les catégories exposent un champ `breadcrumbs`
 * généré automatiquement par le plugin `@payloadcms/plugin-nested-docs`.
 * Chaque entrée contient `{ label, url }` — le dernier élément est la page courante.
 *
 * Usage produit :
 *   items={[{ label: 'Accueil', href: '/' }, { label: 'Boutique', href: '/shop' }, { label: product.title }]}
 *
 * Usage catégorie (depuis category.breadcrumbs) :
 *   items={[
 *     { label: 'Accueil', href: '/' },
 *     ...(category.breadcrumbs ?? []).map((b) => ({ label: b.label ?? '', href: b.url ?? undefined })),
 *   ]}
 */
export function Breadcrumb({ items }: Props) {
  return (
    <BreadcrumbBar>
      <BreadcrumbRoot>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <BreadcrumbItem key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </BreadcrumbRoot>
    </BreadcrumbBar>
  )
}
