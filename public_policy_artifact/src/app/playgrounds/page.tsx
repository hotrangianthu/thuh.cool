'use client'

import Link from 'next/link'

const tools = [
  {
    href: '/public-policy/playgrounds/rural-fintech-calculator',
    title: 'Rural Fintech ROI Calculator',
    description:
      'Model the economic viability of agent-banking networks by province. Adjust population, mobile penetration, and transaction value to stress-test break-even timelines.',
    tags: ['Financial Modeling', 'Agent Banking', 'Rural Access'],
    time: '~3 min',
  },
  {
    href: '/public-policy/playgrounds/province-readiness-scorer',
    title: 'Province Digital Readiness Scorer',
    description:
      'Score and compare provinces across four readiness dimensions: connectivity, digital literacy, fintech adoption, and banking coverage. Radar chart + gap analysis included.',
    tags: ['Data Viz', 'Comparative Analysis', '10 Provinces'],
    time: '~2 min',
  },
  {
    href: '/public-policy/playgrounds/policy-simulator',
    title: 'Policy Scenario Simulator',
    description:
      'Dial policy levers — tax incentives, agent mandates, direct subsidies, literacy funding — and watch their compounding effect on fintech adoption over 5 years.',
    tags: ['Scenario Modeling', 'Policy Design', 'Adoption Curves'],
    time: '~4 min',
  },
]

export default function PlaygroundsIndex() {
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
          paddingTop: '5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--color-border)',
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
          Interactive Tools
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.2',
            marginBottom: '1rem',
          }}
        >
          Playgrounds: Where Ideas Get Tested
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: '640px',
          }}
        >
          Interactive tools I built to model policy scenarios and test assumptions. Each calculator
          exposes the underlying formula so you can interrogate the logic, not just the output.
        </p>
      </section>

      {/* Tool Cards */}
      <section
        style={{
          paddingTop: '3rem',
          paddingBottom: '5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none', display: 'block' }}>
            <article
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-card)',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = 'var(--shadow-card-hover)'
                el.style.borderColor = 'var(--color-accent)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = 'var(--shadow-card)'
                el.style.borderColor = 'var(--color-border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '500',
                      color: 'var(--color-accent)',
                      backgroundColor: '#EBF0F7',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  lineHeight: 'var(--leading-snug)',
                  marginBottom: '0.75rem',
                }}
              >
                {tool.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  flex: 1,
                  marginBottom: '1.25rem',
                }}
              >
                {tool.description}
              </p>

              {/* Footer row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {tool.time}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '500',
                    color: 'var(--color-accent-red)',
                  }}
                >
                  Try it &rarr;
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  )
}
