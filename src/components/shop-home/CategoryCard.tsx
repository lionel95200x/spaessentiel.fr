import type { Category, Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'
import {
  ImagePlaceholder,
  ShopCategoryCardContent,
  ShopCategoryCardOverlay,
  ShopCategoryCardRoot,
  ShopCategoryCardSubtitle,
  ShopCategoryCardTitle,
} from '@/components/ui/shop-home-layout'
import Link from 'next/link'

export function CategoryCard({ category }: { category: Category }) {
  const image = typeof category.image === 'object' ? (category.image as Media) : null

  return (
    <Link href={`/category/${category.slug}`}>
      <ShopCategoryCardRoot>
        {image ? (
          <MediaComponent
            resource={image}
            imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder />
        )}
        <ShopCategoryCardOverlay />
        <ShopCategoryCardContent>
          <ShopCategoryCardTitle>{category.title}</ShopCategoryCardTitle>
          <ShopCategoryCardSubtitle>Découvrir</ShopCategoryCardSubtitle>
        </ShopCategoryCardContent>
      </ShopCategoryCardRoot>
    </Link>
  )
}
