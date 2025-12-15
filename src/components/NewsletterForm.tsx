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
    <div className="flex flex-col items-start md:items-end justify-end space-y-4">
      <span className="text-sm font-medium text-zinc-400">newsletter</span>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex border-b border-zinc-500 focus-within:border-white transition-colors pb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-transparent border-none outline-none text-white placeholder-zinc-500 w-full"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="text-zinc-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-wider flex items-center gap-1 disabled:opacity-50"
            >
              {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Join'}
              {status === 'idle' && <ArrowRight size={14} />}
            </button>
          </div>
        </form>
        {status === 'success' && (
          <p className="text-xs text-green-400 mt-2">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  )
}

