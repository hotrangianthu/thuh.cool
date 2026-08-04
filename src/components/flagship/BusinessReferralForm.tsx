'use client'

import { FormEvent, useEffect, useState } from 'react'
import { provinces, type FlagshipLocale } from '@/data/flagship'

type ContactPermission = 'not_shared' | 'public_business_contact' | 'shared_with_permission'
type FormMessage = { kind: 'success' | 'error'; text: string } | null

const labels = {
  vi: {
    preview: 'Biểu mẫu giới thiệu đang ở chế độ xem trước. Bạn có thể xem toàn bộ câu hỏi; nút gửi sẽ mở khi cổng tiếp nhận chính thức hoạt động.',
    intro: 'Giới thiệu một doanh nghiệp hoặc nhóm cộng đồng',
    introNote: 'Hãy cho dự án biết ai nên được lắng nghe. Việc giới thiệu không tự động biến đơn vị được giới thiệu thành đối tác hoặc người tham gia nghiên cứu.',
    referrerSection: '1. Thông tin của bạn',
    referrerName: 'Tên của bạn',
    referrerContact: 'Email hoặc số điện thoại của bạn',
    relationship: 'Mối quan hệ của bạn với đơn vị được giới thiệu',
    relationshipOptions: [
      ['owner_member', 'Tôi là chủ sở hữu / thành viên'],
      ['employee', 'Tôi làm việc tại đây'],
      ['customer_supplier', 'Khách hàng / nhà cung cấp / đối tác kinh doanh'],
      ['community_member', 'Cùng cộng đồng địa phương'],
      ['professional', 'Quan hệ nghề nghiệp / nghiên cứu'],
      ['know_personally', 'Tôi biết trực tiếp chủ thể này'],
      ['do_not_know_directly', 'Tôi không biết trực tiếp'],
      ['other', 'Quan hệ khác'],
    ],
    entitySection: '2. Đơn vị bạn muốn giới thiệu',
    entityName: 'Tên doanh nghiệp / hợp tác xã / nhóm',
    entityType: 'Loại hình',
    entityTypes: [
      ['business', 'Doanh nghiệp hoặc hộ kinh doanh'],
      ['cooperative', 'Hợp tác xã'],
      ['household_group', 'Nhóm hộ gia đình / nhóm sản xuất'],
      ['community_organization', 'Tổ chức hoặc nhóm cộng đồng'],
      ['other', 'Khác'],
    ],
    province: 'Tỉnh/thành hoạt động chính',
    reason: 'Vì sao dự án nên kết nối hoặc lắng nghe đơn vị này?',
    reasonHint: 'Ví dụ: nhóm hộ đang thử một cách tiết kiệm, doanh nghiệp tạo sinh kế địa phương, hoặc hợp tác xã gặp rào cản khi đầu tư tài sản sản xuất.',
    contactSection: '3. Cách kết nối phù hợp',
    permission: 'Tình trạng cho phép chia sẻ thông tin liên hệ của đơn vị',
    permissionOptions: [
      ['not_shared', 'Tôi không chia sẻ thông tin liên hệ của họ'],
      ['public_business_contact', 'Tôi chỉ chia sẻ kênh liên hệ công khai của đơn vị'],
      ['shared_with_permission', 'Người liên hệ đã cho phép tôi chia sẻ với dự án này'],
    ],
    permissionNote: 'Dự án không giả định đơn vị được giới thiệu đã đồng ý tham gia. Họ sẽ được cung cấp thông tin và tự quyết định nếu dự án liên hệ.',
    referredName: 'Tên người liên hệ tại đơn vị (không bắt buộc)',
    referredContact: 'Kênh liên hệ công khai hoặc đã được phép chia sẻ',
    contactSource: 'Thông tin liên hệ này được công khai ở đâu?',
    contactSourceHint: 'Nhập website, trang mạng xã hội, danh bạ hoặc nguồn công khai khác.',
    permissionConfirm: 'Tôi xác nhận người liên hệ đã nói rõ rằng tôi có thể chia sẻ thông tin này với dự án From Income to Assets.',
    connection: 'Bạn muốn kết nối theo cách nào?',
    connectionOptions: [
      ['contact_referrer', 'Dự án liên hệ với tôi trước'],
      ['referrer_introduces', 'Tôi sẽ thực hiện lời giới thiệu giữa hai bên'],
      ['project_contacts_entity', 'Dự án có thể liên hệ trực tiếp qua kênh được phép / công khai'],
    ],
    consent: 'Tôi đồng ý để dự án lưu thông tin trong biểu mẫu này và liên hệ với tôi về lời giới thiệu. Tôi xác nhận thông tin cung cấp là đúng theo hiểu biết của mình.',
    submit: 'Gửi lời giới thiệu',
    sending: 'Đang gửi…',
    success: 'Đã ghi nhận lời giới thiệu. Dự án sẽ xem xét bối cảnh và cách kết nối trước khi liên hệ.',
    error: 'Chưa thể gửi lời giới thiệu. Vui lòng kiểm tra các trường bắt buộc hoặc thử lại sau.',
  },
  en: {
    preview: 'The referral form is in preview. You can review every question; submission will open when the research intake is live.',
    intro: 'Refer a business or community group',
    introNote: 'Tell the project who should be heard. A referral does not automatically make the referred entity a partner or research participant.',
    referrerSection: '1. About you',
    referrerName: 'Your name',
    referrerContact: 'Your email or phone number',
    relationship: 'Your relationship to the referred entity',
    relationshipOptions: [
      ['owner_member', 'I am an owner / member'],
      ['employee', 'I work here'],
      ['customer_supplier', 'Customer / supplier / business partner'],
      ['community_member', 'Member of the same local community'],
      ['professional', 'Professional / research connection'],
      ['know_personally', 'I know them directly'],
      ['do_not_know_directly', 'I do not know them directly'],
      ['other', 'Another relationship'],
    ],
    entitySection: '2. Who you are referring',
    entityName: 'Business / cooperative / group name',
    entityType: 'Entity type',
    entityTypes: [
      ['business', 'Business or household enterprise'],
      ['cooperative', 'Cooperative'],
      ['household_group', 'Household / producer group'],
      ['community_organization', 'Community organization or group'],
      ['other', 'Other'],
    ],
    province: 'Primary province/city of operation',
    reason: 'Why should the project connect with or listen to this entity?',
    reasonHint: 'For example: households testing a savings approach, a business supporting local livelihoods, or a cooperative facing barriers to productive-asset investment.',
    contactSection: '3. A respectful way to connect',
    permission: 'Permission status for the entity’s contact details',
    permissionOptions: [
      ['not_shared', 'I am not sharing their contact details'],
      ['public_business_contact', 'I am sharing only a public business contact'],
      ['shared_with_permission', 'The contact gave me permission to share with this project'],
    ],
    permissionNote: 'The project does not assume the referred entity has consented to participate. If contacted, they will receive context and decide for themselves.',
    referredName: 'Contact person at the entity (optional)',
    referredContact: 'Public or permissioned contact channel',
    contactSource: 'Where is this contact information published?',
    contactSourceHint: 'Enter a website, social page, directory, or other public source.',
    permissionConfirm: 'I confirm that this person explicitly told me I may share these details with the From Income to Assets project.',
    connection: 'How should the connection happen?',
    connectionOptions: [
      ['contact_referrer', 'Contact me first'],
      ['referrer_introduces', 'I will introduce both parties'],
      ['project_contacts_entity', 'The project may use the public / permissioned channel directly'],
    ],
    consent: 'I consent to the project storing this submission and contacting me about the referral. The information is accurate to the best of my knowledge.',
    submit: 'Submit referral',
    sending: 'Sending…',
    success: 'Referral recorded. The project will review the context and connection preference before making contact.',
    error: 'The referral could not be submitted. Check the required fields or try again later.',
  },
} as const

