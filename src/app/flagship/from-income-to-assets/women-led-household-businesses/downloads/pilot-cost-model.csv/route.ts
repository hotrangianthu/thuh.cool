import { buildPilotCostCsv, csvDownload } from '@/lib/flagship-case-study-downloads'

export function GET() {
  return csvDownload(buildPilotCostCsv('vi'), 'mo-hinh-chi-phi-thi-diem-binh-dinh.csv')
}

