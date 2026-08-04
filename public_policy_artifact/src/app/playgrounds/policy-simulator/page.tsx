'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const RURAL_POPULATION = 62_000_000

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  description,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
  description?: string
}) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
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
      {description && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginBottom: '0.4rem',
          }}
        >
          {description}
        </p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.1rem' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          {format(min)}
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          {format(max)}
        </span>
      </div>
    </div>
  )
}

type MandateLevel = 0 | 1 | 2
const mandateLabels: Record<MandateLevel, string> = {
  0: 'Voluntary',
  1: 'Soft Target',
  2: 'Hard Mandate',
}

function computeAdoption(
  taxReduction: number,
  mandate: MandateLevel,
  subsidy: number,
  literacyFunding: number
): number[] {
  // Base annual adoption delta = 5%
  const base = 5
  const taxBoost = (taxReduction / 10) * 0.5
  const mandateBoost = mandate === 2 ? 5 : mandate === 1 ? 2 : 0
  const subsidyBoost = (subsidy / 20_000) * 0.3
  const literacyBoost = (literacyFunding / 100_000_000_000) * 1

  const yearOneBoost = base + taxBoost + mandateBoost + subsidyBoost + literacyBoost

  const rates: number[] = []
  let cumulative = 0
  const DECAY = 0.8

  for (let yr = 1; yr <= 5; yr++) {
    const delta = yr === 1 ? yearOneBoost : yearOneBoost * Math.pow(DECAY, yr - 1)
    // Cap at 80% total adoption — saturation ceiling
    cumulative = Math.min(80, cumulative + delta)
    rates.push(Math.round(cumulative * 10) / 10)
  }
  return rates
}

function computeNoIntervention(): number[] {
  const rates: number[] = []
  let cumulative = 0
  for (let yr = 1; yr <= 5; yr++) {
    const delta = 5 * Math.pow(0.8, yr - 1)
    cumulative = Math.min(80, cumulative + delta)
    rates.push(Math.round(cumulative * 10) / 10)
  }
  return rates
}

function totalCost(
  taxReduction: number,
  mandate: MandateLevel,
  subsidy: number,
  literacyFunding: number,
  adoptionPct: number
): number {
  // Cost model: subsidy × population reached + literacy funding × 5 years
  // Tax incentive cost = estimated foregone revenue (rough)
  const populationReached = (adoptionPct / 100) * RURAL_POPULATION
  const subsidyCost = subsidy * populationReached
  const literacyCost = literacyFunding * 5
  const taxForgone = (taxReduction / 100) * 500_000_000_000 * 5 // rough 500B/yr tax base for fintech
  void mandate // mandate itself has negligible direct fiscal cost
  return subsidyCost + literacyCost + taxForgone
}

