'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

type Province = {
  name: string
  region: string
  connectivity: number
  literacy: number
  fintech: number
  banking: number
}

const provinces: Province[] = [
  { name: 'Ho Chi Minh City', region: 'South', connectivity: 95, literacy: 88, fintech: 78, banking: 85 },
  { name: 'Hanoi', region: 'North', connectivity: 92, literacy: 85, fintech: 72, banking: 80 },
  { name: 'Da Nang', region: 'Central', connectivity: 85, literacy: 78, fintech: 55, banking: 65 },
  { name: 'Binh Duong', region: 'South', connectivity: 82, literacy: 75, fintech: 48, banking: 58 },
  { name: 'Can Tho', region: 'Mekong', connectivity: 72, literacy: 65, fintech: 35, banking: 45 },
  { name: 'Nghe An', region: 'North Central', connectivity: 62, literacy: 58, fintech: 22, banking: 32 },
  { name: 'Binh Dinh', region: 'South Central', connectivity: 58, literacy: 52, fintech: 18, banking: 28 },
  { name: 'Dak Lak', region: 'Highlands', connectivity: 55, literacy: 48, fintech: 15, banking: 22 },
  { name: 'Son La', region: 'Northwest', connectivity: 45, literacy: 42, fintech: 8, banking: 15 },
  { name: 'Cao Bang', region: 'Northeast', connectivity: 42, literacy: 38, fintech: 6, banking: 12 },
]

// Weighted composite: connectivity 25%, literacy 30%, fintech 25%, banking 20%
function compositeScore(p: Province) {
  return Math.round(
    p.connectivity * 0.25 + p.literacy * 0.3 + p.fintech * 0.25 + p.banking * 0.2
  )
}

// Urban benchmark (average of HCMC + Hanoi)
const urbanBenchmark = {
  connectivity: 93.5,
  literacy: 86.5,
  fintech: 75,
  banking: 82.5,
}

const DIMS = ['Connectivity', 'Literacy', 'Fintech', 'Banking'] as const
type Dim = (typeof DIMS)[number]
const dimKey: Record<Dim, keyof Province> = {
  Connectivity: 'connectivity',
  Literacy: 'literacy',
  Fintech: 'fintech',
  Banking: 'banking',
}
const dimWeight: Record<Dim, string> = {
  Connectivity: '25%',
  Literacy: '30%',
  Fintech: '25%',
  Banking: '20%',
}

function ScoreBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-accent)' }}>
          {value}/100
        </span>
      </div>
      <div style={{ height: '6px', backgroundColor: '#E2DDD5', borderRadius: '999px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(value / max) * 100}%`,
            backgroundColor: value >= 70 ? '#1a6b3a' : value >= 40 ? 'var(--color-accent)' : 'var(--color-accent-red)',
            borderRadius: '999px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  )
}

export default function ProvinceReadinessScorer() {
  const [primaryIdx, setPrimaryIdx] = useState(4) // Can Tho default
  const [compareIdx, setCompareIdx] = useState<number | null>(null)
  const [showMethodology, setShowMethodology] = useState(false)

  const primary = provinces[primaryIdx]
  const compare = compareIdx !== null ? provinces[compareIdx] : null

  const primaryScore = useMemo(() => compositeScore(primary), [primary])
  const compareScore = useMemo(() => (compare ? compositeScore(compare) : null), [compare])

  const radarData = useMemo(() => {
    const datasets = [
      {
        label: primary.name,
        data: DIMS.map((d) => primary[dimKey[d]] as number),
        backgroundColor: 'rgba(27, 58, 92, 0.2)',
        borderColor: 'rgba(27, 58, 92, 0.9)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(27, 58, 92, 0.9)',
        pointRadius: 4,
      },
      {
        label: 'Urban Benchmark',
        data: DIMS.map((d) => urbanBenchmark[d.toLowerCase() as keyof typeof urbanBenchmark]),
        backgroundColor: 'rgba(139, 26, 26, 0.08)',
        borderColor: 'rgba(139, 26, 26, 0.5)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointBackgroundColor: 'rgba(139, 26, 26, 0.5)',
        pointRadius: 3,
      },
    ]
    if (compare) {
      datasets.splice(1, 0, {
        label: compare.name,
        data: DIMS.map((d) => compare[dimKey[d]] as number),
        backgroundColor: 'rgba(21, 128, 61, 0.15)',
        borderColor: 'rgba(21, 128, 61, 0.85)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(21, 128, 61, 0.85)',
        pointRadius: 4,
      })
    }
    return { labels: DIMS as unknown as string[], datasets }
  }, [primary, compare])

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25, font: { size: 10 }, color: '#718096' },
        pointLabels: { font: { size: 12 }, color: '#1A1A1A' },
        grid: { color: '#E2DDD5' },
      },
    },
    plugins: {
      legend: { position: 'bottom' as const, labels: { font: { size: 12 }, padding: 16 } },
    },
  }

  // Gap analysis: biggest deficit vs urban benchmark
  const gaps = DIMS.map((d) => ({
    dim: d,
    gap: Math.round(urbanBenchmark[d.toLowerCase() as keyof typeof urbanBenchmark] - (primary[dimKey[d]] as number)),
  })).sort((a, b) => b.gap - a.gap)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
      {/* Breadcrumb */}
      <div style={{ paddingTop: '2rem', marginBottom: '0.5rem' }}>
        <Link
          href="/public-policy/playgrounds"
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}
        >
          &larr; Playgrounds
        </Link>
      </div>

      {/* Header */}
      <section style={{ paddingTop: '1.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '500',
            color: 'var(--color-accent-red)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}
        >
          Tool 2 of 3 &middot; Comparative Analysis
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.2',
            marginBottom: '0.75rem',
          }}
        >
          Province Digital Readiness Scorer
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '620px',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Select a province to score across 4 dimensions and see how far it sits from the national
          urban benchmark. Add a second province for side-by-side comparison.
        </p>
      </section>

      <div
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Selectors + scores */}
        <div>
          {/* Province selector */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '1rem',
            }}
          >
            <label
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: '600',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Primary Province
            </label>
            <select
              value={primaryIdx}
              onChange={(e) => {
                const val = Number(e.target.value)
                setPrimaryIdx(val)
                if (compareIdx === val) setCompareIdx(null)
              }}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                marginBottom: '1.25rem',
              }}
            >
              {provinces.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name} ({p.region})
                </option>
              ))}
            </select>

            {/* Composite score */}
            <div
              style={{
                backgroundColor: '#EBF0F7',
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem 1rem',
                textAlign: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                Composite Score
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', fontWeight: '700', color: 'var(--color-accent)' }}>
                {primaryScore}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>out of 100</div>
            </div>

            {DIMS.map((d) => (
              <ScoreBar key={d} label={`${d} (${dimWeight[d]})`} value={primary[dimKey[d]] as number} />
            ))}
          </div>

          {/* Compare selector */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <label
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: '600',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Compare With (optional)
            </label>
            <select
              value={compareIdx ?? ''}
              onChange={(e) => setCompareIdx(e.target.value === '' ? null : Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
            >
              <option value="">None</option>
              {provinces.map((p, i) =>
                i !== primaryIdx ? (
                  <option key={p.name} value={i}>
                    {p.name} ({p.region})
                  </option>
                ) : null
              )}
            </select>

            {compare && compareScore !== null && (
              <div
                style={{
                  backgroundColor: '#f0faf4',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.875rem 1rem',
                  textAlign: 'center',
                  marginTop: '1rem',
                }}
              >
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                  {compare.name} Score
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: '700', color: '#1a6b3a' }}>
                  {compareScore}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {compareScore > primaryScore ? `+${compareScore - primaryScore}` : compareScore - primaryScore} vs {primary.name}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Radar + gap analysis */}
        <div>
          {/* Radar */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
              height: '380px',
              marginBottom: '1.5rem',
            }}
          >
            <Radar data={radarData} options={radarOptions} />
          </div>

          {/* Gap analysis */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '1.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Gap vs. National Urban Average
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {gaps.map(({ dim, gap }) => (
                <div
                  key={dim}
                  style={{
                    backgroundColor: gap > 30 ? '#f8dede' : gap > 15 ? '#fef3c7' : '#f0faf4',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                    {dim}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: '700',
                      color: gap > 30 ? '#8B1A1A' : gap > 15 ? '#7a5c00' : '#1a6b3a',
                    }}
                  >
                    {gap > 0 ? `-${gap}` : gap === 0 ? '0' : `+${Math.abs(gap)}`}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    pts {gap > 0 ? 'below' : 'above'} benchmark
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '1rem', lineHeight: '1.6' }}>
              Urban benchmark = average of Ho Chi Minh City + Hanoi. Red = critical gap (&gt;30 pts). Yellow = moderate gap (15–30 pts). Green = near parity.
            </p>
          </div>

          {/* Methodology toggle */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'var(--color-text-secondary)',
                textAlign: 'left',
              }}
            >
              <span>How scores are calculated</span>
              <span style={{ fontFamily: 'monospace' }}>{showMethodology ? '−' : '+'}</span>
            </button>
            {showMethodology && (
              <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--color-border-light)' }}>
                <code
                  style={{
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.8',
                    paddingTop: '0.75rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {`composite = connectivity×0.25 + literacy×0.30 + fintech×0.25 + banking×0.20

Dimension weights reflect policy priority:
  Literacy weighted highest (30%) — digital literacy
  is the binding constraint for rural adoption.

Data: illustrative scores calibrated to ITU/GSMA/SBV
public data for Vietnam provinces (2023–2024).`}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
