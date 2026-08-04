'use client'

// Joseph Nye's Three Pillars of Soft Power
interface PillarData {
  name: string
  strength: 'strong' | 'moderate' | 'weak'
  assets: string[]
  gaps: string[]
}

interface SoftPowerFrameworkProps {
  country?: string
  pillars?: PillarData[]
}

const defaultPillars: PillarData[] = [
  {
    name: 'Culture',
    strength: 'moderate',
    assets: [
      'UNESCO World Heritage sites (8)',
      'Globally recognized cuisine (pho, banh mi)',
      'Growing tourism industry (pre-pandemic 18M visitors)',
      'Ao dai as cultural symbol',
    ],
    gaps: [
      'Limited entertainment exports vs K-pop/J-pop',
      'Vietnamese language not widely studied',
      'Cultural institutes abroad underfunded',
    ],
  },
  {
    name: 'Political Values',
    strength: 'weak',
    assets: [
      'Political stability attracts investment',
      'Consistent economic growth messaging',
      'ASEAN centrality positioning',
    ],
    gaps: [
      'Governance transparency concerns',
      'Press freedom rankings low',
      'Limited civil society voice internationally',
    ],
  },
  {
    name: 'Foreign Policy',
    strength: 'moderate',
    assets: [
      'Bamboo diplomacy (balancing major powers)',
      'CPTPP, RCEP, EU-Vietnam FTA signatory',
      'UN peacekeeping contributions',
      '17 strategic/comprehensive partnerships',
    ],
    gaps: [
      'South China Sea disputes affect image',
      'Limited development aid to others',
      'Think tank capacity below Singapore/Indonesia',
    ],
  },
]

export default function SoftPowerFramework({
  country = 'Vietnam',
  pillars = defaultPillars,
}: SoftPowerFrameworkProps) {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong':
        return { bg: '#E8F5E9', border: '#1B5E20', text: '#1B5E20' }
      case 'moderate':
        return { bg: '#FFF8E1', border: '#F57C00', text: '#E65100' }
      case 'weak':
        return { bg: '#FFEBEE', border: '#C62828', text: '#B71C1C' }
      default:
        return { bg: '#F5F5F5', border: '#9E9E9E', text: '#616161' }
    }
  }

  return (
    <div style={{ padding: '1rem 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: '600',
            color: 'var(--color-accent)',
          }}
        >
          {country}&apos;s Soft Power Pillars
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginTop: '0.25rem',
          }}
        >
          Joseph Nye&apos;s Three-Pillar Framework
        </div>
      </div>

      {/* Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {pillars.map((pillar) => {
          const colors = getStrengthColor(pillar.strength)
          return (
            <div
              key={pillar.name}
              style={{
                backgroundColor: colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
              }}
            >
              {/* Pillar Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    color: colors.text,
                  }}
                >
                  {pillar.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: colors.text,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                  }}
                >
                  {pillar.strength}
                </div>
              </div>

              {/* Assets */}
              <div style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#1B5E20',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Assets
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  {pillar.assets.map((asset, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#C62828',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Gaps
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  {pillar.gaps.map((gap, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Strategic Position Matrix - 2x2 for positioning
interface PositionItem {
  label: string
  x: number // 0-100
  y: number // 0-100
  size?: number
  color?: string
}

interface StrategicPositionMatrixProps {
  title?: string
  xLabel?: string
  yLabel?: string
  quadrantLabels?: [string, string, string, string] // Top-left, Top-right, Bottom-left, Bottom-right
  items?: PositionItem[]
}

export function StrategicPositionMatrix({
  title = 'Strategic Position Matrix',
  xLabel = 'Current Capability',
  yLabel = 'Strategic Priority',
  quadrantLabels = ['Invest', 'Lead', 'Deprioritize', 'Maintain'],
  items = [
    { label: 'Tourism', x: 75, y: 70, color: '#1B5E20' },
    { label: 'Cuisine', x: 70, y: 55, color: '#1B5E20' },
    { label: 'Tech Talent', x: 45, y: 85, color: '#F57C00' },
    { label: 'Governance', x: 35, y: 60, color: '#C62828' },
    { label: 'Entertainment', x: 25, y: 75, color: '#C62828' },
    { label: 'FTAs', x: 80, y: 50, color: '#1B3A5C' },
  ],
}: StrategicPositionMatrixProps) {
  return (
    <div style={{ padding: '1rem 0' }}>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-lg)',
          fontWeight: '600',
          color: 'var(--color-accent)',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}
      >
        {title}
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '1',
          margin: '0 auto',
          border: '2px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Quadrants */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
          }}
        >
          <div style={{ backgroundColor: '#FFF8E1', borderRight: '1px dashed #E2DDD5', borderBottom: '1px dashed #E2DDD5' }} />
          <div style={{ backgroundColor: '#E8F5E9', borderBottom: '1px dashed #E2DDD5' }} />
          <div style={{ backgroundColor: '#FFEBEE', borderRight: '1px dashed #E2DDD5' }} />
          <div style={{ backgroundColor: '#F5F5F5' }} />
        </div>

        {/* Quadrant Labels */}
        {quadrantLabels.map((label, i) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              ...(i === 0 ? { top: '8px', left: '8px' } : {}),
              ...(i === 1 ? { top: '8px', right: '8px' } : {}),
              ...(i === 2 ? { bottom: '8px', left: '8px' } : {}),
              ...(i === 3 ? { bottom: '8px', right: '8px' } : {}),
            }}
          >
            {label}
          </div>
        ))}

        {/* Items */}
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              position: 'absolute',
              left: `${item.x}%`,
              bottom: `${item.y}%`,
              transform: 'translate(-50%, 50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <div
              style={{
                width: `${item.size || 12}px`,
                height: `${item.size || 12}px`,
                borderRadius: '50%',
                backgroundColor: item.color || '#1B3A5C',
                border: '2px solid #fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: '500',
                color: 'var(--color-text-secondary)',
                whiteSpace: 'nowrap',
                backgroundColor: 'rgba(255,255,255,0.8)',
                padding: '1px 4px',
                borderRadius: '2px',
              }}
            >
              {item.label}
            </div>
          </div>
        ))}

        {/* Axis Labels */}
        <div
          style={{
            position: 'absolute',
            bottom: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
          }}
        >
          {xLabel} &rarr;
        </div>
        <div
          style={{
            position: 'absolute',
            left: '-24px',
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {yLabel} &rarr;
        </div>
      </div>
    </div>
  )
}
