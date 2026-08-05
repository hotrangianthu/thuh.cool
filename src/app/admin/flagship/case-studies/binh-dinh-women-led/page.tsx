import Link from 'next/link'
import { getFlagshipAdminClient } from '@/lib/flagship-server'
import {
  addArtifactVersion,
  addCostItem,
  addEvidenceClaim,
  addFieldworkRecord,
  addPilotRecord,
  verifyCostItem,
  verifyEvidenceClaim,
  verifyFieldworkRecord,
} from './actions'

type Cycle = { id: string; status: string; public_geography_en: string; target_min: number; target_max: number }
type Fieldwork = { id: string; public_code: string; occurred_on: string; participant_category: string; format: string; evidence_available: boolean; consent_scope: string; verified_at: string | null; public_aggregate: boolean }
type Claim = { id: string; claim_en: string; source_label: string; confidence: string; verification_status: string }
type Version = { id: string; artifact_key: string; version: string; revision_date: string; public_snapshot: boolean }
type Pilot = { id: string; participant_code: string; enrollment_status: string; baseline_completed_on: string | null; follow_up_completed_on: string | null }
type Cost = { id: string; cost_block: string; source_label: string; base_vnd: number | null; verification_status: string }

const inputClass = 'w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600'
const labelClass = 'grid gap-1 text-xs font-bold uppercase tracking-wide text-zinc-400'
const panelClass = 'rounded-lg border border-zinc-800/70 bg-zinc-900/75 p-6'

function HiddenCycle({ id }: { id: string }) { return <input type="hidden" name="cycleId" value={id} /> }

