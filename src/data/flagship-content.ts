import type { FlagshipLocale } from './flagship'

export type LocalizedText = Record<FlagshipLocale, string>

export type ResearchCard = {
  title: LocalizedText
  body: LocalizedText
  detail?: LocalizedText
}

export const participantGroups: ResearchCard[] = [
  {
    title: {
      vi: 'Người trực tiếp tạo thu nhập',
      en: 'People who earn the income',
    },
    body: {
      vi: 'Người từ 18 tuổi, sống hoặc làm sinh kế tại khu vực nông thôn, có tham gia quyết định tài chính hộ gia đình và thuộc một trong ba nhóm: tiểu thương/kinh doanh siêu nhỏ, hộ kinh doanh hoặc hộ sản xuất nông nghiệp.',
      en: 'Adults aged 18+ who live or earn a livelihood in a rural area, help make household financial decisions, and are a micro-entrepreneur or trader, household business operator, or smallholder.',
    },
    detail: {
      vi: 'Đây là nhóm trả lời khảo sát hộ gia đình.',
      en: 'This is the household-survey group.',
    },
  },
  {
    title: {
      vi: 'Người kết nối tại địa phương',
      en: 'Trusted local connectors',
    },
    body: {
      vi: 'Khách hàng, hàng xóm, cán bộ cộng đồng hoặc người trong chuỗi cung ứng có thể giới thiệu một hộ kinh doanh, hợp tác xã, nhóm nông dân hay tiểu thương phù hợp. Chỉ chia sẻ thông tin liên hệ riêng khi bạn được họ cho phép.',
      en: 'Customers, neighbours, community workers, or supply-chain contacts who can refer a suitable household business, cooperative, farmer group, or trader. Share private contact details only when they have given you permission.',
    },
    detail: {
      vi: 'Một lời giới thiệu không phải là sự chứng thực hay cam kết được chọn.',
      en: 'A referral is not an endorsement or a promise of selection.',
    },
  },
  {
    title: {
      vi: 'Đối tác học tập và tiếp cận',
      en: 'Learning and outreach partners',
    },
    body: {
      vi: 'Hợp tác xã, hội nghề nghiệp, nhóm cộng đồng, nhà nghiên cứu, tổ chức xã hội, đơn vị tài chính có trách nhiệm hoặc cơ quan địa phương có thể mở cánh cửa tiếp cận, phản biện bộ câu hỏi hoặc đồng tổ chức một phiên học tập.',
      en: 'Cooperatives, trade groups, community organisations, researchers, civil-society groups, responsible financial providers, or local institutions that can enable access, challenge the instrument, or co-host a learning session.',
    },
    detail: {
      vi: 'Quan hệ đối tác chỉ được ghi nhận công khai sau khi hai bên đồng ý.',
      en: 'A partnership is named publicly only after both sides agree.',
    },
  },
]

