'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/cn'

function ErrorContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto my-8 max-w-xl', className)}
      {...props}
    />
  )
}

function ErrorText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function ErrorButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn('w-full', className)}
      {...props}
    />
  )
}

export default function Error({ reset }: { reset: () => void }) {
  return (
    <ErrorContainer>
      <Card>
        <CardHeader>
          <CardTitle>Une erreur est survenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorText>
            Un problème est survenu sur notre boutique. Il peut s&apos;agir d&apos;une erreur
            temporaire, veuillez réessayer.
          </ErrorText>
        </CardContent>
        <CardFooter>
          <ErrorButton onClick={() => reset()}>
            Réessayer
          </ErrorButton>
        </CardFooter>
      </Card>
    </ErrorContainer>
  )
}
