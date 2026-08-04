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

const MAX_BODY_SIZE = 20_000
const relationships = new Set([
  'owner_member', 'employee', 'customer_supplier', 'community_member',
  'professional', 'know_personally', 'do_not_know_directly', 'other',
])
const entityTypes = new Set(['business', 'cooperative', 'household_group', 'community_organization', 'other'])
const contactPermissions = new Set(['not_shared', 'public_business_contact', 'shared_with_permission'])
const connectionPreferences = new Set(['contact_referrer', 'referrer_introduces', 'project_contacts_entity'])

function cleanOptional(value: unknown, max: number) {
  return value === undefined || value === null || value === '' || isCleanText(value, max, false)
}

function trimmedOrNull(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

export async function POST(request: NextRequest) {
  if (!isFlagshipIntakeEnabled()) return NextResponse.json({ error: 'Research intake is not open yet' }, { status: 503 })
  const rate = publicSubmissionAllowed(request, 3)
  if (!rate.allowed) return ApiErrors.rateLimited('Please wait before trying again.', rate.resetAt)

  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > MAX_BODY_SIZE) return NextResponse.json({ error: 'Submission is too large' }, { status: 413 })

  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_SIZE) return NextResponse.json({ error: 'Submission is too large' }, { status: 413 })
    const body = JSON.parse(rawBody)
    if (!body || typeof body !== 'object' || Array.isArray(body)) return ApiErrors.badRequest('Request body must be a JSON object')

    if (!isBotTrapClear(body.website)) return NextResponse.json({ success: true }, { status: 201 })

    const requiredFieldsValid =
      isCleanText(body.referrerName, 100) &&
      isCleanText(body.referrerContact, 180) &&
      relationships.has(body.relationship) &&
      isCleanText(body.entityName, 160) &&
      entityTypes.has(body.entityType) &&
      provinces.includes(body.province) &&
      isCleanText(body.reason, 2000) && body.reason.trim().length >= 40 &&
      contactPermissions.has(body.contactPermission) &&
      connectionPreferences.has(body.connectionPreference) &&
      cleanOptional(body.referredContactName, 100) &&
      cleanOptional(body.referredContactChannel, 180) &&
      cleanOptional(body.contactSource, 300) &&
      body.referrerConsent === 'on'

    if (!requiredFieldsValid) return ApiErrors.badRequest('Required referral fields are missing or invalid')

    const hasContactChannel = isCleanText(body.referredContactChannel, 180)
    const isNotShared = body.contactPermission === 'not_shared'
    const isPublicContact = body.contactPermission === 'public_business_contact'
    const isPermissionedContact = body.contactPermission === 'shared_with_permission'

    if (isNotShared && (trimmedOrNull(body.referredContactName) || trimmedOrNull(body.referredContactChannel) || trimmedOrNull(body.contactSource) || body.permissionConfirmed === 'on')) {
      return ApiErrors.badRequest('Referred-party details cannot be included when contact information is not shared')
    }
    if (isPublicContact && (!hasContactChannel || !isCleanText(body.contactSource, 300) || body.contactSource.trim().length < 5)) {
      return ApiErrors.badRequest('A public contact channel and its source are required')
    }
    if (isPermissionedContact && (!hasContactChannel || body.permissionConfirmed !== 'on')) {
      return ApiErrors.badRequest('Explicit permission must be confirmed before sharing personal contact details')
    }
    if (body.connectionPreference === 'project_contacts_entity' && (isNotShared || !hasContactChannel)) {
      return ApiErrors.badRequest('Direct contact requires a public or explicitly permissioned contact channel')
    }

    const supabase = getFlagshipAdminClient()
    const { error } = await supabase.from('flagship_business_referrals').insert({
      locale: body.locale === 'en' ? 'en' : 'vi',
      referrer_name: body.referrerName.trim(),
      referrer_contact: body.referrerContact.trim(),
      referrer_relationship: body.relationship,
      entity_name: body.entityName.trim(),
      entity_type: body.entityType,
      province: body.province,
      referral_reason: body.reason.trim(),
      contact_permission: body.contactPermission,
      referred_contact_name: isNotShared ? null : trimmedOrNull(body.referredContactName),
      referred_contact_channel: isNotShared ? null : trimmedOrNull(body.referredContactChannel),
      contact_source: isPublicContact ? body.contactSource.trim() : null,
      permission_confirmed: isPermissionedContact,
      connection_preference: body.connectionPreference,
      consent_version: CONSENT_VERSION,
      referrer_consented_at: new Date().toISOString(),
      outreach_source: typeof body.outreachSource === 'string' && /^[a-z0-9_-]{1,80}$/i.test(body.outreachSource) ? body.outreachSource : 'direct',
    })
    if (error) throw error

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof SyntaxError) return ApiErrors.badRequest('Request body must be valid JSON')
    console.error('Flagship referral submission failed:', error instanceof Error ? error.message : 'Unknown error')
    return ApiErrors.internalError('Referral intake is temporarily unavailable')
  }
}
