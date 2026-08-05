import { buildEvidenceLedgerCsv, csvDownload } from '@/lib/flagship-case-study-downloads'

export function GET() {
  return csvDownload(buildEvidenceLedgerCsv('vi'), 'so-bang-chung-binh-dinh.csv')
}

