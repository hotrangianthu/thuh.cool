import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'If I Were DG of Digital Economy',
  description:
    'A thought experiment in 1,000 words: what would I actually do in the first 100 days as Director-General of Vietnam\'s Digital Economy program?',
}

export default function IfIWereDGPage() {
  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem',
      }}
    >
      {/* Back link */}
      <div style={{ paddingTop: '2rem' }}>
        <Link
          href="/public-policy/voice"
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
          &larr; Voice
        </Link>
      </div>

      {/* Article header */}
      <header
        style={{
          paddingTop: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--color-border)',
          maxWidth: '720px',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {['Thought Experiment', 'Digital Economy', 'Policy Leadership'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: '500',
                color: 'var(--color-accent-red)',
                backgroundColor: '#F7EDED',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                letterSpacing: '0.02em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.2',
            marginBottom: '1rem',
          }}
        >
          If I Were Director-General of the Digital Economy
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontStyle: 'italic',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: '1.5rem',
          }}
        >
          A thought experiment in 1,000 words
        </p>

        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          <span>Tran Gian Thu Ho</span>
          <span>May 2026</span>
          <span>~1,000 words</span>
        </div>
      </header>

      {/* Article body */}
      <article
        style={{
          paddingTop: '3rem',
          paddingBottom: '5rem',
          maxWidth: '720px',
        }}
      >
        <div className="prose-academic">
          <p>
            Let&rsquo;s say I wake up tomorrow as the Director-General of Vietnam&rsquo;s
            Digital Economy and Digital Society program under the Ministry of Information
            and Communications. I have authority, budget, and &mdash; most importantly
            &mdash; accountability for whether Vietnam&rsquo;s digital transformation
            includes or excludes its rural majority.
          </p>

          <p>Here&rsquo;s what I would do in the first 100 days.</p>

          <h2>Day 1&ndash;30: Acknowledge the Gap</h2>

          <p>The first month is about telling the truth.</p>

          <p>
            I would commission an immediate audit of our current digital inclusion metrics
            &mdash; not the ones we report internationally (internet penetration, smartphone
            ownership), but the ones that matter: <strong>active digital finance usage by
            geography, income, and age</strong>.
          </p>

          <p>
            My hypothesis: we&rsquo;ll find that &ldquo;70% internet penetration&rdquo;
            masks a reality where fewer than 20% of rural residents use digital financial
            services monthly. We&rsquo;ll find that digital government services have below
            10% adoption in provinces outside the major cities. We&rsquo;ll find that our
            &ldquo;digital transformation&rdquo; is an urban phenomenon that we&rsquo;ve
            marketed as a national one.
          </p>

          {/* Pull quote */}
          <blockquote
            style={{
              margin: '2rem 0',
              padding: '1.5rem 1.5rem',
              backgroundColor: '#F7EDED',
              borderLeft: '4px solid var(--color-accent-red)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              fontStyle: 'normal',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                fontStyle: 'italic',
                color: 'var(--color-accent-red)',
                lineHeight: 'var(--leading-relaxed)',
                margin: 0,
              }}
            >
              You can&rsquo;t solve a problem you won&rsquo;t name.
            </p>
          </blockquote>

          <p>
            I would publish this audit publicly. Not as self-criticism, but as honest
            baseline-setting. You can&rsquo;t solve a problem you won&rsquo;t name.
          </p>

          <h2>Day 31&ndash;60: Change the Incentives</h2>

          <p>The second month is about realigning the system.</p>

          <p>
            Right now, the Ministry of Information and Communications, the State Bank of
            Vietnam, and the Ministry of Agriculture each have digital inclusion somewhere
            in their mandates. None is accountable for the outcome. This is a feature, not
            a bug &mdash; diffuse responsibility means no one fails.
          </p>

          <p>
            I would propose to the Prime Minister a <strong>Rural Digital Inclusion
            Taskforce</strong> with:
          </p>

          <ul>
            <li>Single KPI: Increase active digital finance usage in rural areas from approximately 20% to 50% by 2030</li>
            <li>Single budget line: Pooled from MIC, SBV, and MARD &mdash; not additional funds, <em>reallocated</em> funds</li>
            <li>Single point of accountability: Me. If it fails, I resign.</li>
          </ul>

          <p>
            The political risk of this is obvious. The political opportunity is larger:
            whoever solves rural digital inclusion will have done something that matters
            beyond their tenure.
          </p>

          <h2>Day 61&ndash;90: Launch Three Pilots</h2>

          <p>The third month is about starting, not planning.</p>

          {/* Pilot cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              margin: '1.5rem 0',
            }}
          >
            {[
              {
                number: '01',
                title: 'Agent Banking in Tay Ninh',
                body: '5 communes, 15 agents, 25,000 target population. Partnership with Agribank. 18-month timeline. I\'ve already designed this.',
                link: '/prototypes/agent-banking-pilot',
                linkText: 'See the full proposal',
              },
              {
                number: '02',
                title: 'Digital Literacy via Commune Learning Centers',
                body: 'Select 20 commune learning centers with functional infrastructure. Train existing staff (not new hires) to deliver a 4-session digital finance curriculum. Target: 1,000 completions in 6 months. Measure: percentage of completers who open and actively use a digital account.',
                link: null,
                linkText: null,
              },
              {
                number: '03',
                title: 'Agricultural E-Commerce Mandate',
                body: 'Require all government agricultural procurement — school meals, public canteens, commodity reserves — to accept digital payment. Start in 3 provinces. Measure: percentage of payments made digitally, number of farmer suppliers onboarded.',
                link: null,
                linkText: null,
              },
            ].map((pilot) => (
              <div
                key={pilot.number}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: '700',
                    color: 'var(--color-border)',
                    lineHeight: '1',
                    paddingTop: '2px',
                  }}
                >
                  {pilot.number}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {pilot.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: pilot.link ? '0.625rem' : '0',
                    }}
                  >
                    {pilot.body}
                  </div>
                  {pilot.link && (
                    <Link
                      href={pilot.link}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '600',
                        color: 'var(--color-accent-red)',
                        textDecoration: 'none',
                      }}
                    >
                      {pilot.linkText} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p>
            Three pilots. Three mechanisms &mdash; access, literacy, demand. All started
            within 100 days.
          </p>

          <h2>What I Would Not Do</h2>

          <p>
            I would not launch a national strategy document. We have enough of those.
            They are beautiful, comprehensive, and largely unimplemented.
          </p>

          <p>
            I would not request additional budget. The money exists. It is allocated to
            digital infrastructure that benefits cities, to programs with vague inclusion
            mandates, to conferences about digital transformation. Reallocate, don&rsquo;t add.
          </p>

          <p>
            I would not create a new agency. Agencies create bureaucracy. Taskforces
            with sunset clauses create urgency.
          </p>

          <p>
            I would not wait for perfect data. The audit in Month 1 gives us directional
            truth. Pilots in Month 3 give us ground truth. Perfection is the enemy of starting.
          </p>

          <h2>The Political Reality</h2>

          <p>None of this is technically difficult. The technology exists. The regulatory frameworks exist. The budget exists.</p>

          {/* Second pull quote */}
          <blockquote
            style={{
              margin: '2rem 0',
              padding: '1.5rem',
              backgroundColor: '#EBF0F7',
              borderLeft: '4px solid var(--color-accent)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              fontStyle: 'normal',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                fontStyle: 'italic',
                color: 'var(--color-accent)',
                lineHeight: 'var(--leading-relaxed)',
                margin: 0,
              }}
            >
              The incentive structure rewards avoiding accountability more than
              achieving outcomes.
            </p>
          </blockquote>

          <p>
            The difficulty is political. Admitting the gap means admitting failure.
            Reallocating budget means taking from someone. Creating single accountability
            means someone can be blamed.
          </p>

          <p>
            This is why digital inclusion remains unsolved. Not because we can&rsquo;t.
            Because the incentive structure rewards avoiding accountability more than
            achieving outcomes.
          </p>

          <p>
            A Director-General who takes this on will either succeed visibly &mdash;
            or fail visibly. There is no hiding in vague mandate language and incremental
            progress reports.
          </p>

          <p>I think that&rsquo;s exactly the job.</p>

          {/* Disclaimer */}
          <div
            style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--leading-relaxed)',
                fontStyle: 'italic',
              }}
            >
              This is a thought experiment. I am not a government official. I am a product
              strategist and policy researcher who believes the problems I care about require
              stronger policy craft &mdash; and that positions worth holding should be stated
              publicly, even before you have formal authority.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
