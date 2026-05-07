'use client'

import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

export const LogoutPage: React.FC = (props) => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Vous êtes bien déconnecté.')
      } catch (_) {
        setError('Vous étiez déjà déconnecté.')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div className="prose dark:prose-invert">
          <h1>{error || success}</h1>
          <p>
            Que souhaitez-vous faire ensuite ?
            <Fragment>
              {' '}
              <Link href="/search">Cliquez ici</Link>
              {` pour explorer la boutique.`}
            </Fragment>
            {` Pour vous reconnecter, `}
            <Link href="/login">cliquez ici</Link>.
          </p>
        </div>
      )}
    </Fragment>
  )
}
