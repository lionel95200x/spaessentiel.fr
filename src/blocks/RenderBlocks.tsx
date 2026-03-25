import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { FaqBlockComponent } from '@/blocks/FaqBlock/Component'
import { CategoryShowcaseBlockComponent } from '@/blocks/CategoryShowcaseBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ReassuranceBlockComponent } from '@/blocks/ReassuranceBlock/Component'
import { TestimonialsBlockComponent } from '@/blocks/TestimonialsBlock/Component'
import { SplitBlockComponent } from '@/blocks/SplitBlock/Component'
import { ThreeItemGridBlock } from '@/blocks/ThreeItemGrid/Component'
import { ProductSeoBlockComponent } from '@/blocks/ProductSeoBlock/Component'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import type { Page, Product } from '../payload-types'

type AnyBlock = Page['layout'][0] | NonNullable<Product['layout']>[0]

const blockComponents = {
  archive: ArchiveBlock,
  banner: BannerBlock,
  carousel: CarouselBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  categoryShowcase: CategoryShowcaseBlockComponent,
  reassuranceBlock: ReassuranceBlockComponent,
  testimonialsBlock: TestimonialsBlockComponent,
  splitBlock: SplitBlockComponent,
  threeItemGrid: ThreeItemGridBlock,
  faqBlock: FaqBlockComponent,
  productSeoBlock: ProductSeoBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: AnyBlock[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
