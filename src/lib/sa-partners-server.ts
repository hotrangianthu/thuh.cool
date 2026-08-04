import { createClient } from '@supabase/supabase-js'

export function getSaPartnersAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Sa. Partners inquiry storage is not configured')

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 255) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function cleanBoundedText(value: unknown, max: number, min = 1) {
  if (typeof value !== 'string') return null
  const cleaned = value.trim()
  return cleaned.length >= min && cleaned.length <= max ? cleaned : null
}