export const researchQuestions: ResearchCard[] = [
  {
    title: { vi: '01 · Thu nhập đi vào hộ như thế nào?', en: '01 · How does income enter the household?' },
    body: {
      vi: 'Nhịp thu theo ngày, tuần, tháng hay mùa vụ; độ thất thường; và cách dòng tiền kinh doanh, sản xuất và sinh hoạt hòa lẫn với nhau.',
      en: 'Daily, weekly, monthly, or seasonal income rhythms; volatility; and where business, farm, and household cash flows become mixed.',
    },
  },
  {
    title: { vi: '02 · Điều gì làm quỹ dự phòng bị đứt?', en: '02 · What breaks the household buffer?' },
    body: {
      vi: 'Cú sốc gần nhất được xử lý bằng tiết kiệm, cắt chi tiêu, bán tài sản hay vay; và chi phí nào liên tục làm mất khả năng để dành.',
      en: 'Whether the latest shock was met by savings, spending cuts, asset sales, or debt—and which recurring costs prevent money from being set aside.',
    },
  },
  {
    title: { vi: '03 · Tài sản nào thực sự bảo vệ sinh kế?', en: '03 · Which assets actually protect a livelihood?' },
    body: {
      vi: 'Thiết bị, kho trữ, vật nuôi, phương tiện, hàng tồn hoặc công cụ số nào tạo hay bảo vệ thu nhập; và vì sao khoản đầu tư ưu tiên vẫn bị trì hoãn.',
      en: 'Which equipment, storage, livestock, vehicles, inventory, or digital tools create or protect income—and why a priority investment remains delayed.',
    },
  },
  {
    title: { vi: '04 · Công cụ tài chính nào phù hợp và đáng tin?', en: '04 · Which financial tools are suitable and trusted?' },
    body: {
      vi: 'Tiền mặt, tài khoản, ví điện tử, họ/hụi, bảo hiểm và tín dụng được dùng trong hoàn cảnh nào; điều gì khiến một công cụ hữu ích, khó hiểu hoặc quá rủi ro.',
      en: 'When cash, accounts, e-wallets, savings groups, insurance, and credit are used—and what makes a tool useful, confusing, or too risky.',
    },
  },
  {
    title: { vi: '05 · Ai có thể gỡ đúng nút thắt?', en: '05 · Who can remove the right constraint?' },
    body: {
      vi: 'Thay đổi nào thuộc khả năng của chính hộ gia đình, và thay đổi nào cần người mua, nhà cung cấp, ngân hàng, hợp tác xã hoặc chính quyền địa phương hành động.',
      en: 'Which changes a household can make itself, and which require action by buyers, suppliers, banks, cooperatives, or local government.',
    },
  },
]

export const samplingSteps: ResearchCard[] = [
  {
    title: { vi: 'Sàng lọc đúng phạm vi', en: 'Screen for the defined scope' },
    body: {
      vi: 'Khảo sát hộ gia đình hiện dành cho người 18+, có kết nối sinh kế nông thôn và cùng tham gia quyết định tài chính. Người giới thiệu hoặc tổ chức không phù hợp với sàng lọc này vẫn có thể dùng nhánh Giới thiệu hoặc Đối tác.',
      en: 'The household survey is currently for adults with a rural livelihood connection who help make financial decisions. Referrers and organisations outside that screen can still use the Referral or Partner route.',
    },
  },
  {
    title: { vi: 'Theo dõi ô mẫu, không chạy theo tổng số', en: 'Monitor sample cells, not only totals' },
    body: {
      vi: 'Mỗi phản hồi đủ điều kiện được theo dõi theo tỉnh/thành, nhóm sinh kế, nhịp thu nhập và kênh tiếp cận. Các ô còn ít tiếng nói được ưu tiên trong đợt tiếp cận tiếp theo.',
      en: 'Each eligible response is monitored by province, livelihood segment, income pattern, and recruitment channel. Under-heard cells are prioritised in the next outreach wave.',
    },
  },
  {
    title: { vi: 'Chọn phỏng vấn để tạo độ tương phản', en: 'Select interviews for contrast' },
    body: {
      vi: 'Phỏng vấn sâu được chọn có chủ đích để so sánh mùa vụ và thu nhập đều hơn, các cách xử lý cú sốc khác nhau, và những quyết định mua tài sản thành công lẫn bị trì hoãn—chỉ với người đã đồng ý liên hệ lại.',
      en: 'Follow-up interviews are purposively selected to contrast seasonal and steadier income, different shock responses, and both completed and delayed asset decisions—only among people who consent to recontact.',
    },
  },
  {
    title: { vi: 'Không tuyên bố đại diện khi chưa đủ cơ sở', en: 'Do not overclaim representativeness' },
    body: {
      vi: 'Đây là mẫu tuyển có chủ đích qua cộng đồng và đối tác. Kết quả sẽ mô tả những người đã tham gia; không suy rộng cho toàn bộ nông thôn Việt Nam nếu chưa có thiết kế xác suất và trọng số phù hợp.',
      en: 'This is purposeful recruitment through communities and partners. Findings describe participants; they will not be generalised to rural Vietnam without a suitable probability design and weighting.',
    },
  },
]

