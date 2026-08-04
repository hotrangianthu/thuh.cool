import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

const projectRoot = resolve(import.meta.dirname, '..')
const sourceRoot = resolve(
  process.env.SA_PARTNERS_SOURCE_DIR ||
    join(projectRoot, 'private_content', 'sa_partners_20260601_research_fleet')
)
const outputRoot = join(projectRoot, 'public', 'sa-partners', 'reports')
const privatePdfRoot = join(projectRoot, 'private_content', 'sa_partners_pdf_exports')
const publicReportCode = 'A1'

function requireCommand(command) {
  try {
    execFileSync('which', [command], { stdio: 'ignore' })
  } catch {
    throw new Error(`Missing required command: ${command}`)
  }
}

function slideCount(file) {
  const entries = execFileSync('unzip', ['-Z1', file], { encoding: 'utf8' })
  return entries.split('\n').filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).length
}

function chooseDeck(directory, folder) {
  const candidates = readdirSync(directory)
    .filter((name) => name.toLowerCase().endsWith('.pptx'))
    .filter((name) => !/snippet|test_section/i.test(name))
    .sort()

  if (folder === 'A1_budget_strategy') {
    const canonical = 'Sa. Partners - Government Finance_ Vietnam 2026 Budget Strat.pptx'
    if (!candidates.includes(canonical)) throw new Error(`Missing canonical A1 deck: ${canonical}`)
    return join(directory, canonical)
  }

  if (candidates.length !== 1) {
    throw new Error(`${folder}: expected one canonical deck, found ${candidates.length}`)
  }
  return join(directory, candidates[0])
}

function slugFromFolder(folder) {
  return folder.toLowerCase().replaceAll('_', '-')
}

if (!existsSync(sourceRoot)) {
  throw new Error(`Source fleet not found: ${sourceRoot}`)
}

requireCommand('soffice')
requireCommand('python3')
requireCommand('unzip')

mkdirSync(outputRoot, { recursive: true })
mkdirSync(privatePdfRoot, { recursive: true })
const tempRoot = join(tmpdir(), `sa-partners-assets-${process.pid}`)
mkdirSync(tempRoot, { recursive: true })

try {
  const folders = readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^[A-D]\d+_/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (folders.length !== 37) throw new Error(`Expected 37 report folders, found ${folders.length}`)

  for (const folder of folders) {
    const code = folder.match(/^([A-D]\d+)/i)?.[1].toUpperCase()
    const slug = slugFromFolder(folder)
    const sourceDirectory = join(sourceRoot, folder)
    const deck = chooseDeck(sourceDirectory, folder)
    const count = slideCount(deck)
    if (count !== 26) throw new Error(`${folder}: expected 26 slides, found ${count}`)

    const reportTemp = join(tempRoot, slug)
    const reportOutput = join(outputRoot, slug)
    rmSync(reportTemp, { recursive: true, force: true })
    rmSync(reportOutput, { recursive: true, force: true })
    mkdirSync(reportTemp, { recursive: true })
    mkdirSync(reportOutput, { recursive: true })

    execFileSync('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', reportTemp, deck], {
      stdio: 'inherit',
    })
    const pdfName = basename(deck, '.pptx') + '.pdf'
    const pdf = join(reportTemp, pdfName)
    if (!existsSync(pdf)) throw new Error(`${folder}: PDF conversion did not produce ${pdfName}`)

    // Preserve the full PDF locally for manual fulfillment. This directory is gitignored.
    copyFileSync(pdf, join(privatePdfRoot, `${slug}.pdf`))

    const lastPage = code === publicReportCode ? 26 : 3
    execFileSync(
      'python3',
      [join(projectRoot, 'scripts', 'render-sa-partners-pdf.py'), pdf, reportOutput, String(lastPage)],
      { stdio: 'inherit' }
    )

    if (code === publicReportCode) copyFileSync(pdf, join(reportOutput, 'full-report.pdf'))
    console.log(`${code}: generated private PDF + ${lastPage} public slides${code === publicReportCode ? ' + public PDF' : ''}`)
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true })
}
