'use client'

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

const pillars = [
  'Business & Trade',
  'Governance',
  'International Relations',
  'Culture & Heritage',
  'Media & Communication',
  'Education & Science',
  'People & Values',
]

// Soft power scores (normalized 0-100 scale based on Brand Finance Global Soft Power Index methodology)
const countryData: Record<string, { data: number[]; color: string; borderColor: string }> = {
  Vietnam: {
    data: [52, 45, 48, 58, 42, 47, 55],
    color: 'rgba(139, 26, 26, 0.3)',
    borderColor: '#8B1A1A',
  },
  Singapore: {
    data: [78, 82, 72, 55, 68, 75, 70],
    color: 'rgba(27, 58, 92, 0.2)',
    borderColor: '#1B3A5C',
  },
  Thailand: {
    data: [55, 48, 52, 72, 58, 45, 60],
    color: 'rgba(0, 128, 128, 0.2)',
    borderColor: '#008080',
  },
  Indonesia: {
    data: [50, 42, 55, 62, 48, 42, 52],
    color: 'rgba(128, 128, 0, 0.2)',
    borderColor: '#808000',
  },
  Malaysia: {
    data: [58, 52, 50, 55, 52, 55, 58],
    color: 'rgba(128, 0, 128, 0.2)',
    borderColor: '#800080',
  },
}

interface SoftPowerRadarChartProps {
  countries?: string[]
  showLegend?: boolean
}

export default function SoftPowerRadarChart({
  countries = ['Vietnam', 'Singapore', 'Thailand'],
  showLegend = true,
}: SoftPowerRadarChartProps) {
  const datasets = countries
    .filter((c) => countryData[c])
    .map((country) => ({
      label: country,
      data: countryData[country].data,
      backgroundColor: countryData[country].color,
      borderColor: countryData[country].borderColor,
      borderWidth: country === 'Vietnam' ? 3 : 2,
      pointBackgroundColor: countryData[country].borderColor,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: countryData[country].borderColor,
    }))

  const data = {
    labels: pillars,
    datasets,
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom' as const,
        labels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
          color: '#4A5568',
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { r: number } }) =>
            `${ctx.dataset.label}: ${ctx.parsed.r}`,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 10,
          },
          color: '#718096',
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          color: '#4A5568',
        },
        grid: {
          color: '#E2DDD5',
        },
        angleLines: {
          color: '#E2DDD5',
        },
      },
    },
  }

  return (
    <div style={{ padding: '0.5rem 0', maxWidth: '500px', margin: '0 auto' }}>
      <Radar data={data} options={options} />
    </div>
  )
}
