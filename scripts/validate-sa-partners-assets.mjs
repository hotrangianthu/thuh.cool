import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const outputRoot = join(projectRoot, 'public', 'sa-partners', 'reports')
const reportDirectories = existsSync(outputRoot)
  ? readdirSync(outputRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
  : []

const errors = []
if (reportDirectories.length !== 37) errors.push(`expected 37 report asset directories, found ${reportDirectories.length}`)

for (const entry of reportDirectories) {
  const files = readdirSync(join(outputRoot, entry.name))
  const slides = files.filter((name) => /^slide-\d{2}\.jpg$/.test(name))
  const isPublic = entry.name === 'a1-budget-strategy'
  const expectedSlides = isPublic ? 26 : 3
  if (slides.length !== expectedSlides) errors.push(`${entry.name}: expected ${expectedSlides} slides, found ${slides.length}`)
  if (isPublic && !files.includes('full-report.pdf')) errors.push('A1 is missing full-report.pdf')
  if (!isPublic && files.some((name) => name.endsWith('.pdf') || name.endsWith('.pptx'))) {
    errors.push(`${entry.name}: protected report contains a public source document`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Sa. Partners assets valid: 37 reports, A1 public, 36 teaser-only.')
