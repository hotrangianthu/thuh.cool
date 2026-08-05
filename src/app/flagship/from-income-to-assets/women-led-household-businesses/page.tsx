import type { Metadata } from 'next'
import WomenLedCaseStudyPage from '@/components/flagship/WomenLedCaseStudyPage'

export const metadata: Metadata = {
  title: 'Hộ kinh doanh do phụ nữ dẫn dắt tại Bình Định | ThuH Flagship',
  description: 'Nghiên cứu trường hợp thăm dò về dòng tiền, khả năng chống chịu và tài sản sinh kế của hộ kinh doanh do phụ nữ dẫn dắt tại một cộng đồng Bình Định.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses', en: '/flagship/from-income-to-assets/en/women-led-household-businesses' } },
}

export default function Page() {
  return <WomenLedCaseStudyPage locale="vi" />
}

