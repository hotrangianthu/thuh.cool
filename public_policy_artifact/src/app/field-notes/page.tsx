import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Field Notes',
  description:
    'On-the-ground observations from rural Vietnam — what I saw, heard, and concluded from field visits to Tay Ninh province.',
}

const quotes = [
  {
    text: 'My daughter set up MoMo for me. I used it once to send money to my son in Binh Duong. But here? Everyone pays cash. If I ask for QR, they look at me strange.',
    speaker: 'Vegetable seller, Cho Long Hoa market',
  },
  {
    text: 'Cash is trust. I show up with money, the farmer knows I\'m serious. A bank transfer? He has to wait, check, wonder if it\'s real. Cash is now.',
    speaker: 'Rice trader, Tay Ninh province',
  },
  {
    text: 'We\'re supposed to push digital government services. But half the people who come here don\'t have smartphones. The other half don\'t know how to use the apps.',
    speaker: 'Commune official, people\'s committee',
  },
]

export default function FieldNotesPage() {
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
          Field Notes
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
          What I observed on the ground
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Not from a desk, but from the provinces themselves. These are direct
          observations, conversations, and conclusions from field visits to rural
          Vietnam — the raw material behind the policy arguments in my research.
        </p>
      </section>

      {/* Note cards index */}
      <section
        style={{
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
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
            marginBottom: '1.75rem',
          }}
        >
          All Notes
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Note 1 — published */}
          <Link href="/public-policy/field-notes/72-hours-tay-ninh" style={{ textDecoration: 'none' }}>
            <article
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-card)',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    color: 'var(--color-accent)',
                    backgroundColor: '#EBF0F7',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                  }}
                >
                  Photo Essay
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Mar 2024
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  lineHeight: 'var(--leading-snug)',
                  marginBottom: '0.6rem',
                }}
              >
                72 Hours in Tay Ninh
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '1.25rem',
                }}
              >
                How much has rural financial access actually changed? Six sites.
                One consistent answer.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <span>Tay Ninh</span>
                <span>6 sections</span>
                <span style={{ color: 'var(--color-accent-red)', fontWeight: '500' }}>Read &rarr;</span>
              </div>
            </article>
          </Link>

          {/* Note 2 — published */}
          <Link href="/public-policy/field-notes/merchant-conversations" style={{ textDecoration: 'none' }}>
            <article
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-card)',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    color: 'var(--color-accent)',
                    backgroundColor: '#EBF0F7',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                  }}
                >
                  Conversations
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Apr 2024
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  lineHeight: 'var(--leading-snug)',
                  marginBottom: '0.6rem',
                }}
              >
                Merchant Conversations
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '1.25rem',
                }}
              >
                Six small-business owners on cash, trust, and why digital payments
                haven&rsquo;t reached them yet.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <span>Tay Ninh</span>
                <span>6 conversations</span>
                <span style={{ color: 'var(--color-accent-red)', fontWeight: '500' }}>Read &rarr;</span>
              </div>
            </article>
          </Link>

          {/* Note 3 — placeholder */}
          <article
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              height: '100%',
              opacity: 0.75,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-bg-card)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  border: '1px solid var(--color-border)',
                }}
              >
                Market Log
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent-red)',
                  fontWeight: '500',
                }}
              >
                Coming soon
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: '600',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-snug)',
                marginBottom: '0.6rem',
              }}
            >
              Market Visit Log
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Timestamped observations from Tay Ninh, Long An, and Ben Tre — payment
              infrastructure, bank branch density, and merchant digital adoption by
              district type.
            </p>
          </article>

          {/* Note 4 — placeholder */}
          <article
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              height: '100%',
              opacity: 0.75,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-bg-card)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  border: '1px solid var(--color-border)',
                }}
              >
                Observation
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent-red)',
                  fontWeight: '500',
                }}
              >
                Coming soon
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: '600',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-snug)',
                marginBottom: '0.6rem',
              }}
            >
              Urban Tech Adoption, District 9
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              How a peri-urban tech corridor in Ho Chi Minh City creates a two-speed
              economy — and what that means for policies targeting the median Vietnamese
              worker, not the median startup employee.
            </p>
          </article>
        </div>
      </section>

      {/* Featured essay */}
      <section
        style={{
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
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
          Featured Essay
        </p>

        <Link
          href="/public-policy/field-notes/72-hours-tay-ninh"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <article
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              maxWidth: '800px',
            }}
          >
            {/* Image placeholder */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/7',
                backgroundColor: 'var(--color-bg-secondary)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  fontStyle: 'italic',
                }}
              >
                Cho Long Hoa Market &mdash; Tay Ninh, March 2024
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                [ Photo placeholder ]
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                {['Photo Essay', 'Tay Ninh', 'March 2024'].map((tag) => (
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
                72 Hours in Tay Ninh
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '1.25rem',
                }}
              >
                I returned to the province where I grew up with a single question: how much
                has rural financial access actually changed since I left for Ho Chi Minh City
                twelve years ago? Three days. Six sites. One consistent answer.
              </p>

              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  gap: '1.5rem',
                }}
              >
                <span>March 2024</span>
                <span>6 sections</span>
                <span
                  style={{
                    color: 'var(--color-accent-red)',
                    fontWeight: '500',
                  }}
                >
                  Read essay &rarr;
                </span>
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* Merchant Conversations preview */}
      <section
        style={{
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
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
            Merchant Conversations
          </p>
          <Link
            href="/public-policy/field-notes/merchant-conversations"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-accent-red)',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Read all six conversations &rarr;
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {quotes.map((q, i) => (
            <blockquote
              key={i}
              style={{
                margin: 0,
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderLeft: '3px solid var(--color-accent)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-base)',
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '1rem',
                }}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              <footer
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {q.speaker}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <div
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            maxWidth: '600px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: '600',
              color: 'var(--color-accent-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
            }}
          >
            Coming Soon
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              fontWeight: '600',
              color: 'var(--color-accent)',
              marginBottom: '0.75rem',
            }}
          >
            Market Visit Log
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Timestamped observations from field visits across Tay Ninh, Long An, and
            Ben Tre provinces — payment infrastructure, bank branch density, mobile
            coverage, and merchant digital adoption by district type.
          </p>
        </div>
      </section>
    </div>
  )
}
