import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import {
  contributionOutcomes,
  evidenceArtifacts,
  openNeeds,
  participantGroups,
  researchPipeline,
  researchQuestions,
  safeguards,
  samplingSteps,
  workflowCopy,
  type LocalizedText,
  type ResearchCard,
} from '@/data/flagship-content'
import type { FlagshipLocale } from '@/data/flagship'

type Props = {
  locale: FlagshipLocale
  intakeOpen?: boolean
}

const autoGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
  gap: 18,
}

const compactGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
  gap: 12,
}

const cardStyle: CSSProperties = {
  display: 'flex',
  minHeight: 245,
  flexDirection: 'column',
  padding: 28,
  border: '1px solid var(--line)',
  background: 'var(--white)',
}

const compactCardStyle: CSSProperties = {
  padding: 22,
  border: '1px solid var(--line)',
  background: 'var(--white)',
}

function text(value: LocalizedText, locale: FlagshipLocale) {
  return value[locale]
}

function CardGrid({ items, locale }: { items: ResearchCard[]; locale: FlagshipLocale }) {
  return (
    <div style={autoGrid}>
      {items.map((item) => (
        <article style={cardStyle} key={text(item.title, locale)}>
          <h3 style={{ margin: '0 0 14px', fontSize: 25, lineHeight: 1.16 }}>{text(item.title, locale)}</h3>
          <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.7 }}>{text(item.body, locale)}</p>
          {item.detail && (
            <p style={{ margin: 'auto 0 0', paddingTop: 22, color: 'var(--green)', fontSize: 12, fontWeight: 800, lineHeight: 1.5 }}>
              {text(item.detail, locale)}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="flagship-section-head">
      <div><span className="flagship-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      <p className="flagship-section-intro">{intro}</p>
    </div>
  )
}

function FramedBlock({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div style={{ marginTop: 46, paddingTop: 34, borderTop: '1px solid var(--ink)' }}>
      <h3 style={{ margin: '0 0 24px', fontSize: 30 }}>{title}</h3>
      {children}
    </div>
  )
}

export default function ResearchWorkflowContent({ locale, intakeOpen = false }: Props) {
  const t = workflowCopy[locale]
  const privacyHref = `/flagship/privacy${locale === 'en' ? '/en' : ''}`
  const outreachHref = `/flagship/outreach-kit${locale === 'en' ? '/en' : ''}`

  return (
    <>
      <section className="flagship-section" id="research-brief">
        <div className="flagship-shell">
          <SectionHead eyebrow={t.audienceEyebrow} title={t.audienceTitle} intro={t.audienceIntro} />
          <CardGrid items={participantGroups} locale={locale} />
          <FramedBlock title={t.questionsTitle}>
            <div style={compactGrid}>
              {researchQuestions.map((item) => (
                <article style={compactCardStyle} key={text(item.title, locale)}>
                  <h3 style={{ margin: '0 0 10px', color: 'var(--green)', fontFamily: 'inherit', fontSize: 13, lineHeight: 1.4 }}>{text(item.title, locale)}</h3>
                  <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.65 }}>{text(item.body, locale)}</p>
                </article>
              ))}
            </div>
          </FramedBlock>
        </div>
      </section>

      <section className="flagship-section" id="sampling-protocol">
        <div className="flagship-shell">
          <SectionHead eyebrow={t.samplingEyebrow} title={t.samplingTitle} intro={t.samplingIntro} />
          <CardGrid items={samplingSteps} locale={locale} />
          <FramedBlock title={t.pipelineTitle}>
            <ol style={{ ...compactGrid, margin: 0, padding: 0, listStyle: 'none' }}>
              {researchPipeline.map((item) => (
                <li style={{ ...compactCardStyle, borderTop: '4px solid var(--green)' }} key={text(item.title, locale)}>
                  <strong style={{ display: 'block', marginBottom: 10, fontFamily: 'var(--font-serif)', fontSize: 20 }}>{text(item.title, locale)}</strong>
                  <span style={{ color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.6 }}>{text(item.body, locale)}</span>
                </li>
              ))}
            </ol>
          </FramedBlock>
        </div>
      </section>

      <section className="flagship-section" id="after-contributing" style={{ background: 'var(--paper-deep)' }}>
        <div className="flagship-shell">
          <SectionHead
            eyebrow={t.outcomeEyebrow}
            title={t.outcomeTitle}
            intro={intakeOpen ? t.outcomeIntroOpen : t.outcomeIntroPreview}
          />
          <CardGrid items={contributionOutcomes} locale={locale} />
          <FramedBlock title={t.needsTitle}>
            <CardGrid items={openNeeds} locale={locale} />
          </FramedBlock>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
            <a className="flagship-btn primary" href="#contribute">{t.contribute} →</a>
            <Link className="flagship-btn" href={outreachHref}>{t.outreach} ↗</Link>
          </div>
        </div>
      </section>

      <section className="flagship-section" id="research-safeguards">
        <div className="flagship-shell">
          <SectionHead eyebrow={t.safeguardsEyebrow} title={t.safeguardsTitle} intro={t.safeguardsIntro} />
          <div className="method-grid">
            <article className="method-card">
              <h3>{locale === 'vi' ? 'Cam kết xử lý đóng góp' : 'Contribution-handling commitments'}</h3>
              <ul className="method-list">
                {safeguards.map((item) => <li key={text(item, locale)}>{text(item, locale)}</li>)}
              </ul>
              <Link href={privacyHref} className="flagship-btn" style={{ marginTop: 26 }}>
                {locale === 'vi' ? 'Đọc thông báo quyền riêng tư' : 'Read the privacy notice'} ↗
              </Link>
            </article>
            <article className="method-card">
              <h3>{t.evidenceTitle}</h3>
              <p style={{ margin: '-8px 0 22px', color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.6 }}>{t.evidenceIntro}</p>
              <div style={{ display: 'grid', gap: 20 }}>
                {evidenceArtifacts.map((artifact) => (
                  <div key={artifact.href} style={{ paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                    <span className="evidence-badge pending">{text(artifact.label, locale)}</span>
                    <h4 style={{ margin: '12px 0 8px', fontFamily: 'var(--font-serif)', fontSize: 19 }}>{text(artifact.title, locale)}</h4>
                    <p style={{ margin: '0 0 12px', color: 'var(--ink-soft)', fontSize: 12, lineHeight: 1.6 }}>{text(artifact.use, locale)}</p>
                    <Link href={artifact.href} style={{ color: 'var(--green)', fontSize: 12, fontWeight: 800 }}>{t.openEvidence} →</Link>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
