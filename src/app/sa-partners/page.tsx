import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, FileCheck2, LockKeyhole, MessagesSquare } from 'lucide-react'
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
            <span className="sa-eyebrow">Independent research agency · Vietnam & Southeast Asia</span>
            <h1 id="sa-hero-title">Decision-grade research, ready to inspect and put to work.</h1>
            <p>Browse published briefings, preview the analysis, and request full-report or institutional access directly from the Sa. Partners research desk.</p>
            <div className="sa-hero-actions">
              <Link href="#library" className="sa-button sa-button-primary">Browse research catalog <ArrowRight size={16} /></Link>
              <a href={`mailto:${SA_PARTNERS_CONTACT_EMAIL}?subject=Sa.%20Partners%20research%20desk`} className="sa-button sa-button-quiet">Contact research desk</a>
            </div>
          </div>
          <dl className="sa-hero-stats">
            <div><dt>37</dt><dd>Qualified reports</dd></div>
            <div><dt>4</dt><dd>Research families</dd></div>
            <div><dt>962</dt><dd>Slides of analysis</dd></div>
          </dl>
        </section>

        <section className="sa-trust-rail" aria-label="Research access options">
          <div className="sa-trust-label"><CheckCircle2 size={15} /> Access models</div>
          <ul>
            <li>Open editions</li>
            <li>Single-report access</li>
            <li>Institutional licensing</li>
            <li>Commissioned research</li>
          </ul>
          <a href="#access">Buyer information <ArrowRight size={14} /></a>
        </section>

        <section className="sa-featured" aria-labelledby="featured-title">
          <div className="sa-featured-artifact">
            <div className="sa-artifact-rail" aria-hidden="true">
              <span>Open edition</span>
              <span>{featured.code} / 026</span>
            </div>
            <Link href={`/sa-partners/reports/${featured.slug}`} className="sa-featured-visual">
              <Image src={getReportSlideUrl(featured, 1)} alt={`Cover of ${featured.title}`} fill priority sizes="(max-width: 900px) 100vw, 58vw" />
            </Link>
            <div className="sa-artifact-caption" aria-hidden="true">
              <span>Sa. Partners research object</span>
              <span>June 2026</span>
            </div>
          </div>
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
              <ArrowRight size={18} /> <span>View report & access</span>
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
                <a href="#library" className={`sa-area-card sa-series-${key.toLowerCase()}`} key={key}>
                  <span className="sa-area-code">{key}</span>
                  <div><h3>{area.label}</h3><p>{area.description}</p></div>
                  <span className="sa-area-count">{count} reports <ArrowRight size={14} /></span>
                </a>
              )
            })}
          </div>
        </section>

        <ReportCatalog reports={saPartnersReports} />

        <section className="sa-access-market" id="access" aria-labelledby="access-title">
          <div className="sa-access-intro">
            <span className="sa-eyebrow">Access & licensing</span>
            <h2 id="access-title">A clear route from preview to procurement.</h2>
            <p>Each listing identifies its edition, report length, and access status. For qualified research, the research desk confirms fit and the appropriate access route before materials are shared.</p>
            <a href={`mailto:${SA_PARTNERS_CONTACT_EMAIL}?subject=Sa.%20Partners%20access%20and%20licensing`} className="sa-button sa-button-primary">
              Speak with the research desk <ArrowRight size={16} />
            </a>
          </div>
          <ol className="sa-access-steps">
            <li><span>01</span><div><BookOpen size={19} /><h3>Inspect the work</h3><p>Open the report page to read the available edition or examine a three-slide preview.</p></div></li>
            <li><span>02</span><div><MessagesSquare size={19} /><h3>Confirm scope</h3><p>Tell us the decision, team, and intended use so we can route a report, license, or research brief.</p></div></li>
            <li><span>03</span><div><FileCheck2 size={19} /><h3>Arrange access</h3><p>Full materials, usage terms, and commercial details are handled directly with the buyer.</p></div></li>
          </ol>
          <div className="sa-buyer-note"><LockKeyhole size={15} /><span><b>Buyer-safe inquiry.</b> Contact and procurement details are handled privately; payment information is never requested in the public form.</span></div>
        </section>

        <section className="sa-about" id="about">
          <div><span className="sa-eyebrow">Independent research agency</span><h2>Analysis built to travel from policy room to product room.</h2></div>
          <div>
            <p>Sa. Partners develops decision-grade research on Vietnam and Southeast Asia. Each report combines market structure, public evidence, operating economics, and explicit uncertainty.</p>
            <p>The full library is intended for institutions and practitioners who need context beyond a news cycle. Preview any report, then reach out for qualified access.</p>
          </div>
        </section>

        <section className="sa-contact-band" id="contact">
          <div>
            <span className="sa-eyebrow">Research desk</span>
            <h2>Request a report or commission a brief.</h2>
            <p>Tell us which report, market, or decision you are working with. We will respond directly about fit, access, and licensing.</p>
          </div>
          <a href={`mailto:${SA_PARTNERS_CONTACT_EMAIL}?subject=Sa.%20Partners%20research%20access`} className="sa-button sa-button-light">
            Contact {SA_PARTNERS_CONTACT_EMAIL} <ArrowRight size={16} />
          </a>
          <div className="sa-lock-note"><LockKeyhole size={14} /> Qualified-access reports are shared directly after review.</div>
        </section>
      </div>
    </>
  )
}
