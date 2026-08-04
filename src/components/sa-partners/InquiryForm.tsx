'use client'

import { ArrowRight } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { SA_PARTNERS_CONTACT_EMAIL } from '@/data/sa-partners'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function InquiryForm({ reportSlug, reportTitle, isPublic = false }: { reportSlug: string; reportTitle: string; isPublic?: boolean }) {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setError('')
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    const accessRoute = typeof values.accessRoute === 'string' ? values.accessRoute : 'General research inquiry'
    const message = typeof values.message === 'string' ? values.message : ''

    try {
      const response = await fetch('/api/sa-partners/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, message: `Access route: ${accessRoute}\n\n${message}`, reportSlug }),
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
      <span className="sa-eyebrow">Research desk · Private inquiry</span>
      <h2>{isPublic ? 'Discuss access or related research' : 'Request the full report'}</h2>
      <p>{isPublic
        ? 'Share the decision or research question you are working on and we will respond with the relevant access route.'
        : 'Share a little context so we can respond about single-report access, institutional use, or a related research brief.'}</p>
      <form className="sa-inquiry-form" onSubmit={submit}>
        <label className="sa-field">Name<input name="name" required maxLength={100} autoComplete="name" /></label>
        <label className="sa-field">Work email<input name="email" type="email" required maxLength={255} autoComplete="email" /></label>
        <label className="sa-field">Organization<input name="organization" required maxLength={160} autoComplete="organization" /></label>
        <label className="sa-field">Role<input name="role" required maxLength={120} autoComplete="organization-title" /></label>
        <label className="sa-field full">What are you looking for?
          <select name="accessRoute" required defaultValue="Full-report access">
            <option>Full-report access</option>
            <option>Team or institutional license</option>
            <option>Research briefing or advisory</option>
            <option>Commissioned research</option>
          </select>
        </label>
        <label className="sa-field full">What decision are you working on?<textarea name="message" required minLength={20} maxLength={1800} rows={5} /></label>
        <label className="sa-honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        {state === 'success' && <div className="sa-form-message success" role="status">Thank you. Your inquiry is in the Sa. Partners inbox and we will reply directly.</div>}
        {state === 'error' && <div className="sa-form-message error" role="alert">{error} You can also email us directly below.</div>}
        <div className="sa-form-footer">
          <button className="sa-button sa-button-primary" type="submit" disabled={state === 'submitting'}>
            {state === 'submitting' ? 'Sending…' : 'Send private inquiry'} <ArrowRight size={15} />
          </button>
          <p>Prefer email? <a href={mailto}>{SA_PARTNERS_CONTACT_EMAIL}</a></p>
        </div>
        <p className="sa-form-privacy">Commercial and payment details are never requested in this public form.</p>
      </form>
    </div>
  )
}
