'use client'

interface HexagonPillar {
  name: string
  score: number
  description: string
}

interface NationBrandHexagonProps {
  country?: string
  pillars?: HexagonPillar[]
}

// Anholt-GfK Nation Brand Hexagon default data for Vietnam
const defaultPillars: HexagonPillar[] = [
  { name: 'Exports', score: 62, description: 'Products, services, and brands' },
  { name: 'Governance', score: 45, description: 'Government competence and fairness' },
  { name: 'Culture', score: 68, description: 'Heritage, arts, and entertainment' },
  { name: 'People', score: 72, description: 'Warmth, openness, competence' },
  { name: 'Tourism', score: 74, description: 'Natural beauty and attractions' },
  { name: 'Investment', score: 58, description: 'Business climate and talent' },
]

export default function NationBrandHexagon({
  country = 'Vietnam',
  pillars = defaultPillars,
}: NationBrandHexagonProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return '#1B5E20'
    if (score >= 55) return '#1B3A5C'
    if (score >= 40) return '#F57C00'
    return '#8B1A1A'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Strong'
    if (score >= 55) return 'Moderate'
    if (score >= 40) return 'Developing'
    return 'Weak'
  }

  return (
    <div style={{ padding: '1rem 0' }}>
      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: '600',
            color: 'var(--color-accent)',
          }}
        >
          {country} Nation Brand Hexagon
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginTop: '0.25rem',
          }}
        >
          Based on Anholt-GfK Nation Brands Index methodology
        </div>
      </div>

      {/* Hexagon Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.name}
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Score Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: getScoreColor(pillar.score),
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {pillar.score}
            </div>

            {/* Pillar Name */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              {pillar.name}
            </div>

            {/* Score Bar */}
            <div
              style={{
                height: '6px',
                backgroundColor: '#E2DDD5',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${pillar.score}%`,
                  backgroundColor: getScoreColor(pillar.score),
                  borderRadius: '3px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            {/* Description */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.3',
              }}
            >
              {pillar.description}
            </div>

            {/* Score Label */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: '600',
                color: getScoreColor(pillar.score),
                marginTop: '0.25rem',
              }}
            >
              {getScoreLabel(pillar.score)}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Strong (70+)', color: '#1B5E20' },
          { label: 'Moderate (55-69)', color: '#1B3A5C' },
          { label: 'Developing (40-54)', color: '#F57C00' },
          { label: 'Weak (<40)', color: '#8B1A1A' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              color: 'var(--color-text-muted)',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: item.color,
              }}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
