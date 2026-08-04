'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { provinces, type FlagshipLocale } from '@/data/flagship'

type Mode = 'survey' | 'story' | 'partner'
type Message = { kind: 'success' | 'error'; text: string } | null
type SurveyDraft = Record<string, string>

const labels = {
  vi: {
    tabs: ['Khảo sát hộ gia đình', 'Chia sẻ câu chuyện', 'Kết nối đối tác'],
    preview: 'Bản xem trước nghiên cứu',
    previewText: 'Bạn có thể đi qua toàn bộ bảng hỏi và thử các nhánh sinh kế. Chức năng gửi dữ liệu đang tạm khóa cho đến khi hoàn tất rà soát quyền riêng tư và hạ tầng dữ liệu.',
    orientationTitle: 'Trước khi bắt đầu',
    orientationLead: 'Đây là một cuộc trò chuyện về cách hộ gia đình chuyển thu nhập thành khoản dự phòng và tài sản sinh kế — không phải bài kiểm tra kiến thức tài chính.',
    orientationPoints: ['Khoảng 7–10 phút', 'Không hỏi thu nhập chính xác, số tài khoản hay địa chỉ cụ thể', 'Câu trả lời được phân tích theo nhóm, không công bố danh tính'],
    eligibilityTitle: 'Bảng hỏi này có phù hợp với bạn?',
    eligibilityNote: 'Chọn nhóm mô tả sát nhất hoạt động tạo thu nhập chính. Bạn vẫn có thể nói về các sinh kế khác trong phần trả lời mở.',
    adult: 'Tôi từ 18 tuổi trở lên',
    rural: 'Tôi đang sống hoặc làm sinh kế tại khu vực nông thôn',
    decision: 'Tôi có tham gia quyết định tài chính của hộ gia đình',
    province: 'Tỉnh/thành hiện tại',
    segment: 'Nhóm sinh kế chính',
    segments: ['Tiểu thương / kinh doanh siêu nhỏ', 'Hộ kinh doanh gia đình', 'Hộ sản xuất nông nghiệp'],
    segmentDescriptions: ['Buôn bán nhỏ, dịch vụ hoặc tự làm với quy mô cá nhân', 'Hoạt động kinh doanh có sự tham gia và tài chính của hộ', 'Trồng trọt, chăn nuôi, thủy sản hoặc sản xuất nông nghiệp'],
    consent: 'Tôi đã đọc thông báo quyền riêng tư và đồng ý cho dự án sử dụng câu trả lời cho mục đích nghiên cứu công ích.',
    screen: 'Bắt đầu bảng hỏi',
    previewScreen: 'Xem thử bảng hỏi',
    ineligible: 'Cảm ơn bạn. Khảo sát hiện dành cho người từ 18 tuổi, có kết nối sinh kế nông thôn và tham gia quyết định tài chính hộ gia đình. Bạn vẫn có thể chia sẻ một câu chuyện hoặc giới thiệu đối tác phù hợp.',
    step: 'Bước',
    of: 'trên',
    steps: ['Nhịp thu nhập', 'Khả năng chống chịu', 'Tài sản', 'Sinh kế', 'Rà soát'],
    stepIntros: [
      'Cho chúng tôi biết tiền đi vào hộ gia đình theo nhịp nào và việc dành tiền sang một bên diễn ra ra sao.',
      'Phần này tìm hiểu cách hộ ứng phó khi thu nhập gián đoạn hoặc xuất hiện một khoản chi bất ngờ.',
      'Tài sản có thể là máy móc, vật nuôi, hàng tồn kho, phương tiện hoặc một khoản dự phòng giúp bảo vệ sinh kế.',
      'Một vài câu hỏi cụ thể theo nhóm sinh kế bạn đã chọn.',
      'Kiểm tra lại các câu trả lời chính và lựa chọn có muốn được liên hệ hay không.',
    ],
    income: 'Trong 12 tháng qua, thu nhập của hộ ổn định đến mức nào?',
    incomePattern: 'Nguồn thu chính thường về theo nhịp nào?',
    saving: 'Hộ thường dành tiền cho tiết kiệm hoặc quỹ dự phòng như thế nào?',
    savingLocation: 'Khoản tiết kiệm hoặc dự phòng chính hiện được giữ ở đâu?',
    shock: 'Nếu nguồn thu chính dừng lại hôm nay, hộ có thể trang trải nhu cầu thiết yếu trong bao lâu?',
    emergency: 'Hộ đã xử lý khoản chi khẩn cấp đáng kể gần nhất bằng cách nào?',
    financialTool: 'Công cụ tài chính nào hộ sử dụng thường xuyên nhất?',
    barrier: 'Điều gì cản trở hộ xây dựng khoản dự phòng hoặc tài sản nhiều nhất?',
    asset: 'Tài sản sinh kế nào hộ muốn có hoặc nâng cấp nhất trong 24 tháng tới?',
    assetHint: 'Ví dụ: máy móc, xe vận chuyển, kho trữ, đàn vật nuôi, hàng tồn kho, đất hoặc công cụ số.',
    currentAssets: 'Những tài sản nào hiện đang trực tiếp tạo ra hoặc bảo vệ thu nhập của hộ?',
    currentAssetsHint: 'Liệt kê ngắn gọn; không cần nêu giá trị tiền.',
    intendedAction: 'Trong 6 tháng tới, hộ muốn thực hiện một thay đổi cụ thể nào?',
    intendedActionHint: 'Ví dụ: lập quỹ dự phòng một tháng, trả một khoản nợ, hoặc mua thiết bị nhỏ.',
    branch: 'Hãy kể về quyết định tài sản hoặc vốn khó nhất mà sinh kế của bạn đang đối mặt',
    contact: 'Thông tin liên hệ tùy chọn để phỏng vấn tiếp',
    contactHint: 'Tên và email/số điện thoại được lưu riêng khỏi câu trả lời nghiên cứu.',
    name: 'Tên hoặc cách xưng hô',
    email: 'Email hoặc số điện thoại',
    followup: 'Tôi đồng ý để dự án liên hệ cho một cuộc trò chuyện tiếp theo (30–45 phút).',
    reviewConsent: 'Tôi xác nhận câu trả lời phản ánh trải nghiệm của mình và đồng ý gửi cho dự án nghiên cứu.',
    submitSurvey: 'Gửi câu trả lời',
    previewSubmit: 'Chức năng gửi đang tạm khóa',
    back: 'Quay lại',
    next: 'Tiếp tục',
    changeProfile: 'Đổi nhóm sinh kế',
    reviewTitle: 'Câu trả lời của bạn',
    notAnswered: 'Chưa trả lời trong bản xem trước',
    submittedTitle: 'Cảm ơn bạn đã hoàn thành bảng hỏi',
    submittedText: 'Câu trả lời đã được ghi nhận. Nếu bạn đồng ý phỏng vấn tiếp, nhóm dự án sẽ chỉ liên hệ qua kênh bạn cung cấp.',
    story: 'Câu chuyện của bạn',
    storyPrompt: 'Một biến cố, khoản tiết kiệm, khoản vay hoặc tài sản nào đã thay đổi khả năng chống chịu của gia đình?',
    quote: 'Dự án có thể trích dẫn câu chuyện ẩn danh của tôi.',
    submitStory: 'Gửi câu chuyện',
    organization: 'Tổ chức / nhóm',
    role: 'Vai trò của bạn',
    support: 'Bạn muốn hợp tác như thế nào?',
    partnerConsent: 'Tôi đồng ý để dự án liên hệ về đề xuất hợp tác này.',
    submitPartner: 'Gửi đề xuất hợp tác',
    sending: 'Đang gửi…',
    success: 'Đã ghi nhận. Cảm ơn bạn đã đóng góp cho dự án.',
    error: 'Không thể gửi lúc này. Vui lòng kiểm tra thông tin hoặc thử lại sau.',
  },
  en: {
    tabs: ['Household survey', 'Share a story', 'Connect a partner'],
    preview: 'Research preview',
    previewText: 'You can walk through the complete questionnaire and try each livelihood path. Data submission remains locked until the privacy and data-infrastructure review is complete.',
    orientationTitle: 'Before you begin',
    orientationLead: 'This is a conversation about how households turn income into a buffer and livelihood assets — not a test of financial knowledge.',
    orientationPoints: ['About 7–10 minutes', 'No exact income, account number, or precise address', 'Answers are analysed in groups; identities are not published'],
    eligibilityTitle: 'Is this questionnaire a fit for you?',
    eligibilityNote: 'Choose the segment closest to your main income-generating activity. You can still tell us about other livelihoods in an open response.',
    adult: 'I am 18 or older',
    rural: 'I live or earn a livelihood in a rural area',
    decision: 'I help make financial decisions for my household',
    province: 'Current province/city',
    segment: 'Primary livelihood segment',
    segments: ['Micro-entrepreneur / trader', 'Household business', 'Smallholder household'],
    segmentDescriptions: ['Small-scale trading, services, or solo self-employment', 'A business operated with household labour or finances', 'Farming, livestock, aquaculture, or other agricultural production'],
    consent: 'I have read the privacy notice and consent to my answers being used for this public-interest research.',
    screen: 'Start the questionnaire',
    previewScreen: 'Preview the questionnaire',
    ineligible: 'Thank you. The current survey is for people aged 18+, connected to a rural livelihood, who help make household financial decisions. You may still share a story or introduce a relevant partner.',
    step: 'Step',
    of: 'of',
    steps: ['Income rhythm', 'Resilience', 'Assets', 'Livelihood', 'Review'],
    stepIntros: [
      'Tell us when money reaches the household and what setting some of it aside looks like in practice.',
      'This section explores how the household responds when income is interrupted or an unexpected expense appears.',
      'An asset might be equipment, livestock, stock, transport, or a buffer that protects the livelihood.',
      'A few questions tailored to the livelihood segment you selected.',
      'Review your main answers and choose whether you would like to be contacted.',
    ],
    income: 'Over the past 12 months, how stable was household income?',
    incomePattern: 'When does the main income usually arrive?',
    saving: 'How does the household usually set money aside for savings or emergencies?',
    savingLocation: 'Where is the household’s main saving or emergency buffer kept?',
    shock: 'If the main income stopped today, how long could the household cover essentials?',
    emergency: 'How did the household handle its most recent significant emergency expense?',
    financialTool: 'Which financial tool does the household use most often?',
    barrier: 'What most prevents the household from building a buffer or assets?',
    asset: 'Which livelihood asset would the household most like to acquire or improve in the next 24 months?',
    assetHint: 'For example: equipment, transport, storage, livestock, inventory, land, or a digital tool.',
    currentAssets: 'Which assets currently create or protect household income?',
    currentAssetsHint: 'A short list is enough; do not include monetary values.',
    intendedAction: 'What is one concrete change the household wants to make in the next six months?',
    intendedActionHint: 'For example: build a one-month buffer, repay a debt, or buy a small piece of equipment.',
    branch: 'Tell us about the hardest asset or capital decision facing this livelihood',
    contact: 'Optional contact for a follow-up interview',
    contactHint: 'Your name and email/phone are stored separately from research answers.',
    name: 'Name or preferred form of address',
    email: 'Email or phone number',
    followup: 'I agree to be contacted for a 30–45 minute follow-up conversation.',
    reviewConsent: 'I confirm that these answers reflect my experience and agree to submit them to the research project.',
    submitSurvey: 'Submit my answers',
    previewSubmit: 'Submission is temporarily locked',
    back: 'Back',
    next: 'Continue',
    changeProfile: 'Change livelihood profile',
    reviewTitle: 'Your answers',
    notAnswered: 'Not answered in preview',
    submittedTitle: 'Thank you for completing the questionnaire',
    submittedText: 'Your response has been recorded. If you opted into a follow-up, the project team will only use the contact channel you supplied.',
    story: 'Your story',
    storyPrompt: 'What shock, saving decision, loan, or asset changed your household’s ability to cope?',
    quote: 'The project may quote my story anonymously.',
    submitStory: 'Submit story',
    organization: 'Organization / group',
    role: 'Your role',
    support: 'How would you like to collaborate?',
    partnerConsent: 'I consent to being contacted about this partnership inquiry.',
    submitPartner: 'Send partnership inquiry',
    sending: 'Sending…',
    success: 'Recorded. Thank you for contributing to the project.',
    error: 'We could not submit this yet. Check the information or try again later.',
  },
} as const

