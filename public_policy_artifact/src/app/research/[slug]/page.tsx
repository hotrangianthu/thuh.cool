import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getResearchBySlug, getResearchSlugs } from '@policy/lib/mdx'
import { mdxComponents } from '@policy/components/research/mdx-components'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getResearchSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { frontmatter } = getResearchBySlug(slug)
    return {
      title: frontmatter.title,
      description: frontmatter.abstract,
    }
  } catch {
    return { title: 'Not Found' }
  }
}

export default async function ResearchPaperPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = getResearchBySlug(slug)
  } catch {
    notFound()
  }

  const { frontmatter, content } = post

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      {/* Back link */}
      <div style={{ paddingTop: '2.5rem', marginBottom: '2rem' }}>
        <Link
          href="/public-policy/research"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          &larr; All Research
        </Link>
      </div>

      {/* Paper header */}
      <header
        style={{
          maxWidth: '720px',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '3rem',
        }}
      >
        {/* Tags */}
        {frontmatter.tags && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.25rem',
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

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: '700',
            color: 'var(--color-accent)',
            lineHeight: '1.2',
            marginBottom: '1.25rem',
          }}
        >
          {frontmatter.title}
        </h1>

        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          <span>Tran Gian Thu Ho</span>
          <span>{formattedDate}</span>
          {frontmatter.wordCount && (
            <span>~{frontmatter.wordCount.toLocaleString()} words</span>
          )}
        </div>

        {/* Abstract block */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
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
            Abstract
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              margin: 0,
            }}
          >
            {frontmatter.abstract}
          </p>
        </div>
      </header>

      {/* Paper body */}
      <article className="prose-academic" style={{ maxWidth: '720px', paddingBottom: '5rem' }}>
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </div>
  )
}
