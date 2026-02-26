import {
  FooterColumn,
  FooterColumnItem,
  FooterColumnList,
  FooterSectionTitle,
} from '@/components/ui/footer-layout'
import Link from 'next/link'
import React from 'react'

type NavLink = {
  label: string
  href: string
}

type Props = {
  title: string
  links: NavLink[]
}

export function FooterNavColumn({ title, links }: Props) {
  return (
    <FooterColumn>
      <FooterSectionTitle>{title}</FooterSectionTitle>
      <FooterColumnList>
        {links.map((link) => (
          <FooterColumnItem key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </FooterColumnItem>
        ))}
      </FooterColumnList>
    </FooterColumn>
  )
}
