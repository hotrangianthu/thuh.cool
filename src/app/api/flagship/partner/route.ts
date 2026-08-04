import { NextRequest, NextResponse } from 'next/server'
import { ApiErrors } from '@/lib/api-errors'
import {
  CONSENT_VERSION,
  getFlagshipAdminClient,
  isFlagshipIntakeEnabled,
  isBotTrapClear,
  isCleanText,
  publicSubmissionAllowed,
} from '@/lib/flagship-server'

export async function POST(request: NextRequest) {
  if (!isFlagshipIntakeEnabled()) return NextResponse.json({ error: 'Research intake is not open yet' }, { status: 503 })
  const rate = publicSubmissionAllowed(request, 3)
  if (!rate.allowed) return ApiErrors.rateLimited('Please wait before trying again.', rate.resetAt)

  try {
    const body = await request.json()
    if (!isBotTrapClear(body.website)) return NextResponse.json({ success: true }, { status: 201 })
    if (
      !isCleanText(body.organization, 160) || !isCleanText(body.role, 120) ||
      !isCleanText(body.name, 100) || !isCleanText(body.contactChannel, 180) ||
      !isCleanText(body.support, 2000) || body.support.trim().length < 20 || body.consent !== 'on'
    ) return ApiErrors.badRequest('Required partnership fields are missing or invalid')

    const supabase = getFlagshipAdminClient()
    const { error } = await supabase.from('flagship_partner_inquiries').insert({
      locale: body.locale === 'en' ? 'en' : 'vi',
      organization: body.organization.trim(),
      contact_name: body.name.trim(),
      role: body.role.trim(),
      contact_channel: body.contactChannel.trim(),
      support: body.support.trim(),
      consent_version: CONSENT_VERSION,
      consented_at: new Date().toISOString(),
      outreach_source: typeof body.outreachSource === 'string' && /^[a-z0-9_-]{1,80}$/i.test(body.outreachSource) ? body.outreachSource : 'direct',
    })
    if (error) throw error
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Flagship partner submission failed:', error instanceof Error ? error.message : 'Unknown error')
    return ApiErrors.internalError('Partner intake is temporarily unavailable')
  }
}
