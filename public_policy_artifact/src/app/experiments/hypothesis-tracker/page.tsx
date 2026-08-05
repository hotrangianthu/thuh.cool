'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Hypothesis {
  id: string
  statement: string
  dateMade: string
  checkDate: string
  category: 'fintech' | 'policy' | 'market' | 'product'
  status: 'pending' | 'correct' | 'incorrect' | 'partially'
  confidence: number
  reasoning: string
  outcome?: string
  lessonsLearned?: string
}

const hypotheses: Hypothesis[] = [
  {
    id: 'H001',
    statement: 'Vietnam will not meet its 2025 target of 80% adult bank account ownership',
    dateMade: '2024-06-15',
    checkDate: '2026-01-15',
    category: 'policy',
    status: 'correct',
    confidence: 75,
    reasoning: 'Current trajectory shows ~65% ownership. Rural growth is stalling. No major policy intervention announced.',
    outcome: 'Final 2025 figure: 68%. Target missed by 12 percentage points.',
    lessonsLearned: 'Account ownership targets without usage metrics create perverse incentives for dormant account creation.'
  },
  {
    id: 'H002',
    statement: 'Agent banking regulations will be loosened in Vietnam by end of 2026',
    dateMade: '2025-01-10',
    checkDate: '2027-01-10',
    category: 'policy',
    status: 'pending',
    confidence: 60,
    reasoning: 'SBV is under pressure to accelerate financial inclusion. Agent banking is proven in other ASEAN markets. Key stakeholders are lobbying.',
  },
  {
    id: 'H003',
    statement: 'Grab\'s fintech revenue in Vietnam will exceed ride-hailing by 2027',
    dateMade: '2025-03-01',
    checkDate: '2028-03-01',
    category: 'market',
    status: 'pending',
    confidence: 55,
    reasoning: 'Fintech margins are higher. Ride-hailing is commoditized. GrabPay and lending are growing faster than mobility.',
  },
  {
    id: 'H004',
    statement: 'The "rural fintech gap" will widen, not narrow, between 2025-2027',
    dateMade: '2025-06-01',
    checkDate: '2028-01-01',
    category: 'fintech',
    status: 'pending',
    confidence: 70,
    reasoning: 'Urban fintech adoption is accelerating. Rural infrastructure investment is not keeping pace. No integrated policy framework exists.',
  },
  {
    id: 'H005',
    statement: 'Voice-first interfaces will outperform app-based interfaces for rural financial services in Vietnam pilot programs',
    dateMade: '2025-09-15',
    checkDate: '2027-09-15',
    category: 'product',
    status: 'pending',
    confidence: 65,
    reasoning: 'Literacy barriers favor voice. Vietnamese tonal system is well-supported by modern ASR. Early pilots in agriculture show promise.',
  },
  {
    id: 'H006',
    statement: 'At least one major Vietnamese bank will launch an agent banking network by end of 2026',
    dateMade: '2025-02-20',
    checkDate: '2027-01-01',
    category: 'market',
    status: 'pending',
    confidence: 50,
    reasoning: 'Competition from fintech is increasing. Rural market is underserved. Regulatory signals suggest openness.',
  },
  {
    id: 'H007',
    statement: 'Vietnam\'s digital economy contribution to GDP will fall short of the 30% target by 2030',
    dateMade: '2024-12-01',
    checkDate: '2031-06-01',
    category: 'policy',
    status: 'pending',
    confidence: 65,
    reasoning: 'Current trajectory is ~20%. Rural-urban divide limits total addressable market. Infrastructure investment is concentrated in cities.',
  },
  {
    id: 'H008',
    statement: 'QR payment adoption in rural markets will plateau below 25% penetration without agent support',
    dateMade: '2025-04-10',
    checkDate: '2027-04-10',
    category: 'fintech',
    status: 'pending',
    confidence: 75,
    reasoning: 'QR requires smartphone proficiency and merchant acceptance. Both are limited in rural areas. Pure digital push is insufficient.',
  },
  {
    id: 'H009',
    statement: 'The Ministry of Agriculture will launch a digital extension service platform by 2027',
    dateMade: '2025-08-01',
    checkDate: '2028-01-01',
    category: 'policy',
    status: 'pending',
    confidence: 45,
    reasoning: 'Digital agriculture is a stated priority. Platform infrastructure exists. But ministry coordination is historically weak.',
  },
  {
    id: 'H010',
    statement: 'E-commerce platforms will capture >50% of agricultural input sales in rural Vietnam by 2030',
    dateMade: '2025-05-15',
    checkDate: '2031-01-01',
    category: 'market',
    status: 'pending',
    confidence: 40,
    reasoning: 'Logistics is improving. Price transparency favors e-commerce. But trust relationships with local dealers remain strong.',
  },
  {
    id: 'H011',
    statement: 'Provincial digital readiness scores will show >30% variance between top and bottom provinces in 2026',
    dateMade: '2026-01-05',
    checkDate: '2027-01-05',
    category: 'policy',
    status: 'pending',
    confidence: 85,
    reasoning: 'Current variance is already ~25%. No equalization policy exists. Rich provinces are pulling further ahead.',
  },
  {
    id: 'H012',
    statement: 'My rural fintech calculator predictions will be within 15% of actual adoption rates in pilot provinces',
    dateMade: '2026-03-01',
    checkDate: '2027-06-01',
    category: 'product',
    status: 'pending',
    confidence: 50,
    reasoning: 'Model is based on reasonable assumptions but limited data. This tests whether my mental model is actually useful.',
  }
]

