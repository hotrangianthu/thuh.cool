import type { Metadata } from 'next'
import FlagshipPage from '@/components/flagship/FlagshipPage'

export const metadata: Metadata = {
  title: 'From Income to Assets | ThuH Flagship',
  description: 'An independent public-interest study of how rural Vietnamese households move from income toward resilience and productive assets.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets', en: '/flagship/from-income-to-assets/en' } },
  openGraph: { title: 'From Income to Assets', description: 'Vietnam Rural Wealth Progression Project', type: 'website', locale: 'en_US' },
}

export default function Page() {
  return <FlagshipPage locale="en" />
}

