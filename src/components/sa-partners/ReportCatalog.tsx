'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  getReportSlideUrl,
  saPartnersCategories,
  type SaPartnersCategory,
  type SaPartnersReport,
} from '@/data/sa-partners'

type SortOption = 'code' | 'title'

export default function ReportCatalog({ reports }: { reports: SaPartnersReport[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | SaPartnersCategory>('all')
  const [sort, setSort] = useState<SortOption>('code')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return reports
      .filter((report) => category === 'all' || report.category === category)
      .filter((report) => {
        if (!normalizedQuery) return true
        return [report.code, report.title, report.teaser, ...report.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((a, b) => sort === 'title'
        ? a.title.localeCompare(b.title)
        : a.code.localeCompare(b.code, undefined, { numeric: true }))
  }, [category, query, reports, sort])

  return (
    <section className="sa-library" id="library" aria-labelledby="library-title">
      <div className="sa-section-heading">
        <div>
          <span className="sa-eyebrow">Research library</span>
          <h2 id="library-title">Browse the research catalog</h2>
        </div>
        <div className="sa-library-summary">
          <span className="sa-result-count" aria-live="polite">{filtered.length} reports</span>
          <span>Decision-grade briefings · 26 slides each</span>
        </div>
      </div>

      <div className="sa-catalog-controls">
        <label className="sa-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search reports</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search themes, markets, reports…" />
        </label>
        <div className="sa-filter-tabs" role="group" aria-label="Filter by research area">
          <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>All</button>
          {(Object.keys(saPartnersCategories) as SaPartnersCategory[]).map((key) => (
            <button key={key} className={category === key ? 'active' : ''} onClick={() => setCategory(key)}>
              {key}-Series
            </button>
          ))}
        </div>
        <label className="sa-sort">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="code">Series order</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="sa-report-grid">
          {filtered.map((report) => (
            <article className={`sa-report-card sa-series-${report.category.toLowerCase()}`} key={report.slug}>
              <Link href={`/sa-partners/reports/${report.slug}`} className="sa-card-cover" aria-label={`View ${report.title}`}>
                <span className="sa-card-image">
                  <Image src={getReportSlideUrl(report, 1)} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                </span>
                <span className="sa-card-edition" aria-hidden="true"><b>{report.code}</b> Research briefing</span>
                <span className={`sa-access-badge ${report.access}`}>
                  {report.access === 'public' ? 'Open report' : <><LockKeyhole size={11} /> Qualified access</>}
                </span>
              </Link>
              <div className="sa-card-body">
                <div className="sa-card-meta">
                  <span>{report.code}</span>
                  <span>26 slides</span>
                  <span>Jun 2026</span>
                </div>
                <h3><Link href={`/sa-partners/reports/${report.slug}`}>{report.title}</Link></h3>
                <p>{report.teaser}</p>
                <div className="sa-card-tags">{report.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link href={`/sa-partners/reports/${report.slug}`} className="sa-card-link">
                  {report.access === 'public' ? 'Open full report' : 'Preview & request access'} <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="sa-empty-state">
          <p>No reports match those filters.</p>
          <button onClick={() => { setQuery(''); setCategory('all') }}>Clear search</button>
        </div>
      )}
    </section>
  )
}
