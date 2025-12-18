import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limit'
import { ApiErrors } from '@/lib/api-errors'

// Revalidate cache every 60 seconds
export const revalidate = 60

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    return NextResponse.json(data || [], {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    console.error('Error fetching guestbook:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per minute
    const rateLimitResult = checkRateLimit(request, 5, 60 * 1000)
    
    // Add rate limit headers to all responses
    const rateLimitHeaders = {
      'X-RateLimit-Limit': rateLimitResult.limit.toString(),
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
    }

    if (!rateLimitResult.allowed) {
      const response = ApiErrors.rateLimited('Too many requests. Please try again later.', rateLimitResult.resetAt)
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
      })
      return response
    }

    const body = await request.json()
    const { name, message } = body

    // Validation
    if (!name?.trim() || !message?.trim()) {
      return ApiErrors.badRequest('Name and message are required')
    }

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (trimmedName.length > 50) {
      return ApiErrors.badRequest('Name must be 50 characters or less')
    }

    if (trimmedMessage.length > 280) {
      return ApiErrors.badRequest('Message must be 280 characters or less')
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: trimmedName, message: trimmedMessage }])
      .select()
      .single()

    if (error) throw error

    const response = NextResponse.json(data, { status: 201 })
    Object.entries(rateLimitHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    return ApiErrors.internalError('Failed to create message')
  }
}

