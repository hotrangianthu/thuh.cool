import type { FlagshipLocale } from './flagship'

export type CaseStudyLocalizedText = Record<FlagshipLocale, string>
export type CaseStudyDocument = 'methods' | 'evidence' | 'pilot' | 'learning-log'

export const caseStudyRoutes = {
  vi: '/flagship/from-income-to-assets/women-led-household-businesses',
  en: '/flagship/from-income-to-assets/en/women-led-household-businesses',
} as const

export function caseStudyDocumentRoute(locale: FlagshipLocale, document: CaseStudyDocument) {
  return `${caseStudyRoutes[locale]}/${document}`
}

export const caseStudyQuestion: CaseStudyLocalizedText = {
  vi: 'Điều gì ngăn các hộ kinh doanh nông thôn do phụ nữ dẫn dắt tại một cộng đồng ở Bình Định chuyển nguồn thu thường xuyên nhưng biến động thành quỹ dự phòng khẩn cấp và tài sản sinh kế, và những can thiệp nhỏ nào có thể cải thiện hành trình đó một cách thực tế?',
  en: 'What prevents women-led rural household businesses in one Bình Định community from converting recurring but variable income into emergency resilience and productive assets, and which small interventions could realistically improve that progression?',
}

export const caseStudyCopy = {
  vi: {
    navLabel: 'Nghiên cứu hộ kinh doanh do phụ nữ dẫn dắt',
    nationwideLabel: 'Dự án toàn quốc',
    kicker: 'Nghiên cứu trường hợp thăm dò · Bình Định',
    title: 'Hộ kinh doanh do phụ nữ dẫn dắt tại Bình Định',
    subtitle: 'Một nghiên cứu trường hợp về dòng tiền, khả năng chống chịu và tài sản sinh kế',
    overview: 'Đây là một nhánh nghiên cứu chuyên sâu thuộc dự án Từ Thu nhập đến Tài sản. Giai đoạn thực địa đầu tiên tập trung vào 15–20 phụ nữ đang dẫn dắt hộ kinh doanh tại một xã hiện hành ở Bình Định, được tiếp cận ngoại tuyến qua một mạng lưới địa phương đáng tin cậy.',
    boundary: 'Nghiên cứu mang tính thăm dò. Người tham gia không đại diện cho toàn bộ hộ gia đình nông thôn Việt Nam và dự án không tuyên bố tác động nhân quả trước khi một thí điểm được đánh giá.',
    readMethods: 'Đọc phương pháp & đạo đức',
    seePilot: 'Xem thiết kế thí điểm',
    statusTitle: 'Trạng thái công khai',
    statusNote: 'Chỉ số chỉ được công bố sau khi có thể đối chiếu với sổ thực địa riêng và phạm vi đồng thuận.',
    whyTitle: 'Vì sao là nghiên cứu này—và vì sao là Bình Định',
    whyBody: 'Bình Định gắn với lịch sử cá nhân và cộng đồng nông nghiệp của Thu Ho, tạo một tuyến tiếp cận thực địa chân thực. Phạm vi địa lý hẹp giúp dự án học sâu từ một cộng đồng thay vì dùng một địa điểm để đại diện cho “nông thôn Việt Nam”.',
    independence: 'Dự án do Thu Ho khởi xướng độc lập. Dự án không đại diện cho Grab, Fulbright University Vietnam hoặc Sa. Partners. Mọi sản phẩm cộng tác hoặc thương mại được nhận diện riêng cùng vai trò và tác giả.',
    heardTitle: 'Tôi đã nghe gì—và điều gì làm tôi thay đổi cách hiểu',
    heardEmpty: 'Chưa có diễn giải nào được công bố. Phần này chỉ mở khi ghi chép thực địa, phân loại cuộc trao đổi và phạm vi đồng thuận đã được kiểm tra.',
    evidenceTitle: 'Một sổ nghiên cứu có thể kiểm tra',
    evidenceBody: 'Sổ thực địa riêng phân biệt phỏng vấn có cấu trúc, trao đổi thăm dò và hồi tưởng. Sổ bằng chứng công khai tách nguồn, mức tin cậy, bằng chứng cạnh tranh và cách mỗi nhận định được sử dụng.',
    nextTitle: 'Điều được kiểm tra tiếp theo',
    nextBody: 'Sau phỏng vấn và đồng thiết kế, dự án dự kiến kiểm tra một chương trình thực hành khả năng chống chịu tài chính trong năm tuần. Công cụ chưa được trình bày như một giải pháp đã chứng minh.',
    documentsTitle: 'Hồ sơ nghiên cứu',
    updated: 'Cập nhật lần cuối',
  },
  en: {
    navLabel: 'Women-led Case Study',
    nationwideLabel: 'Nationwide Project',
    kicker: 'Exploratory case study · Bình Định',
    title: 'Women-led Household Businesses in Bình Định',
    subtitle: 'A focused case study of cash flow, resilience, and productive assets',
    overview: 'This is a focused research track within From Income to Assets. Its first field phase will work with 15–20 women who lead household businesses in one current commune in Bình Định, recruited offline through one trusted local network.',
    boundary: 'The study is exploratory. Participants will not represent all rural households in Vietnam, and the project will not claim causal impact before a pilot has been evaluated.',
    readMethods: 'Read methods & ethics',
    seePilot: 'View the pilot design',
    statusTitle: 'Public status',
    statusNote: 'A count is published only after it can be reconciled to the private fieldwork ledger and consent scope.',
    whyTitle: 'Why this study—and why Bình Định',
    whyBody: 'Bình Định is connected to Thu Ho’s personal history and agricultural community, providing a genuine route into the field. A narrow geography enables deep learning from one community without treating one location as a proxy for “rural Vietnam.”',
    independence: 'This project is independently initiated by Thu Ho. It does not represent Grab, Fulbright University Vietnam, or Sa. Partners. Collaborative or commercial work is identified separately with authorship and roles disclosed.',
    heardTitle: 'What I Heard—and What Changed My Mind',
    heardEmpty: 'No interpretation has been promoted yet. This section opens only after field notes, conversation classifications, and consent scope have been reviewed.',
    evidenceTitle: 'An auditable research record',
    evidenceBody: 'The private fieldwork ledger distinguishes structured interviews, exploratory conversations, and retrospective recollections. The public evidence ledger separates sources, confidence, competing evidence, and each claim’s use.',
    nextTitle: 'What is being tested next',
    nextBody: 'After interviews and co-design, the project plans to test a five-week financial-resilience practice sprint. The tools are not presented as a proven solution.',
    documentsTitle: 'Research record',
    updated: 'Last updated',
  },
} as const

