import React from 'react'
import Link from 'next/link'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import {
  ShopHeroContent,
  ShopHeroImageSlot,
  ShopHeroOverlay,
  ShopHeroSection,
  ShopHeroSubtitle,
  ShopHeroTitle,
} from '@/components/ui/shop-home-layout'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const nodes: any[] = richText?.root?.children ?? []
  const title = nodes.find((n) => n.type === 'heading')?.children?.[0]?.text
  const subtitle = nodes.find((n) => n.type === 'paragraph')?.children?.[0]?.text

  return (
    <ShopHeroSection>
      <ShopHeroImageSlot>
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
      </ShopHeroImageSlot>
      <ShopHeroOverlay />
      <ShopHeroContent>
        {subtitle && <ShopHeroSubtitle>{subtitle}</ShopHeroSubtitle>}
        {title && <ShopHeroTitle>{title}</ShopHeroTitle>}
        {Array.isArray(links) && links.length > 0 && links.map(({ link }, i) => (
          <Button key={i} asChild size="lg" variant="secondary">
            <Link href={link.url ?? '/shop'}>{link.label}</Link>
          </Button>
        ))}
      </ShopHeroContent>
    </ShopHeroSection>
  )
}
