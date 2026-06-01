import { Star } from 'lucide-react'

import {
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorRole,
  TestimonialCard,
  TestimonialQuote,
  TestimonialStars,
  TestimonialsGrid,
  TestimonialsHeader,
  TestimonialsSection,
  TestimonialsTitle,
} from '@/components/ui/testimonials-layout'

type Testimonial = {
  id: number
  rating: number
  quote: string
  name: string
  role: string
}

// Avis clients réels uniquement — à alimenter au fil des commandes.
// Tant que le tableau est vide, la section ne s'affiche pas : pas de faux avis.
const TESTIMONIALS: Testimonial[] = []

export function Testimonials() {
  if (TESTIMONIALS.length === 0) {
    return null
  }

  return (
    <TestimonialsSection>
      <TestimonialsHeader>
        <TestimonialsTitle>Ce que nos clients disent</TestimonialsTitle>
      </TestimonialsHeader>
      <TestimonialsGrid>
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id}>
            <TestimonialStars aria-label={`${testimonial.rating} étoiles sur 5`}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" aria-hidden="true" />
              ))}
            </TestimonialStars>
            <TestimonialQuote>&ldquo;{testimonial.quote}&rdquo;</TestimonialQuote>
            <TestimonialAuthor>
              <TestimonialAuthorName>{testimonial.name}</TestimonialAuthorName>
              <TestimonialAuthorRole>{testimonial.role}</TestimonialAuthorRole>
            </TestimonialAuthor>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsSection>
  )
}
