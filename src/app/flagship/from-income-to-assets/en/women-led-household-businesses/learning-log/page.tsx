import type { Metadata } from 'next'
import { WomenLedLearningLogPage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Learning log | Women-led Case Study',
  description: 'Version history, revision reasons, and the case study’s first 90-day roadmap.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/learning-log', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/learning-log' } },
}
export default function Page() { return <WomenLedLearningLogPage locale="en" /> }
