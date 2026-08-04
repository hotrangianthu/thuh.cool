import type { Metadata } from 'next'
import PrivacyPage from '@/components/flagship/PrivacyPage'

export const metadata: Metadata = { title: 'Quyền riêng tư | Từ Thu nhập đến Tài sản', robots: { index: false } }

export default function Page() { return <PrivacyPage locale="vi" /> }

