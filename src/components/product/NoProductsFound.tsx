import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NotFoundProduct } from '@/components/ui/not-found-product'

type Props = {
  title: string
  subtitle: string
}

export function NoProductsFound({ title, subtitle }: Props) {
  return (
    <NotFoundProduct title={title} subtitle={subtitle}>
      <Button asChild variant="outline">
        <Link href="/shop">Explorer la boutique</Link>
      </Button>
    </NotFoundProduct>
  )
}
