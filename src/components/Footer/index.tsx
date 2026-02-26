import { FooterNavColumn } from '@/components/Footer/menu'
import { NewsletterForm } from '@/components/Footer/newsletter-form'
import {
  FooterBottomSection,
  FooterColumn,
  FooterColumnItem,
  FooterColumnList,
  FooterColumnsGrid,
  FooterContactBlock,
  FooterContainer,
  FooterCopyright,
  FooterDivider,
  FooterLegalLinks,
  FooterMiddleSection,
  FooterNewsletterDisclaimer,
  FooterNewsletterWrapper,
  FooterPaymentBadge,
  FooterPaymentList,
  FooterRoot,
  FooterSectionTitle,
  FooterSocialItem,
  FooterSocialList,
  FooterTagline,
  FooterTopSection,
} from '@/components/ui/footer-layout'
import { CONTACT } from '@/constants/contact'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import React from 'react'

const MARQUES = [
  { label: 'Archipel', href: '/marques/archipel' },
  { label: 'Boreal Sauna', href: '/marques/boreal-sauna' },
  { label: 'François Roger', href: '/marques/francois-roger' },
  { label: 'Harvia', href: '/marques/harvia' },
  { label: 'Insigna', href: '/marques/insigna' },
  { label: 'PRO STEAM', href: '/marques/pro-steam' },
  { label: 'Voir plus', href: '/marques' },
]

const QUI_SOMMES_NOUS = [
  { label: 'Qui sommes-nous ?', href: '/qui-sommes-nous' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
]

const INFOS_PRATIQUES = [
  { label: 'Contactez-nous', href: '/contact' },
  { label: 'Plan du site', href: '/plan-du-site' },
  { label: 'RGPD', href: '/rgpd' },
]

const PAYMENT_METHODS = [
  'American Express',
  'Mastercard',
  'PayPal',
  'Visa',
  'Chèque',
  'Virement',
  'Crédit',
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGV', href: '/cgv' },
  { label: 'Politique de confidentialité et Cookies', href: '/politique-de-confidentialite' },
]


const getCachedCategories = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'categories',
      limit: 10,
      sort: 'title',
      overrideAccess: false,
    })
    return result.docs
  },
  ['footer-categories'],
  { tags: ['categories'] },
)

export async function Footer() {
  const categories = await getCachedCategories()
  const currentYear = new Date().getFullYear()

  const categoriesLinks = categories.map((cat) => ({
    label: cat.title,
    href: `/shop?category=${cat.id}`,
  }))

  return (
    <FooterRoot>
      <FooterContainer>
        {/* Newsletter + colonnes de navigation */}
        <FooterTopSection>
          <FooterNewsletterWrapper>
            <FooterSectionTitle>Lettre d&apos;informations</FooterSectionTitle>
            <NewsletterForm />
            <FooterNewsletterDisclaimer>
              Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations
              de contact dans les conditions d&apos;utilisation du site.
            </FooterNewsletterDisclaimer>
          </FooterNewsletterWrapper>

          <FooterColumnsGrid>
            <FooterNavColumn title="Nos univers" links={categoriesLinks} />
            <FooterNavColumn title="Nos marques" links={MARQUES} />
            <FooterNavColumn title="Qui sommes-nous" links={QUI_SOMMES_NOUS} />
            <FooterNavColumn title="Infos pratiques" links={INFOS_PRATIQUES} />
          </FooterColumnsGrid>
        </FooterTopSection>

        <FooterDivider />

        {/* Paiement + contact + réseaux sociaux */}
        <FooterMiddleSection>
          <FooterColumn>
            <FooterSectionTitle>Paiement sécurisé</FooterSectionTitle>
            <FooterPaymentList>
              {PAYMENT_METHODS.map((method) => (
                <FooterPaymentBadge key={method}>{method}</FooterPaymentBadge>
              ))}
            </FooterPaymentList>
          </FooterColumn>

          <FooterColumn>
            <FooterSectionTitle>Nous contacter</FooterSectionTitle>
            <FooterContactBlock>
              <span>{CONTACT.address.company}</span>
              <span>{CONTACT.address.street}</span>
              <span>{CONTACT.address.building}</span>
              <span>{CONTACT.address.postal}</span>
              <span>{CONTACT.address.country}</span>
              <a href={CONTACT.phoneHref}>Tel : {CONTACT.phone}</a>
              <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
            </FooterContactBlock>
          </FooterColumn>

          <FooterColumn>
            <FooterSectionTitle>Nous suivre</FooterSectionTitle>
            <FooterSocialList>
              {CONTACT.social.map((social) => (
                <FooterSocialItem key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </FooterSocialItem>
              ))}
            </FooterSocialList>
          </FooterColumn>
        </FooterMiddleSection>

        <FooterDivider />

        {/* Tagline + copyright + liens légaux */}
        <FooterBottomSection>
          <FooterTagline>{CONTACT.address.company.toUpperCase()} — VOTRE ESPACE BIEN-ÊTRE SUR MESURE</FooterTagline>
          <FooterCopyright>
            &copy; {CONTACT.copyrightStartYear} - {currentYear} {CONTACT.address.company}
          </FooterCopyright>
          <FooterLegalLinks>
            {LEGAL_LINKS.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && <span>|</span>}
                <Link href={item.href}>{item.label}</Link>
              </React.Fragment>
            ))}
          </FooterLegalLinks>
        </FooterBottomSection>
      </FooterContainer>
    </FooterRoot>
  )
}
