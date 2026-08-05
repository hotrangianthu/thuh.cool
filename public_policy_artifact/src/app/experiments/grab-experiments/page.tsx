'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Experiment {
  id: string
  title: string
  period: string
  team: string
  hypothesis: string
  approach: string
  result: 'success' | 'failure' | 'mixed'
  metrics: { label: string; value: string; delta?: string }[]
  learnings: string[]
  whatIWouldDoDifferently: string
}

const experiments: Experiment[] = [
  {
    id: 'EXP001',
    title: 'Rural Mekong Delta Fintech Pilot',
    period: '2022 Q2-Q4',
    team: 'GrabPay Vietnam + Telco Partner',
    hypothesis: 'If we provide a simplified mobile money product with telco distribution, rural adoption will match urban benchmarks within 6 months.',
    approach: 'Partnered with a major telco to leverage their rural retail network. Built a simplified USSD+app hybrid product. Targeted 3 provinces in Mekong Delta with highest smartphone penetration.',
    result: 'failure',
    metrics: [
      { label: 'Target Adoption', value: '40%' },
      { label: 'Actual Adoption', value: '16%', delta: '-60%' },
      { label: 'Monthly Active Rate', value: '23%', delta: 'vs 67% urban' },
      { label: 'Transaction Frequency', value: '1.2/month', delta: 'vs 8.4 urban' }
    ],
    learnings: [
      'Product simplification is necessary but not sufficient',
      'Trust requires human intermediaries, not just technology',
      'Digital literacy gaps are deeper than smartphone access gaps',
      'Merchant acceptance is the binding constraint, not consumer demand'
    ],
    whatIWouldDoDifferently: 'Would have invested 50% of budget in agent network recruitment and training instead of product features. The product worked fine — the ecosystem didn\'t exist to support it.'
  },
  {
    id: 'EXP002',
    title: 'Agent-Assisted Onboarding Test',
    period: '2023 Q1-Q2',
    team: 'GrabPay Vietnam',
    hypothesis: 'If we train local agents to assist with onboarding, completion rates will increase by 30%+ versus self-serve.',
    approach: 'Recruited and trained 50 agents in 2 districts. Agents received commission per successful onboarding. Measured completion rate, time-to-first-transaction, and 30-day retention.',
    result: 'success',
    metrics: [
      { label: 'Onboarding Completion', value: '78%', delta: '+42% vs control' },
      { label: 'Time to First Txn', value: '2.1 days', delta: '-5.4 days' },
      { label: '30-Day Retention', value: '61%', delta: '+28%' },
      { label: 'Cost per Acquisition', value: '+35%', delta: 'vs digital-only' }
    ],
    learnings: [
      'Human assistance dramatically improves conversion for first-time digital users',
      'Trust transfer from known local person to unknown app is real and measurable',
      'Higher CPA is offset by higher LTV from better retention',
      'Agent quality variance is the main operational challenge'
    ],
    whatIWouldDoDifferently: 'Would have built agent quality scoring from day one. Top 20% of agents drove 60% of successful onboardings. Should have focused on identifying and scaling the best agents rather than expanding headcount.'
  },
  {
    id: 'EXP003',
    title: 'QR Payment Merchant Incentive Program',
    period: '2023 Q3-Q4',
    team: 'GrabPay Vietnam + Merchant Ops',
    hypothesis: 'If we subsidize QR payment acceptance for rural merchants, transaction volume will reach sustainable levels within 3 months.',
    approach: 'Offered 0% MDR for 6 months to 200 rural merchants. Provided free QR standees and training. Measured transaction volume, merchant retention, and consumer adoption.',
    result: 'mixed',
    metrics: [
      { label: 'Merchant Sign-ups', value: '187', delta: '94% of target' },
      { label: 'Active After 3 Months', value: '42%' },
      { label: 'Avg Txns/Month', value: '12', delta: 'vs 45 target' },
      { label: 'Consumer Adoption', value: '8%', delta: 'of eligible base' }
    ],
    learnings: [
      'Merchant acceptance is necessary but not sufficient for adoption',
      'Consumers need reasons to change behavior, not just options',
      'Cash-to-digital transition requires both sides of the market simultaneously',
      '0% MDR is not enough incentive if customers aren\'t asking for QR'
    ],
    whatIWouldDoDifferently: 'Would have paired merchant incentives with consumer incentives. The chicken-and-egg problem requires solving both sides at once. Also would have focused on high-frequency use cases (daily groceries) rather than all merchants.'
  },
  {
    id: 'EXP004',
    title: 'Voice-First Balance Inquiry',
    period: '2024 Q1',
    team: 'GrabPay Vietnam + AI Team',
    hypothesis: 'If we offer voice-based balance inquiry in Vietnamese, usage among low-literacy users will increase significantly.',
    approach: 'Built a voice interface using Vietnamese ASR. Deployed to 5,000 users identified as having low app engagement. Measured feature adoption and correlation with overall app engagement.',
    result: 'success',
    metrics: [
      { label: 'Feature Adoption', value: '34%', delta: 'of target users' },
      { label: 'Repeat Usage', value: '67%', delta: 'used 2+ times' },
      { label: 'App Engagement', value: '+22%', delta: 'MAU increase' },
      { label: 'Support Tickets', value: '-18%', delta: 'balance-related' }
    ],
    learnings: [
      'Voice interfaces unlock users who struggle with text-based apps',
      'Vietnamese tonal system is well-handled by modern ASR',
      'Single-purpose voice features are more successful than general voice assistants',
      'Voice can complement, not replace, visual interfaces'
    ],
    whatIWouldDoDifferently: 'Would have expanded to transaction initiation, not just inquiry. Users who adopted voice balance check were asking for voice payments. Left value on the table by scoping too narrowly.'
  },
  {
    id: 'EXP005',
    title: 'Commune Learning Center Digital Literacy',
    period: '2024 Q2-Q3',
    team: 'GrabPay Vietnam + Ministry Partnership',
    hypothesis: 'If we deliver digital financial literacy through existing commune learning centers, adoption will be higher than direct-to-consumer approaches.',
    approach: 'Partnered with 10 commune learning centers in Binh Duong. Trained local instructors. Delivered 4-session curriculum focused on practical use cases. Measured attendance, completion, and subsequent app adoption.',
    result: 'success',
    metrics: [
      { label: 'Session Attendance', value: '73%', delta: 'avg across 4 sessions' },
      { label: 'Course Completion', value: '58%' },
      { label: 'App Registration', value: '82%', delta: 'of completers' },
      { label: '90-Day Active', value: '47%', delta: 'vs 23% baseline' }
    ],
    learnings: [
      'Existing community infrastructure is underutilized for digital inclusion',
      'Group learning creates peer support and social pressure for adoption',
      'Local instructors are more trusted than corporate trainers',
      'Practical use case training beats abstract feature education'
    ],
    whatIWouldDoDifferently: 'Would have built ongoing support into the program. One-time training creates a spike; sustained engagement requires follow-up. Also would have included merchant training in the same sessions to solve both sides of the market.'
  },
  {
    id: 'EXP006',
    title: 'Agricultural Payment Integration',
    period: '2024 Q4',
    team: 'GrabPay Vietnam + Agri-Input Partner',
    hypothesis: 'If we embed digital payments into agricultural input purchases, farmers will adopt digital finance as part of existing commerce flows.',
    approach: 'Integrated GrabPay into a major fertilizer distributor\'s ordering system. Offered 5% discount for digital payment. Targeted 500 farmers through distributor\'s sales network.',
    result: 'mixed',
    metrics: [
      { label: 'Digital Payment Adoption', value: '28%', delta: 'of eligible farmers' },
      { label: 'Repeat Digital Txn', value: '41%', delta: 'used again' },
      { label: 'Average Order Value', value: '+12%', delta: 'vs cash orders' },
      { label: 'Farmer Satisfaction', value: '4.1/5' }
    ],
    learnings: [
      'Embedding payments in existing commerce flows reduces friction',
      'Farmers are pragmatic — discount works better than education',
      'Seasonal purchase patterns create lumpy adoption curves',
      'Input suppliers have trust relationships we can\'t build directly'
    ],
    whatIWouldDoDifferently: 'Would have timed the launch to harvest season when farmers have cash. Launched during planting season when farmers are credit-constrained. Also would have integrated credit offering, not just payment.'
  },
  {
    id: 'EXP007',
    title: 'Rural Driver-Partner Financial Services',
    period: '2025 Q1',
    team: 'Grab Vietnam Driver Ops + GrabPay',
    hypothesis: 'If we offer financial services to rural Grab drivers, they will become ambassadors for digital finance in their communities.',
    approach: 'Launched savings and micro-insurance products for 2,000 rural drivers. Created referral program for drivers to onboard family and community members. Measured product adoption and referral rates.',
    result: 'success',
    metrics: [
      { label: 'Product Adoption', value: '64%', delta: 'at least one product' },
      { label: 'Savings Accounts', value: '52%', delta: 'opened' },
      { label: 'Referrals per Driver', value: '3.2', delta: 'avg' },
      { label: 'Referral Conversion', value: '71%' }
    ],
    learnings: [
      'Existing platform relationships are underutilized distribution channels',
      'Drivers are trusted community members — their endorsement matters',
      'Product bundling increases adoption rates',
      'Financial services deepen platform loyalty'
    ],
    whatIWouldDoDifferently: 'Would have launched this years earlier. The driver network is a ready-made agent network we already pay. Should have recognized this distribution asset sooner.'
  },
  {
    id: 'EXP008',
    title: 'Province-Level Policy Advocacy',
    period: '2025 Q2',
    team: 'Grab Vietnam Government Relations',
    hypothesis: 'If we engage provincial governments directly on digital inclusion, we can accelerate regulatory support for fintech innovation.',
    approach: 'Conducted digital readiness assessments for 5 provinces. Presented findings to provincial leadership with specific policy recommendations. Offered technical assistance for implementation.',
    result: 'mixed',
    metrics: [
      { label: 'Provinces Engaged', value: '5' },
      { label: 'Policy Meetings', value: '12' },
      { label: 'Recommendations Adopted', value: '3', delta: 'of 15' },
      { label: 'Pilot Programs Initiated', value: '2' }
    ],
    learnings: [
      'Provincial governments are more receptive than national ministries to private sector input',
      'Data-driven presentations open doors that sales pitches don\'t',
      'Implementation capacity is the binding constraint, not political will',
      'Long-term relationship building matters more than one-time presentations'
    ],
    whatIWouldDoDifferently: 'Would have led with capacity building offers, not policy recommendations. Provinces know they have problems — they need help solving them, not more diagnosis. Also would have focused on 2 provinces deeply rather than 5 provinces shallowly.'
  }
]

