import { NextRequest, NextResponse } from 'next/server'
import { provinces } from '@/data/flagship'
import { ApiErrors } from '@/lib/api-errors'
import {
  CONSENT_VERSION,
  getFlagshipAdminClient,
  isFlagshipIntakeEnabled,
  isBotTrapClear,
  publicSubmissionAllowed,
} from '@/lib/flagship-server'

const segments = new Set(['micro_entrepreneur', 'household_business', 'smallholder'])

export async function POST(request: NextRequest) {
  if (!isFlagshipIntakeEnabled()) return NextResponse.json({ error: 'Research intake is not open yet' }, { status: 503 })
  const rate = publicSubmissionAllowed(request, 8)
  if (!rate.allowed) return ApiErrors.rateLimited('Please wait before trying again.', rate.resetAt)

  try {
    const body = await request.json()
    if (!isBotTrapClear(body.website)) return NextResponse.json({ eligible: false }, { status: 201 })
    if (!provinces.includes(body.province) || !segments.has(body.segment) || !['vi', 'en'].includes(body.locale)) {
      return ApiErrors.badRequest('Invalid screening fields')
    }
    if (body.consent !== true) return ApiErrors.badRequest('Consent is required')

    const eligible = body.adult === true && body.rural === true && body.decisionMaker === true
    const supabase = getFlagshipAdminClient()
    const { data, error } = await supabase
      .from('flagship_screenings')
      .insert({
        locale: body.locale,
        province: body.province,
        primary_segment: body.segment,
        adult_confirmed: body.adult === true,
        rural_confirmed: body.rural === true,
        decision_maker_confirmed: body.decisionMaker === true,
        eligible,
        consent_version: CONSENT_VERSION,
        consented_at: new Date().toISOString(),
        outreach_source: typeof body.outreachSource === 'string' && /^[a-z0-9_-]{1,80}$/i.test(body.outreachSource) ? body.outreachSource : 'direct',
      })
      .select('id, eligible')
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Flagship screening submission failed:', error instanceof Error ? error.message : 'Unknown error')
    return ApiErrors.internalError('Research intake is temporarily unavailable')
  }
}
