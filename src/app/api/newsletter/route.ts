import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
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
          return NextResponse.json({ success: true, message: 'Already subscribed' })
        }
        
        // Reactivate subscription
        await supabase
          .from('newsletter_subscribers')
          .update({ is_active: true, unsubscribed_at: null })
          .eq('id', existing.id)
        
        return NextResponse.json({ success: true, message: 'Subscription reactivated' })
      }

      // Create new subscription
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: normalizedEmail }])

      if (error) throw error

      return NextResponse.json({ success: true, message: 'Successfully subscribed' }, { status: 201 })
    } catch (dbError) {
      // If Supabase is not configured, just log
      console.log('Newsletter signup (no DB):', normalizedEmail)
      return NextResponse.json({ success: true, message: 'Email recorded' })
    }
  } catch (error) {
    console.error('Error recording newsletter signup:', error)
    return NextResponse.json({ error: 'Failed to record email' }, { status: 500 })
  }
}

