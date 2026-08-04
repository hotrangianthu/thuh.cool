import Link from 'next/link'
import FadeIn from '@policy/components/ui/FadeIn'
import AnimatedCounter from '@policy/components/ui/AnimatedCounter'
import InteractiveCard from '@policy/components/ui/InteractiveCard'
import ScrollProgress from '@policy/components/ui/ScrollProgress'
import TypeWriter from '@policy/components/ui/TypeWriter'

const artifactGrid = [
  {
    icon: '📄',
    title: 'Research Papers',
    description: 'Policy analysis grounded in field observation and data.',
    href: '/public-policy/research',
  },
  {
    icon: '🧪',
    title: 'Interactive Playgrounds',
    description: 'Tools you can run — province scorers, policy simulators.',
    href: '/public-policy/playgrounds',
  },
  {
    icon: '📓',
    title: 'Field Notes',
    description: 'Raw observations from merchant interviews and village visits.',
    href: '/public-policy/field-notes',
  },
  {
    icon: '⚙️',
    title: 'Prototypes',
    description: 'Working demos built to test policy assumptions, not just argue them.',
    href: '/public-policy/prototypes',
  },
  {
    icon: '🔬',
    title: 'Experiments Log',
    description: 'What I tried, what broke, what I learned.',
    href: '/public-policy/experiments',
  },
  {
    icon: '💬',
    title: 'Voice & Opinion',
    description: 'Positions I am prepared to defend, with evidence.',
    href: '/public-policy/voice',
  },
]

const activity = [
  {
    label: 'Published',
    text: "Vietnam's Nation Brand Soft Power Audit — with 5 interactive visualizations",
    date: 'Jun 2026',
  },
  {
    label: 'Published',
    text: "Vietnam's Rural Digital Exclusion — policy gap analysis",
    date: 'May 2026',
  },
  {
    label: 'Updated',
    text: 'Province Readiness Scorer with Q2 2026 connectivity data',
    date: 'May 2026',
  },
]

