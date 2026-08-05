import type { Metadata } from 'next'
import { WomenLedPilotPage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Financial-resilience pilot design | Women-led Case Study',
  description: 'Policy options, five-week protocol, measures, claim boundaries, and cost model.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/pilot', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/pilot' } },
}
export default function Page() { return <WomenLedPilotPage locale="en" /> }
