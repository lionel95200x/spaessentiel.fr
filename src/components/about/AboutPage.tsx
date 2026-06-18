import Link from 'next/link'

import { ReassuranceBar } from '@/components/shop-home/ReassuranceBar'
import {
  AboutBlock,
  AboutBlocks,
  AboutBlockTitle,
  AboutContainer,
  AboutCta,
  AboutEyebrow,
  AboutHeader,
  AboutLead,
  AboutSection,
  AboutText,
  AboutTitle,
  AboutUniverseCard,
  AboutUniverseGrid,
} from '@/components/ui/about-layout'
import { Button } from '@/components/ui/button'
import { SupportSection } from '@/components/ui/support-section'
import { CONTACT } from '@/constants/contact'

export function AboutPage() {
  return (
    <>
      <AboutSection>
        <AboutContainer>
          <AboutHeader>
            <AboutEyebrow>Spa Essentiel</AboutEyebrow>
            <AboutTitle>Qui sommes-nous</AboutTitle>
            <AboutLead>
              Spa Essentiel rend l&apos;expérience du spa, du sauna et du bain nordique accessible
              chez vous. Nous sélectionnons des équipements de bien-être haut de gamme et nous vous
              accompagnons, en français, du choix du modèle jusqu&apos;à son installation.
            </AboutLead>
          </AboutHeader>

          <AboutBlocks>
            <AboutBlock>
              <AboutBlockTitle>Une sélection exigeante</AboutBlockTitle>
              <AboutText>
                Nous ne référençons pas tout ce qui existe. Chaque modèle de notre catalogue est
                retenu sur des critères précis : qualité des matériaux — cèdre rouge, hemlock, acier
                inoxydable —, finitions, confort et durabilité. Notre rôle est de filtrer le marché
                pour ne proposer que des équipements dans lesquels nous avons confiance, plutôt
                qu&apos;un catalogue interminable où tout se vaut.
              </AboutText>
            </AboutBlock>

            <AboutBlock>
              <AboutBlockTitle>Un accompagnement humain, en français</AboutBlockTitle>
              <AboutText>
                Un spa ou un sauna est un vrai investissement. Avant l&apos;achat, un conseiller
                répond à vos questions — dimensions, puissance, installation, entretien — pour que
                vous choisissiez le bon modèle du premier coup. Après la livraison, le même
                interlocuteur reste joignable pour le SAV, les pièces et les conseils
                d&apos;usage. Pas de hotline anonyme : un contact en français, du{' '}
                {CONTACT.hours.days.toLowerCase()} ({CONTACT.hours.morning} ·{' '}
                {CONTACT.hours.afternoon}).
              </AboutText>
            </AboutBlock>

            <AboutBlock>
              <AboutBlockTitle>Nos univers</AboutBlockTitle>
              <AboutUniverseGrid>
                <AboutUniverseCard
                  href="/category/sauna"
                  title="Sauna"
                  description="Saunas traditionnels, infrarouges et extérieurs en bois massif."
                />
                <AboutUniverseCard
                  href="/category/bain-nordique"
                  title="Bain nordique"
                  description="Bains nordiques et bains à remous en bois, chauffe au bois ou électrique."
                />
                <AboutUniverseCard
                  href="/category/balneo"
                  title="Balnéo"
                  description="Spas balnéo et baignoires à remous pour la détente à domicile."
                />
              </AboutUniverseGrid>
            </AboutBlock>
          </AboutBlocks>

          <AboutCta>
            <Button asChild variant="cta" size="lg">
              <Link href="/shop">Découvrir la boutique</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </AboutCta>
        </AboutContainer>
      </AboutSection>

      <SupportSection />
      <ReassuranceBar />
    </>
  )
}
