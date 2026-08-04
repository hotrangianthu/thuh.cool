export type SaPartnersCategory = 'A' | 'B' | 'C' | 'D'
export type SaPartnersAccess = 'public' | 'inquiry'

export interface SaPartnersReport {
  code: string
  slug: string
  title: string
  teaser: string
  category: SaPartnersCategory
  tags: string[]
  publishedAt: string
  slideCount: 26
  access: SaPartnersAccess
}

export const SA_PARTNERS_CONTACT_EMAIL = 'thulaneinc@gmail.com'

export const saPartnersCategories: Record<
  SaPartnersCategory,
  { label: string; shortLabel: string; description: string }
> = {
  A: {
    label: 'Government Finance & Fiscal Strategy',
    shortLabel: 'Government Finance',
    description: 'Budgets, public investment, fiscal capacity, and the institutions that convert ambition into execution.',
  },
  B: {
    label: 'Policy Systems & Institutions',
    shortLabel: 'Policy Systems',
    description: 'Regulatory design, public-sector delivery, trust, measurement, and the lived experience of policy.',
  },
  C: {
    label: 'Fintech Market Economics',
    shortLabel: 'Market Economics',
    description: 'Payments, credit, insurance, risk, and the commercial mechanics of financial inclusion in Southeast Asia.',
  },
  D: {
    label: 'Regulated Product & Distribution',
    shortLabel: 'Product & Distribution',
    description: 'How regulated products are built, localized, distributed, and sustained in complex emerging markets.',
  },
}

const publishedAt = '2026-06-01'

