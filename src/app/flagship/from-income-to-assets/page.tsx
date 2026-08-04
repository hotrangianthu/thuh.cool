import type { Metadata } from 'next'
import FlagshipPage from '@/components/flagship/FlagshipPage'

export const metadata: Metadata = {
  title: 'Từ Thu nhập đến Tài sản | ThuH Flagship',
  description: 'Dự án nghiên cứu công ích về tiến triển thịnh vượng của hộ gia đình và người làm kinh tế nhỏ ở nông thôn Việt Nam.',
  alternates: { languages: { vi: '/flagship/from-income-to-assets', en: '/flagship/from-income-to-assets/en' } },
  openGraph: { title: 'Từ Thu nhập đến Tài sản', description: 'Dự án Tiến triển Thịnh vượng Nông thôn Việt Nam', type: 'website', locale: 'vi_VN' },
}

export default function Page() {
  return <FlagshipPage locale="vi" />
}

