'use client'

import { FooterNewsletterFormWrapper } from '@/components/ui/footer-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')

  return (
    <FooterNewsletterFormWrapper onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        placeholder="Votre adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="outline" size="sm">
        S&apos;inscrire
      </Button>
    </FooterNewsletterFormWrapper>
  )
}
