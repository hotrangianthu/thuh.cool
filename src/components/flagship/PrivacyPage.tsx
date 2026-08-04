import Link from 'next/link'
import { flagshipRoutes, type FlagshipLocale } from '@/data/flagship'
import DocumentLanguage from './DocumentLanguage'

export default function PrivacyPage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  const contactEmail = process.env.FLAGSHIP_CONTACT_EMAIL
  const intakeOpen = process.env.FLAGSHIP_INTAKE_ENABLED === 'true' && Boolean(contactEmail)
  const sections = vi ? [
    ['Dữ liệu được thu thập', 'Khảo sát ghi nhận nhóm sinh kế, tỉnh/thành, mức ổn định thu nhập, thói quen tiết kiệm, khả năng ứng phó cú sốc, rào cản và ưu tiên tài sản. Biểu mẫu giới thiệu ghi nhận người giới thiệu, tên đơn vị, lý do phù hợp, cách kết nối và tình trạng cho phép chia sẻ liên hệ. Dự án không yêu cầu số định danh, số tài khoản, địa chỉ chính xác hoặc mức thu nhập chính xác.'],
    ['Mục đích sử dụng', 'Câu trả lời được dùng để nghiên cứu những rào cản trên hành trình từ thu nhập đến khả năng chống chịu và tài sản sinh kế; xây dựng công cụ học tập; và chuẩn bị các đầu ra chính sách công ích.'],
    ['Sự đồng thuận và quyền lựa chọn', 'Tham gia hoàn toàn tự nguyện. Bạn có thể bỏ qua việc cung cấp thông tin liên hệ, dừng trước khi gửi hoặc từ chối việc trích dẫn và liên hệ tiếp.'],
    ['Thông tin liên hệ', 'Tên và email hoặc số điện thoại chỉ được thu thập khi bạn chủ động đăng ký phỏng vấn tiếp. Thông tin này được lưu riêng khỏi câu trả lời nghiên cứu và không xuất hiện trong bộ dữ liệu phân tích mặc định.'],
    ['Lời giới thiệu doanh nghiệp hoặc cộng đồng', 'Người giới thiệu chỉ nên chia sẻ kênh liên hệ công khai hoặc thông tin riêng đã được cho phép chia sẻ. Lời giới thiệu không phải là sự đồng thuận nghiên cứu, chứng thực chất lượng hoặc quan hệ đối tác của đơn vị được giới thiệu. Dự án sẽ cung cấp bối cảnh và để họ tự quyết định trước khi tham gia.'],
    ['Công bố và lưu trữ', 'Chỉ số liệu tổng hợp hoặc câu chuyện đã được cho phép trích dẫn ẩn danh mới được công bố. Thông tin liên hệ được dự kiến xóa trong vòng 24 tháng, trừ khi bạn tiếp tục đồng thuận hoặc pháp luật yêu cầu cách xử lý khác.'],
    ['Rút lại hoặc yêu cầu về dữ liệu', contactEmail ? `Gửi yêu cầu truy cập, sửa hoặc xóa dữ liệu tới ${contactEmail}.` : 'Trước khi mở thu thập chính thức, dự án sẽ công bố một địa chỉ liên hệ chuyên trách để tiếp nhận yêu cầu truy cập, sửa hoặc xóa dữ liệu.'],
  ] : [
    ['Data collected', 'The survey records livelihood segment, province/city, income stability, saving behavior, shock capacity, barriers, and asset priorities. The referral form records the referrer, entity name, reason for fit, connection preference, and contact-permission status. It does not request identity numbers, bank details, an exact address, or exact income.'],
    ['Purpose', 'Answers are used to study barriers along the path from income to resilience and productive assets, build public learning tools, and prepare public-interest policy outputs.'],
    ['Consent and choice', 'Participation is voluntary. You may decline to provide contact information, stop before submitting, or withhold permission for quotation and follow-up.'],
    ['Contact information', 'A name and email or phone number are collected only when you opt into a follow-up interview. They are stored separately from research answers and excluded from default research exports.'],
    ['Business and community referrals', 'Referrers should share only a public contact channel or private details they have permission to share. A referral is not research consent, a quality endorsement, or a partnership by the referred entity. The project will provide context and let them decide before participating.'],
    ['Publication and retention', 'Only aggregate findings or stories expressly approved for anonymous quotation will be published. Contact information is scheduled for deletion within 24 months unless you renew consent or applicable law requires another approach.'],
    ['Withdrawal and data requests', contactEmail ? `Send access, correction, or deletion requests to ${contactEmail}.` : 'Before production collection opens, the project will publish a dedicated contact channel for access, correction, and deletion requests.'],
  ]

  return (
    <main className="flagship-section">
      <DocumentLanguage locale={locale} />
      <div className="flagship-shell" style={{ maxWidth: 820 }}>
        <Link href={flagshipRoutes[locale]} style={{ color: 'var(--green)', fontWeight: 800, fontSize: 13 }}>← {vi ? 'Quay lại dự án' : 'Back to project'}</Link>
        <div style={{ marginTop: 45 }}>
          <span className="flagship-eyebrow">{vi ? 'Bản dự thảo · 04/08/2026' : 'Draft · 4 August 2026'}</span>
          <h1 style={{ margin: '12px 0 20px', fontSize: 'clamp(42px, 7vw, 72px)', lineHeight: 1 }}>{vi ? 'Thông báo quyền riêng tư' : 'Privacy notice'}</h1>
          <p className="flagship-section-intro" style={{ maxWidth: 720 }}>{vi ? 'Thông báo này mô tả cách Dự án Từ Thu nhập đến Tài sản dự kiến xử lý dữ liệu đóng góp. Đây là bản dự thảo vận hành và phải được rà soát pháp lý trước khi mở thu thập chính thức.' : 'This notice describes how the From Income to Assets project intends to handle contributed data. It is an operational draft and requires legal review before production collection opens.'}</p>
        </div>
        <div style={{ marginTop: 52 }}>
          {sections.map(([title, body]) => <section key={title} style={{ padding: '26px 0', borderTop: '1px solid var(--line)' }}><h2 style={{ margin: '0 0 9px', fontSize: 25 }}>{title}</h2><p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.75 }}>{body}</p></section>)}
        </div>
        <p style={{ marginTop: 35, padding: 20, background: intakeOpen ? '#d7eddf' : '#fae7af', lineHeight: 1.6 }}><strong>{vi ? 'Trạng thái thu thập:' : 'Collection status:'}</strong> {intakeOpen ? (vi ? ' Cổng đóng góp đang mở.' : ' The contribution intake is open.') : (vi ? ' Hạ tầng đã được xây dựng nhưng đang ở chế độ xem trước cho đến khi migration, kênh liên hệ và rà soát pháp lý hoàn tất.' : ' The infrastructure is implemented but remains in preview until the migration, contact channel, and legal review are complete.')}</p>
        <p style={{ marginTop: 18, color: 'var(--ink-soft)', fontSize: 12, lineHeight: 1.6 }}>{vi ? 'Khung vận hành cần được rà soát theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, có hiệu lực từ 01/01/2026.' : 'The operating framework requires review under Personal Data Protection Law No. 91/2025/QH15, effective 1 January 2026.'}{' '}<a href="https://vanban.chinhphu.vn/?classid=1&docid=214590&pageid=27160&typegroup=" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{vi ? 'Nguồn Chính phủ ↗' : 'Government source ↗'}</a></p>
      </div>
    </main>
  )
}
