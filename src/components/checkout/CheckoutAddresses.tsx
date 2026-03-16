'use client'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Address } from '@/payload-types'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { useState } from 'react'

type Props = {
  selectedAddress?: Address
  setAddress: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  heading?: string
  description?: string
  setSubmit?: React.Dispatch<React.SetStateAction<() => void | Promise<void>>>
}

export const CheckoutAddresses: React.FC<Props> = ({
  setAddress,
  heading = 'Adresses',
  description = 'Veuillez sélectionner ou ajouter vos adresses de livraison et de facturation.',
}) => {
  const { addresses } = useAddresses()
  const { user } = useAuth()

  // Ce composant ne devrait être utilisé que pour les utilisateurs connectés
  if (!user) {
    return (
      <div>
        <p>Vous devez être connecté pour gérer vos adresses.</p>
      </div>
    )
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div>
        <p>Aucune adresse trouvée. Veuillez ajouter une adresse.</p>

        <CreateAddressModal />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium mb-2">{heading}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <AddressesModal setAddress={setAddress} />
    </div>
  )
}

const AddressesModal: React.FC<Props> = ({ setAddress }) => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }
  const { addresses } = useAddresses()

  if (!user) {
    return <p>Vous devez être connecté pour gérer vos adresses.</p>
  }

  if (!addresses || addresses.length === 0) {
    return <p>Aucune adresse trouvée. Veuillez ajouter une adresse.</p>
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>{'Sélectionner une adresse'}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{'Sélectionner une adresse'}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-12">
          <ul className="flex flex-col gap-8">
            {addresses.map((address) => (
              <li key={address.id} className="border-b pb-8 last:border-none">
                <AddressItem
                  address={address}
                  beforeActions={
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setAddress(address)
                        closeModal()
                      }}
                    >
                      Sélectionner
                    </Button>
                  }
                />
              </li>
            ))}
          </ul>

          <CreateAddressModal />
        </div>
      </DialogContent>
    </Dialog>
  )
}
