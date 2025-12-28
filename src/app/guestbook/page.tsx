'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { GuestbookMessage } from '@/types'
import GuestbookSkeleton from '@/components/GuestbookSkeleton'
import Footer from '@/components/Footer'

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/guestbook')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !name.trim()) {
      setError('Please fill in both fields')
      return
    }

    if (name.length > 50) {
      setError('Name must be 50 characters or less')
      return
    }

    if (newMessage.length > 280) {
      setError('Message must be 280 characters or less')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: newMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages([data, ...messages])
        setNewMessage('')
        setName('')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to submit message')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `about ${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''} ago`
    if (diffInSeconds < 604800) return `about ${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-bg-dark text-zinc-100 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✍️</span>
            <h1 className="text-2xl font-bold">ThuH&apos;s Guestbook</h1>
          </div>
          <Link
            href="/"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-1.5 rounded text-sm transition-colors"
          >
            home
          </Link>
        </div>

        <p className="text-zinc-500 mb-12">say hi or drop a note 👋</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Form Column */}
          <div className="md:col-span-1">
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-white">sign the guestbook</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">
                    name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setError('')
                    }}
                    placeholder="your name"
                    maxLength={50}
                    className="w-full bg-black/50 border border-zinc-800 rounded p-2 text-sm focus:border-zinc-600 outline-none transition-colors"
                    disabled={submitting}
                  />
                  <div className="text-xs text-zinc-600 mt-1 text-right">{name.length}/50</div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">
                    message
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value)
                      setError('')
                    }}
                    placeholder="your message"
                    rows={4}
                    maxLength={280}
                    className="w-full bg-black/50 border border-zinc-800 rounded p-2 text-sm focus:border-zinc-600 outline-none transition-colors resize-none"
                    disabled={submitting}
                  />
                  <div className="text-xs text-zinc-600 mt-1 text-right">
                    {newMessage.length}/280
                  </div>
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent-purple hover:bg-[#6d28d9] text-white py-2 rounded font-medium transition-colors shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Signing...' : 'sign guestbook'}
                </button>
              </form>
            </div>
          </div>

          {/* Messages Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-lg mb-4 text-white">messages</h3>
            {loading ? (
              <GuestbookSkeleton />
            ) : messages.length === 0 ? (
              <p className="text-zinc-500">No messages yet. Be the first to sign!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-zinc-200">{msg.name}</span>
                    <span className="text-xs text-zinc-600">{formatTimeAgo(msg.created_at)}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <Footer subHeader="Public Guestbook & Say Hi" />
      </div>
    </div>
  )
}

