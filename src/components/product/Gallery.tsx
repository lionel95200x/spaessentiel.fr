'use client'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { GridTileImage } from '@/components/Grid/tile'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ZoomIn } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { DefaultDocumentIDType } from 'payload'
import React, { useEffect } from 'react'

type Props = {
  gallery: NonNullable<Product['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams()
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  useEffect(() => {
    const values = Array.from(searchParams.values())

    if (values && api) {
      const index = gallery.findIndex((item) => {
        if (!item.variantOption) return false

        let variantID: DefaultDocumentIDType

        if (typeof item.variantOption === 'object') {
          variantID = item.variantOption.id
        } else variantID = item.variantOption

        return Boolean(values.find((value) => value === String(variantID)))
      })

      if (index !== -1) {
        setCurrent(index)
        api.scrollTo(index, true)
      }
    }
  }, [searchParams, api, gallery])

  return (
    <div>
      {/* Main image — click to zoom */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative mb-8 w-full cursor-zoom-in overflow-hidden">
            <Media
              resource={gallery[current].image}
              className="w-full"
              imgClassName="w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <div className="rounded-full bg-background/80 p-3 backdrop-blur-sm">
                <ZoomIn className="size-5 text-foreground" />
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white">
          <Media
            resource={gallery[current].image}
            className="w-full"
            imgClassName="w-full rounded-lg object-contain max-h-[85vh]"
          />
        </DialogContent>
      </Dialog>

      {/* Thumbnails — only if more than one image */}
      {gallery.length > 1 && (
        <div className="relative px-8">
          <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
            <CarouselContent>
              {gallery.map((item, i) => {
                if (typeof item.image !== 'object') return null

                return (
                  <CarouselItem
                    className="basis-1/5 cursor-pointer"
                    key={`${item.image.id}-${i}`}
                    onClick={() => setCurrent(i)}
                  >
                    <GridTileImage active={i === current} media={item.image} />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            {gallery.length > 5 && (
              <>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  )
}
