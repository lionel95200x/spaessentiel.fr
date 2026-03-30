import { AlertBox } from '@/components/ui/alert-box'
import React from 'react'

export const Message: React.FC<{
  className?: string
  error?: React.ReactNode
  message?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
}> = ({ className, error, message, success, warning }) => {
  const messageToRender = message || error || success || warning

  if (!messageToRender) return null

  const variant = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default'

  return (
    <AlertBox variant={variant} className={className}>
      {messageToRender}
    </AlertBox>
  )
}
