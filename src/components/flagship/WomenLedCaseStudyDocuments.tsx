import Link from 'next/link'
import {
  allowedPilotClaims,
  artifactVersions,
  caseStudyQuestion,
  caseStudyRoutes,
  fieldworkCategories,
  interviewProtocol,
  methodsSections,
  pilotMeasures,
  pilotTimeline,
  pilotTools,
  policyOptions,
  publicCostItems,
  publicEvidenceClaims,
  type CaseStudyDocument,
} from '@/data/flagship-case-study'
import type { FlagshipLocale } from '@/data/flagship'
import WomenLedCaseStudyShell from './WomenLedCaseStudyShell'

function text(value: Record<FlagshipLocale, string>, locale: FlagshipLocale) {
  return value[locale]
}

function DocumentIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="case-study-document-hero">
      <div className="flagship-shell">
        <span className="flagship-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </header>
  )
}

function DocumentShell({ locale, document, children }: { locale: FlagshipLocale; document: CaseStudyDocument; children: React.ReactNode }) {
  return <WomenLedCaseStudyShell locale={locale} document={document}><main>{children}</main></WomenLedCaseStudyShell>
}

export function WomenLedMethodsPage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  return (
    <DocumentShell locale={locale} document="methods">
      <DocumentIntro
        eyebrow={vi ? 'Phương pháp · Đạo đức · Giới hạn' : 'Method · Ethics · Limitations'}
        title={vi ? 'Cách nghiên cứu được tiến hành' : 'How the study is conducted'}
        body={vi ? 'Thiết kế này ưu tiên khả năng kiểm tra, sự tự nguyện và học sâu từ một mẫu có chủ đích—không ước tính tỷ lệ cho toàn quốc.' : 'This design prioritizes auditability, voluntary participation, and depth in a purposive sample—not national prevalence estimates.'}
      />
      <section className="flagship-section">
        <div className="flagship-shell">
          <span className="flagship-eyebrow">{vi ? 'Câu hỏi đã khóa' : 'Locked research question'}</span>
          <h2 className="case-study-document-question">{caseStudyQuestion[locale]}</h2>
          <div className="case-study-card-grid methods-card-grid">
            {methodsSections.map((section) => <article className="case-study-card" key={text(section.title, locale)}><h3>{text(section.title, locale)}</h3><p>{text(section.body, locale)}</p></article>)}
          </div>
        </div>
      </section>
      <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? '40–60 phút' : '40–60 minutes'}</span><h2>{vi ? 'Khung phỏng vấn hộ kinh doanh' : 'Household-business interview guide'}</h2></div><p className="flagship-section-intro">{vi ? 'Câu hỏi yêu cầu các tình huống gần đây và lựa chọn thực tế, không chỉ ý kiến chung.' : 'Questions ask for recent episodes and actual choices, not only general opinions.'}</p></div>
          <div className="case-study-card-grid">
            {interviewProtocol.map((section) => <article className="case-study-card" key={text(section.title, locale)}><h3>{text(section.title, locale)}</h3><ol>{section.questions[locale].map((question) => <li key={question}>{question}</li>)}</ol></article>)}
          </div>
          <blockquote className="case-study-closing-question">{vi ? '“Tôi đã không hỏi điều gì quan trọng hơn những câu hỏi trên?”' : '“What have I failed to ask that matters more than my questions?”'}</blockquote>
        </div>
      </section>
      <section className="flagship-section">
        <div className="flagship-shell method-grid">
          <article className="method-card"><h3>{vi ? 'Quy tắc liêm chính' : 'Research-integrity rules'}</h3><ul className="method-list"><li>{vi ? 'Không biến trao đổi cũ thành phỏng vấn có cấu trúc.' : 'Never convert old conversations into structured interviews.'}</li><li>{vi ? 'Tách đầu ra, tham gia, hoạt động cộng đồng và kết quả.' : 'Separate outputs, engagement, community activity, and outcomes.'}</li><li>{vi ? 'Không tư vấn cá nhân về đầu tư, vay, thuế hoặc pháp lý.' : 'No individualized investment, loan, tax, or legal advice.'}</li><li>{vi ? 'Không dùng ảnh làm bằng chứng nếu chưa có cho phép.' : 'No photographs presented as evidence without permission.'}</li></ul></article>
          <article className="method-card"><h3>{vi ? 'Độc lập và vai trò' : 'Independence and roles'}</h3><p>{vi ? 'Dự án được Thu Ho khởi xướng độc lập và không đại diện cho Grab, Fulbright University Vietnam hoặc Sa. Partners. Mỗi sản phẩm phải ghi rõ tác giả, vai trò và liệu bằng chứng nghề nghiệp mật đã được loại bỏ hay chưa.' : 'The project is independently initiated by Thu Ho and does not represent Grab, Fulbright University Vietnam, or Sa. Partners. Every artifact discloses authorship, roles, and whether confidential professional evidence was omitted.'}</p></article>
        </div>
      </section>
    </DocumentShell>
  )
}

