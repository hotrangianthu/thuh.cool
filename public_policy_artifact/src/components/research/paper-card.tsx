'use client'

import Link from 'next/link'
import type { ResearchPost } from '@policy/lib/research'

interface PaperCardProps {
  post: ResearchPost
}

export default function PaperCard({ post }: PaperCardProps) {
  const { slug, frontmatter } = post

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <Link
      href={`/public-policy/research/${slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        style={{
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-card)',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
        }}
      >
        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '500',
                  color: 'var(--color-accent)',
                  backgroundColor: '#EBF0F7',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: 'var(--leading-snug)',
            marginBottom: '0.75rem',
          }}
        >
          {frontmatter.title}
        </h3>

        {/* Abstract */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: '1.25rem',
          }}
        >
          {frontmatter.abstract}
        </p>

        {/* Meta */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span>{formattedDate}</span>
          {frontmatter.wordCount && <span>~{frontmatter.wordCount.toLocaleString()} words</span>}
          <span style={{ color: 'var(--color-accent-red)', fontWeight: '500' }}>
            Read &rarr;
          </span>
        </div>
      </article>
    </Link>
  )
}
