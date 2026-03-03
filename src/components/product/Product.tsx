import type { Category, Product as ProductType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { Testimonials } from '@/components/shop-home/Testimonials'
import {
  ProductPageContainer,
  ProductPageGalleryCol,
  ProductPageGrid,
  ProductPageInfoCol,
} from '@/components/ui/product-layout'
import { FreeDeliveryBadge, ProductReassurance, TrustpilotBadge } from '@/components/ui/product-reassurance'
import { Banner } from '@/components/ui/banner'
import { Suspense } from 'react'

type Props = {
  product: ProductType
  gallery: NonNullable<ProductType['gallery']>
  relatedProducts: ProductType[]
  category?: Category | null
}

export function Product({ product, gallery, relatedProducts, category }: Props) {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Boutique', href: '/shop' },
    ...(category ? [{ label: category.title, href: `/category/${category.slug}` }] : []),
    { label: product.title },
  ]

  return (
    <>
      <Banner src="/images/banner-wood.jpg" alt="Bois chauffant" variant="thin" />

      <Breadcrumb items={breadcrumbItems} />

      <ProductPageContainer>
        <ProductPageGrid>
          <ProductPageGalleryCol>
            <Suspense fallback={null}>
              {Boolean(gallery.length) && <Gallery gallery={gallery} />}
            </Suspense>
          </ProductPageGalleryCol>

          <ProductPageInfoCol>
            <ProductDescription product={product} />
            <FreeDeliveryBadge />
            <ProductReassurance />
            <TrustpilotBadge />
          </ProductPageInfoCol>
        </ProductPageGrid>
      </ProductPageContainer>

      {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : null}

      <RelatedProducts products={relatedProducts} />

      <Testimonials />
    </>
  )
}
