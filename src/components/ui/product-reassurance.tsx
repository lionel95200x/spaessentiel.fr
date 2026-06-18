import { cn } from '@/utilities/cn'
import { Award, CreditCard, Package, Phone, RotateCcw, ShieldCheck, Truck, Users } from 'lucide-react'
import React from 'react'

function ProductReassurance({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-reassurance"
      className={cn(
        'grid grid-cols-2 divide-x divide-y rounded-lg border sm:grid-cols-4 sm:divide-y-0',
        className,
      )}
      {...props}
    >
      <ProductReassuranceItem icon={<Truck size={16} />} label="Livraison offerte" />
      <ProductReassuranceItem icon={<Award size={16} />} label="Garantie 5 ans" />
      <ProductReassuranceItem icon={<RotateCcw size={16} />} label="Retours 30 jours" />
      <ProductReassuranceItem icon={<ShieldCheck size={16} />} label="Paiement sécurisé" />
    </div>
  )
}

function ProductReassuranceItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-center">
      <span className="text-muted-foreground">{icon}</span>
      <span className="font-mono text-[0.6rem] uppercase leading-tight tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function FreeDeliveryBadge({ className }: { className?: string }) {
  return (
    <div
      data-slot="free-delivery-badge"
      className={cn('flex items-center gap-3 text-success', className)}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="font-extrabold leading-[1.1]">Livraison &amp; Retours Gratuits</span>
    </div>
  )
}

function PaymentFacility({
  label,
  detail,
  className,
}: {
  label: string
  detail?: string
  className?: string
}) {
  return (
    <div
      data-slot="payment-facility"
      className={cn('flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-sm', className)}
    >
      <CreditCard size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
      <span className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="font-medium text-foreground">{label}</span>
        {detail ? <span className="text-muted-foreground">{detail}</span> : null}
      </span>
    </div>
  )
}

function ExpertHelp({
  phone,
  phoneHref,
  className,
}: {
  phone: string
  phoneHref: string
  className?: string
}) {
  return (
    <div
      data-slot="expert-help"
      className={cn('flex items-center gap-3 rounded-lg border border-border bg-muted px-4 py-3', className)}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground">
        <Phone size={16} strokeWidth={1.5} />
      </span>
      <span className="flex flex-col text-sm leading-snug">
        <span className="font-medium text-foreground">Une question avant d&apos;investir ?</span>
        <a href={phoneHref} className="w-fit text-muted-foreground underline-offset-4 hover:underline">
          Parlez à un expert — {phone}
        </a>
      </span>
    </div>
  )
}

function ProductInfoBadge({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode
  label: string
  className?: string
}) {
  return (
    <div
      data-slot="product-info-badge"
      className={cn('flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium', className)}
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </div>
  )
}

function WeightBadge({ weight, className }: { weight: number; className?: string }) {
  return <ProductInfoBadge icon={<Package size={14} />} label={`${weight} kg`} className={className} />
}

function PersonsCapacityBadge({ capacity, className }: { capacity: number; className?: string }) {
  const label = `${capacity} ${capacity > 1 ? 'personnes' : 'personne'}`
  return <ProductInfoBadge icon={<Users size={14} />} label={label} className={className} />
}

function PremiumBadge({ className }: { className?: string }) {
  return (
    <span
      data-slot="premium-badge"
      className={cn(
        'inline-flex w-fit rounded border border-border bg-muted px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground',
        className,
      )}
    >
      Haut de gamme
    </span>
  )
}

function SupplierName({ name, className }: { name: string; className?: string }) {
  return (
    <p data-slot="supplier-name" className={cn('text-sm italic text-muted-foreground', className)}>
      {name}
    </p>
  )
}

export { ExpertHelp, FreeDeliveryBadge, PaymentFacility, PersonsCapacityBadge, PremiumBadge, ProductReassurance, SupplierName, WeightBadge }
