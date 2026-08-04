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

const categories = [
  'Mobile Banking\nAccount',
  'Digital Payments\n(monthly)',
  'Mobile Credit\nAccess',
  'Fintech App\nUsage',
  'E-commerce\nPurchase',
]

const urbanData = [78, 72, 45, 58, 69]
const ruralData = [31, 24, 11, 14, 22]

export default function RuralGapChart() {
  const data = {
    labels: [
      'Mobile Banking',
      'Digital Payments',
      'Mobile Credit',
      'Fintech Apps',
      'E-commerce',
    ],
    datasets: [
      {
        label: 'Urban Vietnam',
        data: urbanData,
        backgroundColor: '#1B3A5C',
        borderRadius: 4,
      },
      {
        label: 'Rural Vietnam',
        data: ruralData,
        backgroundColor: '#8B1A1A',
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            `${ctx.dataset.label}: ${ctx.parsed.y ?? 0}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          color: '#718096',
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#E2DDD5',
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          color: '#718096',
          callback: (value: string | number) => `${value}%`,
        },
        title: {
          display: true,
          text: '% of Population',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
          color: '#718096',
        },
      },
    },
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <Bar data={data} options={options} />
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat, i) => {
          const gap = urbanData[i] - ruralData[i]
          return (
            <div
              key={cat}
              style={{
                textAlign: 'center',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                color: '#718096',
              }}
            >
              <div style={{ fontWeight: '600', color: '#8B1A1A' }}>−{gap}pp</div>
              <div>{cat.split('\n')[0]}</div>
              <div>gap</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
