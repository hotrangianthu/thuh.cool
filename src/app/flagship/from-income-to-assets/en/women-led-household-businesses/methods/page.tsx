import type { Metadata } from 'next'
import { WomenLedMethodsPage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Methods and ethics | Women-led Case Study',
  description: 'Scope, recruitment, interviews, consent, storage, and limitations for the Bình Định case study.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/methods', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/methods' } },
}
export default function Page() { return <WomenLedMethodsPage locale="en" /> }
