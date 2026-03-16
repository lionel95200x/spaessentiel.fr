'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddressForm } from '@/components/forms/AddressForm'
import { Address } from '@/payload-types'
import { DefaultDocumentIDType } from 'payload'
import { useAuth } from '@/providers/Auth'

type Props = {
  addressID?: DefaultDocumentIDType
  initialData?: Partial<Omit<Address, 'country'>> & { country?: string }
  buttonText?: string
  modalTitle?: string
  callback?: (address: Partial<Address>) => void
  skipSubmission?: boolean
  disabled?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText = 'Ajouter une nouvelle adresse',
  modalTitle = 'Ajouter une nouvelle adresse',
  callback,
  skipSubmission,
  disabled,
}) => {
  const { user } = useAuth()

  // Forcer skipSubmission à true si l'utilisateur n'est pas connecté
  const shouldSkipSubmission = skipSubmission || !user
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleCallback = (data: Partial<Address>) => {
    closeModal()

    if (callback) {
      callback(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        <Button variant={'outline'}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {user
              ? 'Cette adresse sera associée à votre compte.'
              : 'Cette adresse sera utilisée pour cette commande uniquement.'}
          </DialogDescription>
        </DialogHeader>

        <AddressForm
          addressID={addressID}
          initialData={initialData}
          callback={handleCallback}
          skipSubmission={shouldSkipSubmission}
        />
      </DialogContent>
    </Dialog>
  )
}