export function WomenLedEvidencePage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  return (
    <DocumentShell locale={locale} document="evidence">
      <DocumentIntro
        eyebrow={vi ? 'Sổ thực địa · Sổ bằng chứng' : 'Fieldwork ledger · Evidence ledger'}
        title={vi ? 'Điều gì được biết—và biết chắc đến đâu' : 'What is known—and with what confidence'}
        body={vi ? 'Trang này chỉ công bố số liệu tổng hợp đủ an toàn và nhận định đã qua rà soát. Bản ghi cá nhân và địa điểm chính xác vẫn ở chế độ riêng tư.' : 'This page publishes only disclosure-safe aggregates and reviewed claims. Individual records and precise locations remain private.'}
      />
      <section className="flagship-section">
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Sổ thực địa' : 'Fieldwork ledger'}</span><h2>{vi ? 'Đếm đúng loại bằng chứng' : 'Count the right kind of evidence'}</h2></div><p className="flagship-section-intro">{vi ? 'Chưa có số nào được đẩy từ sổ riêng sang bản công khai.' : 'No count has yet been promoted from the private ledger into the public record.'}</p></div>
          <div className="case-study-card-grid">
            {fieldworkCategories.map((category) => <article className="case-study-card" key={category.key}><span className="evidence-badge pending">{vi ? 'Chưa xác minh' : 'Not yet verified'}</span><h3>{text(category.title, locale)}</h3><p>{text(category.definition, locale)}</p></article>)}
          </div>
        </div>
      </section>
      <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Sổ nhận định' : 'Claim ledger'}</span><h2>{vi ? 'Nguồn, mức tin cậy và bằng chứng cạnh tranh' : 'Sources, confidence, and competing evidence'}</h2></div><p className="flagship-section-intro">{vi ? 'Chỉ nhận định đã xác minh mới xuất hiện trong bảng và tệp tải xuống.' : 'Only verified claims appear in this table and its download.'}</p></div>
          {publicEvidenceClaims.length === 0 ? <div className="case-study-empty-state"><strong>{vi ? 'Chưa có nhận định được phê duyệt để công bố' : 'No claim has been approved for publication'}</strong><p>{vi ? 'Các nhận định đang chờ kiểm tra nguồn sẽ không được hiển thị như kết quả.' : 'Claims awaiting source verification are not displayed as findings.'}</p></div> : null}
          <div className="case-study-confidence-grid">
            {[['high', vi ? 'Cao' : 'High', vi ? 'Nhiều nguồn sơ cấp hoặc kết quả lặp lại.' : 'Multiple primary sources or replicated findings.'], ['moderate', vi ? 'Trung bình' : 'Moderate', vi ? 'Một nguồn đáng tin cậy và bằng chứng hỗ trợ.' : 'One reliable source plus supporting evidence.'], ['exploratory', vi ? 'Thăm dò' : 'Exploratory', vi ? 'Quan sát thực địa hoặc mẫu nhỏ.' : 'Field observation or small-sample finding.'], ['contested', vi ? 'Còn tranh luận' : 'Contested', vi ? 'Có bằng chứng đáng tin cậy ở cả hai phía.' : 'Credible evidence exists on both sides.']].map(([key, label, definition]) => <div key={key}><strong>{label}</strong><span>{definition}</span></div>)}
          </div>
          <div className="flagship-actions"><a className="flagship-btn" href={`${caseStudyRoutes[locale]}/downloads/evidence-ledger.csv`}>{vi ? 'Tải sổ bằng chứng CSV' : 'Download evidence ledger CSV'} ↓</a></div>
        </div>
      </section>
    </DocumentShell>
  )
}

