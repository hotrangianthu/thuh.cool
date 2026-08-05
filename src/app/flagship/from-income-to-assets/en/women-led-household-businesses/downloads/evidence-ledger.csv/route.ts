import { buildEvidenceLedgerCsv, csvDownload } from '@/lib/flagship-case-study-downloads'

export function GET() {
  return csvDownload(buildEvidenceLedgerCsv('en'), 'binh-dinh-evidence-ledger.csv')
}

