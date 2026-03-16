import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ShopSection,
  ShopSectionHeader,
  ShopSectionTitle,
} from '@/components/ui/shop-home-layout'
import React from 'react'

type FaqItem = {
  id?: string | null
  question: string
  answer: string
}

type Props = {
  id?: string
  title?: string | null
  items?: FaqItem[] | null
}

export const FaqBlockComponent: React.FC<Props> = ({ title, items }) => {
  if (!items || items.length === 0) return null

  return (
    <ShopSection>
      <ShopSectionHeader>
        <ShopSectionTitle>{title ?? 'FAQ'}</ShopSectionTitle>
      </ShopSectionHeader>
      <Accordion type="multiple">
        {items.map((item, index) => (
          <AccordionItem key={item.id ?? index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ShopSection>
  )
}
