import type { MDXComponents } from 'mdx/types'
import RuralGapChart from '@policy/components/data/rural-gap-chart'
import SoftPowerRadarChart from '@policy/components/data/soft-power-radar-chart'
import NationBrandHexagon from '@policy/components/data/nation-brand-hexagon'
import KnowledgeEconomyChart, { KnowledgeEconomyTable } from '@policy/components/data/knowledge-economy-chart'
import SoftPowerFramework, { StrategicPositionMatrix } from '@policy/components/data/soft-power-framework'
import ASEANComparisonTable, { KeyInsightCards } from '@policy/components/data/asean-comparison-table'

function PolicyNote({ children }: { children: React.ReactNode }) {
  return (
    <aside
      style={{
        backgroundColor: '#EBF0F7',
        borderLeft: '4px solid var(--color-accent)',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          fontWeight: '700',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
        }}
      >
        Policy Note
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        {children}
      </div>
    </aside>
  )
}

function DataFigure({
  caption,
  children,
}: {
  caption: string
  children: React.ReactNode
}) {
  return (
    <figure
      style={{
        margin: '2rem 0',
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
      }}
    >
      {children}
      <figcaption
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginTop: '1rem',
          fontStyle: 'italic',
        }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

function Citation({
  author,
  year,
  title,
  source,
}: {
  author: string
  year: string
  title: string
  source: string
}) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-secondary)',
        borderLeft: '2px solid var(--color-border)',
        paddingLeft: '1rem',
        margin: '0.5rem 0',
        lineHeight: 'var(--leading-normal)',
      }}
    >
      {author} ({year}). <em>{title}</em>. {source}.
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  PolicyNote,
  DataFigure,
  Citation,
  RuralGapChart,
  SoftPowerRadarChart,
  NationBrandHexagon,
  KnowledgeEconomyChart,
  KnowledgeEconomyTable,
  SoftPowerFramework,
  StrategicPositionMatrix,
  ASEANComparisonTable,
  KeyInsightCards,
}
