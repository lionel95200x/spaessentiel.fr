import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { ReassuranceBar } from '@/components/shop-home/ReassuranceBar'
import {
  ContactCard,
  ContactCardTitle,
  ContactContainer,
  ContactGrid,
  ContactHeader,
  ContactItem,
  ContactItemLabel,
  ContactItemValue,
  ContactLink,
  ContactList,
  ContactSection,
  ContactSubtitle,
  ContactTitle,
} from '@/components/ui/contact-layout'
import { SupportSection } from '@/components/ui/support-section'
import { CONTACT } from '@/constants/contact'

const emailAddress = CONTACT.email.href.replace('mailto:', '')

export function ContactPage() {
  return (
    <>
      <ContactSection>
        <ContactContainer>
          <ContactHeader>
            <ContactTitle>Contactez-nous</ContactTitle>
            <ContactSubtitle>
              Une question sur un produit, un projet d&apos;installation ou le suivi d&apos;une
              commande ? Notre équipe vous répond et vous accompagne à chaque étape.
            </ContactSubtitle>
          </ContactHeader>

          <ContactGrid>
            <ContactCard>
              <ContactCardTitle>Nos coordonnées</ContactCardTitle>
              <ContactList>
                <ContactItem icon={<Phone size={18} strokeWidth={1.5} />}>
                  <ContactItemLabel>Téléphone</ContactItemLabel>
                  <ContactLink href={CONTACT.phoneHref}>{CONTACT.phone}</ContactLink>
                </ContactItem>
                <ContactItem icon={<Mail size={18} strokeWidth={1.5} />}>
                  <ContactItemLabel>Email</ContactItemLabel>
                  <ContactLink href={CONTACT.email.href}>{emailAddress}</ContactLink>
                </ContactItem>
                <ContactItem icon={<MapPin size={18} strokeWidth={1.5} />}>
                  <ContactItemLabel>Adresse</ContactItemLabel>
                  <ContactItemValue>
                    {CONTACT.address.company}, {CONTACT.address.street}, {CONTACT.address.postal},{' '}
                    {CONTACT.address.country}
                  </ContactItemValue>
                </ContactItem>
              </ContactList>
            </ContactCard>

            <ContactCard>
              <ContactCardTitle>Horaires</ContactCardTitle>
              <ContactList>
                <ContactItem icon={<Clock size={18} strokeWidth={1.5} />}>
                  <ContactItemLabel>{CONTACT.hours.days}</ContactItemLabel>
                  <ContactItemValue>
                    {CONTACT.hours.morning} · {CONTACT.hours.afternoon}
                  </ContactItemValue>
                </ContactItem>
              </ContactList>
            </ContactCard>
          </ContactGrid>
        </ContactContainer>
      </ContactSection>

      <SupportSection />
      <ReassuranceBar />
    </>
  )
}