export const researchPipeline: ResearchCard[] = [
  {
    title: { vi: '1. Ghi nhận', en: '1. Receive' },
    body: {
      vi: 'Khách truy cập chọn khảo sát, câu chuyện, giới thiệu hoặc đối tác và nhận xác nhận ngay trên trang sau khi gửi thành công.',
      en: 'A visitor chooses survey, story, referral, or partner and receives an on-page confirmation after a successful submission.',
    },
  },
  {
    title: { vi: '2. Kiểm tra', en: '2. Check' },
    body: {
      vi: 'Bản ghi thiếu đồng thuận, ngoài phạm vi, trùng lặp rõ ràng hoặc có dấu hiệu rác được tách khỏi mẫu phân tích; không sửa câu trả lời để “đẹp” dữ liệu.',
      en: 'Records lacking consent, outside scope, clearly duplicated, or likely spam are held out of analysis; answers are not edited to make the data look cleaner.',
    },
  },
  {
    title: { vi: '3. Tách danh tính', en: '3. Separate identity' },
    body: {
      vi: 'Thông tin liên hệ tùy chọn được lưu tách khỏi câu trả lời nghiên cứu bằng mã phản hồi. Tệp phân tích mặc định không chứa tên, số điện thoại hoặc email.',
      en: 'Optional contact details are separated from research answers through a response ID. The default analysis export contains no names, phone numbers, or emails.',
    },
  },
  {
    title: { vi: '4. Lấp khoảng trống', en: '4. Fill gaps' },
    body: {
      vi: 'Bảng theo dõi cho thấy tỉnh/thành, nhóm sinh kế và nhịp thu nhập nào còn thiếu; lời mời tiếp theo được hướng vào các khoảng trống thay vì chỉ tăng tổng mẫu.',
      en: 'The monitoring table shows which provinces, livelihood groups, and income patterns are missing; the next invitations target those gaps rather than merely growing the total.',
    },
  },
  {
    title: { vi: '5. Lắng nghe sâu', en: '5. Listen deeply' },
    body: {
      vi: 'Một nhóm nhỏ đã đồng ý liên hệ lại được mời phỏng vấn để kiểm tra cách diễn giải và tìm cơ chế phía sau câu trả lời định lượng.',
      en: 'A small, contrasting set of participants who agreed to recontact is invited to interview, testing interpretation and the mechanisms behind survey responses.',
    },
  },
  {
    title: { vi: '6. Trả lại kết quả', en: '6. Return the learning' },
    body: {
      vi: 'Chỉ công bố xu hướng tổng hợp đủ an toàn, điều chưa biết và giới hạn; sau đó kiểm tra chúng trong phiên học tập, công cụ mở và bản ghi nhớ chính sách.',
      en: 'Only disclosure-safe aggregate patterns, unknowns, and limitations are published, then tested through a learning session, open tool, and policy memo.',
    },
  },
]

