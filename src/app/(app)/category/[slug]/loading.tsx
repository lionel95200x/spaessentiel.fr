import { Grid } from '@/components/Grid'
import React from 'react'

export default function Loading() {
  return (
    <>
      <div className="animate-pulse bg-neutral-100 dark:bg-neutral-900 h-[85vh]" />
      <div className="container py-20">
        <div className="mb-10 flex items-end justify-between">
          <div className="h-8 w-32 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
          <div className="h-3 w-24 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                className="animate-pulse bg-neutral-100 dark:bg-neutral-900 aspect-[3/4]"
                key={index}
              />
            ))}
        </Grid>
      </div>
    </>
  )
}
