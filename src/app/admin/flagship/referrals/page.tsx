import Link from 'next/link'
import { getFlagshipAdminClient } from '@/lib/flagship-server'

type Referral = {
  id: string
  entity_name: string
  entity_type: string
  province: string
  referral_reason: string
  referrer_name: string
  referrer_contact: string
  referrer_relationship: string
  contact_permission: string
  referred_contact_name: string | null
  referred_contact_channel: string | null
  contact_source: string | null
  connection_preference: string
  status: string
  created_at: string
}

const humanize = (value: string) => value.replaceAll('_', ' ')

export default async function FlagshipReferralsPage() {
  let referrals: Referral[] = []
  let errorMessage = ''

  try {
    const supabase = getFlagshipAdminClient()
    const { data, error } = await supabase
      .from('flagship_business_referrals')
      .select('id, entity_name, entity_type, province, referral_reason, referrer_name, referrer_contact, referrer_relationship, contact_permission, referred_contact_name, referred_contact_channel, contact_source, connection_preference, status, created_at')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) throw error
    referrals = data || []
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Referral queue is unavailable.'
  }

  return (
    <div>
      <Link href="/admin/flagship" className="text-sm font-bold text-orange-300">← Research operations</Link>
      <div className="my-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300">Private introduction queue</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Business and community referrals</h1>
        <p className="mt-2 max-w-3xl text-zinc-300">Contact details below are operational data, not research consent. Follow the recorded permission and connection preference before using them.</p>
      </div>
      {errorMessage && <div className="mb-6 rounded border border-yellow-600/40 bg-yellow-900/30 p-4 text-yellow-100">{errorMessage}</div>}
      <div className="space-y-5">
        {referrals.map((referral) => (
          <article key={referral.id} className="rounded-lg border border-zinc-800/70 bg-zinc-900/80 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide"><span className="rounded-full bg-lime-500/15 px-2.5 py-1 text-lime-300">{humanize(referral.entity_type)}</span><span className="rounded-full bg-zinc-800 px-2.5 py-1 text-zinc-300">{referral.province}</span><span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-cyan-300">{humanize(referral.status)}</span></div>
                <h2 className="mt-3 text-2xl font-bold text-white">{referral.entity_name}</h2>
              </div>
              <time className="text-xs text-zinc-500">{new Date(referral.created_at).toLocaleDateString('en-GB')}</time>
            </div>
            <p className="mt-4 max-w-4xl whitespace-pre-wrap text-sm leading-6 text-zinc-300">{referral.referral_reason}</p>
            <div className="mt-5 grid gap-4 border-t border-zinc-800 pt-5 md:grid-cols-3">
              <div><p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Referrer</p><p className="mt-1 text-sm text-white">{referral.referrer_name}</p><p className="text-sm text-zinc-300">{referral.referrer_contact}</p><p className="mt-1 text-xs text-zinc-500">{humanize(referral.referrer_relationship)}</p></div>
              <div><p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Referred contact</p><p className="mt-1 text-sm text-white">{referral.referred_contact_name || 'Not shared'}</p><p className="text-sm text-zinc-300">{referral.referred_contact_channel || '—'}</p>{referral.contact_source && <p className="mt-1 break-all text-xs text-zinc-500">Public source: {referral.contact_source}</p>}</div>
              <div><p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Permission and next step</p><p className="mt-1 text-sm text-white">{humanize(referral.contact_permission)}</p><p className="text-sm text-zinc-300">{humanize(referral.connection_preference)}</p></div>
            </div>
          </article>
        ))}
        {!errorMessage && referrals.length === 0 && <div className="rounded-lg border border-zinc-800/70 bg-zinc-900/80 p-10 text-center text-zinc-400">No referrals have been submitted yet.</div>}
      </div>
    </div>
  )
}