export default function BusinessReferralForm({ locale, intakeOpen }: { locale: FlagshipLocale; intakeOpen: boolean }) {
  const t = labels[locale]
  const [permission, setPermission] = useState<ContactPermission>('not_shared')
  const [outreachSource, setOutreachSource] = useState('direct')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<FormMessage>(null)

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get('ref')
    if (source && /^[a-z0-9_-]{1,80}$/i.test(source)) setOutreachSource(source)
  }, [])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!intakeOpen) return

    const formElement = event.currentTarget
    setBusy(true)
    setMessage(null)

    try {
      const payload = {
        ...Object.fromEntries(new FormData(formElement).entries()),
        locale,
        outreachSource,
      }
      const response = await fetch('/api/flagship/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Referral request failed')

      formElement.reset()
      setPermission('not_shared')
      setMessage({ kind: 'success', text: t.success })
    } catch {
      setMessage({ kind: 'error', text: t.error })
    } finally {
      setBusy(false)
    }
  }

  const hasSharedContact = permission !== 'not_shared'

  return (
    <div>
      {!intakeOpen && <div className="form-status" style={{ margin: '0 0 24px' }}>{t.preview}</div>}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 25 }}>{t.intro}</h3>
        <p className="form-note" style={{ margin: 0 }}>{t.introNote}</p>
      </div>

      <form className="research-form" onSubmit={submit}>
        <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

        <div className="form-grid">
          <div className="form-field full"><h3 style={{ margin: '6px 0 0', fontSize: 18 }}>{t.referrerSection}</h3></div>
          <div className="form-field"><label htmlFor="referrerName">{t.referrerName}</label><input id="referrerName" name="referrerName" required maxLength={100} autoComplete="name" /></div>
          <div className="form-field"><label htmlFor="referrerContact">{t.referrerContact}</label><input id="referrerContact" name="referrerContact" required maxLength={180} autoComplete="email" /></div>
          <SelectField name="relationship" label={t.relationship} options={t.relationshipOptions} />

          <div className="form-field full"><h3 style={{ margin: '18px 0 0', fontSize: 18 }}>{t.entitySection}</h3></div>
          <div className="form-field"><label htmlFor="entityName">{t.entityName}</label><input id="entityName" name="entityName" required maxLength={160} /></div>
          <SelectField name="entityType" label={t.entityType} options={t.entityTypes} />
          <div className="form-field"><label htmlFor="referralProvince">{t.province}</label><select id="referralProvince" name="province" required defaultValue=""><option value="" disabled>—</option>{provinces.map((province) => <option key={province}>{province}</option>)}</select></div>
          <div className="form-field full"><label htmlFor="referralReason">{t.reason}</label><textarea id="referralReason" name="reason" required minLength={40} maxLength={2000} placeholder={t.reasonHint} /></div>

          <div className="form-field full"><h3 style={{ margin: '18px 0 0', fontSize: 18 }}>{t.contactSection}</h3></div>
          <div className="form-field full"><label htmlFor="contactPermission">{t.permission}</label><select id="contactPermission" name="contactPermission" required value={permission} onChange={(event) => setPermission(event.target.value as ContactPermission)}>{t.permissionOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
          <div className="form-field full"><p className="form-note" style={{ margin: '-8px 0 0' }}>{t.permissionNote}</p></div>

          {hasSharedContact && <>
            <div className="form-field"><label htmlFor="referredContactName">{t.referredName}</label><input id="referredContactName" name="referredContactName" maxLength={100} /></div>
            <div className="form-field"><label htmlFor="referredContactChannel">{t.referredContact}</label><input id="referredContactChannel" name="referredContactChannel" required maxLength={180} /></div>
          </>}

          {permission === 'public_business_contact' && <div className="form-field full"><label htmlFor="contactSource">{t.contactSource}</label><input id="contactSource" name="contactSource" required minLength={5} maxLength={300} placeholder={t.contactSourceHint} /></div>}
          {permission === 'shared_with_permission' && <div className="form-field full"><label className="checkbox-field" style={{ margin: 0 }}><input required type="checkbox" name="permissionConfirmed" />{t.permissionConfirm}</label></div>}

          <SelectField
            name="connectionPreference"
            label={t.connection}
            options={t.connectionOptions}
            disabledValues={permission === 'not_shared' ? ['project_contacts_entity'] : []}
          />
        </div>

        <label className="checkbox-field"><input required type="checkbox" name="referrerConsent" />{t.consent}</label>
        <button className="flagship-btn primary" disabled={busy || !intakeOpen}>{busy ? t.sending : t.submit}</button>
        {message && <div className={`form-status ${message.kind === 'error' ? 'error' : ''}`} role="status" aria-live="polite">{message.text}</div>}
      </form>
    </div>
  )
}

function SelectField({
  name,
  label,
  options,
  disabledValues = [],
}: {
  name: string
  label: string
  options: readonly (readonly [string, string])[]
  disabledValues?: readonly string[]
}) {
  return <div className="form-field"><label htmlFor={name}>{label}</label><select id={name} name={name} required defaultValue=""><option value="" disabled>—</option>{options.map(([value, optionLabel]) => <option key={value} value={value} disabled={disabledValues.includes(value)}>{optionLabel}</option>)}</select></div>
}
