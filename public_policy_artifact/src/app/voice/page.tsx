import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Voice',
  description:
    'Opinions I am willing to defend. Positions I am willing to change — with evidence.',
}

const hotTakes = [
  {
    quote:
      "Vietnam's 'digital transformation' is an urban marketing campaign. The 70% penetration stat is like saying a country has 'food security' because cities have supermarkets.",
    context: 'On national digital strategy',
    date: 'April 2026',
  },
  {
    quote:
      "Agent banking isn't innovation. Bangladesh did it 15 years ago. The innovation would be Vietnam admitting it's behind and moving fast to catch up.",
    context: 'On fintech policy',
    date: 'March 2026',
  },
  {
    quote:
      "Policy expertise isn't a credential you claim once. It's built in public through clear arguments, empirical humility, and repeated revision.",
    context: 'On graduate education',
    date: 'May 2026',
  },
  {
    quote:
      "Every 'digital inclusion' program I've seen assumes the problem is people. The problem is systems. People are rational. The systems are broken.",
    context: 'On policy design',
    date: 'February 2026',
  },
]

export default function VoicePage() {
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
          Voice
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
          Opinions I&rsquo;m willing to defend.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Positions I&rsquo;m willing to change &mdash; with evidence. Policy thinking
          requires taking stands, not just analyzing options.
        </p>
      </section>

      {/* Featured piece */}
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
          Featured
        </p>

        <Link
          href="/public-policy/voice/if-i-were-dg"
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
              borderLeft: '4px solid var(--color-accent-red)',
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
              {['Thought Experiment', 'Digital Economy', 'Policy Leadership'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '500',
                    color: 'var(--color-accent-red)',
                    backgroundColor: '#F7EDED',
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
              If I Were Director-General of Digital Economy
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
              A thought experiment in 1,000 words. If I had the authority, the budget,
              and the accountability for Vietnam&rsquo;s digital transformation, what
              would I actually do in the first 100 days? Not strategy documents. Not new
              agencies. Three pilots, one honest audit, and a willingness to be blamed
              for the outcome.
            </p>

            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <span>May 2026</span>
              <span>~1,000 words</span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-accent-red)',
                fontWeight: '500',
              }}
            >
              Read the piece &rarr;
            </div>
          </article>
        </Link>
      </section>

      {/* Hot takes */}
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1.75rem',
            maxWidth: '1000px',
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
              margin: 0,
            }}
          >
            Hot Takes
          </p>
          <Link
            href="/public-policy/voice/hot-takes"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              color: 'var(--color-accent-red)',
              textDecoration: 'none',
            }}
          >
            See all takes &rarr;
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
          }}
        >
          {hotTakes.map((item, i) => (
            <article
              key={i}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.5rem',
                  lineHeight: '1',
                  color: 'var(--color-border)',
                  marginBottom: '0.5rem',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-base)',
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: '0 0 1.25rem 0',
                }}
              >
                {item.quote}
              </blockquote>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '500',
                    color: 'var(--color-accent-red)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {item.context}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {item.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