export type PublicStatusRow = {
  label: CaseStudyLocalizedText
  value: CaseStudyLocalizedText | null
  kind?: 'verified' | 'pending' | 'target'
}

export const publicStatusRows: PublicStatusRow[] = [
  { label: { vi: 'Khởi xướng dự án', en: 'Project initiated' }, value: { vi: 'Tháng 1/2025', en: 'January 2025' }, kind: 'verified' },
  { label: { vi: 'Giai đoạn hiện tại', en: 'Current phase' }, value: { vi: 'Thiết lập nghiên cứu trường hợp và dựng lại sổ thực địa', en: 'Case-study setup and retrospective ledger reconstruction' }, kind: 'verified' },
  { label: { vi: 'Địa lý', en: 'Geography' }, value: { vi: 'Một xã hiện hành tại Bình Định · đang lựa chọn', en: 'One current commune in Bình Định · selection underway' }, kind: 'pending' },
  { label: { vi: 'Phỏng vấn có cấu trúc', en: 'Structured interviews' }, value: null, kind: 'pending' },
  { label: { vi: 'Trao đổi thăm dò', en: 'Exploratory conversations' }, value: null, kind: 'pending' },
  { label: { vi: 'Phỏng vấn người làm thực tiễn', en: 'Practitioner interviews' }, value: null, kind: 'pending' },
  { label: { vi: 'Sản phẩm nghiên cứu đã xuất bản', en: 'Published research artifacts' }, value: null, kind: 'pending' },
  { label: { vi: 'Can thiệp hiện tại', en: 'Current intervention' }, value: { vi: 'Chuẩn bị đồng thiết kế công cụ và thí điểm', en: 'Tool co-design and pilot preparation' }, kind: 'target' },
]

