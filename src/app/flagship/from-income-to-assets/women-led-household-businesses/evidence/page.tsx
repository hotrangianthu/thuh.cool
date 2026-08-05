import type { Metadata } from 'next'
import { WomenLedEvidencePage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Sổ bằng chứng | Nghiên cứu hộ kinh doanh do phụ nữ dẫn dắt',
  description: 'Sổ thực địa tổng hợp, nhận định đã xác minh, nguồn và mức tin cậy của nghiên cứu Bình Định.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/evidence', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/evidence' } },
}
export default function Page() { return <WomenLedEvidencePage locale="vi" /> }
