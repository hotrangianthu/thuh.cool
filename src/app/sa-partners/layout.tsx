import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import './sa-partners.css'

export const metadata: Metadata = {
  title: {
    default: 'Sa. Partners | Market Intelligence',
    template: '%s | Sa. Partners',
  },
  description: 'Qualified research reports on public policy, macroeconomics, financial markets, and regulated product strategy in Vietnam and Southeast Asia.',
}

export default function SaPartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="sa-site">
      <header className="sa-header">
        <div className="sa-header-row">
          <Link href="/" className="sa-monogram" aria-label="Back to thuh.cool">Sa.</Link>
          <Link href="/sa-partners" className="sa-wordmark">Sa. Partners</Link>
          <a className="sa-header-contact" href="mailto:thulaneinc@gmail.com?subject=Sa.%20Partners%20research%20inquiry">
            Research desk <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <nav className="sa-nav" aria-label="Sa. Partners navigation">
          <Link href="/sa-partners">Discover</Link>
          <Link href="/sa-partners#library">Research catalog</Link>
          <Link href="/sa-partners#access">Access & licensing</Link>
          <Link href="/sa-partners#about">Agency</Link>
        </nav>
      </header>
      <main>{children}</main>
    </section>
  )
}
