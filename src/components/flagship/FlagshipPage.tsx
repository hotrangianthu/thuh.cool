import Link from 'next/link'
import ContributionForms from './ContributionForms'
import DecisionTool from './DecisionTool'
import DocumentLanguage from './DocumentLanguage'
import BusinessReferralForm from './BusinessReferralForm'
import ResearchWorkflowContent from './content/ResearchWorkflowContent'
import {
  copy,
  flagshipMetrics,
  flagshipRoutes,
  timeline,
  type EvidenceStatus,
  type FlagshipLocale,
} from '@/data/flagship'

function EvidenceBadge({ status, locale }: { status: EvidenceStatus; locale: FlagshipLocale }) {
  const t = copy[locale]
  return <span className={`evidence-badge ${status}`}>{t[status]}</span>
}

export default function FlagshipPage({ locale }: { locale: FlagshipLocale }) {
  const t = copy[locale]
  const otherLocale = locale === 'vi' ? 'en' : 'vi'
  const intakeOpen = process.env.FLAGSHIP_INTAKE_ENABLED === 'true' && Boolean(process.env.FLAGSHIP_CONTACT_EMAIL)

  return (
    <>
      <DocumentLanguage locale={locale} />
      <header className="flagship-header">
        <nav className="flagship-shell flagship-nav" aria-label={locale === 'vi' ? 'Điều hướng dự án' : 'Project navigation'}>
          <Link className="flagship-brand" href={locale === 'vi' ? '/public-policy' : '/public-policy'}>
            <small>thuh.cool / flagship</small>
            <strong>{t.title}</strong>
          </Link>
          <div className="flagship-navlinks">
            <a href="#progress">{locale === 'vi' ? 'Tiến trình' : 'Progress'}</a>
            <a href="#sampling-protocol">{locale === 'vi' ? 'Phương pháp' : 'Method'}</a>
            <a href="#refer">{locale === 'vi' ? 'Giới thiệu' : 'Refer'}</a>
            <a href="#contribute">{locale === 'vi' ? 'Tham gia' : 'Contribute'}</a>
            <Link className="flagship-language" href={flagshipRoutes[otherLocale]}>{t.language}</Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="flagship-hero">
          <div className="flagship-shell">
            <div className="flagship-kicker">{t.project} · 2025—</div>
            <h1>{t.title}</h1>
            <p className="flagship-subtitle">{t.subtitle}</p>
            <p className="flagship-lede">{t.lede}</p>
            <div className="flagship-actions">
              <a className="flagship-btn primary" href="#contribute">{t.contribute} ↘</a>
              <a className="flagship-btn" href="#method">{t.explore}</a>
            </div>
          </div>
        </section>

        <section className="flagship-band" aria-labelledby="evidence-title">
          <div className="flagship-shell">
            <div style={{ padding: '28px 0 20px' }}>
              <div id="evidence-title" className="flagship-eyebrow">{t.evidence}</div>
              <p style={{ maxWidth: 780, margin: '9px 0 0', color: 'var(--ink-soft)', fontSize: 13 }}>{t.evidenceNote}</p>
            </div>
            <div className="flagship-metrics">
              {flagshipMetrics.map((metric) => (
                <div className="flagship-metric" key={`${metric.value}-${metric.en}`}>
                  <strong>{metric.value}</strong>
                  <p>{metric[locale]}</p>
                  <EvidenceBadge status={metric.status} locale={locale} />
                </div>
              ))}
            </div>
            <p style={{ margin: '0', padding: '16px 0 24px', color: 'var(--ink-soft)', fontSize: 11 }}>
              {locale === 'vi' ? 'Phân loại địa lý dùng 34 đơn vị hành chính cấp tỉnh hiện hành theo Nghị quyết 202/2025/QH15.' : 'Geography uses the 34 current provincial-level units established under Resolution 202/2025/QH15.'}{' '}
              <a href="https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-202-2025-qh15-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-119250612174148722.htm" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{locale === 'vi' ? 'Nguồn Chính phủ ↗' : 'Government source ↗'}</a>
            </p>
          </div>
        </section>

        <section className="flagship-section" id="framework">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">01 · {locale === 'vi' ? 'Khung nghiên cứu' : 'Research frame'}</span><h2>{t.framework}</h2></div>
              <p className="flagship-section-intro">{t.frameworkBody}</p>
            </div>
            <div className="progression">
              {t.stages.map((stage, index) => <div className="progression-item" key={stage}><span>0{index + 1}</span><strong>{stage}</strong></div>)}
            </div>
          </div>
        </section>

        <section className="flagship-section">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">02 · {locale === 'vi' ? 'Tiếp cận' : 'Outreach'}</span><h2>{t.joinTitle}</h2></div>
              <p className="flagship-section-intro">{t.joinBody}</p>
            </div>
            <div className="pathway-grid pathway-grid-four">
              {[
                { icon: '◫', title: t.survey, body: t.surveyBody, href: '#contribute' },
                { icon: '“', title: t.story, body: t.storyBody, href: '#contribute' },
                { icon: '↔', title: locale === 'vi' ? 'Giới thiệu một đơn vị' : 'Refer an organisation', body: locale === 'vi' ? 'Biết một hộ kinh doanh, hợp tác xã hoặc nhóm cộng đồng nên được lắng nghe? Hãy giúp hai bên kết nối đúng cách.' : 'Know a household business, cooperative, or community group that should be heard? Help the two sides connect respectfully.', href: '#refer' },
                { icon: '⌁', title: t.partner, body: t.partnerBody, href: '#contribute' },
              ].map(({ icon, title, body, href }) => (
                <article className="pathway-card" key={title}>
                  <span className="pathway-icon" aria-hidden="true">{icon}</span>
                  <h3>{title}</h3><p>{body}</p>
                  <a className="flagship-btn" href={href}>{t.start} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="flagship-section" id="progress">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">03 · {locale === 'vi' ? 'Sổ dự án' : 'Project record'}</span><h2>{t.timeline}</h2></div>
              <p className="flagship-section-intro">{t.timelineNote}</p>
            </div>
            <div className="timeline-list">
              {timeline.map((item) => (
                <div className="timeline-row" key={item.date}>
                  <div className="timeline-date">{item.date}</div>
                  <div><h3>{locale === 'vi' ? item.vi : item.en}</h3><p>{locale === 'vi' ? item.detailVi : item.detailEn}</p></div>
                  <EvidenceBadge status={item.status} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ResearchWorkflowContent locale={locale} intakeOpen={intakeOpen} />

        <section className="flagship-section">
          <div className="flagship-shell">
            <div className="tool-panel">
              <div className="tool-copy">
                <span className="flagship-eyebrow" style={{ color: 'var(--lime)' }}>{locale === 'vi' ? 'Công cụ quyết định' : 'Decision tool'}</span>
                <h2>{t.tool}</h2>
                <p>{t.toolBody}</p>
              </div>
              <DecisionTool locale={locale} />
            </div>
          </div>
        </section>

        <section className="flagship-section" id="refer" style={{ background: 'var(--paper-deep)' }}>
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">{locale === 'vi' ? 'Kết nối hai bên' : 'Connect both sides'}</span><h2>{locale === 'vi' ? 'Giới thiệu một doanh nghiệp hoặc nhóm cộng đồng' : 'Refer a business or community group'}</h2></div>
              <p className="flagship-section-intro">{locale === 'vi' ? 'Đề xuất một đơn vị phù hợp và chọn cách kết nối tôn trọng nhất. Dự án không coi lời giới thiệu là sự đồng thuận của bên được giới thiệu.' : 'Suggest a relevant organisation and choose the most respectful connection path. The project never treats a referral as the referred party’s consent.'}</p>
            </div>
            <div className="contribution-panel">
              <BusinessReferralForm locale={locale} intakeOpen={intakeOpen} />
            </div>
          </div>
        </section>

        <section className="flagship-section contribution" id="contribute">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">{locale === 'vi' ? 'Tham gia nghiên cứu' : 'Join the research'}</span><h2>{t.contribute}</h2></div>
              <p className="flagship-section-intro">{t.privacyBody} <Link href={`/flagship/privacy${locale === 'en' ? '/en' : ''}`}>{t.readPrivacy} ↗</Link></p>
            </div>
            <ContributionForms locale={locale} intakeOpen={intakeOpen} />
          </div>
        </section>
      </main>

      <footer className="flagship-footer">
        <div className="flagship-shell flagship-footer-grid">
          <div><strong>{t.title}</strong><p>{t.subtitle}. {locale === 'vi' ? 'Một dự án nghiên cứu và học tập công ích độc lập của Ho Tran Gian Thu.' : 'An independent public-interest research and learning initiative by Ho Tran Gian Thu.'}</p></div>
          <div style={{ display: 'flex', gap: 18 }}><Link href="/public-policy">Public policy</Link><Link href="/">thuh.cool</Link></div>
        </div>
      </footer>
    </>
  )
}
