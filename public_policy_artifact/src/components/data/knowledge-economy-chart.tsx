'use client'

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

interface CountryMetrics {
  gii: number // Global Innovation Index rank (lower is better, shown inverted)
  rdGdp: number // R&D spending % of GDP
  patents: number // Patent applications per million
  stemGrads: number // STEM graduates % of total
  publications: number // Scientific publications per million
}

const countryData: Record<string, CountryMetrics> = {
  Vietnam: { gii: 44, rdGdp: 0.53, patents: 1021, stemGrads: 28, publications: 85 },
  Singapore: { gii: 4, rdGdp: 1.92, patents: 1778, stemGrads: 45, publications: 2150 },
  Malaysia: { gii: 33, rdGdp: 1.04, patents: 989, stemGrads: 35, publications: 380 },
  Thailand: { gii: 41, rdGdp: 1.00, patents: 863, stemGrads: 22, publications: 185 },
  Indonesia: { gii: 54, rdGdp: 0.23, patents: 1309, stemGrads: 18, publications: 65 },
  Philippines: { gii: 53, rdGdp: 0.16, patents: 350, stemGrads: 20, publications: 45 },
}

const metrics = [
  { key: 'gii', label: 'Global Innovation Index', unit: 'rank', invert: true, max: 100 },
  { key: 'rdGdp', label: 'R&D Spending', unit: '% GDP', invert: false, max: 2.5 },
  { key: 'patents', label: 'Patent Applications', unit: '/million', invert: false, max: 1000 },
  { key: 'stemGrads', label: 'STEM Graduates', unit: '%', invert: false, max: 50 },
  { key: 'publications', label: 'Scientific Publications', unit: '/million', invert: false, max: 2500 },
]

interface KnowledgeEconomyChartProps {
  countries?: string[]
  metric?: 'gii' | 'rdGdp' | 'patents' | 'stemGrads' | 'publications'
}

export default function KnowledgeEconomyChart({
  countries = ['Vietnam', 'Singapore', 'Malaysia', 'Thailand', 'Indonesia'],
  metric = 'gii',
}: KnowledgeEconomyChartProps) {
  const metricConfig = metrics.find((m) => m.key === metric) || metrics[0]

  const getColor = (country: string) => {
    if (country === 'Vietnam') return '#8B1A1A'
    return '#1B3A5C'
  }

  const values = countries.map((c) => {
    const raw = countryData[c]?.[metric as keyof CountryMetrics] || 0
    if (metricConfig.invert) {
      // For ranks, show inverted (100 - rank for visualization)
      return 100 - raw
    }
    return raw
  })

  const data = {
    labels: countries,
    datasets: [
      {
        label: `${metricConfig.label} (${metricConfig.unit})`,
        data: values,
        backgroundColor: countries.map(getColor),
        borderRadius: 4,
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataIndex: number }) => {
            const country = countries[ctx.dataIndex]
            const raw = countryData[country]?.[metric as keyof CountryMetrics] || 0
            if (metricConfig.invert) {
              return `Rank #${raw}`
            }
            return `${raw} ${metricConfig.unit}`
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: metricConfig.invert ? 100 : undefined,
        grid: {
          color: '#E2DDD5',
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          color: '#718096',
          callback: (value: string | number) => {
            if (metricConfig.invert) {
              return `#${100 - Number(value)}`
            }
            return value
          },
        },
        title: {
          display: true,
          text: metricConfig.invert ? 'Rank (lower is better)' : metricConfig.unit,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          color: '#718096',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
          color: '#4A5568',
        },
      },
    },
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: '600',
          color: 'var(--color-accent)',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {metricConfig.label} Comparison
      </div>
      <Bar data={data} options={options} />
    </div>
  )
}

// Multi-metric comparison table component
export function KnowledgeEconomyTable({
  countries = ['Vietnam', 'Singapore', 'Malaysia', 'Thailand', 'Indonesia'],
}: {
  countries?: string[]
}) {
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
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: '0.75rem 0.5rem',
                borderBottom: '2px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontWeight: '600',
              }}
            >
              Country
            </th>
            {metrics.map((m) => (
              <th
                key={m.key}
                style={{
                  textAlign: 'center',
                  padding: '0.75rem 0.5rem',
                  borderBottom: '2px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: '600',
                  fontSize: '11px',
                }}
              >
                {m.label}
                <br />
                <span style={{ fontWeight: '400', color: 'var(--color-text-muted)' }}>
                  ({m.unit})
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((country, idx) => (
            <tr
              key={country}
              style={{
                backgroundColor: country === 'Vietnam' ? '#FFF5F5' : idx % 2 ? '#FAFAF8' : '#fff',
              }}
            >
              <td
                style={{
                  padding: '0.75rem 0.5rem',
                  borderBottom: '1px solid var(--color-border)',
                  fontWeight: country === 'Vietnam' ? '600' : '400',
                  color: country === 'Vietnam' ? '#8B1A1A' : 'var(--color-text-primary)',
                }}
              >
                {country}
              </td>
              {metrics.map((m) => {
                const value = countryData[country]?.[m.key as keyof CountryMetrics] || 0
                return (
                  <td
                    key={m.key}
                    style={{
                      textAlign: 'center',
                      padding: '0.75rem 0.5rem',
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {m.invert ? `#${value}` : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
