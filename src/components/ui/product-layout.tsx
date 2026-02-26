import { cn } from '@/utilities/cn'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

function ProductPageContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-page-container"
      className={cn('container py-8 pb-16', className)}
      {...props}
    />
  )
}

function ProductPageBack() {
  return (
    <Button asChild variant="ghost" className="-ml-3 mb-6">
      <Link href="/shop">
        <ChevronLeftIcon />
        Tous les produits
      </Link>
    </Button>
  )
}

function ProductPageGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-page-grid"
      className={cn(
        'flex flex-col gap-12 rounded-lg border bg-primary-foreground p-8 md:py-12 lg:flex-row lg:gap-16',
        className,
      )}
      {...props}
    />
  )
}

function ProductPageGalleryCol({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-page-gallery-col"
      className={cn('w-full lg:w-1/2', className)}
      {...props}
    />
  )
}

function ProductPageInfoCol({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-page-info-col"
      className={cn('flex flex-col gap-6 lg:w-1/2 lg:sticky lg:top-8 lg:self-start', className)}
      {...props}
    />
  )
}

function ProductBannerSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-banner-section"
      className={cn('container py-8', className)}
      {...props}
    />
  )
}

function ProductRelatedSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="product-related-section"
      className={cn('container py-12', className)}
      {...props}
    />
  )
}

function ProductRelatedTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="product-related-title"
      className={cn('mb-6 font-serif text-2xl font-light', className)}
      {...props}
    />
  )
}

function ProductRelatedList({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="product-related-list"
      className={cn('flex w-full gap-4 overflow-x-auto pb-2', className)}
      {...props}
    />
  )
}

function ProductRelatedItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="product-related-item"
      className={cn(
        'aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5',
        className,
      )}
      {...props}
    />
  )
}

function ProductBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="product-badge"
      className={cn(
        'absolute top-2 left-2 z-10 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground',
        className,
      )}
      {...props}
    />
  )
}

export {
  ProductBadge,
  ProductBannerSection,
  ProductPageBack,
  ProductPageContainer,
  ProductPageGalleryCol,
  ProductPageGrid,
  ProductPageInfoCol,
  ProductRelatedItem,
  ProductRelatedList,
  ProductRelatedSection,
  ProductRelatedTitle,
}
