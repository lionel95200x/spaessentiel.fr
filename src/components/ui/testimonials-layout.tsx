import * as React from 'react'

import { cn } from '@/utilities/cn'

function TestimonialsSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="testimonials-section"
      className={cn('container py-16', className)}
      {...props}
    />
  )
}

function TestimonialsHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="testimonials-header"
      className={cn('mb-10 text-center', className)}
      {...props}
    />
  )
}

function TestimonialsTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="testimonials-title"
      className={cn('font-serif text-3xl font-light leading-tight', className)}
      {...props}
    />
  )
}

function TestimonialsGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="testimonials-grid"
      className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    />
  )
}

function TestimonialCard({ className, ...props }: React.ComponentProps<'figure'>) {
  return (
    <figure
      data-slot="testimonial-card"
      className={cn(
        'flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function TestimonialStars({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="testimonial-stars"
      className={cn('flex gap-0.5 text-primary', className)}
      {...props}
    />
  )
}

function TestimonialQuote({ className, ...props }: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote
      data-slot="testimonial-quote"
      className={cn('flex-1 font-serif text-lg font-light leading-relaxed italic', className)}
      {...props}
    />
  )
}

function TestimonialAuthor({ className, ...props }: React.ComponentProps<'figcaption'>) {
  return <figcaption data-slot="testimonial-author" className={cn('', className)} {...props} />
}

function TestimonialAuthorName({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="testimonial-author-name"
      className={cn('block font-mono text-xs uppercase tracking-widest', className)}
      {...props}
    />
  )
}

function TestimonialAuthorRole({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="testimonial-author-role"
      className={cn('block text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  TestimonialsSection,
  TestimonialsHeader,
  TestimonialsTitle,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialStars,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorRole,
}