const categoryColors = {
  fintech: { bg: '#EBF5FF', text: '#1B3A5C' },
  policy: { bg: '#FFF5F5', text: '#8B1A1A' },
  market: { bg: '#F0FFF4', text: '#276749' },
  product: { bg: '#FFFAF0', text: '#C05621' }
}

const statusColors = {
  pending: { bg: '#F3EFE8', text: '#718096' },
  correct: { bg: '#F0FFF4', text: '#276749' },
  incorrect: { bg: '#FFF5F5', text: '#8B1A1A' },
  partially: { bg: '#FFFAF0', text: '#C05621' }
}

export default function HypothesisTrackerPage() {
  const [filter, setFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredHypotheses = filter === 'all'
    ? hypotheses
    : hypotheses.filter(h => h.status === filter || h.category === filter)

  const stats = {
    total: hypotheses.length,
    pending: hypotheses.filter(h => h.status === 'pending').length,
    correct: hypotheses.filter(h => h.status === 'correct').length,
    incorrect: hypotheses.filter(h => h.status === 'incorrect').length,
    avgConfidence: Math.round(hypotheses.reduce((sum, h) => sum + h.confidence, 0) / hypotheses.length)
  }

  const hitRate = stats.correct + stats.incorrect > 0
    ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
    : null

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/public-policy/experiments" style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>
          Experiments
        </Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--color-text-muted)' }}>/</span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Hypothesis Tracker</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-4xl)',
          fontWeight: '600',
          color: 'var(--color-accent)',
          marginBottom: '1rem'
        }}>
          Hypothesis Tracker
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: '65ch'
        }}>
          Predictions I&apos;ve made about rural fintech, policy outcomes, and Vietnam&apos;s digital economy.
          Each hypothesis is timestamped, tracked, and evaluated against reality.
        </p>
      </header>

      {/* Stats Dashboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'var(--color-accent)' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Total</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: '#718096' }}>
            {stats.pending}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Pending</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: '#276749' }}>
            {stats.correct}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Correct</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: '#8B1A1A' }}>
            {stats.incorrect}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Wrong</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'var(--color-accent)' }}>
            {hitRate !== null ? `${hitRate}%` : '—'}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Hit Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['all', 'pending', 'correct', 'incorrect', 'fintech', 'policy', 'market', 'product'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '999px',
              border: filter === f ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
              backgroundColor: filter === f ? 'var(--color-accent)' : 'transparent',
              color: filter === f ? 'white' : 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: '500',
              textTransform: 'capitalize',
              cursor: 'pointer'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Hypotheses List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredHypotheses.map(h => {
          const catColor = categoryColors[h.category]
          const statColor = statusColors[h.status]
          const isExpanded = expandedId === h.id

          return (
            <article
              key={h.id}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                cursor: 'pointer'
              }}
              onClick={() => setExpandedId(isExpanded ? null : h.id)}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {h.id}
                  </span>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '999px',
                    backgroundColor: catColor.bg,
                    color: catColor.text,
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {h.category}
                  </span>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '999px',
                    backgroundColor: statColor.bg,
                    color: statColor.text,
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {h.status}
                  </span>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {h.confidence}% confidence
                </span>
              </div>

              {/* Statement */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-base)',
                fontWeight: '500',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--leading-snug)',
                marginBottom: '0.5rem'
              }}>
                {h.statement}
              </p>

              {/* Dates */}
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Made: {new Date(h.dateMade).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} |
                Check: {new Date(h.checkDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-accent)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                      Reasoning
                    </h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                      {h.reasoning}
                    </p>
                  </div>

                  {h.outcome && (
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: '#276749', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                        Outcome
                      </h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                        {h.outcome}
                      </p>
                    </div>
                  )}

                  {h.lessonsLearned && (
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: '#FFFAF0',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: '3px solid #C05621'
                    }}>
                      <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: '#C05621', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                        Lesson Learned
                      </h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
                        {h.lessonsLearned}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </main>
  )
}
