import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className="relative px-2 hover:cursor-pointer"
      {...rest}
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {quantity ? (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-medium leading-none">
            {quantity}
          </span>
        ) : null}
      </div>
    </Button>
  )
}