export function WomenLedPilotPage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  return (
    <DocumentShell locale={locale} document="pilot">
      <DocumentIntro
        eyebrow={vi ? 'Bản thiết kế · Chưa triển khai' : 'Design protocol · Not yet run'}
        title={vi ? 'Chương trình Thực hành Khả năng Chống chịu Tài chính' : 'Rural Household Financial-Resilience Sprint'}
        body={vi ? 'Một thí điểm năm tuần cho 15–20 hộ kinh doanh do phụ nữ dẫn dắt, chỉ được triển khai sau phỏng vấn, đồng thiết kế, rà soát đạo đức và xác minh chi phí.' : 'A five-week pilot for 15–20 women-led household businesses, to be run only after interviews, co-design, ethics review, and cost verification.'}
      />
      <section className="flagship-section">
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Ba con đường' : 'Three pathways'}</span><h2>{vi ? 'So sánh trước khi chọn can thiệp' : 'Compare before selecting an intervention'}</h2></div><p className="flagship-section-intro">{vi ? 'Không nhảy thẳng đến một khuyến nghị quốc gia. Mỗi phương án phải được kiểm tra về cơ chế, kênh, rủi ro và chỉ báo.' : 'The project will not jump directly to a national recommendation. Each option is tested on mechanism, channel, risk, and indicator.'}</p></div>
          <div className="case-study-table-wrap"><table className="case-study-table"><thead><tr>{[vi ? 'Phương án' : 'Option', vi ? 'Cơ chế' : 'Mechanism', vi ? 'Kênh' : 'Channel', vi ? 'Đối tượng' : 'Beneficiary', vi ? 'Rủi ro' : 'Main risk', vi ? 'Chỉ báo' : 'Indicator'].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{policyOptions.map((option) => <tr key={text(option.title, locale)}><th>{text(option.title, locale)}</th><td>{text(option.mechanism, locale)}</td><td>{text(option.channel, locale)}</td><td>{text(option.beneficiary, locale)}</td><td>{text(option.risk, locale)}</td><td>{text(option.indicator, locale)}</td></tr>)}</tbody></table></div>
        </div>
      </section>
      <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Năm tuần' : 'Five weeks'}</span><h2>{vi ? 'Từ đường cơ sở đến theo dõi' : 'From baseline to follow-up'}</h2></div><p className="flagship-section-intro">{vi ? 'Thiết kế đo khả năng sử dụng và hành vi ngắn hạn, không đo “tăng tài sản” trong năm tuần.' : 'The design measures usability and short-term behavior, not “asset growth” over five weeks.'}</p></div>
          <div className="timeline-list">{pilotTimeline.map((item) => <div className="timeline-row" key={text(item.period, locale)}><div className="timeline-date">{text(item.period, locale)}</div><div><h3>{text(item.title, locale)}</h3><p>{text(item.body, locale)}</p></div><span className="evidence-badge target">{vi ? 'Dự kiến' : 'Planned'}</span></div>)}</div>
          <div className="method-grid case-study-pilot-details"><article className="method-card"><h3>{vi ? 'Bốn công cụ dự thảo' : 'Four draft tools'}</h3><ol>{pilotTools.map((tool) => <li key={text(tool, locale)}>{text(tool, locale)}</li>)}</ol></article><article className="method-card"><h3>{vi ? 'Chỉ số theo dõi' : 'Follow-up measures'}</h3><ul className="method-list">{pilotMeasures.map((measure) => <li key={text(measure, locale)}>{text(measure, locale)}</li>)}</ul></article></div>
        </div>
      </section>
      <section className="flagship-section">
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Ranh giới tuyên bố' : 'Claim boundaries'}</span><h2>{vi ? 'Thí điểm có thể và không thể chứng minh điều gì' : 'What the pilot may—and may not—establish'}</h2></div></div>
          <div className="method-grid"><article className="method-card case-study-claim-card allowed"><h3>{vi ? 'Có thể báo cáo' : 'May report'}</h3><ul className="method-list">{allowedPilotClaims.may[locale].map((claim) => <li key={claim}>{claim}</li>)}</ul></article><article className="method-card case-study-claim-card prohibited"><h3>{vi ? 'Không được tuyên bố' : 'May not claim'}</h3><ul className="method-list">{allowedPilotClaims.mayNot[locale].map((claim) => <li key={claim}>{claim}</li>)}</ul></article></div>
        </div>
      </section>
      <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Tài chính công' : 'Public finance'}</span><h2>{vi ? 'Chi phí triển khai, không chỉ chi phí nội dung' : 'Delivery costs, not only program content'}</h2></div><p className="flagship-section-intro">{vi ? 'Các ô số để trống cho đến khi có báo giá, chi phí thực tế hoặc giả định được ghi rõ. Không ước tính chi phí từ tưởng tượng.' : 'Values remain blank until supported by a quote, actual cost, or explicit assumption. Costs are never invented.'}</p></div>
          <div className="case-study-table-wrap"><table className="case-study-table"><thead><tr><th>{vi ? 'Khối chi phí' : 'Cost block'}</th><th>{vi ? 'Loại' : 'Type'}</th><th>{vi ? 'Nguồn bắt buộc' : 'Required source'}</th><th>{vi ? 'Thấp' : 'Low'}</th><th>{vi ? 'Cơ sở' : 'Base'}</th><th>{vi ? 'Cao' : 'High'}</th></tr></thead><tbody>{publicCostItems.map((item) => <tr key={text(item.block, locale)}><th>{text(item.block, locale)}</th><td>{item.classification === 'fixed' ? (vi ? 'Cố định' : 'Fixed') : (vi ? 'Biến đổi' : 'Variable')}</td><td>{text(item.sourceRequired, locale)}</td><td colSpan={3}>{vi ? 'Đang chờ nguồn' : 'Awaiting source'}</td></tr>)}</tbody></table></div>
          <div className="flagship-actions"><a className="flagship-btn" href={`${caseStudyRoutes[locale]}/downloads/pilot-cost-model.csv`}>{vi ? 'Tải bảng chi phí CSV' : 'Download cost spreadsheet CSV'} ↓</a></div>
        </div>
      </section>
    </DocumentShell>
  )
}

