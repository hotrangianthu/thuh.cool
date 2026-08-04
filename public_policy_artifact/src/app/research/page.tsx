import type { Metadata } from 'next'
import { listResearch } from '@policy/lib/research'
import PaperCard from '@policy/components/research/paper-card'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Policy papers on rural digital inclusion, fintech access, and Vietnam\'s development agenda.',
}

const upcomingPapers = [
  {
    title: 'Provincial Investment Frameworks: Why Vietnam\'s Economic Zones Fail Rural Provinces',
    tags: ['Investment Policy', 'Regional Development', 'Institutions'],
    status: 'In progress',
  },
  {
    title: 'Vietnam\'s Nation Brand in the Regional Knowledge Economy: A Soft Power Audit',
    tags: ['Soft Power', 'Nation Brand', 'SEA Competitiveness'],
    status: 'Planned',
  },
]

export default async function ResearchPage() {
  const papers = listResearch()

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      {/* Header */}
      <section
        style={{
          paddingTop: '4rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--color-border)',
          maxWidth: '720px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: '500',
            color: 'var(--color-accent-red)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}
        >
          Research
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.25',
            marginBottom: '1rem',
          }}
        >
          Policy Papers
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Working papers and policy analyses on rural development, digital inclusion,
          and Vietnam&rsquo;s institutional landscape. Written as an ongoing research
          practice for long-term publication and policy learning.
        </p>
      </section>

      {/* Published papers */}
      <section style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.5rem',
          }}
        >
          Published
        </h2>

        {papers.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '780px' }}>
            {papers.map((post) => (
              <PaperCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}
          >
            No papers found.
          </p>
        )}
      </section>

      {/* Upcoming papers */}
      <section
        style={{
          paddingTop: '2rem',
          paddingBottom: '5rem',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.5rem',
          }}
        >
          Forthcoming
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '780px' }}>
          {upcomingPapers.map((paper) => (
            <div
              key={paper.title}
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem 2rem',
                opacity: 0.8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '500',
                      color: 'var(--color-text-muted)',
                      backgroundColor: 'var(--color-border)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    color: 'var(--color-accent-red)',
                    marginLeft: 'auto',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {paper.status}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-snug)',
                }}
              >
                {paper.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
