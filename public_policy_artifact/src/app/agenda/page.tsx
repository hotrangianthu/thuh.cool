import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Agenda',
  description:
    'Three research threads converging on a single thesis about Vietnam\'s rural-urban divide and the policy architecture required to close it.',
}

const threads = [
  {
    number: '01',
    title: 'Rural Fintech & AI Access Policy Framework',
    timeframe: '2026–2027',
    status: 'Active',
    summary:
      'Vietnam\'s digital financial infrastructure is urban by design, not by necessity. This thread investigates the policy levers — regulatory, fiscal, and institutional — that would extend genuine access to 62 million rural citizens.',
    questions: [
      'What agent banking model is most viable given Vietnam\'s commune structure and telco landscape?',
      'How should digital financial literacy programs be designed for agricultural households with seasonal income patterns?',
      'What is the minimum viable regulatory framework for rural fintech innovation without creating systemic risk?',
      'Can provincial governments be effective delivery vehicles for national fintech inclusion mandates?',
    ],
    methods: ['Policy document analysis', 'Comparative case studies (Bangladesh, Kenya, India)', 'Field interviews with rural financial service providers'],
    keyOutput: 'Working paper: Access, Literacy, and Productivity — A Framework for Rural Digital Finance Policy in Vietnam',
  },
  {
    number: '02',
    title: 'Regional Investment Frameworks & Provincial Economic Strengths',
    timeframe: '2027',
    status: 'Planned',
    summary:
      'Vietnam\'s 63 provinces have dramatically different economic endowments, yet receive investment through a largely uniform national framework. This thread examines why province-level comparative advantage is underutilized — and what policy design would change that.',
    questions: [
      'How do provincial industrial zones attract or repel FDI relative to their natural endowments?',
      'What is the institutional mechanism through which national investment incentives translate (or fail to translate) into rural income?',
      'How do ASEAN neighbors — Thailand, Indonesia, the Philippines — differentiate provincial investment targeting?',
      'Can a province-level economic strength mapping tool change investment allocation decisions?',
    ],
    methods: ['GSO provincial economic data analysis', 'ASEAN comparative case studies', 'Interviews with provincial planning officials'],
    keyOutput: 'Policy brief: Province-Differentiated Investment Targeting in Vietnam\'s 2025–2035 Strategy',
  },
  {
    number: '03',
    title: "Vietnam's Nation Brand & Soft Power in the Regional Knowledge Economy",
    timeframe: '2027–2028',
    status: 'Planned',
    summary:
      'Vietnam\'s economic success has not translated into proportional influence in the regional policy conversation. This thread examines the gap between Vietnam\'s economic trajectory and its soft power footprint — and what deliberate nation-branding policy could change.',
    questions: [
      'How is Vietnam perceived as a knowledge economy destination relative to Singapore, Thailand, and Malaysia?',
      'What are the policy levers for increasing Vietnam\'s presence in regional multilateral institutions?',
      'How do the country\'s diaspora networks compare to regional peers as soft power assets?',
      'What would a coordinated Vietnam nation brand strategy look like across MFA, MPI, and MOET mandates?',
    ],
    methods: ['Soft power index analysis', 'Peer country benchmarking', 'Stakeholder interviews across government and private sector'],
    keyOutput: 'Policy paper: Soft Power Architecture for Vietnam\'s 2030 Regional Positioning',
  },
]

export default function AgendaPage() {
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
          paddingBottom: '2.5rem',
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
          Research Agenda
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.25',
            marginBottom: '1rem',
          }}
        >
          Three Threads, One Thesis
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Each research thread investigates a different dimension of Vietnam&rsquo;s
          development challenge. Together, they converge on a single claim: that Vietnam&rsquo;s
          growth potential is structurally constrained by policy architecture that was
          designed for the 20th-century economy, not the one emerging now.
        </p>
      </section>

      {/* Capstone hypothesis */}
      <section
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--color-border)',
          maxWidth: '720px',
        }}
      >
        <div
          style={{
            backgroundColor: '#EBF0F7',
            borderLeft: '4px solid var(--color-accent)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            padding: '1.5rem 1.75rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              fontWeight: '700',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
            }}
          >
            Capstone Hypothesis
          </div>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontWeight: '500',
              color: 'var(--color-accent)',
              lineHeight: 'var(--leading-relaxed)',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            &ldquo;Vietnam&rsquo;s 2025–2035 growth target is achievable — but only if rural
            digital inclusion, province-differentiated investment, and deliberate soft power
            positioning are treated as first-order policy problems. Currently, none of them
            are. The institutional architecture to address them does not exist. Building it
            is the policy work of the next decade.&rdquo;
          </p>
        </div>
      </section>

      {/* Research threads */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {threads.map((thread) => (
            <div
              key={thread.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0',
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Thread header */}
              <div
                style={{
                  backgroundColor: 'var(--color-accent)',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      color: 'rgba(255,255,255,0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Thread {thread.number} &middot; {thread.timeframe}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      lineHeight: 'var(--leading-snug)',
                      margin: 0,
                    }}
                  >
                    {thread.title}
                  </h2>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color:
                      thread.status === 'Active'
                        ? '#1B3A5C'
                        : 'rgba(255,255,255,0.7)',
                    backgroundColor:
                      thread.status === 'Active' ? '#FFFFFF' : 'rgba(255,255,255,0.15)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    flexShrink: 0,
                  }}
                >
                  {thread.status}
                </span>
              </div>

              {/* Thread body */}
              <div style={{ padding: '2rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {thread.summary}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {/* Research questions */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Research Questions
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      {thread.questions.map((q) => (
                        <li
                          key={q}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--color-accent-red)',
                              flexShrink: 0,
                              marginTop: '0.1em',
                            }}
                          >
                            &rsaquo;
                          </span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Methods + output */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Methods
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 1.25rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                      }}
                    >
                      {thread.methods.map((m) => (
                        <li
                          key={m}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--color-accent)',
                              flexShrink: 0,
                              marginTop: '0.1em',
                            }}
                          >
                            &rsaquo;
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Target Output
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        fontStyle: 'italic',
                      }}
                    >
                      {thread.keyOutput}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
