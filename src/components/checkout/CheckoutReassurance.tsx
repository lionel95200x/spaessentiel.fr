import { CONTACT } from '@/constants/contact'
import { Lock } from 'lucide-react'
import { LiveAgents } from './LiveAgents'
import { PaymentIcons } from './PaymentIcons'

export function CheckoutReassurance() {
  return (
    <div className="flex flex-col gap-6 pt-4 border-t">
      {/* Paiements & Sécurité */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-muted-foreground" />
          <p className="font-semibold text-sm">Paiements sécurisés</p>
        </div>
        <PaymentIcons />
        <p className="text-xs text-muted-foreground">
          Vos informations de paiement sont totalement sécurisées. Votre numéro de carte n&apos;est jamais stocké ni accessible.
        </p>
      </div>

      {/* Besoin d'aide */}
      <div className="flex flex-col items-center gap-3 text-center border-t pt-4">
        <p className="font-semibold">Besoin d&apos;aide ?</p>
        <a href={CONTACT.phoneHref} className="text-xl font-bold underline underline-offset-4">
          {CONTACT.phone}
        </a>
        <p className="text-sm text-muted-foreground">
          {CONTACT.hours.days} : {CONTACT.hours.morning}, {CONTACT.hours.afternoon}
        </p>
        <LiveAgents />
      </div>
    </div>
  )
}