export const saPartnersReports: SaPartnersReport[] = [
  {
    code: 'A1',
    slug: 'a1-budget-strategy',
    title: 'Vietnam Government Budget 2026: Plan vs. Actual',
    teaser: 'Vietnam’s most ambitious fiscal expansion is also an institutional stress test: the growth dividend depends on whether capital can move from plan to ground.',
    category: 'A',
    tags: ['Vietnam', 'Fiscal Strategy', 'Public Investment'],
    publishedAt,
    slideCount: 26,
    access: 'public',
  },
  {
    code: 'A2', slug: 'a2-disbursement-state', title: 'Capital Disbursement as State Capacity',
    teaser: 'Why Vietnam repeatedly approves more public investment than its institutions can spend—and what the execution gap signals.',
    category: 'A', tags: ['State Capacity', 'Capex', 'Execution'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'A3', slug: 'a3-admin-consolidation', title: 'Vietnam’s Administrative Consolidation 2025–2026',
    teaser: 'What province mergers change for fiscal coordination, public services, and nationwide financial distribution.',
    category: 'A', tags: ['Provinces', 'Administration', 'Distribution'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'A4', slug: 'a4-investment-industrial', title: 'Vietnam’s Industrial Investment Strategy 2026',
    teaser: 'FDI anchors, special economic zones, and the manufacturing-to-finance flywheel shaping Vietnam’s next growth phase.',
    category: 'A', tags: ['FDI', 'Industrial Policy', 'Manufacturing'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'A5', slug: 'a5-human-capital-budget', title: 'Investing in People',
    teaser: 'How Vietnam’s human-capital budget allocates for education, health, and the skills transition—and where delivery falls short.',
    category: 'A', tags: ['Human Capital', 'Skills', 'Budget'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'A6', slug: 'a6-provincial-fiscal-map', title: 'Vietnam’s Provincial Fiscal Map',
    teaser: 'A comparative view of revenue generation, transfers, and expenditure disparities across Vietnam’s provinces.',
    category: 'A', tags: ['Provincial Finance', 'Transfers', 'Regional Development'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'A7', slug: 'a7-budget-transparency', title: 'Open Books, Closed Rooms',
    teaser: 'What Vietnam’s improving budget disclosures reveal, what they still obscure, and why visibility changes accountability.',
    category: 'A', tags: ['Transparency', 'Accountability', 'Public Finance'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'A8', slug: 'a8-social-welfare-product', title: 'Social Welfare as Product Design',
    teaser: 'Vietnam’s social protection system examined as a service journey: eligibility, access, delivery, and trust.',
    category: 'A', tags: ['Social Protection', 'Service Design', 'Welfare'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B1', slug: 'b1-policy-product-mgmt', title: 'Policy Is a Product',
    teaser: 'Applying product-management discipline to regulation: user needs, feedback loops, adoption, and measurable outcomes.',
    category: 'B', tags: ['Policy Design', 'Product Management', 'Government'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B2', slug: 'b2-joint-action-tax', title: 'Joint Action Problems in Tax Compliance',
    teaser: 'The VAT gap, informality, and enforcement trade-offs behind Vietnam’s challenge of broadening its tax base.',
    category: 'B', tags: ['Tax', 'Informality', 'Compliance'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B3', slug: 'b3-street-level-ux', title: 'Street-Level Bureaucracy UX',
    teaser: 'How frontline officials translate formal policy into the actual citizen experience—and reshape outcomes in the process.',
    category: 'B', tags: ['Public Service', 'Citizen Experience', 'Delivery'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B4', slug: 'b4-sandbox-quarantine', title: 'The Sandbox Paradox',
    teaser: 'When regulatory sandboxes enable experimentation, when they quarantine it, and what determines the route to scale.',
    category: 'B', tags: ['Regulation', 'Sandboxes', 'Innovation'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B5', slug: 'b5-financial-inclusion', title: 'Financial Inclusion Policy in Vietnam',
    teaser: 'The distance between nominal coverage and meaningful access across accounts, credit, insurance, and everyday use.',
    category: 'B', tags: ['Financial Inclusion', 'Access', 'Vietnam'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B6', slug: 'b6-complaint-trust', title: 'Complaint as Signal',
    teaser: 'How grievance mechanisms become institutional sensing systems—or accelerate the destruction of public trust.',
    category: 'B', tags: ['Trust', 'Grievance', 'Institutions'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'B7', slug: 'b7-metrics-that-lie', title: 'Metrics That Lie',
    teaser: 'How official statistics can mislead in Vietnam, which incentives distort measurement, and what to read alongside them.',
    category: 'B', tags: ['Statistics', 'Measurement', 'Evidence'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C1', slug: 'c1-free-payments-profit', title: 'Free Payments and Profit',
    teaser: 'The business models that allow payment companies to earn when the transaction appears free to the user.',
    category: 'C', tags: ['Payments', 'Business Models', 'Unit Economics'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C2', slug: 'c2-wallets-post-margin', title: 'Digital Wallets After Margin Compression',
    teaser: 'What remains when subsidies recede, growth slows, and wallet economics must support their own distribution.',
    category: 'C', tags: ['Wallets', 'Margins', 'Growth'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C3', slug: 'c3-take-rate-stack', title: 'The Take Rate Stack',
    teaser: 'A full accounting of how Southeast Asian fintech intermediaries earn, share, and lose economics across the value chain.',
    category: 'C', tags: ['Take Rate', 'Fintech', 'Value Chain'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C4', slug: 'c4-crossborder-qr', title: 'The QR Border Crossing',
    teaser: 'How cross-border QR networks are integrating Southeast Asian payments—and where settlement and adoption still fragment.',
    category: 'C', tags: ['Cross-Border', 'QR Payments', 'ASEAN'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C5', slug: 'c5-interest-rate-caps', title: 'Interest Rate Caps and Credit Markets',
    teaser: 'How price ceilings reshape lender participation, product design, borrower access, and hidden costs across Southeast Asia.',
    category: 'C', tags: ['Credit', 'Interest Rates', 'Regulation'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C6', slug: 'c6-bnpl-merchant-credit', title: 'BNPL and Merchant Credit',
    teaser: 'The emerging consumer-debt architecture connecting checkout conversion, merchant finance, and household leverage.',
    category: 'C', tags: ['BNPL', 'Merchant Credit', 'Consumer Finance'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C7', slug: 'c7-collections-economics', title: 'The Invisible Cost Center',
    teaser: 'Collections economics in consumer lending: cure rates, channel costs, operational design, and the limits of automation.',
    category: 'C', tags: ['Collections', 'Lending', 'Operations'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C8', slug: 'c8-alt-data-scoring', title: 'Alternative Data for Credit Scoring',
    teaser: 'The promise, limits, and governance of behavioral and transaction data in Vietnam and Southeast Asian credit markets.',
    category: 'C', tags: ['Credit Scoring', 'Alternative Data', 'Risk'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C9', slug: 'c9-ltv-model', title: 'The LTV Illusion',
    teaser: 'Why standard lifetime-value models break in subsidized, multi-product Southeast Asian fintech businesses.',
    category: 'C', tags: ['LTV', 'Modeling', 'Unit Economics'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C10', slug: 'c10-remittances', title: 'The Money That Moves Families',
    teaser: 'Vietnam’s remittance market mapped across corridors, household uses, pricing, channels, and digital disruption.',
    category: 'C', tags: ['Remittances', 'Households', 'Cross-Border'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C11', slug: 'c11-microinsurance', title: 'Microinsurance in Southeast Asia',
    teaser: 'Whether the protection gap is primarily a product problem, a distribution arbitrage, or a question of household trust.',
    category: 'C', tags: ['Insurance', 'Protection Gap', 'Distribution'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'C12', slug: 'c12-digital-assets-aml', title: 'Digital Assets and AML',
    teaser: 'How crypto oversight is becoming the next fintech licensing regime across Southeast Asia.',
    category: 'C', tags: ['Digital Assets', 'AML', 'Licensing'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D1', slug: 'd1-regulated-velocity', title: 'Regulated Velocity',
    teaser: 'How product teams preserve momentum when every meaningful release crosses legal, compliance, and operational boundaries.',
    category: 'D', tags: ['Product Delivery', 'Regulation', 'Teams'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D2', slug: 'd2-compliance-feature', title: 'Compliance as a Competitive Moat',
    teaser: 'Turning AML and KYC from launch blockers into faster onboarding, better risk selection, and institutional advantage.',
    category: 'D', tags: ['Compliance', 'KYC', 'Product Strategy'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D3', slug: 'd3-mvp-not-minimal', title: 'MVP Is Not Minimal',
    teaser: 'Why the classic minimum viable product fails when trust, localization, operations, and regulation are table stakes.',
    category: 'D', tags: ['MVP', 'Product Strategy', 'Fintech'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D4', slug: 'd4-localization', title: 'Localization Is Institutional Fit',
    teaser: 'Why translation is the smallest part of adapting financial products to Southeast Asian markets.',
    category: 'D', tags: ['Localization', 'Institutions', 'Market Entry'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D5', slug: 'd5-first-100-skeptics', title: 'The First 100 Skeptics',
    teaser: 'Why early evidence from reluctant users is more valuable than enthusiasm from believers in emerging-market fintech.',
    category: 'D', tags: ['User Research', 'Adoption', 'Validation'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D6', slug: 'd6-distribution-dependency', title: 'Distribution Dependency Risk',
    teaser: 'When a partner-powered growth engine becomes an existential dependency—and how to spot the risk before leverage disappears.',
    category: 'D', tags: ['Distribution', 'Partnerships', 'Risk'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D7', slug: 'd7-chat-crm', title: 'Chat as CRM',
    teaser: 'How Zalo and WhatsApp become the primary customer relationship layer for Southeast Asian financial services.',
    category: 'D', tags: ['Messaging', 'CRM', 'Customer Service'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D8', slug: 'd8-field-activation', title: 'Field Activation and Ground-Level Distribution',
    teaser: 'Why the last mile is still human—and how field networks alter acquisition, trust, training, and unit economics.',
    category: 'D', tags: ['Field Operations', 'Last Mile', 'Distribution'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D9', slug: 'd9-ledger-debt', title: 'Ledger Debt',
    teaser: 'Why financial technical debt compounds through reconciliation, reporting, risk, and customer trust differently from software debt.',
    category: 'D', tags: ['Ledgers', 'Technical Debt', 'Risk'], publishedAt, slideCount: 26, access: 'inquiry',
  },
  {
    code: 'D10', slug: 'd10-stated-vs-revealed', title: 'Stated vs. Revealed Preferences',
    teaser: 'What customer behavior reveals when survey answers, product usage, and financial decisions point in different directions.',
    category: 'D', tags: ['Behavior', 'Research', 'Financial Services'], publishedAt, slideCount: 26, access: 'inquiry',
  },
]

export function getSaPartnersReport(slug: string) {
  return saPartnersReports.find((report) => report.slug === slug)
}

export function getReportSlideUrl(report: SaPartnersReport, slide: number) {
  return `/sa-partners/reports/${report.slug}/slide-${String(slide).padStart(2, '0')}.jpg`
}

export function getReportPreviewCount(report: SaPartnersReport) {
  return report.access === 'public' ? report.slideCount : 3
}