export const contributionOutcomes: ResearchCard[] = [
  {
    title: { vi: 'Nếu bạn trả lời khảo sát', en: 'If you take the survey' },
    body: {
      vi: 'Câu trả lời đi vào tập dữ liệu đã loại thông tin nhận dạng sau bước kiểm tra chất lượng. Dự án chỉ liên hệ phỏng vấn nếu bạn chủ động để lại kênh liên hệ và đánh dấu đồng ý.',
      en: 'Your response enters the de-identified research dataset after quality review. The project contacts you for an interview only if you voluntarily leave a contact channel and opt in.',
    },
  },
  {
    title: { vi: 'Nếu bạn chia sẻ câu chuyện', en: 'If you share a story' },
    body: {
      vi: 'Câu chuyện giúp giải thích cơ chế mà câu hỏi đóng không thể hiện. Dự án chỉ được trích dẫn ẩn danh khi bạn đánh dấu cho phép; đồng ý nghiên cứu không tự động đồng nghĩa với đồng ý trích dẫn.',
      en: 'Your story helps explain mechanisms closed questions cannot capture. It may be quoted anonymously only when you explicitly allow it; research consent does not automatically mean quote consent.',
    },
  },
  {
    title: { vi: 'Nếu bạn giới thiệu một hộ kinh doanh', en: 'If you refer a business' },
    body: {
      vi: 'Nhóm dự án xem xét mức phù hợp, xin phép trước khi liên hệ hoặc kết nối, rồi mời đúng nhánh khảo sát/phỏng vấn. Tên doanh nghiệp không được đưa lên danh sách công khai chỉ vì được giới thiệu.',
      en: 'The project reviews fit, obtains permission before contact or an introduction, and invites the appropriate survey or interview route. A business is not added to a public list merely because it was referred.',
    },
  },
  {
    title: { vi: 'Nếu bạn đề xuất hợp tác', en: 'If you propose a partnership' },
    body: {
      vi: 'Đề xuất được phân loại theo tiếp cận mẫu, phản biện phương pháp, phiên học tập hoặc sử dụng kết quả. Một cuộc trao đổi thăm dò không được trình bày như quan hệ đối tác đã xác nhận.',
      en: 'Your proposal is triaged for sample access, method review, learning-session support, or use of findings. An exploratory conversation is not presented as a confirmed partnership.',
    },
  },
]

export const openNeeds: ResearchCard[] = [
  {
    title: { vi: 'Tiếng nói còn ít được nghe', en: 'Under-heard participant voices' },
    body: {
      vi: 'Hộ có thu nhập mùa vụ; người vừa trải qua chi phí y tế, mất mùa hoặc gián đoạn kinh doanh; và hộ đang cân nhắc một tài sản sinh kế cụ thể trong 24 tháng tới.',
      en: 'Seasonal-income households; people who recently faced a health cost, crop loss, or business interruption; and households considering a specific livelihood asset within 24 months.',
    },
  },
  {
    title: { vi: 'Người giới thiệu đáng tin cậy', en: 'Permission-based referrals' },
    body: {
      vi: 'Người biết một tiểu thương, hộ kinh doanh, hợp tác xã hoặc nhóm nông dân phù hợp và có thể xin phép họ trước khi chia sẻ kênh liên hệ.',
      en: 'People who know a suitable trader, household business, cooperative, or farmer group and can ask permission before sharing a contact channel.',
    },
  },
  {
    title: { vi: 'Đối tác mở đường tiếp cận', en: 'Access-enabling partners' },
    body: {
      vi: 'Đơn vị có thể phân phối lời mời bằng tiếng Việt, cung cấp địa điểm trung lập, hỗ trợ người ít kỹ năng số hoặc giúp kiểm tra xem câu hỏi có dễ hiểu tại địa phương hay không.',
      en: 'Groups that can distribute Vietnamese invitations, offer a neutral venue, assist people with limited digital skills, or test whether questions make sense locally.',
    },
  },
  {
    title: { vi: 'Người phản biện độc lập', en: 'Independent method reviewers' },
    body: {
      vi: 'Nhà nghiên cứu và người làm thực địa có thể chỉ ra thiên lệch tuyển mẫu, câu hỏi dẫn dắt, nhóm bị bỏ sót hoặc kết luận vượt quá bằng chứng.',
      en: 'Researchers and field practitioners who can identify recruitment bias, leading questions, missing groups, or conclusions that extend beyond the evidence.',
    },
  },
]

