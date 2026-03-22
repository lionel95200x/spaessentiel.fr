import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

function BlogSection({
  title,
  subtitle,
  className,
  children,
}: {
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn('container py-20', className)}>
      {(title || subtitle) && (
        <div className="mb-14 text-center">
          {title && <h1 className="font-serif text-5xl font-light">{title}</h1>}
          {subtitle && (
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

function BlogGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    />
  )
}

function BlogCard({
  href,
  image,
  date,
  dateTime,
  title,
  excerpt,
  className,
}: {
  href: string
  image?: React.ReactNode
  date?: string | null
  dateTime?: string | null
  title: string
  excerpt?: string | null
  className?: string
}) {
  return (
    <Link href={href} className={cn('group flex flex-col gap-4 no-underline', className)}>
      <article>
        {image && (
          <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            {image}
          </div>
        )}
        <div className="flex flex-col gap-2">
          {date && (
            <time dateTime={dateTime ?? undefined} className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              {date}
            </time>
          )}
          <h2 className="font-serif text-xl font-light leading-snug transition-colors group-hover:text-muted-foreground">
            {title}
          </h2>
          {excerpt && (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
          )}
          <span className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-foreground transition-colors group-hover:text-muted-foreground">
            Lire l'article →
          </span>
        </div>
      </article>
    </Link>
  )
}

function BlogArticle({
  title,
  date,
  excerpt,
  featuredImage,
  className,
  children,
}: {
  title: string
  date?: string | null
  excerpt?: string | null
  featuredImage?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <article className={cn('pb-24', className)}>
      <header className="container max-w-3xl py-16 text-center">
        {date && (
          <div className="mb-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            Blog · {date}
          </div>
        )}
        <h1 className="font-serif text-4xl font-light leading-tight md:text-5xl">{title}</h1>
        {excerpt && (
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{excerpt}</p>
        )}
      </header>
      {featuredImage && (
        <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden bg-muted">
          {featuredImage}
        </div>
      )}
      {children}
    </article>
  )
}

export { BlogSection, BlogGrid, BlogCard, BlogArticle }
