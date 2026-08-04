'use client'

import { ArrowRight } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { SA_PARTNERS_CONTACT_EMAIL } from '@/data/sa-partners'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function InquiryForm({ reportSlug, reportTitle }: { reportSlug: string; reportTitle: string }) {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setError('')
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/sa-partners/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, reportSlug }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.error || 'We could not submit your inquiry.')
      form.reset()
      setState('success')
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'We could not submit your inquiry.')
      setState('error')
    }
  }

  const mailto = `mailto:${SA_PARTNERS_CONTACT_EMAIL}?subject=${encodeURIComponent(`Sa. Partners access — ${reportTitle}`)}`

  return (
    <div className="sa-inquiry-card" id="inquiry">
      <span className="sa-eyebrow">Qualified access</span>
      <h2>Request the full report</h2>
      <p>Share a little context so we can respond with the most relevant access option. No payment is collected on this site.</p>
      <form className="sa-inquiry-form" onSubmit={submit}>
        <label className="sa-field">Name<input name="name" required maxLength={100} autoComplete="name" /></label>
        <label className="sa-field">Work email<input name="email" type="email" required maxLength={255} autoComplete="email" /></label>
        <label className="sa-field">Organization<input name="organization" required maxLength={160} autoComplete="organization" /></label>
        <label className="sa-field">Role<input name="role" required maxLength={120} autoComplete="organization-title" /></label>
        <label className="sa-field full">What decision are you working on?<textarea name="message" required minLength={20} maxLength={2000} rows={5} /></label>
        <label className="sa-honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        {state === 'success' && <div className="sa-form-message success" role="status">Thank you. Your inquiry is in the Sa. Partners inbox and we will reply directly.</div>}
        {state === 'error' && <div className="sa-form-message error" role="alert">{error} You can also email us directly below.</div>}
        <div className="sa-form-footer">
          <button className="sa-button sa-button-primary" type="submit" disabled={state === 'submitting'}>
            {state === 'submitting' ? 'Sending…' : 'Send inquiry'} <ArrowRight size={15} />
          </button>
          <p>Prefer email? <a href={mailto}>{SA_PARTNERS_CONTACT_EMAIL}</a></p>
        </div>
      </form>
    </div>
  )
}
