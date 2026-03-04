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

const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    quote:
      "Une qualité exceptionnelle. Mon rituel du sauna a été transformé depuis l'achat de ces huiles essentielles. La livraison était rapide et l'emballage soigné.",
    name: 'Sophie M.',
    role: 'Cliente depuis 2024',
  },
  {
    id: 2,
    rating: 5,
    quote:
      "Des accessoires haut de gamme qui durent dans le temps. J'ai acheté un set complet et je suis ravi. Le service client est aux petits soins.",
    name: 'Pierre L.',
    role: 'Client depuis 2023',
  },
  {
    id: 3,
    rating: 5,
    quote:
      "La sélection de produits est vraiment soignée. On sent que chaque article a été choisi avec soin. Je recommande vivement à tous les amateurs de sauna.",
    name: 'Marie-Christine D.',
    role: 'Cliente depuis 2025',
  },
]

export function Testimonials() {
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