export const safeguards: LocalizedText[] = [
  {
    vi: 'Không yêu cầu số định danh, số tài khoản ngân hàng, địa chỉ chính xác hoặc mức thu nhập chính xác; dùng khoảng và loại hình rộng.',
    en: 'No identity numbers, bank-account details, exact address, or exact income; the instrument uses bands and broad categories.',
  },
  {
    vi: 'Tham gia là tự nguyện; có thể bỏ qua hoặc dừng. Từ chối phỏng vấn không làm mất câu trả lời khảo sát đã đồng ý cung cấp.',
    en: 'Participation is voluntary; a person may skip or stop. Declining an interview does not invalidate a survey response they consented to provide.',
  },
  {
    vi: 'Chỉ công bố dữ liệu tổng hợp khi số lượng trong một nhóm đủ để giảm nguy cơ nhận diện; nhóm quá nhỏ được gộp hoặc không công bố.',
    en: 'Aggregates are published only when a group is large enough to reduce re-identification risk; small cells are combined or withheld.',
  },
  {
    vi: 'Dự án không làm trung gian vay vốn, giới thiệu sản phẩm đầu tư hay hứa mang lại tài trợ cho người tham gia.',
    en: 'The project does not broker loans, recommend investments, or promise funding to participants.',
  },
  {
    vi: 'Lời giới thiệu doanh nghiệp được xử lý như một đầu mối cần xin phép, không phải dữ liệu công khai, chứng thực chất lượng hay quan hệ đối tác đã hình thành.',
    en: 'A business referral is treated as a permission-sensitive lead, not public directory data, a quality endorsement, or an established partnership.',
  },
]

export const evidenceArtifacts = [
  {
    href: '/public-policy/field-notes/merchant-conversations',
    title: { vi: 'Sáu cuộc trò chuyện tại cộng đồng nông nghiệp Bình Định', en: 'Six conversations in a Binh Dinh agricultural community' },
    label: { vi: 'Ghi chép định hình câu hỏi · 03/2024', en: 'Formative field notes · Mar 2024' },
    use: {
      vi: 'Dùng để hình thành giả thuyết về tiền mặt, niềm tin và giao dịch nhỏ. Sáu lời kể được dựng lại từ ghi chép đương thời, không phải mẫu đại diện và không được tính vào mẫu mới.',
      en: 'Used to frame hypotheses about cash, trust, and small transactions. The six accounts were reconstructed from contemporaneous notes, are not representative, and do not count toward the new sample.',
    },
  },
  {
    href: '/public-policy/research/vietnam-rural-digital-exclusion',
    title: { vi: 'Khoảng trống số ở nông thôn Việt Nam', en: 'Vietnam’s rural digital exclusion' },
    label: { vi: 'Bài phân tích chính sách đã xuất bản', en: 'Published policy analysis' },
    use: {
      vi: 'Dùng như lập luận nghiên cứu bàn giấy và nguồn câu hỏi về tiếp cận, năng lực số và mục đích sử dụng. Không thay thế bằng chứng cấp hộ gia đình của dự án này.',
      en: 'Used as a desk-research argument and a source of questions about access, digital capability, and productive use. It does not substitute for household-level evidence in this project.',
    },
  },
  {
    href: '/public-policy/prototypes/agent-banking-pilot',
    title: { vi: 'Đề xuất thí điểm ngân hàng đại lý', en: 'Agent-banking pilot proposal' },
    label: { vi: 'Nguyên mẫu chính sách · chưa phải kết quả triển khai', en: 'Policy prototype · not an implementation result' },
    use: {
      vi: 'Dùng để chuyển phát hiện tương lai thành các giả định có thể kiểm tra về điểm phục vụ, niềm tin và hỗ trợ tại chỗ. Các mục tiêu trong đề xuất không phải thành quả đã đạt.',
      en: 'Used to translate future findings into testable assumptions about service points, trust, and local support. Targets in the proposal are not achieved outcomes.',
    },
  },
] satisfies Array<{
  href: string
  title: LocalizedText
  label: LocalizedText
  use: LocalizedText
}>