export const fieldworkCategories = [
  {
    key: 'structured_interview',
    title: { vi: 'Phỏng vấn có cấu trúc', en: 'Structured interview' },
    definition: { vi: 'Có bộ câu hỏi chuẩn bị trước, ngày thực hiện, nhóm người tham gia, ghi chép và trạng thái đồng thuận.', en: 'Uses a prepared guide with a date, participant category, notes reference, and consent status.' },
    verifiedCount: null,
  },
  {
    key: 'exploratory_conversation',
    title: { vi: 'Trao đổi thăm dò', en: 'Exploratory conversation' },
    definition: { vi: 'Trao đổi có liên quan nhưng không sử dụng quy trình phỏng vấn chính thức.', en: 'A relevant discussion conducted without a formal interview protocol.' },
    verifiedCount: null,
  },
  {
    key: 'retrospective_recollection',
    title: { vi: 'Hồi tưởng có đối chiếu', en: 'Retrospective recollection' },
    definition: { vi: 'Trao đổi trước đây được dựng lại từ trí nhớ, tin nhắn, lịch hoặc ghi chép; không được tính như phỏng vấn có cấu trúc.', en: 'A past discussion reconstructed from memory, messages, calendar records, or notes; never counted as a structured interview.' },
    verifiedCount: null,
  },
  {
    key: 'practitioner_interview',
    title: { vi: 'Phỏng vấn người làm thực tiễn', en: 'Practitioner interview' },
    definition: { vi: 'Trao đổi với tác nhân cung cấp dịch vụ, tài chính, cộng đồng hoặc chính sách để kiểm tra cơ chế và ràng buộc.', en: 'A discussion with a delivery, finance, community, or policy actor to test mechanisms and constraints.' },
    verifiedCount: null,
  },
] as const

export const methodsSections = [
  {
    title: { vi: 'Đối tượng mục tiêu', en: 'Target population' },
    body: { vi: '15–20 phụ nữ từ 18 tuổi trở lên, trực tiếp dẫn dắt một hộ kinh doanh, có nguồn thu kinh doanh thường xuyên nhưng biến động và tham gia quyết định tài chính của hộ.', en: '15–20 women aged 18+ who lead a household business, receive recurring but variable business income, and participate in household financial decisions.' },
  },
  {
    title: { vi: 'Tuyển chọn', en: 'Recruitment' },
    body: { vi: 'Tuyển có chủ đích, ngoại tuyến, qua một hợp tác xã, nhóm Hội Phụ nữ hoặc mạng lưới hộ kinh doanh đáng tin cậy tại một xã. Không mở đơn đăng ký công khai.', en: 'Purposive, offline recruitment through one cooperative, Women’s Union group, or trusted household-business network in one commune. There is no public application form.' },
  },
  {
    title: { vi: 'Định dạng phỏng vấn', en: 'Interview format' },
    body: { vi: 'Phỏng vấn có cấu trúc kéo dài 40–60 phút, tập trung vào nhịp thu nhập, một cú sốc gần đây, tiết kiệm và vay, tài sản ưu tiên và phản ứng với công cụ thử nghiệm.', en: 'Structured interviews last 40–60 minutes and cover income rhythm, a recent shock, saving and borrowing, a priority asset, and reactions to draft tools.' },
  },
  {
    title: { vi: 'Đồng thuận và ẩn danh', en: 'Consent and anonymization' },
    body: { vi: 'Người tham gia có thể bỏ qua bất kỳ câu hỏi nào. Trích dẫn được ẩn danh trừ khi có cho phép rõ ràng; đồng thuận nghiên cứu, liên hệ lại và trích dẫn là các lựa chọn riêng.', en: 'Participants may decline any question. Quotations are anonymized unless attribution is explicitly permitted; research, recontact, and quotation consent are separate choices.' },
  },
  {
    title: { vi: 'Dữ liệu và lưu trữ', en: 'Data and storage' },
    body: { vi: 'Không thu số định danh, số tài khoản, mật khẩu, ảnh chụp số dư hoặc địa chỉ chính xác. Thông tin liên hệ được tách khỏi bản ghi nghiên cứu bằng mã giả danh.', en: 'No identity numbers, bank details, passwords, balance screenshots, or exact addresses are collected. Contact information is separated from research records by a pseudonymous code.' },
  },
  {
    title: { vi: 'Giới hạn', en: 'Limitations' },
    body: { vi: 'Mẫu nhỏ và có chủ đích tại một địa điểm, có thể chịu thiên lệch giới thiệu và dựa một phần vào hành vi tự báo cáo. Theo dõi ngắn hạn không cho phép suy luận nhân quả hoặc kết luận về tích lũy tài sản dài hạn.', en: 'The small purposive sample in one location may contain referral bias and relies partly on self-reported behavior. Short follow-up cannot support causal inference or conclusions about long-term asset formation.' },
  },
] as const

