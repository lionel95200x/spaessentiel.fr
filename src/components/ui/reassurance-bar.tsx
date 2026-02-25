import * as React from 'react'

import { cn } from '@/utilities/cn'

function ReassuranceBar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="reassurance-bar"
      className={cn('bg-primary text-primary-foreground border-b border-border', className)}
      {...props}
    />
  )
}

function ReassuranceBarInner({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="reassurance-bar-inner"
      className={cn(
        'container flex items-center justify-center gap-6 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest',
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
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

function ReassuranceBarSeparator({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="reassurance-bar-separator"
      className={cn('opacity-25', className)}
      {...props}
    >
      |
    </span>
  )
}

function ReassuranceBarLink({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      data-slot="reassurance-bar-link"
      className={cn('opacity-80 transition-opacity hover:opacity-100', className)}
      {...props}
    />
  )
}

export {
  ReassuranceBar,
  ReassuranceBarInner,
  ReassuranceBarItem,
  ReassuranceBarSeparator,
  ReassuranceBarLink,
}