const fmtVND = (n: number) => {
  if (n >= 1_000_000_000_000) return `${(n / 1_000_000_000_000).toFixed(1)}T VND`
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(0)}B VND`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M VND`
  return `${n.toFixed(0)} VND`
}
const fmtPeople = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${(n / 1_000).toFixed(0)}K`

function RecommendationBadge({ efficiency }: { efficiency: number }) {
  if (efficiency === 0) return null
  const label =
    efficiency < 500_000
      ? 'High Efficiency'
      : efficiency < 2_000_000
      ? 'Moderate Efficiency'
      : 'Low Efficiency'
  const color =
    efficiency < 500_000 ? '#1a6b3a' : efficiency < 2_000_000 ? '#7a5c00' : '#8B1A1A'
  const bg = efficiency < 500_000 ? '#d4f0e0' : efficiency < 2_000_000 ? '#fef3c7' : '#f8dede'
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        backgroundColor: bg,
        border: `1px solid ${color}`,
        borderRadius: '999px',
        padding: '0.25rem 0.75rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: '600',
        color,
      }}
    >
      {label}
    </div>
  )
}

export default function PolicySimulator() {
  const [taxReduction, setTaxReduction] = useState(0)
  const [mandate, setMandate] = useState<MandateLevel>(0)
  const [subsidy, setSubsidy] = useState(0)
  const [literacyFunding, setLiteracyFunding] = useState(0)
  const [showMethodology, setShowMethodology] = useState(false)

  const policyRates = useMemo(
    () => computeAdoption(taxReduction, mandate, subsidy, literacyFunding),
    [taxReduction, mandate, subsidy, literacyFunding]
  )
  const baseRates = useMemo(() => computeNoIntervention(), [])

  const year5Policy = policyRates[4]
  const year5Base = baseRates[4]
  const populationReachedPolicy = Math.round((year5Policy / 100) * RURAL_POPULATION)
  const populationReachedBase = Math.round((year5Base / 100) * RURAL_POPULATION)
  const incrementalReach = populationReachedPolicy - populationReachedBase
  const totalCostVal = totalCost(taxReduction, mandate, subsidy, literacyFunding, year5Policy)
  const costPerPerson = incrementalReach > 0 ? totalCostVal / incrementalReach : 0

  const chartData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'With Policy',
        data: policyRates,
        borderColor: 'rgba(27, 58, 92, 1)',
        backgroundColor: 'rgba(27, 58, 92, 0.08)',
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(27, 58, 92, 1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'No Intervention',
        data: baseRates,
        borderColor: 'rgba(139, 26, 26, 0.7)',
        backgroundColor: 'rgba(139, 26, 26, 0.04)',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 4,
        pointBackgroundColor: 'rgba(139, 26, 26, 0.7)',
        fill: true,
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Rural Fintech Adoption Rate (%) Over 5 Years',
        font: { size: 13 },
        color: '#4A5568',
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            `${ctx.dataset.label}: ${ctx.raw as number}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 80,
        ticks: {
          callback: (v: unknown) => `${v as number}%`,
          font: { size: 11 },
        },
        title: { display: true, text: 'Adoption %', font: { size: 11 }, color: '#718096' },
      },
      x: { ticks: { font: { size: 11 } } },
    },
  }

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
          Tool 3 of 3 &middot; Scenario Modeling
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
          Policy Scenario Simulator
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
          Dial four policy levers and observe their compounding effect on rural fintech adoption
          over five years. The model uses diminishing returns to prevent over-optimistic projections.
        </p>
      </section>

      <div
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Policy levers */}
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
            Policy Levers
          </h2>

          <SliderInput
            label="Corporate Tax Incentive"
            value={taxReduction}
            min={0}
            max={50}
            step={5}
            format={(v) => `${v}% reduction`}
            onChange={setTaxReduction}
            description="+0.5% adoption per 10% tax reduction"
          />

          {/* Mandate selector — discrete 3-level */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Agent Banking Mandate
              </label>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-accent)' }}>
                {mandateLabels[mandate]}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Voluntary → +0% | Soft target → +2% | Hard mandate → +5%
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {([0, 1, 2] as MandateLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setMandate(lvl)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '500',
                    border: `1px solid ${mandate === lvl ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: mandate === lvl ? '#EBF0F7' : 'transparent',
                    color: mandate === lvl ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {mandateLabels[lvl]}
                </button>
              ))}
            </div>
          </div>

          <SliderInput
            label="Direct Subsidy per Rural Account"
            value={subsidy}
            min={0}
            max={100_000}
            step={10_000}
            format={(v) => v === 0 ? 'None' : `${(v / 1000).toFixed(0)}K VND`}
            onChange={setSubsidy}
            description="+0.3% adoption per 20K VND subsidy"
          />
          <SliderInput
            label="Digital Literacy Funding / year"
            value={literacyFunding}
            min={0}
            max={500_000_000_000}
            step={50_000_000_000}
            format={(v) => v === 0 ? 'None' : `${(v / 1_000_000_000).toFixed(0)}B VND`}
            onChange={setLiteracyFunding}
            description="+1% adoption per 100B VND"
          />

          {/* Reset */}
          <button
            onClick={() => {
              setTaxReduction(0)
              setMandate(0)
              setSubsidy(0)
              setLiteracyFunding(0)
            }}
            style={{
              width: '100%',
              padding: '0.6rem',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              color: 'var(--color-text-muted)',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Reset to baseline
          </button>
        </div>

        {/* Outputs */}
        <div>
          {/* Chart */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
              height: '300px',
              marginBottom: '1.5rem',
            }}
          >
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Cost-benefit summary */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: 0,
                }}
              >
                5-Year Cost-Benefit Summary
              </h3>
              {costPerPerson > 0 && <RecommendationBadge efficiency={costPerPerson} />}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Year 5 Adoption (Policy)', value: `${year5Policy}%`, sub: `vs ${year5Base}% baseline` },
                { label: 'Population Reached', value: fmtPeople(populationReachedPolicy), sub: `+${fmtPeople(incrementalReach)} incremental` },
                { label: 'Total 5Y Policy Cost', value: totalCostVal > 0 ? fmtVND(totalCostVal) : 'Zero cost', sub: 'subsidy + literacy + tax' },
                { label: 'Cost per Person Added', value: costPerPerson > 0 ? fmtVND(costPerPerson) : 'N/A', sub: 'incremental reach only' },
              ].map(({ label, value, sub }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: '700', color: 'var(--color-accent)', lineHeight: '1.1', marginBottom: '0.2rem' }}>
                    {value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>

            {costPerPerson > 0 && (
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '0.875rem 1rem',
                  backgroundColor: costPerPerson < 500_000 ? '#d4f0e0' : costPerPerson < 2_000_000 ? '#fef3c7' : '#f8dede',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: costPerPerson < 500_000 ? '#1a6b3a' : costPerPerson < 2_000_000 ? '#7a5c00' : '#8B1A1A',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                <strong>Policy Recommendation: </strong>
                {costPerPerson < 500_000
                  ? `This combination achieves high efficiency (${fmtVND(costPerPerson)}/person). Prioritize literacy funding — it has the best marginal return at low cost.`
                  : costPerPerson < 2_000_000
                  ? `Moderate efficiency (${fmtVND(costPerPerson)}/person). Consider reducing direct subsidies and redirecting to literacy programs for better ROI.`
                  : `Low efficiency (${fmtVND(costPerPerson)}/person). This policy mix is cost-intensive relative to incremental reach. Reduce subsidy or target smaller high-need provinces first.`}
              </div>
            )}
          </div>

          {/* Methodology toggle */}
          <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
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
              <span>Model assumptions and formula</span>
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
                  {`Base annual adoption delta = 5%
Year-on-year decay factor = 0.8x (diminishing returns)
Adoption ceiling = 80% (structural floor non-adopters)

Lever contributions (year 1):
  tax_boost     = (tax_pct / 10) × 0.5%
  mandate_boost = voluntary: 0%, soft: +2%, hard: +5%
  subsidy_boost = (subsidy_VND / 20,000) × 0.3%
  literacy_boost= (funding_VND / 100B) × 1%

year_delta[t] = (base + levers) × 0.8^(t−1)
adoption[t]   = min(80%, Σ year_delta[1..t])

Cost model (5-year total):
  subsidy_cost  = subsidy × population_reached_yr5
  literacy_cost = annual_funding × 5
  tax_forgone   = (tax_pct / 100) × 500B × 5

Efficiency thresholds (cost / incremental person):
  High Efficiency   < 500K VND/person
  Moderate          500K–2M VND/person
  Low Efficiency    > 2M VND/person`}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
