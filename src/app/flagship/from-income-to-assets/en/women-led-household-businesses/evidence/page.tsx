import type { Metadata } from 'next'
import { WomenLedEvidencePage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Evidence ledger | Women-led Case Study',
  description: 'Aggregated fieldwork, verified claims, sources, and confidence for the Bình Định case study.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/evidence', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/evidence' } },
}
export default function Page() { return <WomenLedEvidencePage locale="en" /> }
