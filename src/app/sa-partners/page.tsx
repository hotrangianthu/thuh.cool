import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, LockKeyhole } from 'lucide-react'
import ReportCatalog from '@/components/sa-partners/ReportCatalog'
import {
  getReportSlideUrl,
  SA_PARTNERS_CONTACT_EMAIL,
  saPartnersCategories,
  saPartnersReports,
  type SaPartnersCategory,
} from '@/data/sa-partners'

export default function SaPartnersHomePage() {
  const featured = saPartnersReports[0]

  return (
    <>
      <div className="sa-shell">
        <section className="sa-hero" aria-labelledby="sa-hero-title">
          <div className="sa-hero-copy">
            <span className="sa-eyebrow">Vietnam & Southeast Asia · Market intelligence</span>
            <h1 id="sa-hero-title">Research for decisions that cannot run on headlines.</h1>
            <p>Qualified reports connecting public policy, macroeconomics, financial-market structure, and the realities of regulated product execution.</p>
            <div className="sa-hero-actions">
              <Link href="#library" className="sa-button sa-button-primary">Explore 37 reports <ArrowRight size={16} /></Link>
              <a href={`mailto:${SA_PARTNERS_CONTACT_EMAIL}?subject=Sa.%20Partners%20research%20inquiry`} className="sa-button sa-button-quiet">Discuss a research need</a>
            </div>
          </div>
          <dl className="sa-hero-stats">
            <div><dt>37</dt><dd>Qualified reports</dd></div>
            <div><dt>4</dt><dd>Research families</dd></div>
            <div><dt>962</dt><dd>Slides of analysis</dd></div>
          </dl>
        </section>

        <section className="sa-featured" aria-labelledby="featured-title">
          <Link href={`/sa-partners/reports/${featured.slug}`} className="sa-featured-visual">
            <Image src={getReportSlideUrl(featured, 1)} alt={`Cover of ${featured.title}`} fill priority sizes="(max-width: 900px) 100vw, 58vw" />
          </Link>
          <div className="sa-featured-copy">
            <span className="sa-eyebrow">Featured · Full report open</span>
            <h2 id="featured-title">{featured.title}</h2>
            <p>{featured.teaser}</p>
            <div className="sa-featured-facts">
              <span><BookOpen size={15} /> 26-slide web edition</span>
              <span>PDF included</span>
              <span>June 2026</span>
            </div>
            <Link href={`/sa-partners/reports/${featured.slug}`} className="sa-round-link" aria-label="Read the featured report">
              <ArrowRight size={18} /> <span>Read the full report</span>
            </Link>
          </div>
        </section>

        <section className="sa-areas" id="research-areas" aria-labelledby="areas-title">
          <div className="sa-section-heading">
            <div><span className="sa-eyebrow">Coverage</span><h2 id="areas-title">Four connected views of the market</h2></div>
            <p>From state budgets to the last mile, the fleet follows how capital, rules, products, and behavior meet.</p>
          </div>
          <div className="sa-area-grid">
            {(Object.keys(saPartnersCategories) as SaPartnersCategory[]).map((key) => {
              const area = saPartnersCategories[key]
              const count = saPartnersReports.filter((report) => report.category === key).length
              return (
                <a href={`#library`} className="sa-area-card" key={key}>
                  <span className="sa-area-code">{key}</span>
                  <div><h3>{area.label}</h3><p>{area.description}</p></div>
                  <span className="sa-area-count">{count} reports <ArrowRight size={14} /></span>
                </a>
              )
            })}
          </div>
        </section>

        <ReportCatalog reports={saPartnersReports} />

        <section className="sa-about" id="about">
          <div><span className="sa-eyebrow">About the practice</span><h2>Analysis built to travel from policy room to product room.</h2></div>
          <div>
            <p>Sa. Partners develops decision-grade research on Vietnam and Southeast Asia. Each report combines market structure, public evidence, operating economics, and explicit uncertainty.</p>
            <p>The full library is intended for institutions and practitioners who need context beyond a news cycle. Preview any report, then reach out for qualified access.</p>
          </div>
        </section>

        <section className="sa-contact-band" id="contact">
          <div>
            <span className="sa-eyebrow">Research access</span>
            <h2>Need the evidence behind a market decision?</h2>
            <p>Tell us which report or question you are working with. We will respond directly with access options and fit.</p>
          </div>
          <a href={`mailto:${SA_PARTNERS_CONTACT_EMAIL}?subject=Sa.%20Partners%20research%20access`} className="sa-button sa-button-light">
            Email {SA_PARTNERS_CONTACT_EMAIL} <ArrowRight size={16} />
          </a>
          <div className="sa-lock-note"><LockKeyhole size={14} /> Qualified-access reports are shared directly after review.</div>
        </section>
      </div>
    </>
  )
}
