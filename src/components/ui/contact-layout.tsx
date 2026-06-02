import { cn } from '@/utilities/cn'
import React from 'react'

function ContactSection({ className, ...props }: React.ComponentProps<'section'>) {
  return <section data-slot="contact-section" className={cn('py-16', className)} {...props} />
}

function ContactContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('container max-w-5xl', className)} {...props} />
}

function ContactHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-12 text-center', className)} {...props} />
}

function ContactTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn('font-serif text-4xl font-light tracking-tight', className)}
      {...props}
    />
  )
}

function ContactSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

function ContactGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', className)} {...props} />
  )
}

function ContactCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="contact-card"
      className={cn('flex flex-col gap-5 rounded-lg border border-border bg-background p-6', className)}
      {...props}
    />
  )
}

function ContactCardTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-sm font-semibold uppercase tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
}

function ContactList({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('flex flex-col gap-4', className)} {...props} />
}

function ContactItem({
  icon,
  className,
  children,
}: {
  icon: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <li className={cn('flex items-start gap-3', className)}>
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5 text-sm leading-relaxed">{children}</span>
    </li>
  )
}

function ContactItemLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('font-medium text-foreground', className)} {...props} />
}

function ContactItemValue({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('text-muted-foreground', className)} {...props} />
}

function ContactLink({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      className={cn('w-fit text-foreground underline-offset-4 hover:underline', className)}
      {...props}
    />
  )
}

export {
  ContactCard,
  ContactCardTitle,
  ContactContainer,
  ContactGrid,
  ContactHeader,
  ContactItem,
  ContactItemLabel,
  ContactItemValue,
  ContactLink,
  ContactList,
  ContactSection,
  ContactSubtitle,
  ContactTitle,
}
