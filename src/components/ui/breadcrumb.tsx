import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/utilities/cn'

function BreadcrumbBar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="breadcrumb-bar"
      className={cn('container py-3', className)}
      {...props}
    />
  )
}

function BreadcrumbRoot({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Fil d'Ariane"
      className={cn('', className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'a'
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('text-muted-foreground/40', className)}
      {...props}
    >
      <ChevronRight className="size-3" />
    </span>
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn('text-foreground', className)}
      {...props}
    />
  )
}

export {
  BreadcrumbBar,
  BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
}
