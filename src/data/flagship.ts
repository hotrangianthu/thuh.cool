export type FlagshipLocale = 'vi' | 'en'
export type EvidenceStatus = 'verified' | 'pending' | 'target'

export const flagshipRoutes = {
  vi: '/flagship/from-income-to-assets',
  en: '/flagship/from-income-to-assets/en',
} as const

export const provinces = [
  'An Giang', 'Bắc Ninh', 'Cà Mau', 'Cao Bằng', 'Cần Thơ', 'Đà Nẵng',
  'Đắk Lắk', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Nội',
  'Hà Tĩnh', 'Hải Phòng', 'Hưng Yên', 'Huế', 'Khánh Hòa', 'Lai Châu',
  'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Nghệ An', 'Ninh Bình', 'Phú Thọ',
  'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sơn La', 'Tây Ninh',
  'Thanh Hóa', 'Thái Nguyên', 'Thành phố Hồ Chí Minh', 'Tuyên Quang', 'Vĩnh Long',
] as const

export const flagshipMetrics: Array<{
  value: string
  vi: string
  en: string
  status: EvidenceStatus
}> = [
  { value: '34', vi: 'tỉnh/thành hướng tới tiếp cận', en: 'provincial-level units in outreach target', status: 'target' },
  { value: '600', vi: 'khảo sát hộ gia đình mục tiêu', en: 'target household surveys', status: 'target' },
  { value: '60', vi: 'phỏng vấn hoặc câu chuyện mục tiêu', en: 'target interviews or stories', status: 'target' },
  { value: '15', vi: 'đối tác tiếp cận mục tiêu', en: 'target outreach partners', status: 'target' },
]

export const timeline = [
  {
    date: '01–03/2025',
    vi: 'Định hình vấn đề',
    en: 'Problem framing',
    detailVi: 'Xác lập câu hỏi từ thu nhập đến tài sản, phạm vi hộ gia đình nông thôn và nguyên tắc bằng chứng.',
    detailEn: 'Defined the income-to-assets question, rural household scope, and evidence principles.',
    status: 'pending' as EvidenceStatus,
  },
  {
    date: '04–06/2025',
    vi: 'Thiết kế nghiên cứu',
    en: 'Research design',
    detailVi: 'Thiết kế khung chung và ba nhánh cho hộ kinh doanh, tiểu thương và hộ sản xuất nông nghiệp.',
    detailEn: 'Designed a shared core and three branches for micro-enterprises, household businesses, and smallholders.',
    status: 'pending' as EvidenceStatus,
  },
  {
    date: '07–12/2025',
    vi: 'Đợt lắng nghe đầu tiên',
    en: 'First listening wave',
    detailVi: 'Mốc lịch sử đang chờ đối chiếu số liệu, ghi chép và bằng chứng tiếp cận.',
    detailEn: 'Historic milestone awaiting reconciliation against outreach records and field evidence.',
    status: 'pending' as EvidenceStatus,
  },
  {
    date: '01–04/2026',
    vi: 'Tổng hợp khung tiến triển tài sản',
    en: 'Asset-progression synthesis',
    detailVi: 'Tổng hợp các rào cản từ dòng tiền, quỹ dự phòng, khả năng chống chịu đến tài sản sinh kế.',
    detailEn: 'Synthesized barriers from cash flow and buffers through resilience and productive assets.',
    status: 'pending' as EvidenceStatus,
  },
  {
    date: '05–07/2026',
    vi: 'Công cụ mở và phản hồi',
    en: 'Open tool and feedback',
    detailVi: 'Phát triển công cụ tự đánh giá và chuẩn bị phiên học tập cộng đồng.',
    detailEn: 'Developed the self-assessment and prepared the community learning session.',
    status: 'pending' as EvidenceStatus,
  },
  {
    date: '08/2026–nay',
    vi: 'Mở rộng lấy mẫu toàn quốc',
    en: 'Nationwide sampling',
    detailVi: 'Mở cổng đóng góp, tuyển đối tác địa phương và công khai sổ tay chính sách.',
    detailEn: 'Opening contributions, recruiting local partners, and publishing the policy notebook.',
    status: 'target' as EvidenceStatus,
  },
]

