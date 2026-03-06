import { cn } from '@/utilities/cn'
import { Headphones, MessageCircle, Settings, ShieldCheck } from 'lucide-react'
import React from 'react'

interface SupportItem {
  icon: React.ReactNode
  title: string
  description: string
  highlight: string
}

const SUPPORT_ITEMS: SupportItem[] = [
  {
    icon: <MessageCircle size={22} strokeWidth={1.5} />,
    title: 'SAV Dédié',
    description:
      'Un technicien spa disponible par téléphone ou visio pour diagnostiquer et résoudre vos pannes.',
    highlight: 'Réponse < 24h',
  },
  {
    icon: <Settings size={22} strokeWidth={1.5} />,
    title: 'Pièces & Consommables',
    description:
      'Filtres, couvercles, pompes et produits de traitement en stock permanent, expédiés en express.',
    highlight: 'Livraison Express',
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.5} />,
    title: 'Garantie 5 ANS',
    description:
      'Structure, coque et équipements couverts 5 ans. Intervention sur site en cas de défaut.',
    highlight: 'Garantie Pro',
  },
  {
    icon: <Headphones size={22} strokeWidth={1.5} />,
    title: 'Conseil Installation',
    description:
      'De la sélection du modèle à la mise en eau, nos experts vous accompagnent à chaque étape.',
    highlight: 'Accompagnement',
  },
]

function SupportCard({ icon, title, description, highlight }: SupportItem) {
  return (
    <div
      data-slot="support-card"
      className="flex flex-col gap-5 rounded-lg border border-border bg-background p-6"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <span className="mt-auto inline-flex w-fit items-center rounded border border-border bg-muted px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        {highlight}
      </span>
    </div>
  )
}

function SupportSection({ className }: { className?: string }) {
  return (
    <section data-slot="support-section" className={cn('bg-muted py-16', className)}>
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight">
            Un accompagnement de A à Z
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Spa, sauna, balnéo — nous sommes à vos côtés avant, pendant et après l&apos;installation.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPORT_ITEMS.map((item) => (
            <SupportCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { SupportSection }
