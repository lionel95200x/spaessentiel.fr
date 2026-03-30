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
import { SupportSection } from '@/components/ui/support-section'
import { CheckoutReassurance } from '@/components/checkout/CheckoutReassurance'
import { Banner } from '@/components/ui/banner'
import { Suspense } from 'react'

type Props = {
  product: ProductType
  gallery: NonNullable<ProductType['gallery']>
  relatedProducts: ProductType[]
  category?: Category
}

export function Product({ product, gallery, relatedProducts, category }: Props) {
  const baseBreadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Boutique', href: '/shop' },
  ]

  const categoryBreadcrumbItems = category
    ? [{ label: category.title, href: `/category/${category.slug}` }]
    : []

  const breadcrumbItems = [
    ...baseBreadcrumbItems,
    ...categoryBreadcrumbItems,
    { label: product.title },
  ]

  const bannerImage = category?.banner

  return (
    <>
      {bannerImage && typeof bannerImage === 'object' && <Banner image={bannerImage} variant="thin" />}

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
            <CheckoutReassurance />
          </ProductPageInfoCol>
        </ProductPageGrid>
      </ProductPageContainer>

      {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : null}

      <SupportSection />

      <RelatedProducts products={relatedProducts} />

      <Testimonials />
    </>
  )
}
