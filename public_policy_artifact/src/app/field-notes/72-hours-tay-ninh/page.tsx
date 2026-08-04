import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '72 Hours in Tay Ninh',
  description:
    'A personal field essay — returning to the province where I grew up to measure how much rural financial access has actually changed.',
}

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '3/2',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        margin: '2rem 0',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        {caption}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-border)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        [ Photo placeholder ]
      </div>
    </div>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid var(--color-accent)',
        paddingLeft: '1.5rem',
        margin: '2rem 0',
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
        {children}
      </p>
    </blockquote>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: '600',
        color: 'var(--color-accent-red)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
      }}
    >
      {children}
    </p>
  )
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: '#EBF0F7',
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-accent)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          fontWeight: '700',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.4rem',
        }}
      >
        Insight
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  )
}

const bodyText: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-base)',
  color: 'var(--color-text-secondary)',
  lineHeight: 'var(--leading-relaxed)',
  marginBottom: '1.25rem',
}

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-2xl)',
  fontWeight: '600',
  color: 'var(--color-text-primary)',
  marginBottom: '1rem',
  marginTop: '0',
}

export default function TayNinhEssayPage() {
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
          href="/public-policy/field-notes"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
          }}
        >
          &larr; Field Notes
        </Link>
      </div>

      {/* Header */}
      <section
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--color-border)',
          maxWidth: '720px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {['Photo Essay', 'Tay Ninh', 'March 2024'].map((tag) => (
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

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.2',
            marginBottom: '1.25rem',
          }}
        >
          72 Hours in Tay Ninh
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: '1.5rem',
          }}
        >
          In March 2024, I returned to Tay Ninh &mdash; the province where I grew up &mdash;
          with a specific question: how much has rural financial access actually changed since
          I left for Ho Chi Minh City twelve years ago?
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
          <span>March 2024</span>
          <span>6 sections</span>
          <span>~1,500 words</span>
        </div>
      </section>

      {/* Essay body */}
      <article style={{ maxWidth: '720px', paddingTop: '3rem', paddingBottom: '5rem' }}>

        {/* Section 1 */}
        <section style={{ marginBottom: '3.5rem' }}>
          <SectionLabel>Section 1 &mdash; Morning, Day 1</SectionLabel>
          <h2 style={sectionHeading}>The Market</h2>

          <p style={bodyText}>
            Cho Long Hoa market, 6am. I had forgotten what a cash economy sounds like
            &mdash; the snap of notes, the clink of coins against plastic trays, the
            vendors counting change by touch. The b&aacute;nh m&igrave; seller. The
            vegetable vendors. The motorbike repair shop around the corner. All cash. One
            QR code visible in the entire market: at the pharmacy. A small laminated
            printout, taped to the glass.
          </p>

          <p style={bodyText}>
            I asked the vegetable seller if she had MoMo. &ldquo;My daughter set it
            up,&rdquo; she said. &ldquo;I use it to send money to my son in Binh Duong.
            But here? Everyone pays cash. If I ask for QR, they look at me strange.&rdquo;
          </p>

          <ImagePlaceholder caption="Market scene, Cho Long Hoa, Tay Ninh — 6am, March 2024" />

          <Insight>
            Digital payments exist at the edge of traditional commerce, not inside it.
            The pharmacy &mdash; modern, health-adjacent, serving a more educated customer
            &mdash; adopted QR. The food market did not. Digital adoption tracks business
            formality, not geography alone.
          </Insight>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '3.5rem' }}>
          <SectionLabel>Section 2 &mdash; Afternoon, Day 1</SectionLabel>
          <h2 style={sectionHeading}>The Bank Branch</h2>

          <p style={bodyText}>
            The nearest Agribank branch is 8 kilometers from my family&rsquo;s home. I
            visited at 2pm on a Tuesday. Fifteen people in line. I waited and watched.
            Average wait: roughly 45 minutes. Most transactions: utility bill payments.
            Not savings deposits. Not loan applications. Not anything that suggests
            financial deepening.
          </p>

          <p style={bodyText}>
            The branch exists. The infrastructure is physically present. But the friction
            is so high &mdash; the ride, the queue, the limited hours &mdash; that it
            functions as an administrative office, not a financial service provider. People
            use it because they have to, not because it helps them build wealth.
          </p>

          <ImagePlaceholder caption="Agribank branch exterior, Tay Ninh — 2pm queue, March 2024" />

          <Insight>
            Banks in rural Vietnam serve administrative functions: bill payment, cash
            withdrawal. The friction is too high for regular use as a savings or credit
            tool. The &ldquo;banked&rdquo; statistic conceals this. Having an account is
            not the same as having access to financial services.
          </Insight>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '3.5rem' }}>
          <SectionLabel>Section 3 &mdash; Day 2</SectionLabel>
          <h2 style={sectionHeading}>The Phone Shop</h2>

          <p style={bodyText}>
            I stopped at a phone repair and accessories shop on the main road into town.
            The owner was maybe 35. Confident with his Android, quick with calculations.
            I asked what he thought about mobile money.
          </p>

          <PullQuote>
            &ldquo;MoMo? Yes, young people use it. For games, for transfers to the city.
            Not for buying things here.&rdquo;
          </PullQuote>

          <p style={bodyText}>
            He had VNPay set up for his own shop, he told me. One or two customers a week
            used it. Mostly to buy a phone case, not to repair a phone. The higher the
            transaction value, the more likely a customer would scan.
          </p>

          <ImagePlaceholder caption="Phone shop interior, provincial road, Tay Ninh — March 2024" />

          <Insight>
            Digital finance is infrastructure for remittances out, not commerce in. Mobile
            money flows from the province to the city &mdash; children sending money home,
            workers transferring savings. It does not yet circulate within the local
            economy.
          </Insight>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '3.5rem' }}>
          <SectionLabel>Section 4 &mdash; Day 2</SectionLabel>
          <h2 style={sectionHeading}>My Uncle&rsquo;s Farm</h2>

          <p style={bodyText}>
            My uncle grows cassava on a small plot outside of town. He sells to a
            middleman who comes every two weeks. The middleman arrives with cash. Has
            always arrived with cash. My uncle has never received a payment digitally.
          </p>

          <p style={bodyText}>
            &ldquo;Why would I need that?&rdquo; he said, genuinely puzzled. &ldquo;The
            buyer comes with money. What&rsquo;s the problem?&rdquo;
          </p>

          <p style={bodyText}>
            There is no problem, until you try to use that transaction history to access
            credit. Until you want to participate in a supply chain that requires digital
            invoicing. Until the government rolls out a subsidy program that disburses via
            mobile wallet and you don&rsquo;t have one.
          </p>

          <ImagePlaceholder caption="Cassava field, outskirts of Tay Ninh town — March 2024" />

          <Insight>
            Agricultural value chains are cash-based end-to-end. Digital payment adoption
            requires the entire chain to shift, not just one node. A farmer cannot
            unilaterally go digital if the middleman comes with cash. The coordination
            problem is real &mdash; and it requires a policy intervention, not an app.
          </Insight>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '3.5rem' }}>
          <SectionLabel>Section 5 &mdash; Day 3</SectionLabel>
          <h2 style={sectionHeading}>The Commune Center</h2>

          <p style={bodyText}>
            Every commune in Vietnam is supposed to have a learning center &mdash; a{' '}
            <em>trung t&acirc;m h&#7885;c t&#7853;p c&#7897;ng &#273;&#7891;ng</em>. The
            one in my family&rsquo;s commune has three computers. One works. No digital
            literacy classes are scheduled. The staff member I spoke with asked me &mdash;
            unprompted &mdash; if I could help them set up a Facebook page for the center.
          </p>

          <p style={bodyText}>
            He was not embarrassed about this. He was practical. Facebook was what people
            used. The Ministry&rsquo;s digital government portal was something he had been
            told to promote but could not demonstrate.
          </p>

          <ImagePlaceholder caption="Commune learning center, Tay Ninh — March 2024" />

          <Insight>
            The infrastructure for digital literacy programs exists in name. Not in
            practice. The commune centers are structurally present but operationally empty.
            Policy that mandates digital government services without funding the last-mile
            capacity to support them does not produce digital citizens. It produces
            confusion.
          </Insight>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '3.5rem' }}>
          <SectionLabel>Section 6 &mdash; Synthesis</SectionLabel>
          <h2 style={sectionHeading}>What Changed, What Didn&rsquo;t</h2>

          <p style={bodyText}>
            Twelve years is enough time to see real change. Smartphones are everywhere.
            4G coverage is decent along the main roads. Young people are fluent in apps
            &mdash; Shopee, TikTok, Zalo, MoMo. The hardware gap has closed considerably.
          </p>

          <p style={bodyText}>
            What has not changed: the cash economy. Bank access and its frictions. Digital
            commerce within the province. Trust in digital finance for &ldquo;real
            money&rdquo; &mdash; savings, credit, agricultural payments. The gap is not
            about access to devices anymore. It is about access to systems designed for
            rural use.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              margin: '1.5rem 0',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderTop: '3px solid var(--color-accent)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.75rem',
                }}
              >
                Changed
              </p>
              <ul
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  paddingLeft: '1.25rem',
                  margin: 0,
                }}
              >
                <li>Smartphones everywhere</li>
                <li>4G coverage, decent on main roads</li>
                <li>Young people fluent in consumer apps</li>
                <li>Awareness of mobile money</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderTop: '3px solid var(--color-accent-red)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent-red)',
                  marginBottom: '0.75rem',
                }}
              >
                Unchanged
              </p>
              <ul
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  paddingLeft: '1.25rem',
                  margin: 0,
                }}
              >
                <li>Cash economy in local markets</li>
                <li>Bank branch friction</li>
                <li>Agricultural value chains, cash end-to-end</li>
                <li>Digital literacy infrastructure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <PullQuote>
            72 hours isn&rsquo;t research. It&rsquo;s a reminder.
          </PullQuote>

          <p style={bodyText}>
            The policy papers I write have real faces &mdash; the b&aacute;nh
            m&igrave; seller, my uncle, the phone shop owner. They are not statistics
            to be included in a framework. They are citizens to be served by one.
          </p>

          <p style={bodyText}>
            When I read Vietnam&rsquo;s 2025&ndash;2035 National Plan and find no
            integrated framework for rural digital inclusion, I am not looking at an
            abstract gap in a policy document. I am looking at the market at 6am. The
            line at the Agribank branch. My uncle&rsquo;s cassava field.
          </p>

          <p
            style={{
              ...bodyText,
              marginBottom: 0,
            }}
          >
            That is why the policy work matters. And that is why the field notes exist.
          </p>
        </section>

        {/* Navigation footer */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Link
            href="/public-policy/field-notes"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
            }}
          >
            &larr; All Field Notes
          </Link>
          <Link
            href="/public-policy/field-notes/merchant-conversations"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-accent-red)',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Merchant Conversations &rarr;
          </Link>
        </div>
      </article>
    </div>
  )
}
