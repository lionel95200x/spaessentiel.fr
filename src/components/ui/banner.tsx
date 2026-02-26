import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import React from 'react'

const aspectMap = {
  default: 'aspect-[21/9]',
  thin: 'aspect-[6/1]',
} as const

type BannerVariant = keyof typeof aspectMap

type BannerProps = (
  | { image: Media; src?: never; alt?: never }
  | { src: string; alt: string; image?: never }
) & {
  variant?: BannerVariant
  className?: string
  children?: React.ReactNode
}

function Banner({ variant = 'default', className, children, ...props }: BannerProps) {
  const aspect = aspectMap[variant]
  const isRounded = variant === 'default'

  return (
    <div
      data-slot="banner"
      className={cn('relative w-full overflow-hidden', isRounded && 'rounded-lg', className)}
    >
      {props.src ? (
        <Image
          src={props.src}
          alt={props.alt}
          width={1920}
          height={320}
          className={cn('w-full object-cover', aspect)}
        />
      ) : (
        <MediaComponent
          resource={props.image}
          className="w-full"
          imgClassName={cn('w-full object-cover', aspect)}
        />
      )}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      )}
    </div>
  )
}

export { Banner }
