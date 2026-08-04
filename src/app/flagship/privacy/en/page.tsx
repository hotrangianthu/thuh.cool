import type { Metadata } from 'next'
import PrivacyPage from '@/components/flagship/PrivacyPage'

export const metadata: Metadata = { title: 'Privacy | From Income to Assets', robots: { index: false } }

export default function Page() { return <PrivacyPage locale="en" /> }

