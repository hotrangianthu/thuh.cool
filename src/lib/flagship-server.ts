import { createClient } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

export const CONSENT_VERSION = '2026-08-04-v1'

export function isFlagshipIntakeEnabled() {
  return process.env.FLAGSHIP_INTAKE_ENABLED === 'true' && Boolean(process.env.FLAGSHIP_CONTACT_EMAIL)
}

export function getFlagshipAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Research storage is not configured')
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export function publicSubmissionAllowed(request: NextRequest, max = 6) {
  return checkRateLimit(request, max, 60_000)
}

export function isCleanText(value: unknown, max: number, required = true): value is string {
  if (typeof value !== 'string') return !required
  const text = value.trim()
  return required ? text.length > 0 && text.length <= max : text.length <= max
}

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export function isBotTrapClear(value: unknown) {
  return value === undefined || value === null || value === ''
}
