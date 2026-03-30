import { cn } from '@/utilities/cn'
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react'
import React from 'react'

const alertBoxStyles = {
  error: {
    container: 'border-destructive/30 bg-destructive/10',
    icon: 'text-destructive',
    text: 'text-destructive',
    Icon: CircleX,
  },
  warning: {
    container: 'border-warning/30 bg-warning/10',
    icon: 'text-warning',
    text: 'text-warning',
    Icon: CircleAlert,
  },
  success: {
    container: 'border-success/30 bg-success/10',
    icon: 'text-success',
    text: 'text-success',
    Icon: CircleCheck,
  },
  default: {
    container: 'border-border bg-muted',
    icon: 'text-muted-foreground',
    text: 'text-foreground',
    Icon: Info,
  },
} as const

type AlertBoxVariant = keyof typeof alertBoxStyles

function AlertBox({
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { variant: AlertBoxVariant }) {
  const style = alertBoxStyles[variant]
  return (
    <div
      data-slot="alert-box"
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3',
        style.container,
        className,
      )}
      {...props}
    >
      <style.Icon className={cn('mt-0.5 size-4 shrink-0', style.icon)} />
      <div className={cn('font-mono text-sm', style.text)}>{children}</div>
    </div>
  )
}

export { AlertBox }
export type { AlertBoxVariant }
