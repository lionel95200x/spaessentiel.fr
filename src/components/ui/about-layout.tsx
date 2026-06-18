import { cn } from '@/utilities/cn'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function AboutSection({ className, ...props }: React.ComponentProps<'section'>) {
  return <section data-slot="about-section" className={cn('py-16', className)} {...props} />
}

function AboutContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('container max-w-3xl', className)} {...props} />
}

function AboutHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-12 text-center', className)} {...props} />
}

function AboutEyebrow({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'mb-3 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function AboutTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return <h1 className={cn('font-serif text-4xl font-light tracking-tight', className)} {...props} />
}

function AboutLead({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

function AboutBlocks({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-12', className)} {...props} />
}

function AboutBlock({ className, ...props }: React.ComponentProps<'article'>) {
  return <article className={cn('flex flex-col gap-3', className)} {...props} />
}

function AboutBlockTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn('font-serif text-2xl font-light tracking-tight', className)} {...props} />
}

function AboutText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p className={cn('text-base leading-relaxed text-muted-foreground', className)} {...props} />
  )
}

function AboutUniverseGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-3', className)} {...props} />
  )
}

function AboutUniverseCard({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      data-slot="about-universe-card"
      className="group flex flex-col gap-2 rounded-lg border border-border bg-background p-6 transition-colors hover:bg-muted"
    >
      <span className="flex items-center gap-1.5 font-serif text-lg font-light tracking-tight">
        {title}
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
        />
      </span>
      <span className="text-sm leading-relaxed text-muted-foreground">{description}</span>
    </Link>
  )
}

function AboutCta({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mt-14 flex flex-wrap items-center justify-center gap-3', className)}
      {...props}
    />
  )
}

export {
  AboutBlock,
  AboutBlocks,
  AboutBlockTitle,
  AboutContainer,
  AboutCta,
  AboutEyebrow,
  AboutHeader,
  AboutLead,
  AboutSection,
  AboutText,
  AboutTitle,
  AboutUniverseCard,
  AboutUniverseGrid,
}
