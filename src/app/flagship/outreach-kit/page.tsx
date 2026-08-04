import type { Metadata } from 'next'
import OutreachKitPage from '@/components/flagship/OutreachKitPage'

export const metadata: Metadata = { title: 'Bộ tài liệu tiếp cận | Từ Thu nhập đến Tài sản', robots: { index: false } }
export default function Page() { return <OutreachKitPage locale="vi" /> }

