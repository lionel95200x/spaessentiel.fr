import { cn } from '@/utilities/cn'
import Image from 'next/image'
import React from 'react'

type Props = {
  title: string
  subtitle: string
  className?: string
  children?: React.ReactNode
}

function NotFoundProduct({ title, subtitle, className, children }: Props) {
  return (
    <div
      data-slot="not-found-product"
      className={cn('relative mx-auto max-w-2xl overflow-hidden rounded-lg aspect-[3/2]', className)}
    >
      <Image
        src="/images/products/not-found-product.jpg"
        alt={title}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center px-8">
        <h2 className="font-serif text-3xl font-light tracking-wide text-primary-foreground">
          {title}
        </h2>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
          {subtitle}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  )
}

export { NotFoundProduct }