export const copy = {
  vi: {
    project: 'Dự án nghiên cứu công ích độc lập',
    title: 'Từ Thu nhập đến Tài sản',
    subtitle: 'Dự án Tiến triển Thịnh vượng Nông thôn Việt Nam',
    lede: 'Điều gì ngăn các hộ gia đình và người làm kinh tế nhỏ ở nông thôn chuyển thu nhập thành tiết kiệm, khả năng chống chịu và tài sản phục vụ sinh kế?',
    contribute: 'Đóng góp cho nghiên cứu',
    explore: 'Xem cách nghiên cứu',
    language: 'English',
    evidence: 'Sổ cái bằng chứng',
    evidenceNote: 'Mục tiêu không phải là kết quả. Các số liệu chỉ được công nhận là tiến độ khi có thể đối chiếu với bằng chứng.',
    target: 'Mục tiêu',
    pending: 'Chờ đối chiếu',
    verified: 'Đã xác minh',
    framework: 'Một hành trình, không chỉ một sản phẩm tài chính',
    frameworkBody: 'Nghiên cứu xem xét sự tiến triển theo năm nấc. Một hộ gia đình có thể tiến hoặc lùi giữa các nấc khi mùa vụ, sức khỏe, giá cả và biến cố thay đổi.',
    stages: ['Thu nhập', 'Quỹ dự phòng', 'Khả năng chống chịu', 'Tài sản sinh kế', 'Công cụ tài chính phù hợp'],
    joinTitle: 'Ba cách tham gia',
    joinBody: 'Chọn vai trò phù hợp. Khảo sát bắt đầu bằng bước sàng lọc 60–90 giây và không yêu cầu số tài khoản, giấy tờ tùy thân hoặc địa chỉ chính xác.',
    survey: 'Tham gia khảo sát',
    surveyBody: 'Dành cho tiểu thương, hộ kinh doanh và hộ sản xuất nông nghiệp có tham gia quyết định tài chính gia đình.',
    story: 'Chia sẻ câu chuyện',
    storyBody: 'Kể một trải nghiệm ẩn danh về tiết kiệm, cú sốc tài chính, vay vốn hoặc đầu tư cho sinh kế.',
    partner: 'Trở thành đối tác',
    partnerBody: 'Hỗ trợ tiếp cận cộng đồng, phản biện phương pháp, tổ chức buổi học hoặc sử dụng kết quả.',
    start: 'Bắt đầu',
    timeline: 'Tiến trình từ tháng 1/2025',
    timelineNote: 'Các mốc lịch sử đang chờ bằng chứng được ghi rõ thay vì được trình bày như thành tựu đã xác minh.',
    tool: 'Công cụ tự đánh giá mở',
    toolBody: 'Định vị điểm mạnh và khoảng trống của hộ gia đình trên hành trình từ thu nhập đến tài sản. Đây là công cụ học tập, không phải tư vấn tài chính.',
    methods: 'Phương pháp và giới hạn',
    methodItems: [
      'Lấy mẫu có chủ đích qua cộng đồng và đối tác; chưa đại diện thống kê cho toàn quốc.',
      'Một bộ câu hỏi lõi chung, sau đó phân nhánh theo nhóm sinh kế.',
      'Chỉ công bố dữ liệu tổng hợp; thông tin liên hệ được lưu riêng khỏi câu trả lời nghiên cứu.',
      'Ý định thay đổi được đo riêng với thay đổi hành vi đã theo dõi.',
    ],
    outputs: 'Đầu ra công khai',
    outputItems: ['Sổ tay nghiên cứu mở', 'Công cụ quyết định cho hộ gia đình', 'Một phiên học tập cộng đồng', 'Bản ghi nhớ chính sách'],
    privacy: 'Quyền riêng tư & sự đồng thuận',
    privacyBody: 'Tham gia là tự nguyện. Bạn có thể bỏ qua hoặc dừng lại bất cứ lúc nào. Dữ liệu nhận dạng không được công khai.',
    readPrivacy: 'Đọc thông báo quyền riêng tư',
  },
  en: {
    project: 'Independent public-interest research project',
    title: 'From Income to Assets',
    subtitle: 'Vietnam Rural Wealth Progression Project',
    lede: 'What prevents rural households and micro-entrepreneurs from converting income into savings, resilience, and productive assets?',
    contribute: 'Contribute to the research',
    explore: 'Explore the method',
    language: 'Tiếng Việt',
    evidence: 'Evidence ledger',
    evidenceNote: 'Targets are not results. A figure counts as progress only when it can be reconciled with supporting evidence.',
    target: 'Target',
    pending: 'Evidence pending',
    verified: 'Verified',
    framework: 'A progression, not a single financial product',
    frameworkBody: 'The research follows five stages. Households can move forward or backward as seasons, health, prices, and shocks change.',
    stages: ['Income', 'Emergency buffer', 'Resilience', 'Productive assets', 'Responsible financial tools'],
    joinTitle: 'Three ways to take part',
    joinBody: 'Choose the route that fits. The survey starts with a 60–90 second screener and never asks for bank details, identity numbers, or an exact address.',
    survey: 'Take the survey',
    surveyBody: 'For micro-entrepreneurs, household businesses, and smallholders who help make household financial decisions.',
    story: 'Share a story',
    storyBody: 'Contribute an anonymous experience with saving, financial shocks, borrowing, or investing in a livelihood.',
    partner: 'Become a partner',
    partnerBody: 'Support community outreach, challenge the method, host a learning session, or use the findings.',
    start: 'Start',
    timeline: 'Progress since January 2025',
    timelineNote: 'Historic milestones awaiting evidence are labeled plainly instead of being presented as verified achievements.',
    tool: 'Open self-assessment',
    toolBody: 'Locate household strengths and gaps along the path from income to assets. This is a learning tool, not financial advice.',
    methods: 'Method and limitations',
    methodItems: [
      'Purposeful recruitment through communities and partners; not yet a statistically representative national sample.',
      'One shared core questionnaire followed by livelihood-specific branches.',
      'Only aggregate findings are published; contact details are stored separately from research answers.',
      'Intended behavior is reported separately from behavior observed through follow-up.',
    ],
    outputs: 'Public outputs',
    outputItems: ['Open research notebook', 'Household decision tool', 'One community learning session', 'Policy memo'],
    privacy: 'Privacy and consent',
    privacyBody: 'Participation is voluntary. You may skip a question or stop at any time. Identifying data will not be published.',
    readPrivacy: 'Read the privacy notice',
  },
} as const

