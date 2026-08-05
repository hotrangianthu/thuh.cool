import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Agent Banking Pilot Proposal',
  description:
    'A full proposal for extending financial access to agricultural communities in Binh Dinh via commune-level agent banking — 5 communes, 15 agents, 25,000 target population.',
}

const slideStyle = {
  paddingTop: '4rem',
  paddingBottom: '4rem',
  borderBottom: '1px solid var(--color-border)',
  maxWidth: '760px',
}

const sectionLabel = {
  fontFamily: 'var(--font-sans)' as const,
  fontSize: 'var(--text-xs)' as const,
  fontWeight: '600' as const,
  color: 'var(--color-accent-red)' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em' as const,
  marginBottom: '1rem',
}

const slideH2 = {
  fontFamily: 'var(--font-serif)' as const,
  fontSize: 'var(--text-2xl)' as const,
  fontWeight: '600' as const,
  color: 'var(--color-accent)' as const,
  lineHeight: 'var(--leading-snug)' as const,
  marginBottom: '1.5rem',
}

const bodyText = {
  fontFamily: 'var(--font-sans)' as const,
  fontSize: 'var(--text-base)' as const,
  color: 'var(--color-text-secondary)' as const,
  lineHeight: 'var(--leading-relaxed)' as const,
}

const bulletList = {
  fontFamily: 'var(--font-sans)' as const,
  fontSize: 'var(--text-base)' as const,
  color: 'var(--color-text-secondary)' as const,
  lineHeight: 'var(--leading-relaxed)' as const,
  paddingLeft: '1.25rem',
  margin: '0',
}

