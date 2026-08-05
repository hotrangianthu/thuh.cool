import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Writings',
  description:
    'Field notes, interactive tools, prototypes, and argued positions from an ongoing public-policy practice focused on Vietnam.',
}

const sections = [
  {
    number: '01',
    stage: 'Observe',
    title: 'Field Notes',
    detail: '2 field records',
    href: '#field-notes',
  },
  {
    number: '02',
    stage: 'Test',
    title: 'Tools & Models',
    detail: '3 interactive models',
    href: '#tools',
  },
  {
    number: '03',
    stage: 'Build',
    title: 'Prototypes',
    detail: '1 pilot proposal',
    href: '#prototypes',
  },
  {
    number: '04',
    stage: 'Argue',
    title: 'Positions',
    detail: 'Essays & provocations',
    href: '#positions',
  },
]

const fieldNotes = [
  {
    href: '/public-policy/field-notes/72-hours-binh-dinh',
    eyebrow: 'Photo essay',
    title: '72 Hours in Binh Dinh',
    description:
      'I returned to the agricultural community where I grew up to ask how much rural financial access has actually changed. Three days, six sites, one consistent answer.',
    meta: ['Binh Dinh', 'March 2024', '6 sections'],
    cta: 'Read field note',
  },
  {
    href: '/public-policy/field-notes/merchant-conversations',
    eyebrow: 'Conversations',
    title: 'Merchant Conversations',
    description:
      'Six small-business owners on cash, trust, and why digital payments have not reached them yet.',
    meta: ['Binh Dinh', 'April 2024', '6 interviews'],
    cta: 'Read conversations',
  },
]

const tools = [
  {
    href: '/public-policy/playgrounds/rural-fintech-calculator',
    eyebrow: 'Financial model',
    title: 'Rural Fintech ROI Calculator',
    description:
      'Stress-test the viability of agent-banking networks by changing population, adoption, and transaction assumptions.',
    meta: ['Agent banking', '~3 min'],
    cta: 'Open calculator',
  },
  {
    href: '/public-policy/playgrounds/province-readiness-scorer',
    eyebrow: 'Comparative analysis',
    title: 'Province Digital Readiness Scorer',
    description:
      'Compare provinces across connectivity, digital literacy, fintech adoption, and banking coverage.',
    meta: ['10 provinces', '~2 min'],
    cta: 'Score a province',
  },
  {
    href: '/public-policy/playgrounds/policy-simulator',
    eyebrow: 'Scenario model',
    title: 'Policy Scenario Simulator',
    description:
      'Adjust four policy levers and see how their effects compound across a five-year adoption curve.',
    meta: ['Policy design', '~4 min'],
    cta: 'Run a scenario',
  },
]

