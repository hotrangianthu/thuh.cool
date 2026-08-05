import type { Metadata } from 'next'
import { WomenLedMethodsPage } from '@/components/flagship/WomenLedCaseStudyDocuments'

export const metadata: Metadata = {
  title: 'Phương pháp và đạo đức | Nghiên cứu hộ kinh doanh do phụ nữ dẫn dắt',
  description: 'Phạm vi, tuyển chọn, phỏng vấn, đồng thuận, lưu trữ và giới hạn của nghiên cứu trường hợp Bình Định.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets/women-led-household-businesses/methods', en: '/flagship/from-income-to-assets/en/women-led-household-businesses/methods' } },
}
export default function Page() { return <WomenLedMethodsPage locale="vi" /> }
