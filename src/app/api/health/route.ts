import { NextResponse } from 'next/server'

/**
 * Public health check endpoint
 * Used by UptimeRobot and monitoring services
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}

