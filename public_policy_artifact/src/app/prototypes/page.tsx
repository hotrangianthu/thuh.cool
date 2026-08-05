import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prototypes',
  description:
    'Design proposals and solution concepts — from agent banking pilot programs to policy communication formats.',
}

const comingSoon = [
  {
    title: 'Rural Fintech Product Wireframes',
    description:
      'UI concepts for low-literacy users engaging with digital financial services for the first time. Designed around cognitive constraints, not assumed digital fluency.',
    tags: ['UX Design', 'Fintech', 'Accessibility'],
  },
  {
    title: 'Policy Brief Template',
    description:
      'A structured format for communicating policy recommendations to decision-makers. Stripped of academic language. Built for action.',
    tags: ['Policy Communication', 'Templates'],
  },
]

export default function PrototypesPage() {
  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      {/* Header */}
      <section
        style={{
          paddingTop: '4rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--color-border)',
          maxWidth: '720px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '500',
            color: 'var(--color-accent-red)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}
        >
          Prototypes
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.25',
            marginBottom: '1.25rem',
          }}
        >
          I don&rsquo;t just analyze problems &mdash; I design solutions.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          These are proposals I&rsquo;ve developed to test ideas. Not academic abstractions
          &mdash; concrete designs with budgets, timelines, and success metrics.
        </p>
      </section>

      {/* Featured prototype */}
      <section
        style={{
          paddingTop: '3.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.5rem',
          }}
        >
          Featured Proposal
        </p>

        <Link
          href="/public-policy/prototypes/agent-banking-pilot"
          style={{ textDecoration: 'none', display: 'block', maxWidth: '760px' }}
        >
          <article
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              borderLeft: '4px solid var(--color-accent)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {['Pilot Proposal', 'Agent Banking', 'Rural Finance', 'Binh Dinh'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '500',
                    color: 'var(--color-accent)',
                    backgroundColor: '#EBF0F7',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-2xl)',
                fontWeight: '600',
                color: 'var(--color-accent)',
                lineHeight: 'var(--leading-snug)',
                marginBottom: '0.75rem',
              }}
            >
              Agent Banking Pilot Proposal
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: '1.5rem',
              }}
            >
              A full proposal for extending financial access to agricultural communities in Binh Dinh via an
              authorized agent network using existing retail infrastructure. Covers
              geography selection, agent criteria, 18-month timeline, 2.5B VND budget,
              and risk mitigation.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              {[
                { value: '5', label: 'Pilot communes' },
                { value: '15', label: 'Target agents' },
                { value: '25,000', label: 'Target population' },
                { value: '2.5B VND', label: 'Budget (~$100k)' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: '700',
                      color: 'var(--color-accent)',
                      lineHeight: '1',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-accent-red)',
                fontWeight: '500',
              }}
            >
              Read full proposal &rarr;
            </div>
          </article>
        </Link>
      </section>

      {/* Coming soon */}
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.5rem',
          }}
        >
          In Development
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '760px',
          }}
        >
          {comingSoon.map((item) => (
            <article
              key={item.title}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                opacity: 0.7,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '0.4rem',
                  marginBottom: '0.875rem',
                  flexWrap: 'wrap',
                }}
              >
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '500',
                      color: 'var(--color-text-muted)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 'var(--leading-snug)',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '1rem',
                }}
              >
                {item.description}
              </p>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  border: '1px solid var(--color-border)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '999px',
                }}
              >
                Coming soon
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
