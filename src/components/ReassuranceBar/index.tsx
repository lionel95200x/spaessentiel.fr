import { Phone } from 'lucide-react'

import { CONTACT } from '@/constants/contact'
import {
  ReassuranceBar as ReassuranceBarRoot,
  ReassuranceBarInner,
  ReassuranceBarItem,
  ReassuranceBarLink,
  ReassuranceBarSeparator,
} from '@/components/ui/reassurance-bar'

export function ReassuranceBar() {
  return (
    <ReassuranceBarRoot>
      <ReassuranceBarInner>
        <ReassuranceBarItem>
          <span>🇫🇷</span>
        </ReassuranceBarItem>

        <ReassuranceBarSeparator />

        <ReassuranceBarItem>
          <Phone size={11} />
          <ReassuranceBarLink href={CONTACT.phoneHref}>{CONTACT.phone}</ReassuranceBarLink>
        </ReassuranceBarItem>

        <ReassuranceBarSeparator />

        <ReassuranceBarItem>
          <span>
            {CONTACT.hours.days}&nbsp;&nbsp;{CONTACT.hours.morning} &amp;{' '}
            {CONTACT.hours.afternoon}
          </span>
        </ReassuranceBarItem>
      </ReassuranceBarInner>
    </ReassuranceBarRoot>
  )
}
