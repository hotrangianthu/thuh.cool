import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Merchant Conversations',
  description:
    'Six interview excerpts from Tay Ninh province — vegetable sellers, traders, farmers, and officials on cash, trust, and digital finance.',
}

const conversations = [
  {
    id: 1,
    speaker: 'Vegetable Seller, Cho Long Hoa Market',
    context: 'Female, approximately 55 years old, selling vegetables for over 20 years at the same stall.',
    quote:
      "My daughter set up MoMo for me. I used it once to send money to my son in Binh Duong. But here? Everyone pays cash. If I ask for QR, they look at me strange.",
    insight:
      'Digital tools are adopted for family transfers across distance, not for local commerce. The use case is remittance, not retail.',
    themes: ['Remittance', 'Social Norms', 'Cash Economy'],
  },
  {
    id: 2,
    speaker: 'Motorbike Repair Shop Owner',
    context: 'Male, approximately 40 years old, roadside repair shop on a provincial road near Tay Ninh town.',
    quote:
      "I know about VNPay, ZaloPay. But my customers — they come with 50,000 đồng in their pocket. They're not going to scan a code for a tire patch.",
    insight:
      'Transaction size is a decisive variable. Micro-transactions stay cash not because of ignorance of alternatives, but because the marginal effort of digital payment exceeds its benefit at low amounts.',
    themes: ['Transaction Size', 'Cash Economy', 'Micro-commerce'],
  },
  {
    id: 3,
    speaker: 'Pharmacy Owner',
    context: 'Female, approximately 35 years old, modern pharmacy in the town center. One of the few QR-accepting businesses in the market area.',
    quote:
      "We have QR. Maybe 5% of customers use it. Mostly young people. Mostly for bigger purchases — medicine for parents, not aspirin.",
    insight:
      'Digital payment adoption correlates with customer education level and transaction size simultaneously. The pharmacy is a useful test case: same location, same infrastructure, dramatically different adoption by customer segment.',
    themes: ['Digital Adoption', 'Education', 'Transaction Size'],
  },
  {
    id: 4,
    speaker: 'Rice Trader (Middleman)',
    context: 'Male, approximately 50 years old. Buys rice from over 30 farms in the district and sells to processors in Ho Chi Minh City.',
    quote:
      "Cash is trust. I show up with money, the farmer knows I'm serious. A bank transfer? He has to wait, check, wonder if it's real. Cash is now.",
    insight:
      'In agricultural trade, cash carries relational and temporal value that digital transfers do not replicate. Immediacy and tangibility are not inefficiencies to be engineered away — they are trust mechanisms. Any digitization of agricultural payments must address this trust gap directly.',
    themes: ['Trust', 'Agricultural Trade', 'Cash Economy'],
  },
  {
    id: 5,
    speaker: 'Commune Official',
    context: 'Male, approximately 45 years old, administrative staff at the commune people\'s committee. Responsible for local governance and public service delivery.',
    quote:
      "We're supposed to push digital government services. But half the people who come here don't have smartphones. The other half don't know how to use the apps.",
    insight:
      'Digital government mandates assume digital citizens. Where that assumption fails — as it does in most rural communes — the policy produces confusion and exclusion rather than access. The official himself was practically knowledgeable: he knew what worked for his residents. The national plan did not build on that knowledge.',
    themes: ['Digital Government', 'Policy Gap', 'Digital Literacy'],
  },
  {
    id: 6,
    speaker: "Giant's Cousin — Young Farmer",
    context: 'Male, 28 years old, dragon fruit farmer. High school educated. Active Shopee and MoMo user.',
    quote:
      "I use Shopee, I use MoMo. But that's for buying things online. Selling my fruit? The buyer pays cash. That's just how it works here.",
    insight:
      'Even digitally fluent young people operate in a cash economy for their core livelihood. Consumer digital adoption and commercial digital adoption are separate problems. Being a Shopee buyer does not make you a digital seller or enable you to receive digital payment for agricultural output.',
    themes: ['Youth', 'Agricultural Trade', 'Consumer vs. Commerce'],
  },
]

