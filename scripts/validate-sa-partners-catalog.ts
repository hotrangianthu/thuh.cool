import { saPartnersReports } from '../src/data/sa-partners'

const errors: string[] = []
const slugs = new Set(saPartnersReports.map((report) => report.slug))
const codes = new Set(saPartnersReports.map((report) => report.code))

if (saPartnersReports.length !== 37) errors.push(`expected 37 reports, found ${saPartnersReports.length}`)
if (slugs.size !== 37) errors.push('report slugs are not unique')
if (codes.size !== 37) errors.push('report codes are not unique')

const expectedCounts = { A: 8, B: 7, C: 12, D: 10 }
for (const [category, expected] of Object.entries(expectedCounts)) {
  const actual = saPartnersReports.filter((report) => report.category === category).length
  if (actual !== expected) errors.push(`${category}-Series: expected ${expected}, found ${actual}`)
}

const publicReports = saPartnersReports.filter((report) => report.access === 'public')
if (publicReports.length !== 1 || publicReports[0]?.code !== 'A1') errors.push('A1 must be the only public report')
if (saPartnersReports.some((report) => report.slideCount !== 26)) errors.push('every report must declare exactly 26 slides')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Sa. Partners catalog valid: 37 unique reports across A8/B7/C12/D10.')
