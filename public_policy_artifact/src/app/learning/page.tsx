import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning',
  description:
    'Self-directed policy curriculum documenting continuous learning and research depth.',
}

const phases = [
  {
    phase: 'Phase 1',
    title: 'Foundations of Public Policy',
    period: 'Sep 2024 – Dec 2024',
    status: 'complete',
    description:
      'Core policy analysis frameworks: problem definition, agenda-setting, policy design, implementation, and evaluation. Primary texts from MIT OpenCourseWare and the Kennedy School\'s online materials.',
    items: [
      'Policy analysis cycle: problem → alternatives → criteria → recommendation',
      'Welfare economics fundamentals: efficiency, equity, externalities, public goods',
      'Vietnam institutional landscape: ministry structure, central-local relations, planning process',
      'Daron Acemoglu & James Robinson — Why Nations Fail (institutional economics lens)',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Financial Inclusion & Development Finance',
    period: 'Jan 2025 – Apr 2025',
    status: 'complete',
    description:
      'Deep dive into rural finance policy, microfinance evidence, and digital financial services regulation. Focused on Vietnam and Southeast Asia comparators.',
    items: [
      'World Bank Global Findex reports (2017, 2021, 2024) — methodological and substantive read',
      'CGAP research on digital financial services for the unbanked',
      'Vietnam SBV financial inclusion strategy analysis',
      'Bangladesh BRAC, Kenya M-Pesa, India UPI — comparative case studies',
      'Regulatory sandbox models: Singapore MAS, Philippines BSP',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Quantitative Methods for Policy Analysis',
    period: 'May 2025 – Aug 2025',
    status: 'complete',
    description:
      'Statistics and econometrics applied to policy questions. Focus on causal inference, program evaluation, and working with GSO/World Bank data.',
    items: [
      'Difference-in-differences, regression discontinuity, instrumental variables (conceptual)',
      'Working with Vietnam Household Living Standards Survey (VHLSS) data',
      'Cost-benefit analysis frameworks for public investment',
      'Replication of key financial inclusion impact studies',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Regional Political Economy & Trade',
    period: 'Sep 2025 – Dec 2025',
    status: 'complete',
    description:
      'ASEAN economic integration, Vietnam\'s position in regional value chains, and the political economy of development. Connects private sector observations to macro context.',
    items: [
      'ASEAN Economic Community: architecture, gaps, and prospects',
      'Vietnam in global value chains: FDI-led industrialization model',
      'Digital economy governance in SEA: fragmented standards vs. convergence pressures',
      'Dani Rodrik — Straight Talk on Trade (development economics perspective)',
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Policy Writing & Communication',
    period: 'Jan 2026 – Present',
    status: 'active',
    description:
      'Translating research into policy-relevant outputs. Writing papers, memos, and presentations for non-specialist audiences. This portfolio is the primary output of this phase.',
    items: [
      'Policy memo format: problem statement, options, recommendation, implementation',
      'Writing for decision-makers: pyramid principle applied to policy',
      'First working paper: Vietnam\'s Rural Digital Exclusion (published here)',
      'Research agenda development: three threads, capstone hypothesis',
    ],
  },
]

export default function LearningPage() {
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
          Learning
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
          Self-Directed Curriculum
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          This curriculum documents a continuous learning agenda for policy research and
          public problem-solving. It maps the knowledge gaps I identified after a decade
          in private-sector strategy, and the systematic effort to close them.
        </p>
      </section>

      {/* Phases */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '780px' }}>
          {phases.map((phase) => (
            <div
              key={phase.phase}
              style={{
                backgroundColor: phase.status === 'active' ? '#FAFAF8' : 'var(--color-bg-card)',
                border: `1px solid ${phase.status === 'active' ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 2rem',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
              }}
            >
              {/* Status badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color:
                    phase.status === 'active'
                      ? 'var(--color-accent)'
                      : 'var(--color-text-muted)',
                  backgroundColor:
                    phase.status === 'active' ? '#EBF0F7' : 'var(--color-bg-secondary)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '999px',
                }}
              >
                {phase.status === 'active' ? 'In Progress' : 'Complete'}
              </div>

              {/* Phase label */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  color: 'var(--color-accent-red)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}
              >
                {phase.phase} &middot; {phase.period}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  marginBottom: '0.75rem',
                }}
              >
                {phase.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '1.25rem',
                }}
              >
                {phase.description}
              </p>

              {/* Items */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                {phase.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      gap: '0.625rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-accent)',
                        marginTop: '0.1em',
                        flexShrink: 0,
                      }}
                    >
                      &rsaquo;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