const themeColors: Record<string, string> = {
  'Remittance': '#EBF0F7',
  'Social Norms': '#EBF0F7',
  'Cash Economy': '#F7EDED',
  'Micro-commerce': '#EBF0F7',
  'Transaction Size': '#F7EDED',
  'Digital Adoption': '#EBF0F7',
  'Education': '#EBF0F7',
  'Trust': '#F7EDED',
  'Agricultural Trade': '#F7F3EB',
  'Digital Government': '#EBF0F7',
  'Policy Gap': '#F7EDED',
  'Digital Literacy': '#EBF0F7',
  'Youth': '#EBF0F7',
  'Consumer vs. Commerce': '#F7F3EB',
}

const themeTextColors: Record<string, string> = {
  'Cash Economy': 'var(--color-accent-red)',
  'Transaction Size': 'var(--color-accent-red)',
  'Trust': 'var(--color-accent-red)',
  'Policy Gap': 'var(--color-accent-red)',
  'Agricultural Trade': '#7A5C00',
  'Consumer vs. Commerce': '#7A5C00',
  'F7F3EB': '#7A5C00',
}

export default function MerchantConversationsPage() {
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
          Field Notes &mdash; Interviews
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: '600',
            color: 'var(--color-accent)',
            lineHeight: '1.25',
            marginBottom: '1.25rem',
          }}
        >
          Merchant Conversations
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: '1rem',
          }}
        >
          Six conversations from Tay Ninh province, March 2024. These are not a
          statistically representative sample. They are a starting point &mdash; the
          voices that prompted the questions my research attempts to answer.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Quotes are reconstructed from contemporaneous notes. Names are withheld
          by convention.
        </p>
      </section>

      {/* Conversation cards */}
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            maxWidth: '800px',
          }}
        >
          {conversations.map((conv) => (
            <article
              key={conv.id}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Quote section */}
              <div
                style={{
                  padding: '2rem 2rem 1.5rem',
                  borderBottom: '1px solid var(--color-border-light)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3rem',
                    lineHeight: '1',
                    color: 'var(--color-accent)',
                    opacity: 0.2,
                    marginBottom: '-0.5rem',
                    userSelect: 'none',
                  }}
                >
                  &ldquo;
                </div>

                <blockquote
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-xl)',
                    fontStyle: 'italic',
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {conv.quote}
                </blockquote>
              </div>

              {/* Context + insight */}
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {conv.speaker}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 'var(--leading-relaxed)',
                      margin: 0,
                    }}
                  >
                    {conv.context}
                  </p>
                </div>

                {/* Insight callout */}
                <div
                  style={{
                    backgroundColor: '#EBF0F7',
                    borderLeft: '3px solid var(--color-accent)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.25rem',
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
                    Key Insight
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
                    {conv.insight}
                  </p>
                </div>

                {/* Theme tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {conv.themes.map((theme) => (
                    <span
                      key={theme}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '500',
                        color: themeTextColors[theme] || 'var(--color-accent)',
                        backgroundColor: themeColors[theme] || '#EBF0F7',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Synthesis note */}
        <div
          style={{
            maxWidth: '720px',
            marginTop: '3.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              fontWeight: '600',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}
          >
            What these conversations suggest
          </h2>

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <p>
              The pattern across these six conversations is consistent: digital financial
              tools are known, available, and in some cases used &mdash; but for a narrow
              set of use cases. Remittance. Consumer apps. Inter-city transfers.
            </p>
            <p>
              They are not yet used for the core economic activities that define rural
              livelihoods: selling agricultural output, paying for local services,
              accessing credit, receiving government disbursements. The gap is not
              awareness. It is adoption in the context where financial inclusion actually
              matters.
            </p>
            <p>
              The policy implication is precise: closing the rural digital finance gap
              requires interventions targeted at the productive economy, not the consumer
              economy. That distinction is mostly absent from Vietnam&rsquo;s 2025&ndash;2035
              plan.
            </p>
          </div>
        </div>

        {/* Navigation footer */}
        <div
          style={{
            maxWidth: '720px',
            marginTop: '3rem',
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
            href="/public-policy/field-notes/72-hours-tay-ninh"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
            }}
          >
            &larr; 72 Hours in Tay Ninh
          </Link>
          <Link
            href="/public-policy/research"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-accent-red)',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Read the Research &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
