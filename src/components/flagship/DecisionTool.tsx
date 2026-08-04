'use client'

import { useMemo, useState } from 'react'
import type { FlagshipLocale } from '@/data/flagship'

export default function DecisionTool({ locale }: { locale: FlagshipLocale }) {
  const [income, setIncome] = useState(2)
  const [buffer, setBuffer] = useState(1)
  const [shock, setShock] = useState(1)
  const [asset, setAsset] = useState(1)

  const total = income + buffer + shock + asset
  const result = useMemo(() => {
    if (total <= 6) return locale === 'vi'
      ? ['Ưu tiên nền tảng dòng tiền', 'Bắt đầu bằng việc nhìn lại nhịp thu–chi và một khoản dự phòng nhỏ, đều đặn.']
      : ['Focus on the cash-flow foundation', 'Start by mapping the rhythm of income and spending, then build a small regular buffer.']
    if (total <= 11) return locale === 'vi'
      ? ['Củng cố khả năng chống chịu', 'Quỹ dự phòng đã hình thành; bước tiếp theo là giảm tác động của cú sốc và nợ đắt đỏ.']
      : ['Strengthen resilience', 'A buffer is forming; the next step is reducing exposure to shocks and expensive debt.']
    return locale === 'vi'
      ? ['Sẵn sàng cân nhắc tài sản sinh kế', 'Hãy đánh giá tài sản nào thực sự làm tăng năng suất mà không làm suy yếu quỹ dự phòng.']
      : ['Ready to consider productive assets', 'Assess which asset can raise productivity without eroding the household buffer.']
  }, [locale, total])

  const questions = locale === 'vi'
    ? [
        ['Thu nhập có dự đoán được theo tháng hoặc mùa vụ?', income, setIncome],
        ['Hộ gia đình có thể chi trả một khoản phát sinh nhỏ?', buffer, setBuffer],
        ['Một cú sốc có thể được xử lý mà không cần vay nóng?', shock, setShock],
        ['Tài sản hiện có giúp tăng năng suất hoặc thu nhập?', asset, setAsset],
      ] as const
    : [
        ['How predictable is income across months or seasons?', income, setIncome],
        ['Could the household absorb a small unexpected expense?', buffer, setBuffer],
        ['Could a shock be managed without high-cost emergency debt?', shock, setShock],
        ['Do current assets measurably support productivity or income?', asset, setAsset],
      ] as const

  return (
    <div className="assessment">
      {questions.map(([label, value, setter]) => (
        <div className="assessment-question" key={label}>
          <label>{label}</label>
          <input type="range" min="0" max="4" value={value} onChange={(e) => setter(Number(e.target.value))} />
          <div className="assessment-scale"><span>{locale === 'vi' ? 'Chưa' : 'Not yet'}</span><span>{locale === 'vi' ? 'Vững' : 'Strong'}</span></div>
        </div>
      ))}
      <div className="assessment-result" aria-live="polite">
        <strong>{result[0]}</strong>
        <span>{result[1]}</span>
      </div>
    </div>
  )
}

