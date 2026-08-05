'use client'

import Link from 'next/link'

const experiments = [
  {
    slug: 'hypothesis-tracker',
    title: 'Hypothesis Tracker',
    description: 'A living document of predictions I\'ve made about rural fintech, policy outcomes, and Vietnam\'s digital economy — with accountability.',
    status: 'active',
    count: '12 hypotheses tracked'
  },
  {
    slug: 'what-i-tried-at-grab',
    title: 'What I Tried at Grab',
    description: 'Real experiments I ran or contributed to during my decade at Grab — what worked, what failed, and what I learned.',
    status: 'archive',
    count: '8 experiments documented'
  }
]

export default function ExperimentsPage() {
  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-4xl)',
          fontWeight: '600',
          color: 'var(--color-accent)',
          marginBottom: '1rem'
        }}>
          Experiments
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: '65ch'
        }}>
          Theory without practice is speculation. Here&apos;s where I put my ideas to the test —
          tracking predictions, documenting real-world experiments, and holding myself accountable
          to outcomes.
        </p>
      </header>

      {/* Philosophy Box */}
      <div style={{
        backgroundColor: '#F0FAF4',
        border: '1px solid #276749',
        borderLeft: '4px solid #276749',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '3rem'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-lg)',
          fontWeight: '600',
          color: '#276749',
          marginBottom: '0.75rem'
        }}>
          Why Track Experiments?
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          margin: 0
        }}>
          Anyone can make predictions after the fact. The only way to know if your mental models
          are actually useful is to make predictions <em>before</em> you know the outcome, write them down,
          and track your hit rate. I&apos;m wrong more often than I&apos;d like to admit — but that&apos;s how
          the models get better.
        </p>
      </div>

      {/* Experiments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {experiments.map(exp => (
          <Link
            key={exp.slug}
            href={`/public-policy/experiments/${exp.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <article
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                height: '100%',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {/* Status badge */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  backgroundColor: exp.status === 'active' ? '#F0FAF4' : '#F3EFE8',
                  color: exp.status === 'active' ? '#276749' : 'var(--color-text-muted)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {exp.status}
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

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: '1rem'
              }}>
                {exp.description}
              </p>

              {/* Count */}
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)'
              }}>
                {exp.count}
              </p>
            </article>
          </Link>
        ))}
      </div>

      {/* Call to action */}
      <div style={{
        marginTop: '3rem',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-lg)',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          &ldquo;Strong opinions, weakly held — but written down, timestamped, and tracked.&rdquo;
        </p>
      </div>
    </main>
  )
}
