import type { Metadata } from 'next'
import { WomenLedPilotPage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Thiết kế thí điểm khả năng chống chịu tài chính',
  description: 'Ma trận phương án, giao thức năm tuần, chỉ số, ranh giới tuyên bố và mô hình chi phí.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/pilot', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/pilot' } },
}
export default function Page() { return <WomenLedPilotPage locale="vi" /> }
