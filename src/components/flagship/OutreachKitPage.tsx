import Link from 'next/link'
import DocumentLanguage from './DocumentLanguage'
import PrintButton from './PrintButton'
import { flagshipRoutes, type FlagshipLocale } from '@/data/flagship'

export default function OutreachKitPage({ locale }: { locale: FlagshipLocale }) {
  const vi = locale === 'vi'
  return (
    <main className="flagship-section outreach-kit">
      <DocumentLanguage locale={locale} />
      <div className="flagship-shell" style={{ maxWidth: 900 }}>
        <div className="outreach-controls" style={{ display: 'flex', justifyContent: 'space-between', gap: 15, marginBottom: 42 }}>
          <Link href={flagshipRoutes[locale]} style={{ color: 'var(--green)', fontWeight: 800 }}>← {vi ? 'Quay lại dự án' : 'Back to project'}</Link>
          <PrintButton label={vi ? 'In / lưu PDF' : 'Print / save PDF'} />
        </div>
        <header style={{ paddingBottom: 30, borderBottom: '3px solid var(--green)' }}>
          <span className="flagship-eyebrow">From Income to Assets · Outreach kit v1</span>
          <h1 style={{ margin: '12px 0', fontSize: 'clamp(42px, 7vw, 72px)', lineHeight: 1 }}>{vi ? 'Bộ tài liệu tiếp cận cộng đồng' : 'Community outreach kit'}</h1>
          <p className="flagship-section-intro">{vi ? 'Tài liệu một trang dành cho hợp tác xã, nhóm cộng đồng, nhà nghiên cứu và người kết nối địa phương.' : 'A one-page field guide for cooperatives, community groups, researchers, and local connectors.'}</p>
        </header>
        <section style={{ padding: '30px 0', borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 30 }}>{vi ? 'Lời mời ngắn' : 'Short invitation'}</h2>
          <p style={{ padding: 20, background: 'var(--white)', lineHeight: 1.8 }}>{vi ? 'Dự án Từ Thu nhập đến Tài sản đang lắng nghe các hộ kinh doanh, tiểu thương và hộ sản xuất nông nghiệp trên khắp Việt Nam. Khảo sát tìm hiểu điều gì giúp hoặc cản trở gia đình chuyển thu nhập thành tiết kiệm, khả năng chống chịu và tài sản phục vụ sinh kế. Tham gia là tự nguyện; khảo sát không yêu cầu số tài khoản, giấy tờ tùy thân hoặc địa chỉ chính xác.' : 'The From Income to Assets project is listening to household businesses, micro-entrepreneurs, and smallholders across Vietnam. The survey asks what helps or prevents households from turning income into savings, resilience, and productive assets. Participation is voluntary and the survey never requests bank details, identity numbers, or exact addresses.'}</p>
        </section>
        <section style={{ padding: '30px 0', borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 30 }}>{vi ? 'Ai nên tham gia?' : 'Who should participate?'}</h2>
          <ul className="method-list"><li>{vi ? 'Từ 18 tuổi trở lên.' : 'Aged 18 or older.'}</li><li>{vi ? 'Sống hoặc làm sinh kế tại khu vực nông thôn.' : 'Lives or earns a livelihood in a rural area.'}</li><li>{vi ? 'Có tham gia quyết định tài chính của hộ gia đình.' : 'Helps make household financial decisions.'}</li><li>{vi ? 'Thuộc ít nhất một nhóm: tiểu thương/kinh doanh siêu nhỏ, hộ kinh doanh, hộ sản xuất nông nghiệp.' : 'Fits at least one segment: micro-entrepreneur/trader, household business, or smallholder.'}</li></ul>
        </section>
        <section style={{ padding: '30px 0', borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 30 }}>{vi ? 'Kịch bản giới thiệu có đồng thuận' : 'Consent-first introduction script'}</h2>
          <ol style={{ paddingLeft: 22, lineHeight: 1.9 }}><li>{vi ? 'Giới thiệu đây là dự án nghiên cứu độc lập, không phải chương trình vay vốn hoặc bán sản phẩm.' : 'Explain that this is independent research, not a loan or product-sales program.'}</li><li>{vi ? 'Nói rõ tham gia là tự nguyện và không ảnh hưởng đến quyền lợi hay dịch vụ hiện có.' : 'State that participation is voluntary and does not affect any current benefit or service.'}</li><li>{vi ? 'Để người tham gia tự đọc thông báo quyền riêng tư và tự gửi câu trả lời.' : 'Let participants read the privacy notice and submit their own answers.'}</li><li>{vi ? 'Không thu hộ giấy tờ, số tài khoản, mật khẩu hoặc địa chỉ chính xác.' : 'Never collect identity documents, bank details, passwords, or exact addresses.'}</li></ol>
        </section>
        <section style={{ padding: '30px 0' }}>
          <h2 style={{ fontSize: 30 }}>{vi ? 'Liên kết chia sẻ' : 'Share link'}</h2>
          <p style={{ padding: 22, border: '2px solid var(--ink)', background: 'var(--lime)', fontFamily: 'ui-monospace, monospace', overflowWrap: 'anywhere' }}>https://thuh.cool{flagshipRoutes[locale]}#contribute</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{vi ? 'Đối tác có thể thêm mã nguồn tiếp cận do dự án cấp sau khi hai bên thống nhất cách mời và bảo vệ người tham gia.' : 'Partners can add an outreach-source code supplied by the project after agreeing on recruitment and participant-protection practices.'}</p>
        </section>
      </div>
    </main>
  )
}