export const interviewProtocol = [
  { title: { vi: 'Hộ gia đình và sinh kế', en: 'Household and livelihood' }, questions: { vi: ['Nguồn thu chính là gì và tháng nào mạnh/yếu nhất?', 'Ai tham gia quyết định tài chính trong hộ?'], en: ['What are the main income sources and which months are strongest or weakest?', 'Who participates in household financial decisions?'] } },
  { title: { vi: 'Hành vi tài chính gần đây', en: 'Recent financial behavior' }, questions: { vi: ['Khoản chi bất ngờ gần nhất là gì và được xử lý thế nào?', 'Những phương án nào đã được cân nhắc hoặc từ chối?'], en: ['What was the most recent unexpected expense and how was it handled?', 'Which alternatives were considered or rejected?'] } },
  { title: { vi: 'Tiết kiệm và vay', en: 'Saving and borrowing' }, questions: { vi: ['Tiền được giữ ở đâu giữa lúc thu và chi?', 'Phần khó nhất của vay chính thức là gì: điều kiện, giấy tờ, thời điểm, trả nợ, niềm tin hay chi phí?'], en: ['Where is money kept between income and expenditure?', 'What is hardest about formal borrowing: eligibility, paperwork, timing, repayment, trust, or cost?'] } },
  { title: { vi: 'Tài sản và công cụ', en: 'Assets and tools' }, questions: { vi: ['Tài sản nào có thể cải thiện thu nhập và vì sao chưa mua?', 'Ai được tin tưởng để giải thích một công cụ dòng tiền hoặc so sánh nợ?'], en: ['Which asset could most improve income and why has it not been acquired?', 'Who would be trusted to explain a cash-flow or debt-comparison tool?'] } },
] as const

export type EvidenceConfidence = 'high' | 'moderate' | 'exploratory' | 'contested'
export type PublicEvidenceClaim = {
  claim: CaseStudyLocalizedText
  source: string
  sourceType: CaseStudyLocalizedText
  year: string
  confidence: EvidenceConfidence
  competingEvidence: CaseStudyLocalizedText
  use: CaseStudyLocalizedText
  sourceUrl?: string
}

// Only reviewed claims are promoted into this version-controlled public snapshot.
export const publicEvidenceClaims: PublicEvidenceClaim[] = []

