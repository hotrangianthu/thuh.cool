'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.4rem',
        }}
      >
        <label
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '500',
            color: 'var(--color-text-primary)',
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            color: 'var(--color-accent)',
          }}
        >
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.15rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          {format(min)}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          {format(max)}
        </span>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      style={{
        backgroundColor: highlight ? '#EBF0F7' : 'var(--color-bg-card)',
        border: `1px solid ${highlight ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          fontWeight: '500',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.4rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: '700',
          color: highlight ? 'var(--color-accent)' : 'var(--color-text-primary)',
          lineHeight: '1.1',
          marginBottom: '0.25rem',
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

const fmtNum = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(0)}K`
    : n.toFixed(0)

const fmtVND = (n: number) =>
  n >= 1_000_000_000
    ? `${(n / 1_000_000_000).toFixed(1)}B VND`
    : n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(0)}M VND`
    : `${n.toFixed(0)} VND`

export default function RuralFintechCalculator() {
  const [population, setPopulation] = useState(500_000)
  const [ruralPct, setRuralPct] = useState(65)
  const [bankCoverage, setBankCoverage] = useState(15)
  const [mobilePct, setMobilePct] = useState(70)
  const [avgTxValue, setAvgTxValue] = useState(150_000)
  const [showMethodology, setShowMethodology] = useState(false)

  const calc = useMemo(() => {
    const addressableMarket = Math.round(population * (ruralPct / 100) * (mobilePct / 100))
    const agentsNeeded = Math.ceil(addressableMarket / 2000)
    const monthlyTxVolume = addressableMarket * 4
    const monthlyRevenue = monthlyTxVolume * avgTxValue * 0.015
    const infrastructureCost = agentsNeeded * 5_000_000
    const monthlyOpex = agentsNeeded * 500_000
    const monthlyProfit = monthlyRevenue - monthlyOpex
    const breakEvenMonths =
      monthlyProfit > 0 ? Math.ceil(infrastructureCost / monthlyProfit) : Infinity
    const verdict =
      breakEvenMonths < 24
        ? 'Viable'
        : breakEvenMonths < 48
        ? 'Marginal'
        : 'Not Viable'
    const verdictColor =
      verdict === 'Viable' ? '#1a6b3a' : verdict === 'Marginal' ? '#7a5c00' : '#8B1A1A'
    const verdictBg =
      verdict === 'Viable' ? '#d4f0e0' : verdict === 'Marginal' ? '#fef3c7' : '#f8dede'

    return {
      addressableMarket,
      agentsNeeded,
      monthlyTxVolume,
      monthlyRevenue,
      infrastructureCost,
      monthlyOpex,
      monthlyProfit,
      breakEvenMonths,
      verdict,
      verdictColor,
      verdictBg,
    }
  }, [population, ruralPct, bankCoverage, mobilePct, avgTxValue])

  // Break-even chart: cumulative revenue vs cumulative cost over 36 months
  const chartData = useMemo(() => {
    const months = Array.from({ length: 37 }, (_, i) => i)
    const cumulativeRevenue = months.map((m) =>
      m === 0 ? 0 : m * calc.monthlyRevenue
    )
    const cumulativeCost = months.map((m) =>
      m === 0 ? calc.infrastructureCost : calc.infrastructureCost + m * calc.monthlyOpex
    )
    return {
      labels: months.map((m) => `M${m}`),
      datasets: [
        {
          label: 'Cumulative Revenue (VND)',
          data: cumulativeRevenue,
          backgroundColor: 'rgba(27, 58, 92, 0.75)',
          borderRadius: 2,
        },
        {
          label: 'Cumulative Cost (VND)',
          data: cumulativeCost,
          backgroundColor: 'rgba(139, 26, 26, 0.65)',
          borderRadius: 2,
        },
      ],
    }
  }, [calc])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Cumulative Revenue vs. Cost (36 months)',
        font: { size: 13 },
        color: '#4A5568',
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            `${ctx.dataset.label}: ${fmtVND(ctx.raw as number)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (v: unknown) => fmtVND(v as number),
          font: { size: 10 },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 13,
          font: { size: 10 },
        },
      },
    },
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
      {/* Breadcrumb */}
      <div style={{ paddingTop: '2rem', marginBottom: '0.5rem' }}>
        <Link
          href="/public-policy/playgrounds"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
          }}
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
          Tool 1 of 3 &middot; Financial Modeling
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
          Rural Fintech ROI Calculator
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
          Model the viability of an agent-banking network for a given province. Adjust the inputs
          to stress-test break-even timelines and see where the economics break down.
        </p>
      </section>

      {/* Two-column layout */}
      <div
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Inputs */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: '600',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1.5rem',
            }}
          >
            Province Parameters
          </h2>

          <SliderInput
            label="Province Population"
            value={population}
            min={100_000}
            max={5_000_000}
            step={50_000}
            format={(v) => fmtNum(v)}
            onChange={setPopulation}
          />
          <SliderInput
            label="Rural Population %"
            value={ruralPct}
            min={30}
            max={90}
            step={1}
            format={(v) => `${v}%`}
            onChange={setRuralPct}
          />
          <SliderInput
            label="Existing Bank Branch Coverage"
            value={bankCoverage}
            min={0}
            max={100}
            step={1}
            format={(v) => `${v}%`}
            onChange={setBankCoverage}
          />
          <SliderInput
            label="Mobile Penetration Rate"
            value={mobilePct}
            min={40}
            max={95}
            step={1}
            format={(v) => `${v}%`}
            onChange={setMobilePct}
          />
          <SliderInput
            label="Average Transaction Value"
            value={avgTxValue}
            min={50_000}
            max={500_000}
            step={10_000}
            format={(v) => `${(v / 1000).toFixed(0)}K VND`}
            onChange={setAvgTxValue}
          />
        </div>

        {/* Outputs */}
        <div>
          {/* Verdict banner */}
          <div
            style={{
              backgroundColor: calc.verdictBg,
              border: `2px solid ${calc.verdictColor}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-2xl)',
                fontWeight: '700',
                color: calc.verdictColor,
              }}
            >
              {calc.verdict}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: calc.verdictColor,
              }}
            >
              {calc.breakEvenMonths === Infinity
                ? 'Network never breaks even at current parameters.'
                : `Break-even in ${calc.breakEvenMonths} months (${(calc.breakEvenMonths / 12).toFixed(1)} years)`}
            </div>
          </div>

          {/* Metric grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <MetricCard
              label="Addressable Market"
              value={fmtNum(calc.addressableMarket)}
              sub="rural mobile users"
              highlight
            />
            <MetricCard
              label="Agents Needed"
              value={fmtNum(calc.agentsNeeded)}
              sub="1 per 2,000 users"
            />
            <MetricCard
              label="Monthly Tx Volume"
              value={fmtNum(calc.monthlyTxVolume)}
              sub="4 transactions/user"
            />
            <MetricCard
              label="Monthly Revenue"
              value={fmtVND(calc.monthlyRevenue)}
              sub="1.5% MDR"
            />
            <MetricCard
              label="Monthly Opex"
              value={fmtVND(calc.monthlyOpex)}
              sub="500K VND/agent"
            />
            <MetricCard
              label="Setup Cost"
              value={fmtVND(calc.infrastructureCost)}
              sub="5M VND/agent"
            />
          </div>

          {/* Chart */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
              height: '280px',
              marginBottom: '1.5rem',
            }}
          >
            <Bar data={chartData} options={chartOptions} />
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
              <span>How this works (formula reference)</span>
              <span style={{ fontFamily: 'monospace' }}>{showMethodology ? '−' : '+'}</span>
            </button>
            {showMethodology && (
              <div
                style={{
                  padding: '0 1.25rem 1.25rem',
                  borderTop: '1px solid var(--color-border-light)',
                }}
              >
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
                  {`addressable_market = population × rural% × mobile%
agent_network      = addressable_market / 2,000
monthly_tx_volume  = addressable_market × 4
monthly_revenue    = tx_volume × avg_value × 1.5%
setup_cost         = agents × 5,000,000 VND
monthly_opex       = agents × 500,000 VND
break_even_months  = setup_cost / (revenue − opex)

Verdict thresholds:
  Viable      → break-even < 24 months
  Marginal    → 24–48 months
  Not Viable  → > 48 months or never`}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
