import { NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/admin-auth'
import { getFlagshipAdminClient } from '@/lib/flagship-server'
import { createClient } from '@/lib/supabase-server'

const cycleSlug = 'binh-dinh-women-led-household-businesses'

type PilotStatusRow = { enrollment_status: string }

export async function GET() {
  try {
    const auth = await createClient()
    const { data: { user } } = await auth.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!(await verifyAdmin(user.id))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabase = getFlagshipAdminClient()
    const cycleResult = await supabase
      .from('flagship_case_cycles')
      .select('id,slug,title_vi,title_en,public_geography_vi,public_geography_en,cohort_definition,target_min,target_max,status,started_on,public_updated_on')
      .eq('slug', cycleSlug)
      .single()

    if (cycleResult.error) throw cycleResult.error
    const cycle = cycleResult.data

    const [fieldworkResult, claimsResult, costsResult, versionsResult, pilotResult] = await Promise.all([
      supabase
        .from('flagship_case_fieldwork')
        .select('public_code,occurred_on,public_location,participant_category,format,consent_scope,anonymized_insight,verified_at')
        .eq('cycle_id', cycle.id)
        .eq('public_aggregate', true)
        .order('occurred_on', { ascending: true }),
      supabase
        .from('flagship_case_claims')
        .select('claim_vi,claim_en,source_label,source_url,source_type,source_year,confidence,competing_evidence,project_use,reviewed_at')
        .eq('cycle_id', cycle.id)
        .eq('verification_status', 'verified')
        .order('reviewed_at', { ascending: true }),
      supabase
        .from('flagship_case_cost_items')
        .select('cost_block,classification,source_label,source_type,source_date,low_vnd,base_vnd,high_vnd,reviewed_at')
        .eq('cycle_id', cycle.id)
        .eq('verification_status', 'verified')
        .order('source_date', { ascending: true }),
      supabase
        .from('flagship_case_versions')
        .select('artifact_key,version,publication_date,revision_date,change_summary_vi,change_summary_en,reason_vi,reason_en,evidence_references,public_snapshot')
        .eq('cycle_id', cycle.id)
        .order('revision_date', { ascending: true }),
      supabase
        .from('flagship_case_pilot_records')
        .select('enrollment_status')
        .eq('cycle_id', cycle.id),
    ])

    const queryError = [
      fieldworkResult.error,
      claimsResult.error,
      costsResult.error,
      versionsResult.error,
      pilotResult.error,
    ].find(Boolean)
    if (queryError) throw queryError

    const pilotByStatus = ((pilotResult.data || []) as PilotStatusRow[]).reduce<Record<string, number>>((totals, row) => {
      totals[row.enrollment_status] = (totals[row.enrollment_status] || 0) + 1
      return totals
    }, {})

    const fieldwork = fieldworkResult.data || []
    const fieldworkByFormat = fieldwork.reduce<Record<string, number>>((totals, row) => {
      totals[row.format] = (totals[row.format] || 0) + 1
      return totals
    }, {})

    const bundle = {
      schemaVersion: '1.0',
      generatedAt: new Date().toISOString(),
      purpose: 'Private admin review bundle for promoting approved facts into the version-controlled public snapshot.',
      privacyNotice: 'Contacts, private locations, raw notes, participant pilot codes, and pilot response payloads are intentionally excluded.',
      cycle,
      verifiedPublicAggregates: {
        fieldworkTotal: fieldwork.length,
        fieldworkByFormat,
        pilotEnrollmentTotal: (pilotResult.data || []).length,
        pilotEnrollmentByStatus: pilotByStatus,
      },
      verifiedFieldwork: fieldwork,
      verifiedClaims: claimsResult.data || [],
      verifiedCostItems: costsResult.data || [],
      artifactVersions: versionsResult.data || [],
    }

    return new NextResponse(JSON.stringify(bundle, null, 2), {
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Disposition': 'attachment; filename="binh-dinh-women-led-review-bundle.json"',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Failed to export the flagship case-study review bundle:', error)
    const message = error instanceof Error ? error.message : 'Export unavailable'
    return NextResponse.json({ error: message }, {
      status: 500,
      headers: { 'Cache-Control': 'private, no-store, max-age=0' },
    })
  }
}
