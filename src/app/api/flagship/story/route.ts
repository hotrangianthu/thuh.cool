import { NextRequest, NextResponse } from 'next/server'
import { provinces } from '@/data/flagship'
import { ApiErrors } from '@/lib/api-errors'
import {
  CONSENT_VERSION,
  getFlagshipAdminClient,
  isFlagshipIntakeEnabled,
  isBotTrapClear,
  isCleanText,
  publicSubmissionAllowed,
} from '@/lib/flagship-server'

const segments = new Set(['micro_entrepreneur', 'household_business', 'smallholder'])

export async function POST(request: NextRequest) {
  if (!isFlagshipIntakeEnabled()) return NextResponse.json({ error: 'Research intake is not open yet' }, { status: 503 })
  const rate = publicSubmissionAllowed(request, 4)
  if (!rate.allowed) return ApiErrors.rateLimited('Please wait before trying again.', rate.resetAt)

  try {
    const body = await request.json()
    if (!isBotTrapClear(body.website)) return NextResponse.json({ success: true }, { status: 201 })
    if (!provinces.includes(body.province) || !segments.has(body.segment) || !isCleanText(body.story, 3000) || body.story.trim().length < 40 || body.consent !== 'on') {
      return ApiErrors.badRequest('Required story fields are missing or invalid')
    }

    const supabase = getFlagshipAdminClient()
    const { data: story, error } = await supabase.from('flagship_stories').insert({
      locale: body.locale === 'en' ? 'en' : 'vi',
      province: body.province,
      primary_segment: body.segment,
      story: body.story.trim(),
      quote_consent: body.quoteConsent === 'on',
      consent_version: CONSENT_VERSION,
      consented_at: new Date().toISOString(),
      outreach_source: typeof body.outreachSource === 'string' && /^[a-z0-9_-]{1,80}$/i.test(body.outreachSource) ? body.outreachSource : 'direct',
    }).select('id').single()
    if (error) throw error

    if (body.followupConsent === 'on' && isCleanText(body.contactName, 100) && isCleanText(body.contactChannel, 180)) {
      const { error: contactError } = await supabase.from('flagship_contacts').insert({
        story_id: story.id,
        name: body.contactName.trim(),
        contact_channel: body.contactChannel.trim(),
        followup_consent: true,
        consented_at: new Date().toISOString(),
      })
      if (contactError) throw contactError
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Flagship story submission failed:', error instanceof Error ? error.message : 'Unknown error')
    return ApiErrors.internalError('Story intake is temporarily unavailable')
  }
}
