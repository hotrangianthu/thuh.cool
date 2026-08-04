import type { Metadata } from 'next'
import Nav from '@policy/components/layout/nav'
import Footer from '@policy/components/layout/footer'
import './policy.css'

export const metadata: Metadata = {
  title: {
    default: 'Public Policy Portfolio | Ho Tran Gian Thu',
    template: '%s | Ho Tran Gian Thu',
  },
  description:
    'Policy research, field observations, prototypes, and interactive tools focused on inclusive digital development in Vietnam.',
  keywords: ['public policy', 'Vietnam', 'digital inclusion', 'fintech', 'policy research'],
}

export default function PublicPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="policy-site">
      <Nav />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </section>
  )
}
