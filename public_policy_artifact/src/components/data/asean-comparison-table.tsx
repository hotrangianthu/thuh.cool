'use client'

interface CountryData {
  country: string
  softPowerRank: number
  softPowerScore: number
  giiRank: number
  fdiInflows: number // billions USD
  tourismArrivals: number // millions
  brandValue: number // billions USD
  highlight?: boolean
}

const aseanData: CountryData[] = [
  { country: 'Singapore', softPowerRank: 21, softPowerScore: 55.6, giiRank: 5, fdiInflows: 141, tourismArrivals: 13.6, brandValue: 658 },
  { country: 'Malaysia', softPowerRank: 36, softPowerScore: 46.1, giiRank: 33, fdiInflows: 17.0, tourismArrivals: 26.1, brandValue: 198 },
  { country: 'Thailand', softPowerRank: 39, softPowerScore: 45.4, giiRank: 43, fdiInflows: 10.0, tourismArrivals: 28.0, brandValue: 265 },
  { country: 'Indonesia', softPowerRank: 45, softPowerScore: 42.9, giiRank: 61, fdiInflows: 21.0, tourismArrivals: 10.4, brandValue: 296 },
  { country: 'Vietnam', softPowerRank: 52, softPowerScore: 39.9, giiRank: 46, fdiInflows: 18.5, tourismArrivals: 12.6, brandValue: 235, highlight: true },
  { country: 'Philippines', softPowerRank: 53, softPowerScore: 39.9, giiRank: 59, fdiInflows: 9.2, tourismArrivals: 5.4, brandValue: 152 },
]

interface ASEANComparisonTableProps {
  showAllMetrics?: boolean
  highlightVietnam?: boolean
}

export default function ASEANComparisonTable({
  showAllMetrics = true,
  highlightVietnam = true,
}: ASEANComparisonTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: 'var(--color-accent)' }}>
            <th
              style={{
                textAlign: 'left',
                padding: '0.75rem 0.5rem',
                color: '#fff',
                fontWeight: '600',
              }}
            >
              Country
            </th>
            <th
              style={{
                textAlign: 'center',
                padding: '0.75rem 0.5rem',
                color: '#fff',
                fontWeight: '600',
              }}
            >
              Soft Power
              <br />
              <span style={{ fontWeight: '400', fontSize: '10px' }}>Global Rank</span>
            </th>
            <th
              style={{
                textAlign: 'center',
                padding: '0.75rem 0.5rem',
                color: '#fff',
                fontWeight: '600',
              }}
            >
              Innovation
              <br />
              <span style={{ fontWeight: '400', fontSize: '10px' }}>GII Rank</span>
            </th>
            {showAllMetrics && (
              <>
                <th
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    color: '#fff',
                    fontWeight: '600',
                  }}
                >
                  FDI Inflows
                  <br />
                  <span style={{ fontWeight: '400', fontSize: '10px' }}>$B (2023)</span>
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    color: '#fff',
                    fontWeight: '600',
                  }}
                >
                  Tourism
                  <br />
                  <span style={{ fontWeight: '400', fontSize: '10px' }}>M arrivals</span>
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    color: '#fff',
                    fontWeight: '600',
                  }}
                >
                  Nation Brand
                  <br />
                  <span style={{ fontWeight: '400', fontSize: '10px' }}>Value $B</span>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {aseanData.map((row, idx) => {
            const isVietnam = row.highlight && highlightVietnam
            return (
              <tr
                key={row.country}
                style={{
                  backgroundColor: isVietnam ? '#FFF5F5' : idx % 2 ? 'var(--color-bg-secondary)' : '#fff',
                  borderLeft: isVietnam ? '3px solid #8B1A1A' : 'none',
                }}
              >
                <td
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    fontWeight: isVietnam ? '700' : '500',
                    color: isVietnam ? '#8B1A1A' : 'var(--color-text-primary)',
                  }}
                >
                  {row.country}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span style={{ fontWeight: '600' }}>#{row.softPowerRank}</span>
                  <br />
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                    {row.softPowerScore}
                  </span>
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    fontWeight: '600',
                  }}
                >
                  #{row.giiRank}
                </td>
                {showAllMetrics && (
                  <>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '0.75rem 0.5rem',
                        borderBottom: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      ${row.fdiInflows}B
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '0.75rem 0.5rem',
                        borderBottom: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {row.tourismArrivals}M
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '0.75rem 0.5rem',
                        borderBottom: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      ${row.brandValue}B
                    </td>
                  </>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Source note */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          color: 'var(--color-text-muted)',
          marginTop: '0.75rem',
          textAlign: 'right',
        }}
      >
        Sources: Brand Finance Global Soft Power Index 2025, WIPO GII 2024, UNCTAD FDI 2023, UNWTO 2023
      </div>
    </div>
  )
}

// Key Insight Cards Component
interface InsightCard {
  metric: string
  value: string
  context: string
  trend: 'up' | 'down' | 'stable'
  color?: string
}

interface KeyInsightCardsProps {
  insights?: InsightCard[]
}

export function KeyInsightCards({
  insights = [
    { metric: 'Soft Power Rank', value: '#52', context: 'of 193 countries globally (2025)', trend: 'stable', color: '#1B3A5C' },
    { metric: 'ASEAN Position', value: '#5', context: 'of 10 ASEAN members', trend: 'stable', color: '#F57C00' },
    { metric: 'Brand Value Growth', value: '+12%', context: 'year-over-year increase', trend: 'up', color: '#1B5E20' },
    { metric: 'Innovation Rank', value: '#44', context: 'GII 2024, #1 lower-middle income', trend: 'up', color: '#1B3A5C' },
  ],
}: KeyInsightCardsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '\u2191'
      case 'down':
        return '\u2193'
      default:
        return '\u2194'
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
      }}
    >
      {insights.map((insight) => (
        <div
          key={insight.metric}
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: '600',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
            }}
          >
            {insight.metric}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '700',
              color: insight.color || 'var(--color-accent)',
              lineHeight: '1',
              marginBottom: '0.25rem',
            }}
          >
            {insight.value}
            <span
              style={{
                fontSize: '14px',
                marginLeft: '4px',
                color: insight.trend === 'up' ? '#1B5E20' : insight.trend === 'down' ? '#C62828' : '#F57C00',
              }}
            >
              {getTrendIcon(insight.trend)}
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
            }}
          >
            {insight.context}
          </div>
        </div>
      ))}
    </div>
  )
}