function WorkCard({
  item,
  feature = false,
}: {
  item: {
    href: string
    eyebrow: string
    title: string
    description: string
    meta: string[]
    cta: string
  }
  feature?: boolean
}) {
  return (
    <Link
      href={item.href}
      className={`policy-writing-card${feature ? ' policy-writing-card--feature' : ''}`}
    >
      <article>
        <p className="policy-writing-card__eyebrow">{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p className="policy-writing-card__description">{item.description}</p>
        <div className="policy-writing-card__footer">
          <div className="policy-writing-card__meta">
            {item.meta.map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
          </div>
          <span className="policy-writing-card__cta">{item.cta} &rarr;</span>
        </div>
      </article>
    </Link>
  )
}

function SectionHeader({
  number,
  stage,
  title,
  description,
}: {
  number: string
  stage: string
  title: string
  description: string
}) {
  return (
    <div className="policy-writing-section__header">
      <div className="policy-writing-section__marker" aria-hidden="true">
        <span>{number}</span>
        <i />
      </div>
      <div>
        <p className="policy-writing-section__stage">{stage}</p>
        <h2>{title}</h2>
        <p className="policy-writing-section__intro">{description}</p>
      </div>
    </div>
  )
}

export default function WritingsPage() {
  return (
    <div className="policy-writings">
      <section className="policy-writings-hero">
        <p className="policy-writings-kicker">Working record</p>
        <h1>Notes, models, prototypes, and positions.</h1>
        <p>
          Public policy does not arrive fully formed. This is the work around the formal
          research: what I observe in the field, what I test, what I build, and where I
          am willing to take a position.
        </p>
      </section>

      <nav className="policy-writings-index" aria-label="Writings sections">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="policy-writings-index__item">
            <span className="policy-writings-index__number">{section.number}</span>
            <span className="policy-writings-index__stage">{section.stage}</span>
            <strong>{section.title}</strong>
            <small>{section.detail}</small>
          </Link>
        ))}
      </nav>

      <section id="field-notes" className="policy-writing-section">
        <SectionHeader
          number="01"
          stage="Observe"
          title="Field Notes"
          description="Direct observations and conversations from rural Vietnam—the ground truth behind the larger policy arguments."
        />
        <div className="policy-writing-grid policy-writing-grid--2">
          {fieldNotes.map((item, index) => (
            <WorkCard key={item.href} item={item} feature={index === 0} />
          ))}
        </div>
      </section>

      <section id="tools" className="policy-writing-section">
        <SectionHeader
          number="02"
          stage="Test"
          title="Tools & Models"
          description="Interactive ways to interrogate an assumption. The inputs and logic stay visible so the result can be challenged."
        />
        <div className="policy-writing-grid policy-writing-grid--3">
          {tools.map((item) => (
            <WorkCard key={item.href} item={item} />
          ))}
        </div>
      </section>

      <section id="prototypes" className="policy-writing-section">
        <SectionHeader
          number="03"
          stage="Build"
          title="Prototypes"
          description="Concrete proposals with delivery choices, budgets, timelines, and success measures—not just recommendations."
        />
        <div className="policy-prototype-layout">
          <WorkCard
            feature
            item={{
              href: '/public-policy/prototypes/agent-banking-pilot',
              eyebrow: 'Pilot proposal',
              title: 'Agent Banking Pilot Proposal',
              description:
                'A delivery-ready proposal for extending financial access through existing retail infrastructure in five Binh Dinh communes.',
              meta: ['15 target agents', '18 months', '2.5B VND'],
              cta: 'Read proposal',
            }}
          />
          <aside className="policy-writing-bench" aria-label="Prototypes in development">
            <p className="policy-writing-card__eyebrow">On the bench</p>
            <div>
              <h3>Rural Fintech Product Wireframes</h3>
              <p>Low-literacy interfaces designed around first-use constraints.</p>
            </div>
            <div>
              <h3>Policy Brief Template</h3>
              <p>A decision-ready format that strips policy communication back to action.</p>
            </div>
            <span className="policy-writing-status">In development</span>
          </aside>
        </div>
      </section>

      <section id="positions" className="policy-writing-section policy-writing-section--last">
        <SectionHeader
          number="04"
          stage="Argue"
          title="Positions"
          description="Evidence-backed opinions, thought experiments, and claims held strongly enough to defend—and lightly enough to revise."
        />
        <div className="policy-writing-grid policy-writing-grid--2">
          <WorkCard
            feature
            item={{
              href: '/public-policy/voice/if-i-were-dg',
              eyebrow: 'Thought experiment',
              title: 'If I Were Director-General of Digital Economy',
              description:
                'What I would actually do in the first 100 days: three pilots, one honest audit, and clear accountability for the outcome.',
              meta: ['May 2026', '~1,000 words'],
              cta: 'Read the piece',
            }}
          />
          <Link href="/public-policy/voice/hot-takes" className="policy-writing-card policy-writing-card--quote">
            <article>
              <p className="policy-writing-card__eyebrow">Running collection</p>
              <blockquote>
                &ldquo;Policy expertise is built in public through clear arguments, empirical
                humility, and repeated revision.&rdquo;
              </blockquote>
              <div className="policy-writing-card__footer">
                <span className="policy-writing-card__meta">Hot Takes</span>
                <span className="policy-writing-card__cta">See all positions &rarr;</span>
              </div>
            </article>
          </Link>
        </div>
      </section>
    </div>
  )
}
