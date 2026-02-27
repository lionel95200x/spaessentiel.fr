import {
  ReassuranceBar as ReassuranceBarRoot,
  ReassuranceBarGrid,
  ReassuranceBarIcon,
  ReassuranceBarItem,
  ReassuranceBarSubtitle,
  ReassuranceBarTitle,
} from '@/components/ui/shop-home-layout'
import { Leaf, MessageCircle, RotateCcw, Truck } from 'lucide-react'

const items = [
  {
    icon: Truck,
    title: 'Livraison offerte',
    subtitle: "Dès 80€ d'achat",
  },
  {
    icon: Leaf,
    title: 'Produits naturels',
    subtitle: 'Sélectionnés avec soin',
  },
  {
    icon: RotateCcw,
    title: 'Retours gratuits',
    subtitle: 'Sous 30 jours',
  },
  {
    icon: MessageCircle,
    title: "Conseils d'experts",
    subtitle: 'Service client disponible',
  },
]

export function ReassuranceBar() {
  return (
    <ReassuranceBarRoot>
      <ReassuranceBarGrid>
        {items.map((item) => (
          <ReassuranceBarItem key={item.title}>
            <ReassuranceBarIcon>
              <item.icon size={20} strokeWidth={1.25} />
            </ReassuranceBarIcon>
            <ReassuranceBarTitle>{item.title}</ReassuranceBarTitle>
            <ReassuranceBarSubtitle>{item.subtitle}</ReassuranceBarSubtitle>
          </ReassuranceBarItem>
        ))}
      </ReassuranceBarGrid>
    </ReassuranceBarRoot>
  )
}