const incomeOptions = {
  vi: ['Rất thất thường — không đoán được tuần/tháng tới', 'Theo mùa vụ hoặc chu kỳ sản xuất', 'Khá ổn định nhưng vẫn có tháng hụt', 'Ổn định và có thể dự tính'],
  en: ['Highly irregular — next week/month is hard to predict', 'Seasonal or tied to a production cycle', 'Fairly stable, with occasional short months', 'Stable and predictable'],
}

async function postJson(path: string, payload: Record<string, unknown>) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

export default function ContributionForms({ locale, intakeOpen }: { locale: FlagshipLocale; intakeOpen: boolean }) {
  const t = labels[locale]
  const [mode, setMode] = useState<Mode>('survey')
  const [screeningId, setScreeningId] = useState<string | null>(null)
  const [screeningProvince, setScreeningProvince] = useState('')
  const [segment, setSegment] = useState('micro_entrepreneur')
  const [surveyStep, setSurveyStep] = useState(0)
  const [surveyDraft, setSurveyDraft] = useState<SurveyDraft>({})
  const [surveyComplete, setSurveyComplete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<Message>(null)
  const [ineligible, setIneligible] = useState(false)
  const [outreachSource, setOutreachSource] = useState('direct')

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get('ref')
    if (source && /^[a-z0-9_-]{1,80}$/i.test(source)) setOutreachSource(source)
  }, [])

  const submit = async (event: FormEvent<HTMLFormElement>, path: string, extra: Record<string, unknown> = {}) => {
    event.preventDefault()
    if (!intakeOpen) return false
    const formElement = event.currentTarget
    setBusy(true)
    setMessage(null)
    const form = new FormData(formElement)
    const payload = Object.fromEntries(form.entries())
    try {
      await postJson(path, { ...payload, ...extra, locale, outreachSource })
      setMessage({ kind: 'success', text: t.success })
      formElement.reset()
      return true
    } catch {
      setMessage({ kind: 'error', text: t.error })
      return false
    } finally {
      setBusy(false)
    }
  }

  const submitScreener = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)
    setIneligible(false)
    const form = new FormData(event.currentTarget)
    const nextSegment = String(form.get('segment') || 'micro_entrepreneur')
    const nextProvince = String(form.get('province') || '')

    if (!intakeOpen) {
      setSegment(nextSegment)
      setScreeningProvince(nextProvince)
      setScreeningId('preview')
      setSurveyStep(0)
      return
    }

    setBusy(true)
    try {
      const data = await postJson('/api/flagship/screen', {
        locale,
        province: nextProvince,
        segment: nextSegment,
        adult: form.get('adult') === 'on',
        rural: form.get('rural') === 'on',
        decisionMaker: form.get('decisionMaker') === 'on',
        consent: form.get('consent') === 'on',
        website: form.get('website'),
        outreachSource,
      })
      if (!data.eligible) {
        setIneligible(true)
        return
      }
      setSegment(nextSegment)
      setScreeningProvince(nextProvince)
      setScreeningId(data.id)
      setSurveyStep(0)
    } catch {
      setMessage({ kind: 'error', text: t.error })
    } finally {
      setBusy(false)
    }
  }

  const handleDraftChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    if (!target.name) return
    const value = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? String(target.checked)
      : target.value
    setSurveyDraft((current) => ({ ...current, [target.name]: value }))
  }

  const advanceSurvey = (form: HTMLFormElement | null) => {
    if (!form) return
    if (intakeOpen) {
      const panel = form.querySelector<HTMLElement>(`[data-survey-step="${surveyStep}"]`)
      const fields = Array.from(panel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea') || [])
      const invalid = fields.find((field) => !field.checkValidity())
      if (invalid) {
        invalid.reportValidity()
        return
      }
    }
    setSurveyStep((current) => Math.min(current + 1, 4))
    setMessage(null)
  }

  const submitSurvey = async (event: FormEvent<HTMLFormElement>) => {
    const success = await submit(event, '/api/flagship/response', { screeningId, segment })
    if (success) setSurveyComplete(true)
  }

  const status = message && (
    <div className={`form-status ${message.kind === 'error' ? 'error' : ''}`} role="status">{message.text}</div>
  )

  const segmentIndex = segment === 'household_business' ? 1 : segment === 'smallholder' ? 2 : 0
  const reviewFields = [
    [t.province, screeningProvince],
    [t.segment, t.segments[segmentIndex]],
    [t.income, surveyDraft.incomeStability],
    [t.saving, surveyDraft.savingFrequency],
    [t.shock, surveyDraft.shockCapacity],
    [t.barrier, surveyDraft.topBarrier],
    [t.currentAssets, surveyDraft.currentAssets],
    [t.asset, surveyDraft.priorityAsset],
    [t.intendedAction, surveyDraft.intendedAction],
  ]

  return (
    <div className="contribution-panel">
      {!intakeOpen && (
        <div className="form-status" style={{ margin: '0 0 24px' }}>
          <strong>{t.preview}.</strong> {t.previewText}
        </div>
      )}

      <div className="form-tabs" role="tablist" aria-label={locale === 'vi' ? 'Cách tham gia' : 'Contribution routes'}>
        {(['survey', 'story', 'partner'] as Mode[]).map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={mode === item}
            className={`form-tab ${mode === item ? 'active' : ''}`}
            key={item}
            onClick={() => { setMode(item); setMessage(null) }}
          >
            {t.tabs[index]}
          </button>
        ))}
      </div>

      {mode === 'survey' && !screeningId && !surveyComplete && (
        <form className="research-form" onSubmit={submitScreener} noValidate={!intakeOpen}>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <section style={{ borderBottom: '1px solid rgba(24, 67, 52, .18)', paddingBottom: 24, marginBottom: 28 }}>
            <p className="flagship-eyebrow" style={{ marginBottom: 10 }}>{t.orientationTitle}</p>
            <h3 style={{ maxWidth: 760, marginBottom: 12 }}>{t.orientationLead}</h3>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px', paddingLeft: 20, marginBottom: 0 }}>
              {t.orientationPoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </section>

          <div style={{ marginBottom: 24 }}>
            <p className="flagship-eyebrow" style={{ marginBottom: 8 }}>{t.eligibilityTitle}</p>
            <p className="form-note">{t.eligibilityNote}</p>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="province">{t.province}</label>
              <select id="province" name="province" required={intakeOpen} defaultValue="">
                <option value="" disabled>—</option>
                {provinces.map((province) => <option key={province}>{province}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="segment">{t.segment}</label>
              <select id="segment" name="segment" required defaultValue="micro_entrepreneur">
                <option value="micro_entrepreneur">{t.segments[0]} — {t.segmentDescriptions[0]}</option>
                <option value="household_business">{t.segments[1]} — {t.segmentDescriptions[1]}</option>
                <option value="smallholder">{t.segments[2]} — {t.segmentDescriptions[2]}</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 10, marginTop: 4 }}>
            <label className="checkbox-field"><input type="checkbox" name="adult" />{t.adult}</label>
            <label className="checkbox-field"><input type="checkbox" name="rural" />{t.rural}</label>
            <label className="checkbox-field"><input type="checkbox" name="decisionMaker" />{t.decision}</label>
            <label className="checkbox-field"><input required={intakeOpen} type="checkbox" name="consent" />{t.consent}</label>
          </div>
          <button className="flagship-btn primary" disabled={busy}>{busy ? t.sending : intakeOpen ? t.screen : t.previewScreen}</button>
          {ineligible && <div className="form-status error" role="status">{t.ineligible}</div>}
          {status}
        </form>
      )}

      {mode === 'survey' && screeningId && !surveyComplete && (
        <form className="research-form" onSubmit={submitSurvey} onChange={handleDraftChange} noValidate={!intakeOpen}>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <SurveyProgress locale={locale} step={surveyStep} labels={t.steps} intro={t.stepIntros[surveyStep]} />

          <section data-survey-step="0" hidden={surveyStep !== 0}>
            <div className="form-grid">
              <SelectField name="incomeStability" label={t.income} options={incomeOptions[locale]} required={intakeOpen} />
              <SelectField name="incomePattern" label={t.incomePattern} required={intakeOpen} options={locale === 'vi' ? ['Hàng ngày', 'Hàng tuần', 'Hàng tháng', 'Theo mùa vụ / vụ thu hoạch', 'Không có nhịp cố định'] : ['Daily', 'Weekly', 'Monthly', 'Seasonally / at harvest', 'No regular pattern']} />
              <SelectField name="savingFrequency" label={t.saving} required={intakeOpen} options={locale === 'vi' ? ['Hiện chưa thể dành tiền', 'Chỉ khi có khoản dư', 'Theo tuần hoặc tháng', 'Mỗi kỳ bán hàng / thu hoạch', 'Có khoản tự động hoặc nguyên tắc cố định'] : ['Currently unable to set money aside', 'Only when money remains', 'Weekly or monthly', 'At each sales / harvest cycle', 'Using an automatic or fixed rule']} />
              <SelectField name="savingLocation" label={t.savingLocation} required={intakeOpen} options={locale === 'vi' ? ['Chưa có khoản dự phòng', 'Tiền mặt tại nhà', 'Tài khoản ngân hàng', 'Ví điện tử', 'Họ/hụi hoặc nhóm cộng đồng', 'Tài sản dễ bán'] : ['No buffer yet', 'Cash at home', 'Bank account', 'E-wallet', 'Savings group', 'Assets that can be sold']} />
            </div>
          </section>

          <section data-survey-step="1" hidden={surveyStep !== 1}>
            <div className="form-grid">
              <SelectField name="shockCapacity" label={t.shock} required={intakeOpen} options={locale === 'vi' ? ['Dưới 1 tuần', '1–4 tuần', '1–3 tháng', 'Trên 3 tháng'] : ['Less than 1 week', '1–4 weeks', '1–3 months', 'More than 3 months']} />
              <SelectField name="emergencyResponse" label={t.emergency} required={intakeOpen} options={locale === 'vi' ? ['Dùng tiền dự phòng', 'Giảm / hoãn chi tiêu khác', 'Bán tài sản', 'Vay người thân', 'Vay tổ chức chính thức', 'Vay chi phí cao', 'Chưa từng có khoản chi như vậy'] : ['Used an emergency buffer', 'Cut / delayed other spending', 'Sold an asset', 'Borrowed from family', 'Used formal finance', 'Used high-cost credit', 'No such expense yet']} />
              <SelectField name="financialTool" label={t.financialTool} required={intakeOpen} options={locale === 'vi' ? ['Chủ yếu tiền mặt', 'Tài khoản ngân hàng', 'Ví điện tử', 'Tín dụng chính thức', 'Họ/hụi', 'Bảo hiểm', 'Không dùng công cụ nào'] : ['Mostly cash', 'Bank account', 'E-wallet', 'Formal credit', 'Savings group', 'Insurance', 'None']} />
              <SelectField name="topBarrier" label={t.barrier} required={intakeOpen} options={locale === 'vi' ? ['Thu nhập không đều', 'Chi phí thiết yếu quá cao', 'Đang phải trả nợ', 'Rủi ro mùa vụ / thị trường', 'Thiếu thông tin đáng tin cậy', 'Không có sản phẩm tài chính phù hợp', 'Ưu tiên khác trong gia đình'] : ['Irregular income', 'Essential costs are too high', 'Existing debt repayments', 'Production / market risk', 'Lack of trusted information', 'No suitable financial product', 'Other household priorities']} />
            </div>
          </section>

          <section data-survey-step="2" hidden={surveyStep !== 2}>
            <div className="form-grid">
              <TextField name="currentAssets" label={t.currentAssets} hint={t.currentAssetsHint} maxLength={240} required={intakeOpen} />
              <TextField name="priorityAsset" label={t.asset} hint={t.assetHint} maxLength={160} required={intakeOpen} />
              <TextField name="intendedAction" label={t.intendedAction} hint={t.intendedActionHint} maxLength={240} required={intakeOpen} />
            </div>
          </section>

          <section data-survey-step="3" hidden={surveyStep !== 3}>
            <p className="form-note" style={{ marginBottom: 20 }}><strong>{t.segments[segmentIndex]}.</strong> {t.segmentDescriptions[segmentIndex]}</p>
            <div className="form-grid">
              {segment === 'smallholder' ? <>
                <TextField name="mainProduction" label={locale === 'vi' ? 'Cây trồng, vật nuôi hoặc sản phẩm chính của hộ là gì?' : 'What is the household’s main crop, livestock, or product?'} maxLength={160} required={intakeOpen} />
                <SelectField name="inputFinance" label={locale === 'vi' ? 'Hộ thường trang trải giống, thức ăn, phân bón hoặc đầu vào bằng nguồn nào?' : 'How does the household usually pay for seed, feed, fertiliser, or other inputs?'} required={intakeOpen} options={locale === 'vi' ? ['Tiền từ vụ trước / tiền tích lũy', 'Ứng trước của thương lái / người mua', 'Vay ngân hàng / quỹ tín dụng', 'Vay người thân', 'Vay phi chính thức', 'Kết hợp nhiều nguồn'] : ['Proceeds from the last cycle / savings', 'Buyer or trader advance', 'Bank / credit-fund loan', 'Family loan', 'Informal loan', 'A mix of sources']} />
              </> : <>
                <SelectField name="businessTenure" label={locale === 'vi' ? 'Hoạt động này đã tạo thu nhập cho hộ trong bao lâu?' : 'How long has this activity generated income for the household?'} required={intakeOpen} options={locale === 'vi' ? ['Dưới 1 năm', '1–3 năm', '4–7 năm', 'Trên 7 năm'] : ['Under 1 year', '1–3 years', '4–7 years', 'Over 7 years']} />
                <SelectField name="workingCapital" label={segment === 'household_business' ? (locale === 'vi' ? 'Nguồn vốn lưu động chính của hộ kinh doanh là gì?' : 'What is the household business’s main source of working capital?') : (locale === 'vi' ? 'Bạn thường lấy vốn cho lần nhập hàng / nhận việc tiếp theo từ đâu?' : 'How do you usually fund the next stock purchase or job?')} required={intakeOpen} options={locale === 'vi' ? ['Doanh thu quay vòng', 'Tiết kiệm của hộ', 'Nhà cung cấp cho trả chậm', 'Vay ngân hàng / tổ chức chính thức', 'Vay người thân', 'Vay phi chính thức'] : ['Recycled revenue', 'Household savings', 'Supplier credit', 'Bank / formal finance', 'Family loan', 'Informal loan']} />
              </>}
              <div className="form-field full">
                <label htmlFor="segmentDetail">{t.branch}</label>
                <textarea
                  id="segmentDetail"
                  name="segmentDetail"
                  required={intakeOpen}
                  minLength={intakeOpen ? 20 : undefined}
                  maxLength={1200}
                  placeholder={branchPrompt(locale, segment)}
                />
                <p className="form-note">{branchHint(locale, segment)}</p>
              </div>
            </div>
          </section>

          <section data-survey-step="4" hidden={surveyStep !== 4}>
            <h3 style={{ marginBottom: 18 }}>{t.reviewTitle}</h3>
            <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 1fr) 2fr', gap: '10px 22px', marginBottom: 30 }}>
              {reviewFields.map(([label, value]) => (
                <div key={label} style={{ display: 'contents' }}>
                  <dt style={{ fontWeight: 700 }}>{label}</dt>
                  <dd style={{ margin: 0 }}>{value || t.notAnswered}</dd>
                </div>
              ))}
            </dl>
            <div className="form-grid">
              <div className="form-field"><label htmlFor="contactName">{t.name}</label><input id="contactName" name="contactName" maxLength={100} required={intakeOpen && surveyDraft.followupConsent === 'true'} /></div>
              <div className="form-field"><label htmlFor="contactChannel">{t.email}</label><input id="contactChannel" name="contactChannel" maxLength={180} required={intakeOpen && surveyDraft.followupConsent === 'true'} /></div>
            </div>
            <p className="form-note"><strong>{t.contact}.</strong> {t.contactHint}</p>
            <label className="checkbox-field"><input type="checkbox" name="followupConsent" />{t.followup}</label>
            <label className="checkbox-field"><input type="checkbox" name="reviewConsent" required={intakeOpen} />{t.reviewConsent}</label>
          </section>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 28 }}>
            <button
              type="button"
              className="flagship-btn"
              onClick={() => surveyStep === 0 ? setScreeningId(null) : setSurveyStep((current) => current - 1)}
            >
              {surveyStep === 0 ? t.changeProfile : t.back}
            </button>
            {surveyStep < 4 ? (
              <button type="button" className="flagship-btn primary" onClick={(event) => advanceSurvey(event.currentTarget.form)}>{t.next}</button>
            ) : (
              <button type="submit" className="flagship-btn primary" disabled={busy || !intakeOpen} aria-disabled={!intakeOpen}>
                {busy ? t.sending : intakeOpen ? t.submitSurvey : t.previewSubmit}
              </button>
            )}
          </div>
          {status}
        </form>
      )}

      {mode === 'survey' && surveyComplete && (
        <div className="research-form" role="status">
          <p className="flagship-eyebrow">{locale === 'vi' ? 'Đã ghi nhận' : 'Response recorded'}</p>
          <h3>{t.submittedTitle}</h3>
          <p>{t.submittedText}</p>
        </div>
      )}

      {mode === 'story' && (
        <form className="research-form" onSubmit={(event) => submit(event, '/api/flagship/story')}>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="form-grid">
            <div className="form-field"><label htmlFor="storyProvince">{t.province}</label><select id="storyProvince" name="province" required defaultValue=""><option value="" disabled>—</option>{provinces.map((province) => <option key={province}>{province}</option>)}</select></div>
            <div className="form-field"><label htmlFor="storySegment">{t.segment}</label><select id="storySegment" name="segment" required><option value="micro_entrepreneur">{t.segments[0]}</option><option value="household_business">{t.segments[1]}</option><option value="smallholder">{t.segments[2]}</option></select></div>
            <div className="form-field full"><label htmlFor="story">{t.story}</label><textarea id="story" name="story" required minLength={40} maxLength={3000} placeholder={t.storyPrompt} /></div>
            <div className="form-field"><label htmlFor="storyName">{t.name}</label><input id="storyName" name="contactName" maxLength={100} /></div>
            <div className="form-field"><label htmlFor="storyContact">{t.email}</label><input id="storyContact" name="contactChannel" maxLength={180} /></div>
          </div>
          <label className="checkbox-field"><input type="checkbox" name="quoteConsent" />{t.quote}</label>
          <label className="checkbox-field"><input type="checkbox" name="followupConsent" />{t.followup}</label>
          <label className="checkbox-field"><input required type="checkbox" name="consent" />{t.consent}</label>
          <button className="flagship-btn primary" disabled={busy || !intakeOpen}>{busy ? t.sending : intakeOpen ? t.submitStory : t.previewSubmit}</button>
          {status}
        </form>
      )}

      {mode === 'partner' && (
        <form className="research-form" onSubmit={(event) => submit(event, '/api/flagship/partner')}>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="form-grid">
            <div className="form-field"><label htmlFor="organization">{t.organization}</label><input id="organization" name="organization" required maxLength={160} /></div>
            <div className="form-field"><label htmlFor="role">{t.role}</label><input id="role" name="role" required maxLength={120} /></div>
            <div className="form-field"><label htmlFor="partnerName">{t.name}</label><input id="partnerName" name="name" required maxLength={100} /></div>
            <div className="form-field"><label htmlFor="partnerContact">{t.email}</label><input id="partnerContact" name="contactChannel" required maxLength={180} /></div>
            <div className="form-field full"><label htmlFor="support">{t.support}</label><textarea id="support" name="support" required minLength={20} maxLength={2000} /></div>
          </div>
          <p className="form-note"><Link href={`/flagship/outreach-kit${locale === 'en' ? '/en' : ''}`} target="_blank">{locale === 'vi' ? 'Mở bộ tài liệu tiếp cận có thể in' : 'Open the printable outreach kit'} ↗</Link></p>
          <label className="checkbox-field"><input required type="checkbox" name="consent" />{t.partnerConsent}</label>
          <button className="flagship-btn primary" disabled={busy || !intakeOpen}>{busy ? t.sending : intakeOpen ? t.submitPartner : t.previewSubmit}</button>
          {status}
        </form>
      )}
    </div>
  )
}

