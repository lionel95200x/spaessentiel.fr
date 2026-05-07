'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendOrderAccessEmail } from './sendOrderAccessEmail'

type FormData = {
  email: string
  orderID: string
}

type Props = {
  initialEmail?: string
}

export const FindOrderForm: React.FC<Props> = ({ initialEmail }) => {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>({
    defaultValues: {
      email: initialEmail || user?.email,
    },
  })

  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await sendOrderAccessEmail({
        email: data.email,
        orderID: data.orderID,
      })

      if (result.success) {
        setSuccess(true)
      } else {
        setSubmitError(result.error || 'Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  if (success) {
    return (
      <Fragment>
        <h1 className="text-xl mb-4">Vérifiez votre boîte mail</h1>
        <div className="prose dark:prose-invert">
          <p>
            Si une commande existe avec l&apos;email et le numéro renseignés, nous vous avons envoyé un lien pour la consulter.
          </p>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1 className="text-xl mb-4">Retrouver ma commande</h1>
      <div className="prose dark:prose-invert mb-8">
        <p>Saisissez votre email et le numéro de votre commande. Nous vous enverrons un lien pour la consulter.</p>
      </div>
      <form className="max-w-lg flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Label htmlFor="email" className="mb-2">
            Adresse email
          </Label>
          <Input
            id="email"
            {...register('email', { required: 'L’email est requis.' })}
            type="email"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>
        <FormItem>
          <Label htmlFor="orderID" className="mb-2">
            Numéro de commande
          </Label>
          <Input
            id="orderID"
            {...register('orderID', {
              required: 'Le numéro de commande est requis.',
            })}
            type="text"
          />
          {errors.orderID && <FormError message={errors.orderID.message} />}
        </FormItem>
        {submitError && <FormError message={submitError} />}
        <Button type="submit" className="self-start" variant="default" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi…' : 'Retrouver la commande'}
        </Button>
      </form>
    </Fragment>
  )
}
