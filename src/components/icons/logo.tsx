import clsx from 'clsx'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-label="Solbad logo"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('h-5 w-5 text-black dark:text-white', props.className)}
    >
      {/* Cabin silhouette with door cutout */}
      <path
        d="M12 12 L21 17 L19 17 L19 23 L5 23 L5 17 L3 17 Z M10 19 L14 19 L14 23 L10 23 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      {/* Steam wisps */}
      <path d="M9 11 C7 8.5 11 6 9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 11 C10 8.5 14 6 12 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M15 11 C13 8.5 17 6 15 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
