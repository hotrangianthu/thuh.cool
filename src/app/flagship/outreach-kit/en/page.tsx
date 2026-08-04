import type { Metadata } from 'next'
import OutreachKitPage from '@/components/flagship/OutreachKitPage'

export const metadata: Metadata = { title: 'Outreach kit | From Income to Assets', robots: { index: false } }
export default function Page() { return <OutreachKitPage locale="en" /> }

