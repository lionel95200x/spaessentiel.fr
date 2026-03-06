import { cn } from '@/utilities/cn'
import { Package, RotateCcw, ShieldCheck, Truck, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ProductReassurance({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="product-reassurance"
      className={cn('grid grid-cols-3 divide-x rounded-lg border', className)}
      {...props}
    >
      <ProductReassuranceItem icon={<Truck size={16} />} label="Livraison offerte" />
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
      className={cn('flex items-center gap-3 text-emerald-600', className)}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-extrabold leading-[1.1]">Livraison &amp; Retours Gratuits</span>
    </div>
  )
}

function TrustpilotBadge({ className }: { className?: string }) {
  return (
    <div data-slot="trustpilot-badge" className={cn(className)}>
      <Image
        src="/images/reassurance/trustpilot.svg"
        alt="Trustpilot"
        width={200}
        height={50}
        unoptimized
      />
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

export { FreeDeliveryBadge, PersonsCapacityBadge, PremiumBadge, ProductReassurance, SupplierName, TrustpilotBadge, WeightBadge }