const resultColors = {
  success: { bg: '#F0FFF4', text: '#276749', border: '#276749' },
  failure: { bg: '#FFF5F5', text: '#8B1A1A', border: '#8B1A1A' },
  mixed: { bg: '#FFFAF0', text: '#C05621', border: '#C05621' }
}

export default function GrabExperimentsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredExperiments = filter === 'all'
    ? experiments
    : experiments.filter(e => e.result === filter)

  const stats = {
    total: experiments.length,
    success: experiments.filter(e => e.result === 'success').length,
    failure: experiments.filter(e => e.result === 'failure').length,
    mixed: experiments.filter(e => e.result === 'mixed').length
  }

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/public-policy/experiments" style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>
          Experiments
        </Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--color-text-muted)' }}>/</span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>What I Tried at Grab</span>
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
          What I Tried at Grab
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: '65ch'
        }}>
          Real experiments I ran or contributed to during my decade at Grab. These aren&apos;t case studies
          written for success — they&apos;re honest accounts of what worked, what failed, and what I learned.
        </p>
      </header>

      {/* Stats */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        flexWrap: 'wrap'
      }}>
        <div>
          <span style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--color-accent)' }}>{stats.total}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>experiments</span>
        </div>
        <div>
          <span style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: '#276749' }}>{stats.success}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>worked</span>
        </div>
        <div>
          <span style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: '#8B1A1A' }}>{stats.failure}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>failed</span>
        </div>
        <div>
          <span style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: '#C05621' }}>{stats.mixed}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>mixed</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        {['all', 'success', 'failure', 'mixed'].map(f => (
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

      {/* Experiments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredExperiments.map(exp => {
          const colors = resultColors[exp.result]
          const isExpanded = expandedId === exp.id

          return (
            <article
              key={exp.id}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: `2px solid ${isExpanded ? colors.border : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setExpandedId(isExpanded ? null : exp.id)}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    backgroundColor: colors.bg,
                    color: colors.text,
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {exp.result}
                  </span>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {exp.period} | {exp.team}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                fontWeight: '600',
                color: 'var(--color-accent)',
                marginBottom: '0.75rem'
              }}>
                {exp.title}
              </h2>

              {/* Hypothesis */}
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                fontStyle: 'italic'
              }}>
                &ldquo;{exp.hypothesis}&rdquo;
              </p>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                  {/* Approach */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Approach
                    </h3>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                      {exp.approach}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-accent)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                      Results
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                      {exp.metrics.map((m, i) => (
                        <div key={i} style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--color-bg-secondary)',
                          borderRadius: 'var(--radius-md)',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--color-accent)' }}>
                            {m.value}
                          </div>
                          {m.delta && (
                            <div style={{ fontSize: 'var(--text-xs)', color: colors.text, fontWeight: '500' }}>
                              {m.delta}
                            </div>
                          )}
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learnings */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      What I Learned
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {exp.learnings.map((l, i) => (
                        <li key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: '0.5rem' }}>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What I'd do differently */}
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#FFF5F5',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid #8B1A1A'
                  }}>
                    <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: '#8B1A1A', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      What I&apos;d Do Differently
                    </h3>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
                      {exp.whatIWouldDoDifferently}
                    </p>
                  </div>
                </div>
              )}

              {/* Expand indicator */}
              <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                {isExpanded ? 'Click to collapse' : 'Click to see details'}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
