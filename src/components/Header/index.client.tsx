'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import { ChevronDown, User } from 'lucide-react'
import React, { Suspense, useState } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  console.log('HeaderClient menu data:', JSON.stringify(menu.map(i => ({ label: i.link.label, sections: i.megaMenuSections?.length ?? 0 }))))
  return (
    <div className="relative z-20 border-b">
      <nav className="flex items-center md:items-end justify-between container pt-2">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex w-full items-end gap-6 md:w-1/3">
            <Link className="flex w-full items-center justify-center pt-4 pb-4 md:w-auto" href="/">
              <LogoIcon className="h-8 w-auto" />
            </Link>
            {menu.length ? (
              <ul className="hidden gap-4 text-sm md:flex md:items-center">
                {menu.map((item) => {
                  const hasMega = item.megaMenuSections && item.megaMenuSections.length > 0
                  const isOpen = activeMenu === item.id
                  return (
                    <li
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => hasMega && setActiveMenu(item.id!)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <CMSLink
                        {...item.link}
                        label={undefined}
                        size={'clear'}
                        className={cn('relative navLink', {
                          active:
                            item.link.url && item.link.url !== '/'
                              ? pathname.includes(item.link.url)
                              : false,
                        })}
                        appearance="nav"
                      >
                        {item.link.label}
                        {hasMega && (
                          <ChevronDown
                            className={cn(
                              'h-3 w-3 transition-transform duration-200',
                              { 'rotate-180': isOpen }
                            )}
                          />
                        )}
                      </CMSLink>

                      {hasMega && isOpen && (
                        <div className="absolute left-0 top-full pt-2 z-50">
                          <div className="bg-background border rounded-lg shadow-xl p-6 flex gap-8 min-w-80">
                            {item.megaMenuSections!.map((section) => (
                              <div key={section.id} className="min-w-0 flex-1">
                                {section.sectionTitle && (
                                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                                    {section.sectionTitle}
                                  </h3>
                                )}
                                <ul className="space-y-2">
                                  {section.links?.map((subLink) => (
                                    <li key={subLink.id}>
                                      <CMSLink
                                        {...subLink.link}
                                        appearance="link"
                                        className="text-sm hover:text-primary transition-colors block py-1"
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>

          <div className="flex justify-end md:w-1/3 gap-1 items-end">
            <Link href="/account" className="relative inline-flex pt-2 pb-6 px-2 text-primary/50 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
