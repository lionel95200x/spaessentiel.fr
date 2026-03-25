import type { Media } from '@/payload-types'
import {
  ShopSplitContentCol,
  ShopSplitImage,
  ShopSplitImageCol,
  ShopSplitSection,
  ShopSplitTitle,
} from '@/components/ui/shop-home-layout'
import { RichText } from '@/components/RichText'
import React from 'react'

type ProductSeoBlockProps = {
  id?: string
  title: string
  content?: Record<string, unknown> | null
  media: number | Media
  imagePosition?: 'left' | 'right' | null
}

export const ProductSeoBlockComponent: React.FC<ProductSeoBlockProps> = ({
  title,
  content,
  media,
  imagePosition,
}) => {
  const imgSrc = typeof media === 'object' && media?.url ? media.url : null
  const imgAlt = typeof media === 'object' && media?.alt ? media.alt : title

  const imageCol = (
    <ShopSplitImageCol>
      {imgSrc && <ShopSplitImage src={imgSrc} alt={imgAlt} />}
    </ShopSplitImageCol>
  )

  const contentCol = (
    <ShopSplitContentCol>
      <ShopSplitTitle>{title}</ShopSplitTitle>
      {content && (
        <RichText
          data={content as unknown as Parameters<typeof RichText>[0]['data']}
          enableGutter={false}
          className="prose prose-sm max-w-none text-muted-foreground"
        />
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
