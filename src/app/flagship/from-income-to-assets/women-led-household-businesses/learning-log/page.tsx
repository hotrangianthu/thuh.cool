import type { Metadata } from 'next'
import { WomenLedLearningLogPage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Nhật ký học tập | Nghiên cứu hộ kinh doanh do phụ nữ dẫn dắt',
  description: 'Lịch sử phiên bản, lý do sửa đổi và lộ trình 90 ngày của nghiên cứu.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/learning-log', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/learning-log' } },
}
export default function Page() { return <WomenLedLearningLogPage locale="vi" /> }
