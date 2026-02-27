import { cn } from '@/utilities/cn'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// ─── Image Placeholder ───────────────────────────────────────────────────────

function ImagePlaceholder({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="image-placeholder"
      className={cn(
        'flex h-full w-full items-center justify-center bg-muted',
        className,
      )}
      {...props}
    >
      <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground/40">
        Image à venir
      </span>
    </div>
  )
}

function ShopHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      className="object-cover"
    />
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ShopHeroSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="shop-hero-section"
      className={cn('relative h-[85vh] overflow-hidden', className)}
      {...props}
    />
  )
}

function ShopHeroImageSlot({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-hero-image-slot"
      className={cn('absolute inset-0', className)}
      {...props}
    />
  )
}

function ShopHeroOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-hero-overlay"
      className={cn(
        'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent',
        className,
      )}
      {...props}
    />
  )
}

function ShopHeroContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-hero-content"
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center gap-6',
        className,
      )}
      {...props}
    />
  )
}

function ShopHeroTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="shop-hero-title"
      className={cn(
        'text-center font-serif text-7xl font-light leading-none tracking-tight text-white lg:text-9xl',
        className,
      )}
      {...props}
    />
  )
}

function ShopHeroSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="shop-hero-subtitle"
      className={cn(
        'text-center font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/70',
        className,
      )}
      {...props}
    />
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

function ShopSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="shop-section"
      className={cn('container py-20', className)}
      {...props}
    />
  )
}

function ShopSectionHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-section-header"
      className={cn('mb-10 flex items-end justify-between', className)}
      {...props}
    />
  )
}

function ShopSectionTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="shop-section-title"
      className={cn('font-serif text-3xl font-light', className)}
      {...props}
    />
  )
}

function ShopSectionViewAll({
  className,
  href,
  children,
}: {
  className?: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      data-slot="shop-section-view-all"
      className={cn(
        'font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground',
        className,
      )}
    >
      {children}
    </Link>
  )
}

// ─── Featured Products ────────────────────────────────────────────────────────

function FeaturedProductGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="featured-product-grid"
      className={cn('grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6', className)}
      {...props}
    />
  )
}

function FeaturedProductCardRoot({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="featured-product-card"
      className={cn('group flex flex-col gap-3', className)}
      {...props}
    />
  )
}

function FeaturedProductImageSlot({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="featured-product-image"
      className={cn('relative aspect-square overflow-hidden rounded-lg bg-muted', className)}
      {...props}
    />
  )
}

function FeaturedProductTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="featured-product-title"
      className={cn('font-serif text-sm font-light', className)}
      {...props}
    />
  )
}

function FeaturedProductPrice({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="featured-product-price"
      className={cn('font-mono text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

// ─── Editorial Split ──────────────────────────────────────────────────────────

function ShopSplitImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
    />
  )
}

function ShopSplitSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-split-section"
      className={cn('grid min-h-[70vh] lg:grid-cols-2', className)}
      {...props}
    />
  )
}

function ShopSplitImageCol({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-split-image"
      className={cn('relative min-h-[50vh] overflow-hidden bg-muted lg:min-h-0', className)}
      {...props}
    />
  )
}

function ShopSplitContentCol({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-split-content"
      className={cn(
        'flex flex-col justify-center gap-8 bg-primary-foreground p-12 lg:p-20',
        className,
      )}
      {...props}
    />
  )
}

function ShopSplitTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="shop-split-title"
      className={cn('font-serif text-4xl font-light leading-tight', className)}
      {...props}
    />
  )
}

function ShopSplitBody({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="shop-split-body"
      className={cn('max-w-sm text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

// ─── Category Grid ────────────────────────────────────────────────────────────

function ShopCategoryGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-category-grid"
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    />
  )
}

function ShopCategoryCardRoot({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-category-card"
      className={cn('group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-lg', className)}
      {...props}
    />
  )
}

function ShopCategoryCardOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-category-overlay"
      className={cn(
        'absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent',
        className,
      )}
      {...props}
    />
  )
}

function ShopCategoryCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="shop-category-content"
      className={cn('absolute bottom-0 left-0 right-0 p-8', className)}
      {...props}
    />
  )
}

function ShopCategoryCardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="shop-category-title"
      className={cn('font-serif text-2xl font-light text-white', className)}
      {...props}
    />
  )
}

function ShopCategoryCardSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="shop-category-subtitle"
      className={cn(
        'mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-white/60',
        className,
      )}
      {...props}
    />
  )
}

// ─── Reassurance Bar ─────────────────────────────────────────────────────────

function ReassuranceBar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="reassurance-bar"
      className={cn('border-y bg-background', className)}
      {...props}
    />
  )
}

function ReassuranceBarGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="reassurance-bar-grid"
      className={cn(
        'container grid grid-cols-2 divide-x divide-y lg:grid-cols-4 lg:divide-y-0',
        className,
      )}
      {...props}
    />
  )
}

function ReassuranceBarItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="reassurance-bar-item"
      className={cn('flex flex-col items-center gap-2 px-6 py-6 text-center', className)}
      {...props}
    />
  )
}

function ReassuranceBarIcon({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="reassurance-bar-icon"
      className={cn('text-foreground', className)}
      {...props}
    />
  )
}

function ReassuranceBarTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="reassurance-bar-title"
      className={cn('font-serif text-sm font-light', className)}
      {...props}
    />
  )
}

function ReassuranceBarSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="reassurance-bar-subtitle"
      className={cn('font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  ReassuranceBar,
  ReassuranceBarGrid,
  ReassuranceBarItem,
  ReassuranceBarIcon,
  ReassuranceBarTitle,
  ReassuranceBarSubtitle,
}

export {
  FeaturedProductCardRoot,
  ShopHeroImage,
  ShopSplitImage,
  FeaturedProductGrid,
  FeaturedProductImageSlot,
  FeaturedProductPrice,
  FeaturedProductTitle,
  ImagePlaceholder,
  ShopCategoryCardContent,
  ShopCategoryCardOverlay,
  ShopCategoryCardRoot,
  ShopCategoryCardSubtitle,
  ShopCategoryCardTitle,
  ShopCategoryGrid,
  ShopHeroContent,
  ShopHeroImageSlot,
  ShopHeroOverlay,
  ShopHeroSection,
  ShopHeroSubtitle,
  ShopHeroTitle,
  ShopSection,
  ShopSectionHeader,
  ShopSectionTitle,
  ShopSectionViewAll,
  ShopSplitBody,
  ShopSplitContentCol,
  ShopSplitImageCol,
  ShopSplitSection,
  ShopSplitTitle,
}
