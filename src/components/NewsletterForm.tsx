'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="site-footer__newsletter flex flex-col items-start justify-end space-y-4 md:items-end">
      <span className="site-footer__newsletter-label text-sm font-medium">newsletter</span>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="site-footer__newsletter-field flex border-b pb-2 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="site-footer__newsletter-input w-full border-none bg-transparent outline-none"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="site-footer__newsletter-button flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Join'}
              {status === 'idle' && <ArrowRight size={14} />}
            </button>
          </div>
        </form>
        {status === 'success' && (
          <p className="site-footer__success mt-2 text-xs">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="site-footer__error mt-2 text-xs">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  )
}
