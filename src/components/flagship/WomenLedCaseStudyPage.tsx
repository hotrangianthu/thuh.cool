import Link from 'next/link'
import {
  artifactVersions,
  caseStudyCopy,
  caseStudyDocumentRoute,
  caseStudyQuestion,
  fieldworkCategories,
  lastUpdated,
  publicStatusRows,
} from '@/data/flagship-case-study'
import type { FlagshipLocale } from '@/data/flagship'
import WomenLedCaseStudyShell from './WomenLedCaseStudyShell'

function localized(value: Record<FlagshipLocale, string>, locale: FlagshipLocale) {
  return value[locale]
}

export default function WomenLedCaseStudyPage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  const t = caseStudyCopy[locale]

  return (
    <WomenLedCaseStudyShell locale={locale}>
      <main>
        <section className="flagship-hero case-study-hero">
          <div className="flagship-shell">
            <div className="flagship-kicker">{t.kicker}</div>
            <h1>{t.title}</h1>
            <p className="flagship-subtitle">{t.subtitle}</p>
            <p className="flagship-lede">{t.overview}</p>
            <p className="case-study-boundary">{t.boundary}</p>
            <div className="flagship-actions">
              <Link className="flagship-btn primary" href={caseStudyDocumentRoute(locale, 'methods')}>{t.readMethods} →</Link>
              <Link className="flagship-btn" href={caseStudyDocumentRoute(locale, 'pilot')}>{t.seePilot}</Link>
            </div>
          </div>
        </section>

        <section className="flagship-band" aria-labelledby="case-status-title">
          <div className="flagship-shell" style={{ padding: '34px 0 40px' }}>
            <div className="flagship-section-head case-study-status-head">
              <div><span className="flagship-eyebrow">{vi ? 'Hồ sơ vận hành' : 'Operating record'}</span><h2 id="case-status-title">{t.statusTitle}</h2></div>
              <p className="flagship-section-intro">{t.statusNote}</p>
            </div>
            <dl className="case-study-status-grid">
              {publicStatusRows.map((row) => (
                <div key={localized(row.label, locale)}>
                  <dt>{localized(row.label, locale)}</dt>
                  <dd>{row.value ? localized(row.value, locale) : (vi ? 'Chưa xác minh' : 'Not yet verified')}</dd>
                  <span className={`evidence-badge ${row.kind || 'pending'}`}>
                    {row.kind === 'verified' ? (vi ? 'Đã xác minh' : 'Verified') : row.kind === 'target' ? (vi ? 'Dự kiến' : 'Planned') : (vi ? 'Đang xử lý' : 'Pending')}
                  </span>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="flagship-section" id="research-question">
          <div className="flagship-shell">
            <div className="case-study-question">
              <span className="flagship-eyebrow">01 · {vi ? 'Câu hỏi nghiên cứu' : 'Research question'}</span>
              <h2>{caseStudyQuestion[locale]}</h2>
              <div className="case-study-scope-grid">
                <article><strong>15–20</strong><span>{vi ? 'phụ nữ dẫn dắt hộ kinh doanh' : 'women who lead household businesses'}</span></article>
                <article><strong>01</strong><span>{vi ? 'xã hiện hành tại Bình Định' : 'current commune in Bình Định'}</span></article>
                <article><strong>{vi ? 'Ngoại tuyến' : 'Offline'}</strong><span>{vi ? 'tuyển qua một mạng lưới địa phương' : 'recruitment through one local network'}</span></article>
              </div>
            </div>
          </div>
        </section>

        <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">02 · {vi ? 'Vị trí của người nghiên cứu' : 'Researcher position'}</span><h2>{t.whyTitle}</h2></div>
              <div className="flagship-section-intro"><p>{t.whyBody}</p><p className="case-study-independence">{t.independence}</p></div>
            </div>
          </div>
        </section>

        <section className="flagship-section">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">03 · {vi ? 'Ai đã được lắng nghe' : 'Who has been consulted'}</span><h2>{vi ? 'Phân loại trước khi đếm' : 'Classify before counting'}</h2></div>
              <p className="flagship-section-intro">{vi ? 'Không chuyển các cuộc trò chuyện cũ thành phỏng vấn chính thức. Mỗi bản ghi phải có định dạng, bằng chứng và phạm vi đồng thuận rõ ràng trước khi được đưa vào số liệu công khai.' : 'Past conversations are never converted into formal interviews. Every record needs a format, evidence reference, and consent scope before it can enter a public count.'}</p>
            </div>
            <div className="case-study-card-grid">
              {fieldworkCategories.map((category) => (
                <article className="case-study-card" key={category.key}>
                  <span className="evidence-badge pending">{vi ? 'Chưa xác minh' : 'Not yet verified'}</span>
                  <h3>{localized(category.title, locale)}</h3>
                  <p>{localized(category.definition, locale)}</p>
                </article>
              ))}
            </div>
            <div className="flagship-actions">
              <Link className="flagship-btn" href={caseStudyDocumentRoute(locale, 'evidence')}>{vi ? 'Mở sổ bằng chứng công khai' : 'Open the public evidence record'} →</Link>
            </div>
          </div>
        </section>

        <section className="flagship-section">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">04 · {vi ? 'Sửa đổi giả thuyết' : 'Hypothesis revision'}</span><h2>{t.heardTitle}</h2></div>
              <p className="flagship-section-intro">{t.heardEmpty}</p>
            </div>
            <div className="case-study-empty-state">
              <strong>{vi ? 'Không viết kết luận trước dữ liệu' : 'No conclusions before evidence'}</strong>
              <p>{vi ? 'Bản đầu tiên sẽ trình bày giả thuyết ban đầu, hành vi hoặc lời kể đã xác minh, cách diễn giải sửa đổi, điều chưa được chứng minh và câu hỏi tiếp theo.' : 'The first entry will show the prior hypothesis, verified behavior or testimony, the revised interpretation, what remains unestablished, and the next question.'}</p>
            </div>
          </div>
        </section>

        <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">05 · {vi ? 'Phương pháp và bằng chứng' : 'Method and evidence'}</span><h2>{t.evidenceTitle}</h2></div>
              <p className="flagship-section-intro">{t.evidenceBody}</p>
            </div>
            <div className="case-study-document-grid">
              {([
                ['methods', vi ? 'Phương pháp & đạo đức' : 'Methods & ethics', vi ? 'Phạm vi, tuyển chọn, phỏng vấn, đồng thuận, lưu trữ, giới hạn và độc lập.' : 'Scope, recruitment, interviews, consent, storage, limitations, and independence.'],
                ['evidence', vi ? 'Sổ bằng chứng' : 'Evidence ledger', vi ? 'Số liệu thực địa đã xác minh, nguồn, mức tin cậy và bằng chứng cạnh tranh.' : 'Verified field counts, sources, confidence, and competing evidence.'],
                ['learning-log', vi ? 'Nhật ký học tập' : 'Learning log', vi ? 'Thay đổi giả thuyết và lý do sửa từng phiên bản.' : 'Hypothesis changes and the evidence behind each revision.'],
              ] as const).map(([document, title, body]) => (
                <Link href={caseStudyDocumentRoute(locale, document)} className="case-study-document-card" key={document}>
                  <h3>{title}</h3><p>{body}</p><span>{vi ? 'Mở hồ sơ' : 'Open record'} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="flagship-section">
          <div className="flagship-shell">
            <div className="flagship-section-head">
              <div><span className="flagship-eyebrow">06 · {vi ? 'Kiểm tra tiếp theo' : 'Next test'}</span><h2>{t.nextTitle}</h2></div>
              <p className="flagship-section-intro">{t.nextBody}</p>
            </div>
            <Link href={caseStudyDocumentRoute(locale, 'pilot')} className="case-study-pilot-callout">
              <span>{vi ? 'Thiết kế thí điểm' : 'Pilot design'}</span>
              <strong>{vi ? 'Chương trình Thực hành Khả năng Chống chịu Tài chính cho Hộ Kinh doanh' : 'Rural Household Financial-Resilience Sprint'}</strong>
              <small>{vi ? '5 tuần · 15–20 người · chưa triển khai' : '5 weeks · 15–20 participants · not yet run'} →</small>
            </Link>
          </div>
        </section>

        <section className="flagship-section case-study-version-footer">
          <div className="flagship-shell">
            <span className="flagship-eyebrow">{t.documentsTitle}</span>
            <p><strong>{artifactVersions[0].version}</strong> · {localized(artifactVersions[0].change, locale)}</p>
            <p>{t.updated}: <time dateTime={lastUpdated}>{lastUpdated}</time></p>
          </div>
        </section>
      </main>
    </WomenLedCaseStudyShell>
  )
}