export default function Home() {
  return (
    <>
      <ScrollProgress accentColor="#FF6B35" />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: '5rem',
            paddingBottom: '4.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: '800px' }}>
            <FadeIn direction="up" delay={0}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: '#FF6B35',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.25rem',
                }}
              >
                Policy Researcher &middot; Product Strategist &middot; Independent Scholar
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={80}>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  lineHeight: '1.2',
                  color: 'var(--color-accent)',
                  marginBottom: '1rem',
                }}
              >
                The digital economy leaves 62&nbsp;million rural Vietnamese behind.
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={160}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.75rem',
                  minHeight: '2rem',
                }}
              >
                <TypeWriter
                  text="Here's what I'm building to change that."
                  speed={40}
                  startDelay={600}
                />
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={240}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  maxWidth: '640px',
                  marginBottom: '2.25rem',
                }}
              >
                I grew up in rural Vietnam and spent a decade building fintech products at
                Grab. The gap between what I saw at scale and what Vietnam&rsquo;s national
                plan addresses is what drove me toward policy. This site is the public
                record of an ongoing research practice for long-term policy work and
                published analysis.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={320}>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <Link href="/public-policy/research" className="btn-primary">
                  Read the Research
                </Link>
                <Link href="/about" className="btn-outline">
                  About Me
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Flagship Project ───────────────────────────────── */}
        <section
          style={{
            paddingTop: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <FadeIn direction="up">
            <Link
              href="/flagship/from-income-to-assets/en"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article
                className="policy-flagship-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.4fr) minmax(220px, .6fr)',
                  gap: '2rem',
                  padding: '2rem',
                  border: '1px solid #176B52',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #F9FFF2 0%, #E6F0D8 100%)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '.55rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <span className="tag">Flagship Project</span>
                    <span className="tag">Nationwide Sampling</span>
                    <span className="tag">Open Research</span>
                  </div>
                  <h2 style={{ margin: 0, color: '#18322D', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>
                    From Income to Assets
                  </h2>
                  <p style={{ margin: '.45rem 0 1rem', color: '#176B52', fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontStyle: 'italic' }}>
                    Vietnam Rural Wealth Progression Project
                  </p>
                  <p style={{ maxWidth: '680px', margin: 0, color: '#49635D', lineHeight: '1.7' }}>
                    An independent public-interest initiative studying what helps rural households turn income into savings, resilience, and productive assets. The research is now opening three routes for household surveys, stories, and local partners.
                  </p>
                </div>
                <div style={{ alignSelf: 'end' }}>
                  <div style={{ color: '#176B52', fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.65rem' }}>
                    Active phase · Aug 2026
                  </div>
                  <div style={{ color: '#18322D', fontSize: 'var(--text-sm)', lineHeight: '1.6', marginBottom: '1.1rem' }}>
                    Nationwide outreach target<br />Vietnamese-first · bilingual
                  </div>
                  <span style={{ display: 'inline-block', padding: '.72rem 1rem', background: '#176B52', color: '#fff', borderRadius: '3px', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                    Explore or contribute &rarr;
                  </span>
                </div>
              </article>
            </Link>
          </FadeIn>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          <FadeIn delay={0}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: '700',
                  color: 'var(--color-accent)',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                }}
              >
                <AnimatedCounter target={62} suffix="M" duration={1200} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                Rural Vietnamese
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                underserved by digital financial infrastructure
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: '700',
                  color: 'var(--color-accent)',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                }}
              >
                2025–2035
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                Vietnam&rsquo;s National Growth Plan
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                silent on rural fintech and AI access policy
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: '700',
                  color: 'var(--color-accent)',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                }}
              >
                <AnimatedCounter target={3} duration={800} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.25rem',
                }}
              >
                Research Threads
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                rural fintech, regional investment, nation brand
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── What I'm Building Grid ───────────────────────────── */}
        <section style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <FadeIn direction="up">
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: '700',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.5rem',
              }}
            >
              What I&rsquo;m Building
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-2xl)',
                fontWeight: '600',
                color: 'var(--color-accent)',
                marginBottom: '2rem',
              }}
            >
              Six types of artifacts. All open.
            </p>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {artifactGrid.map((item, i) => (
              <FadeIn key={item.href} delay={i * 60} direction="up">
                <InteractiveCard href={item.href} accentColor="#1B3A5C">
                  <div
                    style={{
                      fontSize: '1.75rem',
                      marginBottom: '0.75rem',
                      lineHeight: '1',
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-base)',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: '1rem',
                    }}
                  >
                    {item.description}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: '500',
                      color: '#FF6B35',
                    }}
                  >
                    Explore &rarr;
                  </span>
                </InteractiveCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Featured Research ────────────────────────────────── */}
        <section style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <FadeIn direction="up">
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: '700',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.5rem',
              }}
            >
              Featured Research
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {/* Nation Brand Paper */}
            <FadeIn direction="up" delay={80}>
              <Link
                href="/public-policy/research/vietnam-nation-brand-soft-power"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article className="featured-card" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {['Soft Power', 'Nation Branding', 'ASEAN'].map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '600',
                        color: '#10B981',
                        backgroundColor: '#ECFDF5',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        letterSpacing: '0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          display: 'inline-block',
                        }}
                      />
                      New
                    </span>
                  </div>

                  <div
                    style={{
                      borderLeft: '4px solid #8B1A1A',
                      paddingLeft: '1.25rem',
                      marginBottom: '1.25rem',
                    }}
                  >
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
                      Vietnam&rsquo;s Nation Brand: A Soft Power Audit
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      Vietnam ranks #52 globally in soft power — 5th in ASEAN. This audit applies Nye&rsquo;s
                      framework and Anholt&rsquo;s Nation Brand Hexagon with 5 interactive visualizations.
                    </p>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>Jun 2026</span>
                    <span>~2,200 words</span>
                    <span style={{ color: '#8B1A1A', fontWeight: '600' }}>Read paper &rarr;</span>
                  </div>
                </article>
              </Link>
            </FadeIn>

            {/* Rural Digital Exclusion Paper */}
            <FadeIn direction="up" delay={160}>
              <Link
                href="/public-policy/research/vietnam-rural-digital-exclusion"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article className="featured-card" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {['Policy Analysis', 'Rural Development', 'Digital Inclusion'].map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '600',
                        color: '#10B981',
                        backgroundColor: '#ECFDF5',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        letterSpacing: '0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          display: 'inline-block',
                        }}
                      />
                      Live
                    </span>
                  </div>

                  <div
                    style={{
                      borderLeft: '4px solid #FF6B35',
                      paddingLeft: '1.25rem',
                      marginBottom: '1.25rem',
                    }}
                  >
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
                      Vietnam&rsquo;s Rural Digital Exclusion: A Policy Gap
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      62 million rural Vietnamese excluded from the digital economy. This paper maps the
                      policy gap and proposes a three-pillar solution: Access, Literacy, Productivity.
                    </p>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>May 2026</span>
                    <span>~1,200 words</span>
                    <span style={{ color: '#FF6B35', fontWeight: '600' }}>Read paper &rarr;</span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── Live Activity Feed ───────────────────────────────── */}
        <section style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
          <FadeIn direction="up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  margin: 0,
                }}
              >
                Recent Activity
              </h2>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  color: '#10B981',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    display: 'inline-block',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                Live
              </span>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px' }}>
            {activity.map((item, i) => (
              <FadeIn key={i} delay={i * 80} direction="up">
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem 1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '700',
                      color: '#FF6B35',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                      paddingTop: '0.1rem',
                      minWidth: '80px',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-primary)',
                      flex: 1,
                    }}
                  >
                    {item.text}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      whiteSpace: 'nowrap',
                      paddingTop: '0.1rem',
                    }}
                  >
                    {item.date}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
