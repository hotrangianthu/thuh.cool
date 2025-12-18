import { NextRequest } from 'next/server'
import { getClientIp } from './api-auth'

// Simple in-memory rate limiting (for MVP)
// For production scale, consider Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Cleanup expired entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanupExpiredEntries() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return
  }
  
  lastCleanup = now
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}

/**
 * Rate limit check
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns true if allowed, false if rate limited
 */
export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): boolean {
  cleanupExpiredEntries()
  
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

/**
 * Rate limit middleware helper
 * Extracts IP and applies rate limiting
 */
export function checkRateLimit(
  request: NextRequest,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number; limit: number } {
  cleanupExpiredEntries()
  
  const ip = getClientIp(request)
  const identifier = `${ip}-${request.nextUrl.pathname}`
  
  const record = rateLimitMap.get(identifier)
  const now = Date.now()

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
      limit: maxRequests,
    }
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
      limit: maxRequests,
    }
  }

  record.count++
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetAt,
    limit: maxRequests,
  }
}

