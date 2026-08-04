import { getFlagshipAdminClient } from '@/lib/flagship-server'
import { provinces } from '@/data/flagship'
import { ClipboardList, MapPinned, MessageSquareQuote, Network, UsersRound } from 'lucide-react'
import Link from 'next/link'

type SegmentRow = { primary_segment: string }
type ProvinceRow = { province: string }

export default async function FlagshipAdminPage() {
  let stats = { screened: 0, responses: 0, stories: 0, partners: 0, referrals: 0 }
  let segmentRows: SegmentRow[] = []
  let provinceRows: ProvinceRow[] = []
  let configurationError = ''

  try {
    const supabase = getFlagshipAdminClient()
    const [screened, responses, stories, partners, referrals, segments, covered] = await Promise.all([
      supabase.from('flagship_screenings').select('*', { count: 'exact', head: true }),
      supabase.from('flagship_responses').select('*', { count: 'exact', head: true }),
      supabase.from('flagship_stories').select('*', { count: 'exact', head: true }),
      supabase.from('flagship_partner_inquiries').select('*', { count: 'exact', head: true }),
      supabase.from('flagship_business_referrals').select('*', { count: 'exact', head: true }),
      supabase.from('flagship_responses').select('primary_segment'),
      supabase.from('flagship_responses').select('province'),
    ])
    const firstError = [screened.error, responses.error, stories.error, partners.error, referrals.error, segments.error, covered.error].find(Boolean)
    if (firstError) throw firstError
    stats = { screened: screened.count || 0, responses: responses.count || 0, stories: stories.count || 0, partners: partners.count || 0, referrals: referrals.count || 0 }
    segmentRows = segments.data || []
    provinceRows = covered.data || []
  } catch (error) {
    configurationError = error instanceof Error ? error.message : 'Research database is not available.'
  }

  const segmentCounts = segmentRows.reduce<Record<string, number>>((acc, row) => {
    acc[row.primary_segment] = (acc[row.primary_segment] || 0) + 1
    return acc
  }, {})
  const coveredProvinces = new Set(provinceRows.map((row) => row.province))
  const cards = [
    ['Screened', stats.screened, ClipboardList, 'text-cyan-400'],
    ['Completed surveys', stats.responses, UsersRound, 'text-green-400'],
    ['Stories', stats.stories, MessageSquareQuote, 'text-orange-300'],
    ['Partner inquiries', stats.partners, MapPinned, 'text-purple-400'],
    ['Business referrals', stats.referrals, Network, 'text-lime-300'],
  ] as const

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-300">From Income to Assets</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Research operations</h1>
        <p className="mt-2 text-zinc-300">Private, aggregate intake view. Contact data remains in its separate restricted table.</p>
      </div>
      {configurationError && <div className="mb-7 rounded border border-yellow-600/40 bg-yellow-900/30 p-4 text-sm text-yellow-100">Database setup required: {configurationError}</div>}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, Icon, color]) => <div key={label} className="rounded-lg border border-zinc-800/60 bg-zinc-900/75 p-5 backdrop-blur"><div className="mb-3 flex items-center justify-between"><span className="text-sm text-zinc-300">{label}</span><Icon size={20} className={color} /></div><strong className="text-3xl text-white">{value}</strong></div>)}
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-zinc-800/60 bg-zinc-900/75 p-6">
          <h2 className="mb-5 text-lg font-bold text-white">Sample by segment</h2>
          {[['micro_entrepreneur', 'Micro-entrepreneurs'], ['household_business', 'Household businesses'], ['smallholder', 'Smallholders']].map(([key, label]) => <div key={key} className="flex items-center justify-between border-t border-zinc-800 py-4"><span className="text-zinc-300">{label}</span><strong className="text-white">{segmentCounts[key] || 0}</strong></div>)}
        </section>
        <section className="rounded-lg border border-zinc-800/60 bg-zinc-900/75 p-6">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-white">Provincial coverage</h2><span className="text-sm font-bold text-orange-300">{coveredProvinces.size}/{provinces.length}</span></div>
          <div className="flex max-h-72 flex-wrap gap-2 overflow-auto">
            {provinces.map((province) => <span key={province} className={`rounded-full px-3 py-1 text-xs ${coveredProvinces.has(province) ? 'bg-green-500/20 text-green-300' : 'bg-zinc-800 text-zinc-400'}`}>{province}</span>)}
          </div>
        </section>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-lg border border-lime-700/40 bg-lime-950/25 p-6">
        <div><h2 className="font-bold text-white">Introduction queue</h2><p className="mt-1 text-sm text-zinc-300">Review referrer context, permission status, and the requested connection path before contacting either side.</p></div>
        <Link href="/admin/flagship/referrals" className="rounded border border-lime-500/50 px-4 py-2 text-sm font-bold text-lime-200 hover:bg-lime-900/40">Review referrals →</Link>
      </div>
      <div className="mt-6 rounded-lg border border-zinc-800/60 bg-zinc-900/75 p-6 text-sm leading-6 text-zinc-300">
        Public metrics must be promoted manually from this operational view into the evidence ledger only after deduplication and review. Counts shown here are intake records, not automatically verified research findings.
      </div>
    </div>
  )
}