export default async function BinhDinhWomenLedAdminPage() {
  let cycle: Cycle | null = null
  let fieldwork: Fieldwork[] = []
  let claims: Claim[] = []
  let versions: Version[] = []
  let pilot: Pilot[] = []
  let costs: Cost[] = []
  let configurationError = ''

  try {
    const supabase = getFlagshipAdminClient()
    const cycleResult = await supabase.from('flagship_case_cycles').select('id,status,public_geography_en,target_min,target_max').eq('slug', 'binh-dinh-women-led-household-businesses').single()
    if (cycleResult.error) throw cycleResult.error
    cycle = cycleResult.data
    const [fieldworkResult, claimsResult, versionsResult, pilotResult, costsResult] = await Promise.all([
      supabase.from('flagship_case_fieldwork').select('id,public_code,occurred_on,participant_category,format,evidence_available,consent_scope,verified_at,public_aggregate').eq('cycle_id', cycle.id).order('occurred_on', { ascending: false }).limit(50),
      supabase.from('flagship_case_claims').select('id,claim_en,source_label,confidence,verification_status').eq('cycle_id', cycle.id).order('created_at', { ascending: false }).limit(50),
      supabase.from('flagship_case_versions').select('id,artifact_key,version,revision_date,public_snapshot').eq('cycle_id', cycle.id).order('revision_date', { ascending: false }).limit(50),
      supabase.from('flagship_case_pilot_records').select('id,participant_code,enrollment_status,baseline_completed_on,follow_up_completed_on').eq('cycle_id', cycle.id).order('created_at', { ascending: false }).limit(50),
      supabase.from('flagship_case_cost_items').select('id,cost_block,source_label,base_vnd,verification_status').eq('cycle_id', cycle.id).order('created_at', { ascending: false }).limit(50),
    ])
    const error = [fieldworkResult.error, claimsResult.error, versionsResult.error, pilotResult.error, costsResult.error].find(Boolean)
    if (error) throw error
    fieldwork = fieldworkResult.data || []
    claims = claimsResult.data || []
    versions = versionsResult.data || []
    pilot = pilotResult.data || []
    costs = costsResult.data || []
  } catch (error) {
    configurationError = error instanceof Error ? error.message : 'Case-study database is unavailable.'
  }

  const verifiedFieldwork = fieldwork.filter((record) => record.public_aggregate).length
  const verifiedClaims = claims.filter((claim) => claim.verification_status === 'verified').length
  const verifiedCosts = costs.filter((cost) => cost.verification_status === 'verified').length

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300">From Income to Assets · Case study</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Women-led household businesses · Bình Định</h1>
          <p className="mt-2 text-zinc-300">Private research operations. Public pages consume only a reviewed, version-controlled snapshot.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/flagship/from-income-to-assets/en/women-led-household-businesses" target="_blank" className="rounded border border-zinc-600 px-4 py-2 text-sm font-bold text-zinc-200">View public track ↗</Link>
          <Link href="/api/admin/flagship/case-study/export" className="rounded border border-lime-500/60 px-4 py-2 text-sm font-bold text-lime-200">Download review bundle ↓</Link>
        </div>
      </div>

      {configurationError && <div className="mb-7 rounded border border-yellow-600/40 bg-yellow-900/30 p-4 text-sm text-yellow-100"><strong>Migration required.</strong> Apply <code>database/migrations/00012_create_flagship_case_study.sql</code>. Database response: {configurationError}</div>}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ['Fieldwork records', fieldwork.length], ['Verified aggregates', verifiedFieldwork], ['Verified claims', verifiedClaims], ['Pilot enrollments', pilot.length], ['Verified cost lines', verifiedCosts],
        ].map(([label, value]) => <div className={panelClass} key={label}><span className="text-sm text-zinc-400">{label}</span><strong className="mt-3 block text-3xl text-white">{value}</strong></div>)}
      </div>

      {cycle && <>
        <div className="mb-8 grid gap-6 xl:grid-cols-2">
          <section className={panelClass}>
            <h2 className="mb-1 text-xl font-bold text-white">Cycle status</h2>
            <p className="mb-5 text-sm text-zinc-400">{cycle.public_geography_en} · target {cycle.target_min}–{cycle.target_max} · {cycle.status}</p>
            <p className="rounded border border-orange-700/40 bg-orange-950/30 p-4 text-sm leading-6 text-orange-100">Do not copy database totals directly to the public page. Verify evidence, download the review bundle, and promote approved values through the versioned public data record.</p>
          </section>
          <section className={panelClass}>
            <h2 className="mb-4 text-xl font-bold text-white">Publication gate</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-300"><li>Confirm format and evidence reference.</li><li>Review consent scope and de-identification.</li><li>Mark the record verified.</li><li>Download the review bundle.</li><li>Update the public snapshot in a reviewed commit.</li></ol>
          </section>
        </div>

        <section className={`${panelClass} mb-8`}>
          <h2 className="mb-5 text-xl font-bold text-white">Add fieldwork record</h2>
          <form action={addFieldworkRecord} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <HiddenCycle id={cycle.id} />
            <label className={labelClass}>Public code<input className={inputClass} name="publicCode" required placeholder="BD-WHB-001" pattern="[A-Za-z0-9-]{4,40}" /></label>
            <label className={labelClass}>Date<input className={inputClass} name="occurredOn" type="date" required /></label>
            <label className={labelClass}>Participant category<select className={inputClass} name="participantCategory" required defaultValue="women_led_household_business"><option value="women_led_household_business">Women-led household business</option><option value="cooperative_member">Cooperative member</option><option value="womens_union_actor">Women’s Union actor</option><option value="local_delivery_actor">Local delivery actor</option><option value="financial_practitioner">Financial practitioner</option><option value="policy_expert">Policy expert</option><option value="researcher">Researcher</option><option value="other">Other</option></select></label>
            <label className={labelClass}>Format<select className={inputClass} name="format" required><option value="structured_interview">Structured interview</option><option value="exploratory_conversation">Exploratory conversation</option><option value="retrospective_recollection">Retrospective recollection</option><option value="practitioner_interview">Practitioner interview</option><option value="direct_observation">Direct observation</option><option value="co_design_workshop">Co-design workshop</option></select></label>
            <label className={labelClass}>Public location<input className={inputClass} name="publicLocation" defaultValue="Bình Định" /></label>
            <label className={labelClass}>Private location<input className={inputClass} name="privateLocation" placeholder="Restricted" /></label>
            <label className={labelClass}>Consent scope<select className={inputClass} name="consentScope" required defaultValue="private_use"><option value="not_recorded">Not recorded</option><option value="private_use">Private use</option><option value="anonymous_quote">Anonymous quotation</option><option value="attributed_quote">Attributed quotation</option></select></label>
            <label className={labelClass}>Evidence reference<input className={inputClass} name="evidenceReference" placeholder="Opaque notes/calendar reference" /></label>
            <label className={`${labelClass} md:col-span-2`}>Anonymized insight<textarea className={inputClass} name="anonymizedInsight" rows={3} /></label>
            <label className={`${labelClass} md:col-span-2`}>Follow-up action<textarea className={inputClass} name="followUpAction" rows={3} /></label>
            <button className="rounded bg-lime-300 px-4 py-2 text-sm font-bold text-zinc-950 md:col-span-2 xl:col-span-4">Add private record</button>
          </form>
          <div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-zinc-500"><tr><th className="py-2">Code</th><th>Date</th><th>Format</th><th>Consent</th><th>Evidence</th><th>Publication gate</th></tr></thead><tbody>{fieldwork.map((record) => <tr className="border-t border-zinc-800 text-zinc-300" key={record.id}><td className="py-3 font-mono text-white">{record.public_code}</td><td>{record.occurred_on}</td><td>{record.format}</td><td>{record.consent_scope}</td><td>{record.evidence_available ? 'Available' : 'Missing'}</td><td>{record.public_aggregate ? <span className="text-green-300">Verified aggregate</span> : record.evidence_available ? <form action={verifyFieldworkRecord}><input type="hidden" name="id" value={record.id} /><button className="rounded border border-green-600 px-2 py-1 text-xs text-green-300">Verify</button></form> : <span className="text-yellow-300">Add evidence first</span>}</td></tr>)}</tbody></table></div>
        </section>

        <div className="grid gap-8 xl:grid-cols-2">
          <section className={panelClass}>
            <h2 className="mb-5 text-xl font-bold text-white">Evidence claims</h2>
            <form action={addEvidenceClaim} className="grid gap-3">
              <HiddenCycle id={cycle.id} />
              <label className={labelClass}>Claim · Vietnamese<textarea className={inputClass} name="claimVi" required rows={2} /></label>
              <label className={labelClass}>Claim · English<textarea className={inputClass} name="claimEn" required rows={2} /></label>
              <label className={labelClass}>Source label<input className={inputClass} name="sourceLabel" required /></label>
              <label className={labelClass}>Source URL<input className={inputClass} name="sourceUrl" type="url" /></label>
              <div className="grid grid-cols-2 gap-3"><label className={labelClass}>Source type<select className={inputClass} name="sourceType"><option value="primary_institutional">Primary institutional</option><option value="research_literature">Research literature</option><option value="fieldwork">Fieldwork</option><option value="mixed">Mixed</option><option value="other">Other</option></select></label><label className={labelClass}>Year<input className={inputClass} name="sourceYear" required /></label></div>
              <label className={labelClass}>Confidence<select className={inputClass} name="confidence"><option value="high">High</option><option value="moderate">Moderate</option><option value="exploratory">Exploratory</option><option value="contested">Contested</option></select></label>
              <label className={labelClass}>Competing evidence<textarea className={inputClass} name="competingEvidence" rows={2} /></label>
              <label className={labelClass}>Use in project<input className={inputClass} name="projectUse" required /></label>
              <button className="rounded bg-lime-300 px-4 py-2 text-sm font-bold text-zinc-950">Add pending claim</button>
            </form>
            <div className="mt-6 space-y-3">{claims.map((claim) => <article className="rounded border border-zinc-800 p-3" key={claim.id}><p className="text-sm text-white">{claim.claim_en}</p><p className="mt-1 text-xs text-zinc-500">{claim.source_label} · {claim.confidence} · {claim.verification_status}</p>{claim.verification_status === 'pending' && <form className="mt-2" action={verifyEvidenceClaim}><input type="hidden" name="id" value={claim.id} /><button className="rounded border border-green-600 px-2 py-1 text-xs text-green-300">Mark source reviewed</button></form>}</article>)}</div>
          </section>

          <section className={panelClass}>
            <h2 className="mb-5 text-xl font-bold text-white">Pilot cost evidence</h2>
            <form action={addCostItem} className="grid gap-3">
              <HiddenCycle id={cycle.id} />
              <label className={labelClass}>Cost block<input className={inputClass} name="costBlock" required /></label>
              <div className="grid grid-cols-2 gap-3"><label className={labelClass}>Classification<select className={inputClass} name="classification"><option value="fixed">Fixed</option><option value="variable">Variable</option></select></label><label className={labelClass}>Source type<select className={inputClass} name="sourceType"><option value="quote">Quote</option><option value="actual">Actual</option><option value="estimate">Estimate</option><option value="assumption">Explicit assumption</option></select></label></div>
              <label className={labelClass}>Source label<input className={inputClass} name="sourceLabel" required /></label>
              <label className={labelClass}>Source date<input className={inputClass} name="sourceDate" type="date" required /></label>
              <div className="grid grid-cols-3 gap-3"><label className={labelClass}>Low VND<input className={inputClass} name="lowVnd" type="number" min="0" /></label><label className={labelClass}>Base VND<input className={inputClass} name="baseVnd" type="number" min="0" /></label><label className={labelClass}>High VND<input className={inputClass} name="highVnd" type="number" min="0" /></label></div>
              <button className="rounded bg-lime-300 px-4 py-2 text-sm font-bold text-zinc-950">Add cost evidence</button>
            </form>
            <div className="mt-6 space-y-3">{costs.map((cost) => <article className="rounded border border-zinc-800 p-3" key={cost.id}><p className="text-sm text-white">{cost.cost_block}</p><p className="mt-1 text-xs text-zinc-500">{cost.source_label} · base {cost.base_vnd === null ? '—' : `${Number(cost.base_vnd).toLocaleString()} VND`} · {cost.verification_status}</p>{cost.verification_status === 'pending' && <form className="mt-2" action={verifyCostItem}><input type="hidden" name="id" value={cost.id} /><button className="rounded border border-green-600 px-2 py-1 text-xs text-green-300">Verify source</button></form>}</article>)}</div>
          </section>

          <section className={panelClass}>
            <h2 className="mb-5 text-xl font-bold text-white">Pilot enrollment codes</h2>
            <form action={addPilotRecord} className="grid gap-3">
              <HiddenCycle id={cycle.id} />
              <label className={labelClass}>Participant code<input className={inputClass} name="participantCode" required placeholder="BD-WHB-P01" /></label>
              <label className={labelClass}>Status<select className={inputClass} name="enrollmentStatus"><option value="enrolled">Enrolled</option><option value="active">Active</option><option value="completed">Completed</option><option value="withdrawn">Withdrawn</option><option value="lost_to_follow_up">Lost to follow-up</option></select></label>
              <button className="rounded bg-lime-300 px-4 py-2 text-sm font-bold text-zinc-950">Add pseudonymous enrollment</button>
            </form>
            <div className="mt-6 space-y-2">{pilot.map((record) => <div className="flex justify-between rounded border border-zinc-800 p-3 text-sm" key={record.id}><span className="font-mono text-white">{record.participant_code}</span><span className="text-zinc-400">{record.enrollment_status}</span></div>)}</div>
          </section>

          <section className={panelClass}>
            <h2 className="mb-5 text-xl font-bold text-white">Artifact version record</h2>
            <form action={addArtifactVersion} className="grid gap-3">
              <HiddenCycle id={cycle.id} />
              <div className="grid grid-cols-2 gap-3"><label className={labelClass}>Artifact key<input className={inputClass} name="artifactKey" required placeholder="case-study-overview" /></label><label className={labelClass}>Version<input className={inputClass} name="version" required placeholder="v0.2" /></label></div>
              <div className="grid grid-cols-2 gap-3"><label className={labelClass}>Publication date<input className={inputClass} name="publicationDate" type="date" required /></label><label className={labelClass}>Revision date<input className={inputClass} name="revisionDate" type="date" required /></label></div>
              <label className={labelClass}>Change · Vietnamese<textarea className={inputClass} name="changeVi" required rows={2} /></label><label className={labelClass}>Change · English<textarea className={inputClass} name="changeEn" required rows={2} /></label>
              <label className={labelClass}>Reason · Vietnamese<textarea className={inputClass} name="reasonVi" required rows={2} /></label><label className={labelClass}>Reason · English<textarea className={inputClass} name="reasonEn" required rows={2} /></label>
              <label className={labelClass}>Evidence references, comma-separated<input className={inputClass} name="evidenceReferences" /></label>
              <button className="rounded bg-lime-300 px-4 py-2 text-sm font-bold text-zinc-950">Add version record</button>
            </form>
            <div className="mt-6 space-y-2">{versions.map((record) => <div className="flex justify-between rounded border border-zinc-800 p-3 text-sm" key={record.id}><span className="text-white">{record.artifact_key} · {record.version}</span><span className="text-zinc-400">{record.revision_date}</span></div>)}</div>
          </section>
        </div>
      </>}
    </div>
  )
}

