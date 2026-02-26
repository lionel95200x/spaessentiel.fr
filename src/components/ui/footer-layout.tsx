import { cn } from '@/utilities/cn'
import React from 'react'

function FooterRoot({ className, ...props }: React.ComponentProps<'footer'>) {
  return (
    <footer
      data-slot="footer-root"
      className={cn('bg-neutral-900 text-neutral-400 text-sm', className)}
      {...props}
    />
  )
}

function FooterContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="footer-container" className={cn('container', className)} {...props} />
}

function FooterTopSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-top-section"
      className={cn('py-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_3fr]', className)}
      {...props}
    />
  )
}

function FooterNewsletterWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-newsletter-wrapper"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  )
}

function FooterNewsletterFormWrapper({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      data-slot="footer-newsletter-form"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function FooterNewsletterDisclaimer({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-newsletter-disclaimer"
      className={cn('text-xs text-neutral-500 leading-relaxed', className)}
      {...props}
    />
  )
}

function FooterSectionTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="footer-section-title"
      className={cn('text-neutral-100 font-semibold uppercase tracking-wider text-xs', className)}
      {...props}
    />
  )
}

function FooterColumnsGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-columns-grid"
      className={cn('grid grid-cols-2 gap-8 md:grid-cols-4', className)}
      {...props}
    />
  )
}

function FooterColumn({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="footer-column" className={cn('flex flex-col gap-4', className)} {...props} />
  )
}

function FooterColumnList({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="footer-column-list"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function FooterColumnItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="footer-column-item"
      className={cn('[&>a]:hover:text-neutral-100 [&>a]:transition-colors', className)}
      {...props}
    />
  )
}

function FooterDivider({ className, ...props }: React.ComponentProps<'hr'>) {
  return (
    <hr
      data-slot="footer-divider"
      className={cn('border-neutral-700', className)}
      {...props}
    />
  )
}

function FooterMiddleSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-middle-section"
      className={cn('py-8 grid grid-cols-1 gap-8 md:grid-cols-3', className)}
      {...props}
    />
  )
}

function FooterPaymentList({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-payment-list"
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
    />
  )
}

function FooterPaymentBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="footer-payment-badge"
      className={cn(
        'border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-400',
        className,
      )}
      {...props}
    />
  )
}

function FooterContactBlock({ className, ...props }: React.ComponentProps<'address'>) {
  return (
    <address
      data-slot="footer-contact-block"
      className={cn(
        'not-italic flex flex-col gap-1 text-neutral-400 [&>a]:hover:text-neutral-100 [&>a]:transition-colors',
        className,
      )}
      {...props}
    />
  )
}

function FooterSocialList({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="footer-social-list"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function FooterSocialItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="footer-social-item"
      className={cn('[&>a]:hover:text-neutral-100 [&>a]:transition-colors', className)}
      {...props}
    />
  )
}

function FooterBottomSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-bottom-section"
      className={cn('py-6 flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function FooterTagline({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-tagline"
      className={cn('text-xs uppercase tracking-widest text-neutral-500 font-semibold', className)}
      {...props}
    />
  )
}

function FooterCopyright({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-copyright"
      className={cn('text-xs text-neutral-500', className)}
      {...props}
    />
  )
}

function FooterLegalLinks({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-legal-links"
      className={cn(
        'flex flex-wrap items-center gap-3 text-xs text-neutral-500 [&>a]:hover:text-neutral-100 [&>a]:transition-colors',
        className,
      )}
      {...props}
    />
  )
}

export {
  FooterBottomSection,
  FooterColumn,
  FooterColumnItem,
  FooterColumnList,
  FooterColumnsGrid,
  FooterContactBlock,
  FooterContainer,
  FooterCopyright,
  FooterDivider,
  FooterLegalLinks,
  FooterMiddleSection,
  FooterNewsletterDisclaimer,
  FooterNewsletterFormWrapper,
  FooterNewsletterWrapper,
  FooterPaymentBadge,
  FooterPaymentList,
  FooterRoot,
  FooterSectionTitle,
  FooterSocialItem,
  FooterSocialList,
  FooterTagline,
  FooterTopSection,
}
