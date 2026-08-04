import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'From rural Vietnam to Grab to public policy — the long-term research arc behind this portfolio.',
}

const timeline = [
  {
    period: 'Origin',
    label: 'Tay Ninh Province, Vietnam',
    detail:
      'Grew up in a farming household an hour from Ho Chi Minh City. Electricity was reliable. A smartphone was not. The local bank required a 40-minute motorcycle ride. Financial services existed in theory, not in practice.',
  },
  {
    period: '2014–2016',
    label: 'First encounter with the digital divide',
    detail:
      'Studied economics and observed Vietnam\'s rapid urbanization firsthand. Friends who moved to HCMC gained access to banking, credit, and digital services within months. Those who stayed behind did not. The gap was not about aspiration — it was about infrastructure and policy architecture.',
  },
  {
    period: '2016–2026',
    label: 'Grab — Building financial products at scale',
    detail:
      'Joined Grab\'s Vietnam operations and spent a decade in product strategy and P&L management. Helped build and scale digital payment, delivery, and fintech products across Southeast Asia. Reached millions of users — overwhelmingly urban. The rural-urban split was not just a data point. It was a structural constraint visible in every growth model.',
  },
  {
    period: '2024',
    label: 'The policy gap becomes undeniable',
    detail:
      'Vietnam released its 2025–2035 National Economic Plan, which targets 8% annual GDP growth through digital transformation. Reading it carefully, I found no integrated framework for rural digital inclusion — no coordinated approach across the Ministry of Information, State Bank, or provincial governments. The plan assumes digital access. It does not create it.',
  },
  {
    period: '2025–Now',
    label: 'Building a long-term policy research practice',
    detail:
      'Began self-directed study in public policy — welfare economics, regulatory theory, and Vietnam\'s institutional structures. Started writing and publishing analyses. This portfolio is the long-term output of that practice and a living record of research, fieldwork, and policy experimentation.',
  },
]

export default function AboutPage() {
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
          About
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
          From a farming province to fintech to public policy
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          I am Tran Gian Thu Ho (Giant). I grew up in rural Vietnam, built digital
          financial products for Southeast Asia&rsquo;s largest super-app, and came to
          understand that the policy layer is where transformative change actually happens
          — or fails to.
        </p>
      </section>

      {/* Timeline */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '4rem', maxWidth: '720px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '2.5rem',
          }}
        >
          The Arc
        </h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '6px',
              bottom: '0',
              width: '1px',
              backgroundColor: 'var(--color-border)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {timeline.map((item) => (
              <div
                key={item.period}
                style={{
                  paddingLeft: '2rem',
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '6px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                  }}
                />

                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    color: 'var(--color-accent-red)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.period}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.label}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this portfolio */}
      <section
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '5rem',
          maxWidth: '720px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            marginBottom: '1.25rem',
          }}
        >
          Why this portfolio? Why now?
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <p>
            A decade in product and strategy taught me how to build things that scale.
            It did not teach me how to change the rules of the game. The problems I now
            care most about — rural fintech access, provincial investment frameworks,
            Vietnam&rsquo;s place in the regional knowledge economy — are policy problems
            first, technology problems second.
          </p>
          <p>
            This portfolio is designed as a durable body of work: policy papers, prototypes,
            field notes, and open experiments that can be critiqued and improved over time.
            The goal is not a one-cycle application artifact; it is a public research platform
            that compounds insight year after year.
          </p>
          <p>
            I am not changing career tracks. I am strengthening the policy layer in my work
            so private-sector execution and public-policy design can reinforce each other at scale.
          </p>
        </div>
      </section>
    </div>
  )
}