function SurveyProgress({ locale, step, labels: stepLabels, intro }: { locale: FlagshipLocale; step: number; labels: readonly string[]; intro: string }) {
  const t = labels[locale]
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
        <strong>{t.step} {step + 1} {t.of} 5 · {stepLabels[step]}</strong>
        <span aria-hidden="true">{Math.round(((step + 1) / 5) * 100)}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(24, 67, 52, .14)', overflow: 'hidden', marginBottom: 14 }} aria-hidden="true">
        <div style={{ height: '100%', width: `${((step + 1) / 5) * 100}%`, background: 'currentColor', transition: 'width .2s ease' }} />
      </div>
      <p className="form-note" style={{ maxWidth: 760 }}>{intro}</p>
    </div>
  )
}

function SelectField({ name, label, options, required = true }: { name: string; label: string; options: readonly string[]; required?: boolean }) {
  return <div className="form-field"><label htmlFor={name}>{label}</label><select id={name} name={name} required={required} defaultValue=""><option value="" disabled>—</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>
}

function TextField({ name, label, hint, maxLength, required }: { name: string; label: string; hint?: string; maxLength: number; required: boolean }) {
  return (
    <div className="form-field full">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} required={required} maxLength={maxLength} />
      {hint && <p className="form-note">{hint}</p>}
    </div>
  )
}