export const policyOptions = [
  {
    title: { vi: 'Chỉ dùng công cụ năng lực tài chính', en: 'Financial-capability tool only' },
    mechanism: { vi: 'Lập kế hoạch dòng tiền và so sánh nợ tốt hơn.', en: 'Improve cash-flow planning and debt comparison.' },
    channel: { vi: 'Hợp tác xã hoặc Hội Phụ nữ', en: 'Cooperative or Women’s Union' },
    beneficiary: { vi: 'Hộ kinh doanh', en: 'Household businesses' },
    risk: { vi: 'Kiến thức có thể không thay đổi hành vi.', en: 'Knowledge may not change behavior.' },
    indicator: { vi: 'Hoàn thành ghi chép và hiểu quyết định.', en: 'Recordkeeping and decision comprehension.' },
  },
  {
    title: { vi: 'Công cụ và người trung gian đáng tin cậy', en: 'Tool plus trusted intermediary' },
    mechanism: { vi: 'Hỗ trợ lặp lại qua người dẫn dắt nhóm địa phương.', en: 'Repeated support through local group leaders.' },
    channel: { vi: 'Nhóm tiết kiệm–tín dụng hoặc hợp tác xã', en: 'Savings-credit group or cooperative' },
    beneficiary: { vi: 'Người ít tự tin khi dùng công cụ', en: 'Lower-confidence users' },
    risk: { vi: 'Chi phí triển khai và chất lượng không đồng đều.', en: 'Delivery cost and inconsistency.' },
    indicator: { vi: 'Hoàn thành và hành vi sau theo dõi.', en: 'Completion and follow-up behavior.' },
  },
  {
    title: { vi: 'Công cụ và sản phẩm tài chính phù hợp', en: 'Tool plus suitable financial product' },
    mechanism: { vi: 'Hỗ trợ năng lực đi cùng thiết kế tiết kiệm hoặc tín dụng.', en: 'Capability support paired with savings or credit design.' },
    channel: { vi: 'Tổ chức tài chính được cấp phép', en: 'Licensed financial institution' },
    beneficiary: { vi: 'Hộ kinh doanh đủ điều kiện', en: 'Eligible micro-enterprises' },
    risk: { vi: 'Bán sai nhu cầu hoặc vay quá mức.', en: 'Mis-selling or over-borrowing.' },
    indicator: { vi: 'Hoạt động tiết kiệm, chất lượng trả nợ và sử dụng cho sản xuất.', en: 'Savings activity, repayment quality, and productive use.' },
  },
] as const

export const pilotTimeline = [
  { period: { vi: 'Tuần 0', en: 'Week 0' }, title: { vi: 'Đường cơ sở', en: 'Baseline' }, body: { vi: 'Nguồn thu, mùa vụ, cú sốc gần nhất, cách tiết kiệm, nghĩa vụ nợ, hành vi ghi chép và một mục tiêu tài sản.', en: 'Income sources, seasonality, recent shock, saving method, debt obligations, recordkeeping, and one productive-asset goal.' } },
  { period: { vi: 'Tuần 1', en: 'Week 1' }, title: { vi: 'Phiên học nhóm', en: 'Group learning session' }, body: { vi: 'Thử bốn công cụ thực hành sau bước đồng thiết kế và rà soát ngôn ngữ.', en: 'Test four practical tools after co-design and language review.' } },
  { period: { vi: 'Tuần 2–4', en: 'Weeks 2–4' }, title: { vi: 'Giai đoạn thực hành', en: 'Practice period' }, body: { vi: 'Người tham gia sử dụng công cụ và nhận một lần kiểm tra ngắn qua người trung gian đáng tin cậy.', en: 'Participants use the tools and receive one short check-in through the trusted intermediary.' } },
  { period: { vi: 'Tuần 5', en: 'Week 5' }, title: { vi: 'Theo dõi', en: 'Follow-up' }, body: { vi: 'Đánh giá mức sử dụng, hiểu biết, hành vi ngắn hạn, tính khả thi triển khai và lý do không dùng.', en: 'Assess use, comprehension, short-term behavior, delivery feasibility, and reasons for non-use.' } },
] as const

export const pilotTools = [
  { vi: 'Bảng dòng tiền hộ gia đình và kinh doanh theo tuần', en: 'Weekly household and business cash-flow sheet' },
  { vi: 'Mục tiêu quỹ dự phòng khẩn cấp', en: 'Emergency-buffer target' },
  { vi: 'Danh sách kiểm tra nợ sản xuất và nợ tiêu dùng', en: 'Productive-debt versus consumption-debt checklist' },
  { vi: 'Lịch mục tiêu tài sản và nguồn tài chính', en: 'Asset-goal and financing calendar' },
] as const

