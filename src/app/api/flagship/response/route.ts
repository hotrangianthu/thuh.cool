import { NextRequest, NextResponse } from 'next/server'
import { ApiErrors } from '@/lib/api-errors'
import {
  getFlagshipAdminClient,
  isBotTrapClear,
  isCleanText,
  isUuid,
  isFlagshipIntakeEnabled,
  publicSubmissionAllowed,
} from '@/lib/flagship-server'

const segments = new Set(['micro_entrepreneur', 'household_business', 'smallholder'])

export async function POST(request: NextRequest) {
  if (!isFlagshipIntakeEnabled()) return NextResponse.json({ error: 'Research intake is not open yet' }, { status: 503 })
  const rate = publicSubmissionAllowed(request, 6)
  if (!rate.allowed) return ApiErrors.rateLimited('Please wait before trying again.', rate.resetAt)

  try {
    const body = await request.json()
    if (!isBotTrapClear(body.website)) return NextResponse.json({ success: true }, { status: 201 })
    if (!isUuid(body.screeningId) || !segments.has(body.segment)) return ApiErrors.badRequest('Invalid research session')

    const fieldLimits: Record<string, number> = {
      incomeStability: 160, savingFrequency: 160, shockCapacity: 160, topBarrier: 160,
      incomePattern: 160, savingLocation: 160, emergencyResponse: 160, financialTool: 160,
      priorityAsset: 160, currentAssets: 240, segmentDetail: 1200, intendedAction: 240,
    }
    const branchFields = body.segment === 'smallholder'
      ? ['mainProduction', 'inputFinance']
      : ['businessTenure', 'workingCapital']
    if (
      Object.entries(fieldLimits).some(([field, limit]) => !isCleanText(body[field], limit)) ||
      branchFields.some((field) => !isCleanText(body[field], 160))
    ) {
      return ApiErrors.badRequest('Required answers are missing or too long')
    }

    const supabase = getFlagshipAdminClient()
    const { data: screening, error: screeningError } = await supabase
      .from('flagship_screenings')
      .select('id, eligible, primary_segment, province, locale')
      .eq('id', body.screeningId)
      .single()

    if (screeningError || !screening?.eligible || screening.primary_segment !== body.segment) {
      return ApiErrors.badRequest('This research session is not eligible')
    }

    const { data: response, error } = await supabase
      .from('flagship_responses')
      .insert({
        screening_id: screening.id,
        locale: screening.locale,
        province: screening.province,
        primary_segment: body.segment,
        income_stability: body.incomeStability,
        saving_frequency: body.savingFrequency,
        shock_capacity: body.shockCapacity,
        top_barrier: body.topBarrier,
        priority_asset: body.priorityAsset.trim(),
        segment_payload: {
          detail: body.segmentDetail.trim(),
          income_pattern: body.incomePattern,
          saving_location: body.savingLocation,
          emergency_response: body.emergencyResponse,
          financial_tool: body.financialTool,
          current_assets: body.currentAssets.trim(),
          intended_action: body.intendedAction.trim(),
          ...(body.segment === 'smallholder'
            ? { main_production: body.mainProduction, input_finance: body.inputFinance }
            : { business_tenure: body.businessTenure, working_capital: body.workingCapital }),
        },
        schema_version: 1,
        completed_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error) throw error

    const wantsFollowup = body.followupConsent === 'on' || body.followupConsent === true
    if (wantsFollowup && isCleanText(body.contactName, 100) && isCleanText(body.contactChannel, 180)) {
      const { error: contactError } = await supabase.from('flagship_contacts').insert({
        response_id: response.id,
        name: body.contactName.trim(),
        contact_channel: body.contactChannel.trim(),
        followup_consent: true,
        consented_at: new Date().toISOString(),
      })
      if (contactError) throw contactError
    }

    return NextResponse.json({ success: true, id: response.id }, { status: 201 })
  } catch (error) {
    console.error('Flagship response submission failed:', error instanceof Error ? error.message : 'Unknown error')
    return ApiErrors.internalError('Research intake is temporarily unavailable')
  }
}
