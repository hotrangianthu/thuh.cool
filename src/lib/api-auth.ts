import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { timingSafeEqual } from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Constant-time string comparison to prevent timing attacks
 */
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

/**
 * Verify API key from request headers
 * Checks X-Api-Key header or Authorization header with Bearer token
 * Uses constant-time comparison to prevent timing attacks
 */
export function verifyApiKey(request: NextRequest): boolean {
  const apiKey = 
    request.headers.get('x-api-key') || 
    request.headers.get('authorization')?.replace('Bearer ', '')
  
  const expectedApiKey = process.env.THUH_API_KEY
  
  if (!expectedApiKey) {
    console.warn('THUH_API_KEY not configured')
    return false
  }

  if (!apiKey) {
    return false
  }
  
  return secureCompare(apiKey, expectedApiKey)
}

/**
 * Verify Bearer token from Authorization header
 * Returns user object or null
 */
export async function verifyBearerToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables not configured')
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  return user
}

/**
 * Extract client IP from request
 * Handles Vercel/proxy headers
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = request.ip

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }

  return realIp || ip || '127.0.0.1'
}

