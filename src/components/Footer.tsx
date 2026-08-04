'use client'

import { usePathname } from 'next/navigation'
import SocialIcons from './SocialIcons'
import NewsletterForm from './NewsletterForm'

function getFooterTheme(pathname: string) {
  if (pathname.startsWith('/public-policy')) return 'policy'
  if (pathname.startsWith('/flagship')) return 'flagship'
  if (pathname.startsWith('/sa-partners')) return 'sa-partners'
  if (pathname.startsWith('/admin')) return 'admin'
  return 'default'
}

export default function Footer() {
  const pathname = usePathname()
  const theme = getFooterTheme(pathname)

  return (
    <footer className={`site-footer site-footer--${theme}`}>
      <div className="site-footer__inner">
        <div className="site-footer__identity">
          <p className="site-footer__name">Ho Tran Gian Thu</p>
          <SocialIcons />
        </div>
        <NewsletterForm />
      </div>
    </footer>
  )
}
