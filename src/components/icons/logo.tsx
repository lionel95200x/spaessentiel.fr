import clsx from 'clsx'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-label="Spa Essentiel logo"
      viewBox="0 0 108 44"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('h-8 w-auto', props.className)}
    >
      {/* SPA */}
      <text
        x="0"
        y="27"
        fontSize="30"
        fontWeight="800"
        letterSpacing="4"
        fill="currentColor"
        fontFamily="inherit"
      >
        SPA
      </text>

      {/* Ligne */}
      <line x1="0" y1="33" x2="106" y2="33" stroke="currentColor" strokeWidth="0.75" />

      {/* ESSENTIEL */}
      <text
        x="0"
        y="43"
        fontSize="11"
        fontWeight="400"
        letterSpacing="2.5"
        fill="currentColor"
        fontFamily="inherit"
      >
        ESSENTIEL
      </text>

      {/* Drapeau français — petit badge aligné avec ESSENTIEL */}
      <rect x="82" y="34" width="4" height="9" fill="#002395" />
      <rect x="86" y="34" width="4" height="9" fill="#FFFFFF" />
      <rect x="90" y="34" width="4" height="9" fill="#ED2939" />
      <rect x="82" y="34" width="12" height="9" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
    </svg>
  )
}
