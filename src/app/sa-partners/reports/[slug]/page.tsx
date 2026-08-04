import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDownToLine, ArrowLeft, CheckCircle2, LockKeyhole } from 'lucide-react'
import { notFound } from 'next/navigation'
import InquiryForm from '@/components/sa-partners/InquiryForm'
import SlideViewer from '@/components/sa-partners/SlideViewer'
import {
  getReportPreviewCount,
  getSaPartnersReport,
  saPartnersCategories,
  saPartnersReports,
} from '@/data/sa-partners'

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return saPartnersReports.map((report) => ({ slug: report.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const report = getSaPartnersReport((await params).slug)
  if (!report) return { title: 'Report not found' }
  return { title: report.title, description: report.teaser }
}

export default async function SaPartnersReportPage({ params }: Props) {
  const report = getSaPartnersReport((await params).slug)
  if (!report) notFound()
  const previewCount = getReportPreviewCount(report)
  const category = saPartnersCategories[report.category]

  return (
    <div className="sa-report-shell">
      <Link href="/sa-partners#library" className="sa-report-back"><ArrowLeft size={14} /> Back to all reports</Link>

      <header className="sa-report-header">
        <div className="sa-report-header-copy">
          <div className="sa-report-kicker"><span>{report.code}</span>{category.label}</div>
          <h1>{report.title}</h1>
          <p>{report.teaser}</p>
          <div className="sa-report-tags">{report.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <dl className="sa-report-facts">
          <div><dt>Published</dt><dd>June 1, 2026</dd></div>
          <div><dt>Edition</dt><dd>Market Intelligence</dd></div>
          <div><dt>Length</dt><dd>26 slides</dd></div>
          <div><dt>Access</dt><dd className={report.access === 'public' ? 'open' : ''}>{report.access === 'public' ? 'Open report' : 'Qualified access'}</dd></div>
        </dl>
      </header>

      <section className="sa-viewer-section" aria-labelledby="viewer-title">
        <div className="sa-viewer-heading">
          <div><span className="sa-eyebrow">Web edition</span><h2 id="viewer-title">{report.access === 'public' ? 'Read the full deck' : 'Preview the research'}</h2></div>
          <p>{report.access === 'public' ? 'Use arrow keys or controls to move between slides.' : 'Slides 1–3 of 26 are available in this preview.'}</p>
        </div>
        <SlideViewer report={report} count={previewCount} />

        {report.access === 'public' ? (
          <div className="sa-download-row">
            <p>The PDF edition contains the same 26-slide research report shown above.</p>
            <a className="sa-button sa-button-primary" href={`/sa-partners/reports/${report.slug}/full-report.pdf`} download>
              <ArrowDownToLine size={16} /> Download full PDF
            </a>
          </div>
        ) : (
          <div className="sa-lock-wall">
            <div className="sa-locked-pages" aria-hidden="true"><span /><span /><span /></div>
            <div className="sa-lock-content">
              <div className="sa-lock-icon"><LockKeyhole size={20} /></div>
              <span className="sa-eyebrow">23 slides remain</span>
              <h2>Continue with qualified access</h2>
              <p>The complete report includes the market structure, evidence synthesis, scenarios, risks, and decision implications behind this preview.</p>
              <a href="#inquiry" className="sa-button sa-button-primary">Request the full report</a>
            </div>
          </div>
        )}
      </section>

      <section className="sa-report-lower">
        <div>
          <span className="sa-eyebrow">Research standard</span>
          <h2>Built for scrutiny.</h2>
          <p>Each report separates reported evidence from interpretation and makes the governing question, uncertainty, and decision relevance explicit.</p>
          <ul className="sa-method-list">
            <li><CheckCircle2 size={15} /> Primary and institutional sources documented</li>
            <li><CheckCircle2 size={15} /> Claims distinguished from research synthesis</li>
            <li><CheckCircle2 size={15} /> Risks and uncertainty carried into conclusions</li>
            <li><CheckCircle2 size={15} /> Market and operating implications made explicit</li>
          </ul>
        </div>
        <InquiryForm reportSlug={report.slug} reportTitle={report.title} isPublic={report.access === 'public'} />
      </section>
    </div>
  )
}
