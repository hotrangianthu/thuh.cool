import Link from 'next/link'
import type { ReactNode } from 'react'
import { caseStudyCopy, caseStudyDocumentRoute, caseStudyRoutes, type CaseStudyDocument } from '@/data/flagship-case-study'
import type { FlagshipLocale } from '@/data/flagship'
import DocumentLanguage from './DocumentLanguage'
import FlagshipTrackTabs from './FlagshipTrackTabs'

export default function WomenLedCaseStudyShell({
  locale,
  document,
  children,
}: {
  locale: FlagshipLocale
  document?: CaseStudyDocument
  children: ReactNode
}) {
  const vi = locale === 'vi'
  const otherLocale = vi ? 'en' : 'vi'
  const languageHref = document
    ? caseStudyDocumentRoute(otherLocale, document)
    : caseStudyRoutes[otherLocale]
  const t = caseStudyCopy[locale]

  return (
    <>
      <DocumentLanguage locale={locale} />
      <header className="flagship-header">
        <FlagshipTrackTabs locale={locale} active="women-led" />
        <nav className="flagship-shell flagship-nav" aria-label={vi ? 'Điều hướng nghiên cứu trường hợp' : 'Case-study navigation'}>
          <Link className="flagship-brand" href={caseStudyRoutes[locale]}>
            <small>{vi ? 'Từ Thu nhập đến Tài sản / Nghiên cứu trường hợp' : 'From Income to Assets / Case study'}</small>
            <strong>{t.navLabel}</strong>
          </Link>
          <div className="flagship-navlinks case-study-navlinks">
            <Link href={caseStudyDocumentRoute(locale, 'methods')} aria-current={document === 'methods' ? 'page' : undefined}>{vi ? 'Phương pháp' : 'Methods'}</Link>
            <Link href={caseStudyDocumentRoute(locale, 'evidence')} aria-current={document === 'evidence' ? 'page' : undefined}>{vi ? 'Bằng chứng' : 'Evidence'}</Link>
            <Link href={caseStudyDocumentRoute(locale, 'pilot')} aria-current={document === 'pilot' ? 'page' : undefined}>{vi ? 'Thí điểm' : 'Pilot'}</Link>
            <Link href={caseStudyDocumentRoute(locale, 'learning-log')} aria-current={document === 'learning-log' ? 'page' : undefined}>{vi ? 'Nhật ký học tập' : 'Learning log'}</Link>
            <Link className="flagship-language" href={languageHref}>{vi ? 'English' : 'Tiếng Việt'}</Link>
          </div>
        </nav>
      </header>
      {children}
    </>
  )
}
