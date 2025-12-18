import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limit'
import { ApiErrors } from '@/lib/api-errors'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 requests per minute
    const rateLimitResult = checkRateLimit(request, 3, 60 * 1000)
    
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
    const { email } = body

    if (!email || !email.includes('@')) {
      return ApiErrors.badRequest('Valid email is required')
    }

    const normalizedEmail = email.toLowerCase().trim()

    try {
      const supabase = getSupabase()
      
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id, is_active')
        .eq('email', normalizedEmail)
        .single()

      if (existing) {
        if (existing.is_active) {
          const response = NextResponse.json({ success: true, message: 'Already subscribed' })
          Object.entries(rateLimitHeaders).forEach(([key, value]) => {
            response.headers.set(key, value)
          })
          return response
        }
        
        // Reactivate subscription
        await supabase
          .from('newsletter_subscribers')
          .update({ is_active: true, unsubscribed_at: null })
          .eq('id', existing.id)
        
        const response = NextResponse.json({ success: true, message: 'Subscription reactivated' })
        Object.entries(rateLimitHeaders).forEach(([key, value]) => {
          response.headers.set(key, value)
        })
        return response
      }

      // Create new subscription
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: normalizedEmail }])

      if (error) throw error

      const response = NextResponse.json({ success: true, message: 'Successfully subscribed' }, { status: 201 })
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
      })
      return response
    } catch (dbError) {
      // If Supabase is not configured, just log
      console.log('Newsletter signup (no DB):', normalizedEmail)
      const response = NextResponse.json({ success: true, message: 'Email recorded' })
      Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
      })
      return response
    }
  } catch (error) {
    console.error('Error recording newsletter signup:', error)
    return ApiErrors.internalError('Failed to record email')
  }
}

