import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hot Takes',
  description:
    'Contrarian positions on Vietnam\'s digital economy, fintech policy, and rural development. With confidence levels and reasoning.',
}

interface HotTake {
  id: string
  claim: string
  confidence: number
  reasoning: string
  implications: string[]
  date: string
  category: 'Fintech' | 'Policy' | 'Product' | 'Vietnam'
}

const hotTakes: HotTake[] = [
  {
    id: '1',
    claim:
      'Agent banking will do more for rural financial inclusion than mobile apps ever will.',
    confidence: 85,
    reasoning:
      'Trust is built face-to-face. Rural users need a human intermediary they can visit when something goes wrong. Apps assume digital literacy and smartphone comfort that most rural Vietnamese do not have. Bangladesh\'s bKash reached 50 million users through agents before it reached a significant share through apps. Vietnam has the network — Agribank agents, commune pharmacies, agri-input stores — but no regulatory incentive to use it.',
    implications: [
      'Policy should prioritize agent network licensing over app-based solutions.',
      'Banks should partner with existing rural retail networks rather than build new channels.',
      'Digital literacy programs should target agents first, end-users second.',
    ],
    date: 'March 2026',
    category: 'Fintech',
  },
  {
    id: '2',
    claim:
      'Vietnam\'s 2025–2035 digital plan will miss its rural inclusion targets by at least 40%.',
    confidence: 70,
    reasoning:
      'The plan distributes responsibility for rural digital inclusion across three ministries with no coordination mechanism and no single accountable party. Provincial governments are evaluated on GDP growth, not digital penetration. This is not a resource problem — it is an incentive problem. Diffuse accountability produces diffuse outcomes.',
    implications: [
      'A dedicated rural digital taskforce with cross-ministry authority is necessary, not optional.',
      'Provincial performance metrics must include active digital usage KPIs, not just infrastructure coverage.',
      'Private sector partnerships need clearer co-investment and regulatory frameworks.',
    ],
    date: 'February 2026',
    category: 'Policy',
  },
  {
    id: '3',
    claim:
      'The best fintech product for rural Vietnam has not been built yet — and it is not an app.',
    confidence: 75,
    reasoning:
      'Every significant fintech product for rural Vietnam has been designed by urban engineers for urban assumptions: reliable data, smartphone fluency, stable electricity. The winning product will be voice-first, offline-capable, agent-assisted, and invisible to the end user — embedded in existing commerce flows like agricultural supply chains or commune cooperative transactions.',
    implications: [
      'Voice interfaces in Vietnamese regional dialects are severely underinvested.',
      'USSD-based solutions have a second life if paired with human agents.',
      'Agricultural supply chain integration is the most viable distribution channel.',
    ],
    date: 'March 2026',
    category: 'Product',
  },
  {
    id: '4',
    claim:
      'Vietnam\'s digital economy success is creating a two-speed society that will become politically destabilizing within a decade.',
    confidence: 60,
    reasoning:
      'Urban-rural digital inequality is widening, not converging. Young rural Vietnamese observe urban digital prosperity through social media but cannot access it locally. Aspiration-reality gaps of this magnitude — visible, persistent, and policy-generated — have historically fueled political pressure. This is not a prediction; it is a risk that current policy is not managing.',
    implications: [
      'Digital inclusion should be framed as a political stability issue, not just an economic one.',
      'Rural digital programs need to deliver visible, tangible benefits within 12–24 months.',
      'Content and services localization for rural audiences is undervalued and underfunded.',
    ],
    date: 'April 2026',
    category: 'Vietnam',
  },
  {
    id: '5',
    claim:
      'Most "financial inclusion" metrics are vanity metrics. Account ownership means nothing without active usage.',
    confidence: 90,
    reasoning:
      'Vietnam reports high mobile money account numbers. Transaction frequency data tells a different story. Dormant accounts — opened to qualify for a government program or satisfy a bank\'s rural mandate — are counted as "included." The World Bank\'s own Global Findex data shows Vietnam\'s active usage rates significantly trail account ownership rates, particularly in rural provinces. We are measuring enrollment, not inclusion.',
    implications: [
      'Policy should mandate monthly active user reporting by geography, not just account registration.',
      'Transaction frequency disaggregated by rural/urban should be a standard published metric.',
      'Incentive programs for financial institutions should reward usage, not account opening.',
    ],
    date: 'April 2026',
    category: 'Fintech',
  },
  {
    id: '6',
    claim:
      'The real barrier to rural digital inclusion is not infrastructure — it is trust.',
    confidence: 80,
    reasoning:
      'Coverage maps show 4G reaching most of Vietnam\'s provinces. But network coverage and active digital participation are not the same thing. In fieldwork with an agricultural community in Binh Dinh, the most common response to "why don\'t you use mobile banking?" was not "no signal" — it was "I don\'t trust it" and "I don\'t know what happens if something goes wrong." Trust is a policy problem, not a telecom problem. It requires accountability mechanisms, redress systems, and visible enforcement.',
    implications: [
      'Consumer protection frameworks for digital finance need rural-specific implementation.',
      'Dispute resolution mechanisms must be accessible without smartphones or internet.',
      'Government should publish and publicize enforcement actions against predatory digital lenders.',
    ],
    date: 'May 2026',
    category: 'Vietnam',
  },
]

const confidenceColor = (n: number) =>
  n >= 80 ? '#276749' : n >= 65 ? '#C05621' : '#8B1A1A'

const categoryStyle: Record<HotTake['category'], { bg: string; text: string }> = {
  Fintech: { bg: '#EBF5FF', text: '#1B3A5C' },
  Policy: { bg: '#F7EDED', text: '#8B1A1A' },
  Product: { bg: '#F0FFF4', text: '#276749' },
  Vietnam: { bg: '#FFFAF0', text: '#C05621' },
}

export default function HotTakesPage() {
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
          href="/public-policy/voice"
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
          &larr; Voice
        </Link>
      </div>

      {/* Header */}
      <section
        style={{
          paddingTop: '3rem',
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
          Voice / Hot Takes
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
          Contrarian positions I&rsquo;m willing to defend.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Each take includes a confidence level, the reasoning behind it, and the
          policy implications I draw from it. I update these when evidence changes
          my mind &mdash; which it occasionally does.
        </p>
      </section>

      {/* Takes list */}
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '780px' }}>
          {hotTakes.map((take) => {
            const cat = categoryStyle[take.category]
            const cc = confidenceColor(take.confidence)
            return (
              <article
                key={take.id}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Meta row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '600',
                      color: cat.text,
                      backgroundColor: cat.bg,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {take.category}
                  </span>

                  {/* Confidence indicator */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginLeft: 'auto',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Confidence
                    </span>
                    <div
                      style={{
                        width: '56px',
                        height: '6px',
                        backgroundColor: 'var(--color-border)',
                        borderRadius: '999px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${take.confidence}%`,
                          height: '100%',
                          backgroundColor: cc,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        color: cc,
                        minWidth: '2.5rem',
                      }}
                    >
                      {take.confidence}%
                    </span>
                  </div>
                </div>

                {/* Claim */}
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--leading-snug)',
                    marginBottom: '1.5rem',
                  }}
                >
                  &ldquo;{take.claim}&rdquo;
                </h2>

                {/* Reasoning */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '600',
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Why I believe this
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      margin: 0,
                    }}
                  >
                    {take.reasoning}
                  </p>
                </div>

                {/* Implications */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '600',
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Implications
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                    {take.implications.map((imp, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-base)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                          marginBottom: '0.375rem',
                        }}
                      >
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Date */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  {take.date}
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