export const workflowCopy = {
  vi: {
    audienceEyebrow: 'Đối tượng & câu hỏi',
    audienceTitle: 'Dự án cần nghe từ ai—và cần biết điều gì',
    audienceIntro: 'Mục tiêu không phải gom càng nhiều tên càng tốt. Mỗi đóng góp phải giúp kiểm tra một phần cụ thể của hành trình từ dòng thu nhập đến quỹ dự phòng, khả năng chống chịu và tài sản sinh kế.',
    questionsTitle: 'Năm câu hỏi dẫn đường',
    samplingEyebrow: 'Thiết kế lấy mẫu',
    samplingTitle: 'Cách một tiếng nói được chọn và đặt trong mẫu',
    samplingIntro: 'Lấy mẫu có chủ đích phù hợp cho giai đoạn học hỏi ban đầu, nhưng chỉ đáng tin khi dự án công khai tiêu chí sàng lọc, khoảng trống và giới hạn suy rộng.',
    pipelineTitle: 'Từ một lượt gửi đến bằng chứng công khai',
    outcomeEyebrow: 'Sau khi bạn đóng góp',
    outcomeTitle: 'Một lượt gửi sẽ dẫn đến điều gì',
    outcomeIntroOpen: 'Cổng nhận đóng góp đang mở. Việc gửi thông tin tạo một đầu mối nghiên cứu; nó không tự động tạo quan hệ đối tác, lời giới thiệu công khai hay cơ hội tài chính.',
    outcomeIntroPreview: 'Cổng đang ở chế độ xem trước. Quy trình dưới đây là cam kết vận hành khi intake được mở sau rà soát dữ liệu và quyền riêng tư.',
    needsTitle: 'Những đóng góp cần cho đợt mở đầu',
    contribute: 'Chọn cách đóng góp',
    outreach: 'Mở bộ tài liệu tiếp cận',
    safeguardsEyebrow: 'Bảo vệ người tham gia',
    safeguardsTitle: 'Ranh giới dự án sẽ không vượt qua',
    safeguardsIntro: 'Nghiên cứu về tiền và sinh kế có thể tạo rủi ro danh tính, áp lực xã hội và kỳ vọng hỗ trợ. Các ranh giới này là một phần của phương pháp, không phải dòng chữ nhỏ.',
    evidenceTitle: 'Bằng chứng hiện có được sử dụng đúng vai trò',
    evidenceIntro: 'Ba tài liệu trong portfolio giúp giải thích dự án bắt đầu từ đâu. Chúng không chứng minh rằng nghiên cứu mới đã hoàn thành hay một can thiệp đã có tác động.',
    openEvidence: 'Mở tài liệu',
  },
  en: {
    audienceEyebrow: 'People & questions',
    audienceTitle: 'Who the project needs to hear from—and what it needs to learn',
    audienceIntro: 'The aim is not to collect as many names as possible. Each contribution should test a specific part of the path from income flow to buffers, resilience, and livelihood assets.',
    questionsTitle: 'Five guiding questions',
    samplingEyebrow: 'Sampling design',
    samplingTitle: 'How a voice is selected and situated in the sample',
    samplingIntro: 'Purposeful sampling suits an early learning phase only when the project discloses its screen, coverage gaps, and limits on inference.',
    pipelineTitle: 'From one submission to public evidence',
    outcomeEyebrow: 'After you contribute',
    outcomeTitle: 'What a submission leads to',
    outcomeIntroOpen: 'Contribution intake is open. A submission creates a research lead; it does not automatically create a partnership, public listing, or financial opportunity.',
    outcomeIntroPreview: 'Intake is in preview. The process below is the operating commitment for launch after data and privacy review.',
    needsTitle: 'What the opening wave needs',
    contribute: 'Choose a contribution route',
    outreach: 'Open the outreach kit',
    safeguardsEyebrow: 'Participant safeguards',
    safeguardsTitle: 'Boundaries the project will not cross',
    safeguardsIntro: 'Research about money and livelihoods can create identification risk, social pressure, and expectations of assistance. These boundaries are part of the method, not fine print.',
    evidenceTitle: 'Existing evidence, used for the right job',
    evidenceIntro: 'Three portfolio artifacts explain where the project began. They do not prove the new study is complete or that an intervention has delivered impact.',
    openEvidence: 'Open artifact',
  },
} as const