function branchPrompt(locale: FlagshipLocale, segment: string) {
  if (segment === 'smallholder') return locale === 'vi'
    ? 'Ví dụ: một vụ mùa xấu, giá bán thay đổi hoặc thiếu kho trữ ảnh hưởng thế nào đến quyết định đầu tư?'
    : 'For example: how does a poor harvest, price change, or lack of storage affect an investment decision?'
  if (segment === 'household_business') return locale === 'vi'
    ? 'Ví dụ: việc dùng chung tiền hộ và tiền kinh doanh khiến quyết định mua thiết bị hoặc giữ vốn khó thế nào?'
    : 'For example: how does mixing household and business money affect equipment or working-capital decisions?'
  return locale === 'vi'
    ? 'Ví dụ: điều gì khiến bạn chưa thể mua thêm hàng, công cụ hoặc phương tiện dù thấy cơ hội tăng thu nhập?'
    : 'For example: what stops you buying stock, a tool, or transport even when you see an income opportunity?'
}

function branchHint(locale: FlagshipLocale, segment: string) {
  if (segment === 'smallholder') return locale === 'vi'
    ? 'Nếu có thể, hãy nêu rủi ro chính, tài sản cần có và nguồn hỗ trợ phù hợp nhất.'
    : 'If possible, name the main risk, the asset needed, and the most suitable form of support.'
  if (segment === 'household_business') return locale === 'vi'
    ? 'Nếu có thể, hãy nói về vốn lưu động, tách tiền hộ/kinh doanh, lao động gia đình hoặc rủi ro gián đoạn.'
    : 'If possible, address working capital, separating household/business cash, family labour, or continuity risk.'
  return locale === 'vi'
    ? 'Nếu có thể, hãy nói về dòng tiền, khách hàng, phương thức thanh toán và khoản đầu tư nhỏ nhất có ích.'
    : 'If possible, address cash flow, customers, payment methods, and the smallest useful investment.'
}
