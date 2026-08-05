import { buildPilotCostCsv, csvDownload } from '@/lib/flagship-case-study-downloads'

export function GET() {
  return csvDownload(buildPilotCostCsv('en'), 'binh-dinh-pilot-cost-model.csv')
}

