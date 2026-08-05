import { publicCostItems, publicEvidenceClaims } from '@/data/flagship-case-study'
import type { FlagshipLocale } from '@/data/flagship'

function csvCell(value: string | number | null | undefined) {
  const text = value === null || value === undefined ? '' : String(value)
  return `"${text.replaceAll('"', '""')}"`
}

function csv(rows: Array<Array<string | number | null | undefined>>) {
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`
}

export function buildEvidenceLedgerCsv(locale: FlagshipLocale) {
  const vi = locale === 'vi'
  return csv([
    vi
      ? ['Nhận định', 'Nguồn', 'Loại nguồn', 'Năm', 'Mức tin cậy', 'Bằng chứng cạnh tranh', 'Cách sử dụng', 'URL']
      : ['Claim', 'Source', 'Source type', 'Year', 'Confidence', 'Competing evidence', 'Use in project', 'URL'],
    ...publicEvidenceClaims.map((claim) => [
      claim.claim[locale],
      claim.source,
      claim.sourceType[locale],
      claim.year,
      claim.confidence,
      claim.competingEvidence[locale],
      claim.use[locale],
      claim.sourceUrl,
    ]),
  ])
}

export function buildPilotCostCsv(locale: FlagshipLocale) {
  const vi = locale === 'vi'
  return csv([
    vi
      ? ['Khối chi phí', 'Cố định/Biến đổi', 'Nguồn bắt buộc', 'Kịch bản thấp (VND)', 'Kịch bản cơ sở (VND)', 'Kịch bản cao (VND)']
      : ['Cost block', 'Fixed/Variable', 'Required source', 'Low scenario (VND)', 'Base scenario (VND)', 'High scenario (VND)'],
    ...publicCostItems.map((item) => [
      item.block[locale],
      item.classification === 'fixed' ? (vi ? 'Cố định' : 'Fixed') : (vi ? 'Biến đổi' : 'Variable'),
      item.sourceRequired[locale],
      item.low,
      item.base,
      item.high,
    ]),
  ])
}

export function csvDownload(body: string, filename: string) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  })
}