export const pilotMeasures = [
  { vi: 'Mức hoàn thành công cụ', en: 'Tool completion' },
  { vi: 'Khả năng so sánh hai phương án tín dụng', en: 'Ability to compare two credit options' },
  { vi: 'Tần suất ghi chép', en: 'Recordkeeping frequency' },
  { vi: 'Khởi động một hành động tạo quỹ dự phòng', en: 'Whether an emergency-buffer action was initiated' },
  { vi: 'Thay đổi một quyết định vay dự kiến', en: 'Whether a planned borrowing decision changed' },
  { vi: 'Đánh giá hữu ích và lý do không sử dụng', en: 'Usefulness rating and reasons for non-use' },
] as const

export const allowedPilotClaims = {
  may: {
    vi: ['Khả năng sử dụng', 'Mức hiểu', 'Hành vi ngắn hạn', 'Tính khả thi triển khai', 'Phản hồi người tham gia'],
    en: ['Usability', 'Comprehension', 'Short-term behavior', 'Delivery feasibility', 'Participant feedback'],
  },
  mayNot: {
    vi: ['Tăng tài sản hộ gia đình', 'Giảm nghèo', 'Kết quả tín dụng dài hạn tốt hơn', 'Đại diện toàn tỉnh', 'Tác động nhân quả'],
    en: ['Increased household wealth', 'Poverty reduction', 'Better long-term credit outcomes', 'Province-wide representativeness', 'Causal impact'],
  },
}

export type PublicCostItem = {
  block: CaseStudyLocalizedText
  classification: 'fixed' | 'variable'
  sourceRequired: CaseStudyLocalizedText
  low: number | null
  base: number | null
  high: number | null
}

export const publicCostItems: PublicCostItem[] = [
  { block: { vi: 'Thiết kế công cụ', en: 'Tool design' }, classification: 'fixed', sourceRequired: { vi: 'Giờ làm việc có ghi nhận hoặc báo giá thị trường', en: 'Recorded hours or market quote' }, low: null, base: null, high: null },
  { block: { vi: 'Điều phối phiên', en: 'Session facilitation' }, classification: 'fixed', sourceRequired: { vi: 'Báo giá điều phối viên', en: 'Facilitator quote' }, low: null, base: null, high: null },
  { block: { vi: 'Tài liệu người tham gia', en: 'Participant materials' }, classification: 'variable', sourceRequired: { vi: 'Báo giá in ấn', en: 'Printing quote' }, low: null, base: null, high: null },
  { block: { vi: 'Hỗ trợ đi lại', en: 'Transport support' }, classification: 'variable', sourceRequired: { vi: 'Ước tính địa phương', en: 'Local estimate' }, low: null, base: null, high: null },
  { block: { vi: 'Di chuyển thực địa', en: 'Field travel' }, classification: 'variable', sourceRequired: { vi: 'Chi phí vận chuyển thực tế', en: 'Actual transport cost' }, low: null, base: null, high: null },
  { block: { vi: 'Liên hệ theo dõi', en: 'Follow-up communication' }, classification: 'variable', sourceRequired: { vi: 'Ước tính liên lạc', en: 'Communication estimate' }, low: null, base: null, high: null },
  { block: { vi: 'Thu thập và đánh giá dữ liệu', en: 'Data collection and evaluation' }, classification: 'fixed', sourceRequired: { vi: 'Thời gian nghiên cứu có ghi nhận', en: 'Recorded researcher time' }, low: null, base: null, high: null },
  { block: { vi: 'Quản trị và dự phòng', en: 'Administration and contingency' }, classification: 'fixed', sourceRequired: { vi: 'Giả định được nêu rõ', en: 'Explicit assumption' }, low: null, base: null, high: null },
]

export const artifactVersions = [
  {
    version: 'v0.1',
    publicationDate: '2026-08-05',
    revisionDate: '2026-08-05',
    change: { vi: 'Thiết lập kiến trúc nghiên cứu trường hợp cho hộ kinh doanh do phụ nữ dẫn dắt.', en: 'Established the women-led household-business case-study architecture.' },
    reason: { vi: 'Thu hẹp giai đoạn thực địa đầu tiên thành một cộng đồng Bình Định có thể kiểm tra và không tuyên bố đại diện toàn quốc.', en: 'Narrowed the first field phase to one auditable Bình Định community without claiming nationwide representativeness.' },
  },
] as const

export const lastUpdated = '2026-08-05'