export function WomenLedLearningLogPage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  const roadmap = [
    [vi ? 'Ngày 1–14' : 'Days 1–14', vi ? 'Dựng sổ thực địa, phương pháp, đạo đức, kiểm tra nhận định và lựa chọn xã.' : 'Reconstruct the fieldwork ledger, publish methods and ethics, audit claims, and select the commune.'],
    [vi ? 'Ngày 15–45' : 'Days 15–45', vi ? 'Thu thập bằng chứng thực địa, phỏng vấn tác nhân triển khai và công bố ghi chép lắng nghe đầu tiên.' : 'Collect field evidence, interview delivery actors, and publish the first listening note.'],
    [vi ? 'Ngày 46–75' : 'Days 46–75', vi ? 'Đồng thiết kế công cụ, so sánh phương án và lấy báo giá thực tế.' : 'Co-design tools, compare options, and obtain actual quotations.'],
    [vi ? 'Ngày 76–90+' : 'Days 76–90+', vi ? 'Chạy thí điểm, theo dõi 30 ngày và công bố cả kết quả lẫn thất bại.' : 'Run the pilot, follow up for 30 days, and publish results and failures.'],
  ]
  return (
    <DocumentShell locale={locale} document="learning-log">
      <DocumentIntro eyebrow={vi ? 'Phiên bản · Lý do · Bằng chứng' : 'Version · Reason · Evidence'} title={vi ? 'Nhật ký học tập và sửa đổi' : 'Learning and revision log'} body={vi ? 'Dự án ghi lại những gì đã thay đổi, vì sao thay đổi và bằng chứng nào kích hoạt quyết định—thay vì trình bày thiết kế hiện tại như thể luôn đúng.' : 'The project records what changed, why it changed, and which evidence triggered the decision—instead of presenting the current design as if it had always been correct.'} />
      <section className="flagship-section">
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? 'Lịch sử phiên bản' : 'Version history'}</span><h2>{vi ? 'Một dự án đang học' : 'A project that is learning'}</h2></div></div>
          <div className="timeline-list">{artifactVersions.map((item) => <div className="timeline-row case-study-version-row" key={item.version}><div className="timeline-date">{item.version}</div><div><h3>{text(item.change, locale)}</h3><p>{text(item.reason, locale)}</p></div><time dateTime={item.revisionDate}>{item.revisionDate}</time></div>)}</div>
        </div>
      </section>
      <section className="flagship-section" style={{ background: 'var(--paper-deep)' }}>
        <div className="flagship-shell">
          <div className="flagship-section-head"><div><span className="flagship-eyebrow">{vi ? '90 ngày đầu' : 'First 90 days'}</span><h2>{vi ? 'Từ khả năng kiểm tra đến sử dụng thực tế' : 'From auditability to actual use'}</h2></div><p className="flagship-section-intro">{vi ? 'Mốc thời gian là kế hoạch, không phải bằng chứng về tiến độ đã hoàn thành.' : 'These dates are a plan, not evidence of completed progress.'}</p></div>
          <div className="case-study-card-grid">{roadmap.map(([period, body]) => <article className="case-study-card" key={period}><span className="evidence-badge target">{vi ? 'Mục tiêu' : 'Target'}</span><h3>{period}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>
      <section className="flagship-section">
        <div className="flagship-shell"><div className="case-study-empty-state"><strong>{vi ? 'Nhật ký “Điều làm tôi thay đổi cách hiểu” chưa mở' : 'The “What Changed My Mind” log is not open yet'}</strong><p>{vi ? 'Mục đầu tiên chỉ được xuất bản sau khi một diễn giải mới có thể truy ngược đến bản ghi thực địa đã xác minh.' : 'The first entry will be published only when a revised interpretation can be traced to verified fieldwork records.'}</p><Link className="flagship-btn" href={`${caseStudyRoutes[locale]}/evidence`}>{vi ? 'Xem trạng thái bằng chứng' : 'View evidence status'} →</Link></div></div>
      </section>
    </DocumentShell>
  )
}