export default function AgentBankingPilotPage() {
  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      {/* Back link */}
      <div style={{ paddingTop: '2rem' }}>
        <Link
          href="/public-policy/prototypes"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          &larr; Prototypes
        </Link>
      </div>

      {/* Slide 1: Title */}
      <section style={{ paddingTop: '3rem', paddingBottom: '4rem', borderBottom: '1px solid var(--color-border)', maxWidth: '760px' }}>
        <div
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            backgroundColor: '#EBF0F7',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            letterSpacing: '0.04em',
            marginBottom: '1.5rem',
          }}
        >
          Pilot Proposal &middot; May 2026
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.2',
            marginBottom: '1rem',
          }}
        >
          Commune-Level Agent Banking Pilot
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontStyle: 'italic',
            color: 'var(--color-text-secondary)',
            marginBottom: '2rem',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          A proposal for extending financial access to agricultural communities in Binh Dinh
        </p>

        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          <span>Prepared by: Tran Gian Thu Ho</span>
          <span>May 2026</span>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
            }}
          >
            Download as PDF (placeholder)
          </a>
        </div>
      </section>

      {/* Slide 2: Executive Summary */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 2 &mdash; Executive Summary</p>
        <h2 style={slideH2}>The Case in Four Lines</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {[
            {
              label: 'Problem',
              text: '62M rural Vietnamese lack practical access to financial services',
              accent: 'var(--color-accent-red)',
              bg: '#F7EDED',
            },
            {
              label: 'Solution',
              text: 'Agent banking network at commune level using existing retail infrastructure',
              accent: 'var(--color-accent)',
              bg: '#EBF0F7',
            },
            {
              label: 'Ask',
              text: '18-month pilot in 5 agricultural communes in Binh Dinh',
              accent: '#5B6E4A',
              bg: '#EEF2EB',
            },
            {
              label: 'Target',
              text: '40% of target population with active accounts by month 18',
              accent: '#5B4A6E',
              bg: '#F0EEEF',
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                backgroundColor: card.bg,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                borderTop: `3px solid ${card.accent}`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  color: card.accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {card.text}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'var(--color-accent)', lineHeight: '1' }}>2.5B</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>VND investment</div>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>&asymp; $100k USD</div>
          <div style={{ flex: 1, minWidth: '200px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            Cost per target beneficiary: ~100,000 VND ($4 USD) — competitive with comparable programs in Bangladesh and India.
          </div>
        </div>
      </section>

      {/* Slide 3: The Problem */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 3 &mdash; The Problem</p>
        <h2 style={slideH2}>Distance Is a Policy Failure, Not a Geography Problem</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {[
            { metric: '8km', detail: 'Average distance to nearest bank branch in rural Binh Dinh' },
            { metric: '45 min', detail: 'Average wait time per bank transaction' },
            { metric: '73%', detail: 'Rural residents using banks only for mandatory transactions' },
            { metric: '0%', detail: 'Formal credit access rate among surveyed small farmers' },
          ].map((s) => (
            <div
              key={s.metric}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: '700',
                  color: 'var(--color-accent-red)',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                }}
              >
                {s.metric}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                {s.detail}
              </div>
            </div>
          ))}
        </div>

        <p style={bodyText}>
          The consequence is not just inconvenience. Farmers holding cash miss savings
          interest. They cannot access credit at reasonable rates. Emergency expenses
          become crises. The financial system exists — it is simply inaccessible.
          This is a distribution problem, not a product problem.
        </p>
      </section>

      {/* Slide 4: The Solution */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 4 &mdash; The Solution</p>
        <h2 style={slideH2}>Agent Banking: Proven Model, Unimplemented in Vietnam</h2>

        <p style={{ ...bodyText, marginBottom: '1.5rem' }}>
          Authorize existing retail shops — pharmacies, phone shops, general stores —
          to provide basic banking services using simple technology and biometric
          verification. The infrastructure is already there. We are adding a license
          and a float.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {[
            { icon: '→', label: 'Services', detail: 'Cash deposit/withdrawal, bill payment, account opening, balance inquiry' },
            { icon: '→', label: 'Technology', detail: 'Simple tablet + mobile app + biometric verification' },
            { icon: '→', label: 'Regulatory model', detail: 'Bank-led agent network, compliant with SBV Circular 39' },
            { icon: '→', label: 'Precedent', detail: 'Bangladesh (bKash), Kenya (M-Pesa), India (Business Correspondents)' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                borderLeft: '3px solid var(--color-accent)',
                paddingLeft: '1rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 5: Target Geography */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 5 &mdash; Target Geography</p>
        <h2 style={slideH2}>Why Binh Dinh — And How to Select Five Communes</h2>

        <p style={{ ...bodyText, marginBottom: '1.5rem' }}>
          Binh Dinh is the agricultural community I know firsthand. I understand the
          local livelihoods, retail infrastructure, and relationship between commune
          officials and residents. Selection criteria for pilot communes: (1) distance from
          nearest bank branch &gt;5km, (2) population &gt;3,000, (3) existing retail
          infrastructure with fixed-location shops. Final sites would be confirmed through
          baseline validation; the profiles below are planning assumptions.
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '1.5rem',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                {['Candidate Profile', 'Distance to Branch', 'Est. Population', 'Retail Shops'].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '600',
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Coastal rice-growing commune', '9.2km', '4,800', '12'],
                ['Lowland mixed-crop commune', '7.5km', '5,200', '8'],
                ['Foothill farming commune', '11.0km', '3,600', '6'],
                ['Market-linked farming commune', '6.8km', '5,400', '15'],
                ['Remote smallholder commune', '8.4km', '5,900', '10'],
              ].map((row, i) => (
                <tr
                  key={row[0]}
                  style={{ backgroundColor: i % 2 === 1 ? 'var(--color-bg-secondary)' : 'transparent' }}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: j === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        fontWeight: j === 0 ? '500' : '400',
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid var(--color-border-light)',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--color-accent)', padding: '0.75rem 1rem' }}>Total</td>
                <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', padding: '0.75rem 1rem' }}>avg. 8.6km</td>
                <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--color-accent)', padding: '0.75rem 1rem' }}>~25,000</td>
                <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--color-accent)', padding: '0.75rem 1rem' }}>51</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Slide 6: Agent Selection */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 6 &mdash; Agent Selection Criteria</p>
        <h2 style={slideH2}>Who Qualifies as an Agent</h2>

        <p style={{ ...bodyText, marginBottom: '1.5rem' }}>
          The agent is the product. Selection criteria are non-negotiable.
          A weak agent network destroys trust faster than any marketing rebuilds it.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {[
            { criterion: 'Fixed location', detail: 'Existing business with a permanent physical address — not mobile or seasonal.' },
            { criterion: 'Established operation', detail: 'Operating for 2+ years. Stability signal, not a formality.' },
            { criterion: 'Digital capable', detail: 'Owner is literate and can operate a smartphone app. Basic training provided.' },
            { criterion: 'Community trusted', detail: 'Verified by commune officials and local networks. Reputation precedes the role.' },
            { criterion: 'Cash float commitment', detail: 'Willing and able to maintain minimum 5M VND (~$200) float for daily transactions.' },
          ].map((item, i) => (
            <div
              key={item.criterion}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  color: '#fff',
                  marginTop: '2px',
                }}
              >
                {i + 1}
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {item.criterion}
                  {' '}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 7: Timeline */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 7 &mdash; Implementation Timeline</p>
        <h2 style={slideH2}>18 Months from Recruitment to Scale Assessment</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '24px',
              bottom: '24px',
              width: '2px',
              backgroundColor: 'var(--color-border)',
            }}
          />
          {[
            {
              phase: 'Month 1–3',
              label: 'Recruitment & Training',
              detail: 'Agent recruitment across 5 communes. Target: 15 agents (3 per commune). 2-day training program. Technology setup and system integration.',
              target: '15 agents recruited',
            },
            {
              phase: 'Month 4–6',
              label: 'Supervised Soft Launch',
              detail: 'Full-time field officer support for each agent. Transaction limits in place. Feedback collection and process refinement. Community awareness events in each commune.',
              target: '500 active accounts',
            },
            {
              phase: 'Month 7–12',
              label: 'Full Operation',
              detail: 'Remove training wheels. Agents operating independently. Marketing push via commune bulletin boards, word-of-mouth incentives, and first-transaction bonuses.',
              target: '5,000 active accounts',
            },
            {
              phase: 'Month 13–18',
              label: 'Scale Assessment',
              detail: 'Evaluate agent profitability, user retention, and satisfaction. Prepare an expansion proposal for other agricultural communities in Binh Dinh and potential regional replication.',
              target: '10,000 active accounts',
            },
          ].map((item, i) => (
            <div
              key={item.phase}
              style={{
                display: 'flex',
                gap: '1.5rem',
                paddingLeft: '2.5rem',
                paddingBottom: '2rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '6px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  border: '2px solid var(--color-bg-primary)',
                  zIndex: 1,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '700', color: 'var(--color-accent-red)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  {item.phase}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: '0.625rem' }}>
                  {item.detail}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    color: 'var(--color-accent)',
                    backgroundColor: '#EBF0F7',
                    padding: '0.2rem 0.625rem',
                    borderRadius: '999px',
                  }}
                >
                  Target: {item.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 8: Budget */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 8 &mdash; Budget</p>
        <h2 style={slideH2}>2.5 Billion VND Over 18 Months</h2>

        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '1.5rem',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <th style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Line Item</th>
                <th style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.75rem 1rem', textAlign: 'right', borderBottom: '1px solid var(--color-border)' }}>Amount (VND)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Agent setup — tablets, signage, training', '150,000,000'],
                ['Agent incentives — 18 months', '900,000,000'],
                ['Technology platform — licensing', '500,000,000'],
                ['Marketing & community outreach', '300,000,000'],
                ['Staff — 1 pilot manager, 2 field officers', '500,000,000'],
                ['Contingency (10%)', '150,000,000'],
              ].map(([item, amount], i) => (
                <tr key={item} style={{ backgroundColor: i % 2 === 1 ? 'var(--color-bg-secondary)' : 'transparent' }}>
                  <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-light)' }}>{item}</td>
                  <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontWeight: '500', padding: '0.75rem 1rem', textAlign: 'right', borderBottom: '1px solid var(--color-border-light)', fontVariantNumeric: 'tabular-nums' }}>{amount}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: 'var(--color-accent)' }}>
                <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '700', color: '#fff', padding: '0.875rem 1rem' }}>Total</td>
                <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '700', color: '#fff', padding: '0.875rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>2,500,000,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ ...bodyText, fontSize: 'var(--text-sm)' }}>
          Equivalent to approximately $100,000 USD at current exchange rates.
          Cost per agent: ~167M VND. Cost per target beneficiary (25,000 people): ~100,000 VND.
        </p>
      </section>

      {/* Slide 9: Success Metrics */}
      <section style={slideStyle}>
        <p style={sectionLabel}>Slide 9 &mdash; Success Metrics</p>
        <h2 style={slideH2}>What Success Looks Like — and How We Measure It</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              tier: 'Primary',
              metric: '40% active account penetration',
              detail: '10,000 of 25,000 target population with at least 1 transaction/month by month 18.',
              color: 'var(--color-accent)',
              bg: '#EBF0F7',
            },
            {
              tier: 'Secondary',
              metric: 'Distance to access point: 8km → <1km',
              detail: 'All 5 communes have at least one operational agent within 1km of 80% of households.',
              color: '#5B6E4A',
              bg: '#EEF2EB',
            },
            {
              tier: 'Tertiary',
              metric: 'Agent profitability by month 12',
              detail: 'Agents cover operating costs from transaction fees without subsidy by the end of the first year.',
              color: '#5B4A6E',
              bg: '#F0EEEF',
            },
          ].map((item) => (
            <div
              key={item.tier}
              style={{
                backgroundColor: item.bg,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                borderLeft: `4px solid ${item.color}`,
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '700', color: item.color, textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '3px', minWidth: '60px' }}>
                  {item.tier}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{item.metric}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{item.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ ...bodyText, marginTop: '1.5rem', fontSize: 'var(--text-sm)' }}>
          Monitoring cadence: monthly dashboard (transaction volume, active accounts, agent uptime),
          quarterly reviews with field officers, biannual user surveys in each commune.
        </p>
      </section>

      {/* Slide 10: Risk Mitigation */}
      <section style={{ ...slideStyle, borderBottom: 'none', paddingBottom: '5rem' }}>
        <p style={sectionLabel}>Slide 10 &mdash; Risk Mitigation</p>
        <h2 style={slideH2}>Known Risks and Planned Responses</h2>

        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '2.5rem',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <th style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Risk</th>
                <th style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Agent fraud', 'Biometric verification on every transaction, individual transaction limits, real-time monitoring dashboard with anomaly alerts.'],
                ['Low adoption', 'Community outreach via commune leaders and women\'s unions. First-transaction bonus (50,000 VND). Targeted messaging in local dialect.'],
                ['Agent dropout', '3-month probation period before full activation. Performance bonuses at 6- and 12-month marks. Pre-screened waitlist of backup agents per commune.'],
                ['Regulatory change', 'Formal partnership with licensed bank from day 1. Legal review of all materials against SBV Circular 39. Quarterly compliance check with SBV liaison.'],
              ].map(([risk, mitigation], i) => (
                <tr key={risk} style={{ backgroundColor: i % 2 === 1 ? 'var(--color-bg-secondary)' : 'transparent' }}>
                  <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-text-primary)', padding: '1rem', borderBottom: '1px solid var(--color-border-light)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{risk}</td>
                  <td style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', padding: '1rem', borderBottom: '1px solid var(--color-border-light)', lineHeight: 'var(--leading-relaxed)' }}>{mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div
          style={{
            backgroundColor: 'var(--color-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            color: '#fff',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontStyle: 'italic',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: '1rem',
              color: '#e8eef5',
            }}
          >
            &ldquo;This pilot is shovel-ready. The question is not whether agent banking works
            &mdash; it is proven in Bangladesh, Kenya, and India. The question is whether
            Vietnam will deploy it before the rural-urban divide becomes permanent.&rdquo;
          </p>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: '#a8bcce',
            }}
          >
            &mdash; Tran Gian Thu Ho, May 2026
          </div>
        </div>
      </section>
    </div>
  )
}
