import type { Media } from '@/payload-types'
import {
  ImagePlaceholder,
  ShopSplitBody,
  ShopSplitContentCol,
  ShopSplitImageCol,
  ShopSplitImage,
  ShopSplitSection,
  ShopSplitTitle,
} from '@/components/ui/shop-home-layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type SplitBlockProps = {
  id?: string
  title: string
  body?: string | null
  imagePosition?: 'left' | 'right' | null
  media: number | Media
  link?: {
    label?: string | null
    url?: string | null
  } | null
}

export const SplitBlockComponent: React.FC<SplitBlockProps> = ({
  title,
  body,
  imagePosition,
  media,
  link,
}) => {
  const imgSrc = typeof media === 'object' && media?.url ? media.url : null
  const imgAlt = typeof media === 'object' && media?.alt ? media.alt : title

  const imageCol = (
    <ShopSplitImageCol>
      {imgSrc ? <ShopSplitImage src={imgSrc} alt={imgAlt} /> : <ImagePlaceholder />}
    </ShopSplitImageCol>
  )

  const contentCol = (
    <ShopSplitContentCol>
      <ShopSplitTitle>{title}</ShopSplitTitle>
      {body && <ShopSplitBody>{body}</ShopSplitBody>}
      {link?.url && link?.label && (
        <Button asChild variant="outline">
          <Link href={link.url}>{link.label}</Link>
        </Button>
      )}
    </ShopSplitContentCol>
  )

  return (
    <ShopSplitSection>
      {imagePosition === 'right' ? (
        <>
          {contentCol}
          {imageCol}
        </>
      ) : (
        <>
          {imageCol}
          {contentCol}
        </>
      )}
    </ShopSplitSection>
  )
}
