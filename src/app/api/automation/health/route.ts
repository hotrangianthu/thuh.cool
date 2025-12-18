import { NextRequest, NextResponse } from 'next/server'
import { verifyApiKey } from '@/lib/api-auth'
import { ApiErrors } from '@/lib/api-errors'

/**
 * API-key protected health check endpoint
 * Used by automation services (n8n, Zapier, etc.)
 */
export async function GET(request: NextRequest) {
  // Verify API key
  if (!verifyApiKey(request)) {
    return ApiErrors.invalidApiKey()
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'thuh.cool',
    version: '1.0.0',
  })
}

