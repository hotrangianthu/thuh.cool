import type { Metadata } from 'next'
import WomenLedCaseStudyPage from '@/components/flagship/WomenLedCaseStudyPage'

export const metadata: Metadata = {
  title: 'Women-led Household Businesses in Bình Định | ThuH Flagship',
  description: 'An exploratory case study of cash flow, resilience, and productive assets among women-led household businesses in one Bình Định community.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses', en: '/flagship/from-income-to-assets/en/women-led-household-businesses' } },
}

export default function Page() {
  return <WomenLedCaseStudyPage locale="en" />
}

