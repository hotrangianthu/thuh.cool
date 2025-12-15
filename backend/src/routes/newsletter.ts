import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { getSupabase } from '../lib/supabase'

export const newsletterRouter = Router()

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
})

// POST /api/newsletter - Subscribe to newsletter
newsletterRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Validate input
    const result = subscribeSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors[0]?.message || 'Invalid email',
      })
    }

    const { email } = result.data

    const supabase = getSupabase()
    
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      if (existing.is_active) {
        return res.json({ success: true, message: 'Already subscribed' })
      }
      
      // Reactivate subscription
      await supabase
        .from('newsletter_subscribers')
        .update({ is_active: true, unsubscribed_at: null })
        .eq('id', existing.id)
      
      return res.json({ success: true, message: 'Subscription reactivated' })
    }

    // Create new subscription
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.toLowerCase() }])

    if (error) throw error

    res.status(201).json({ success: true, message: 'Successfully subscribed' })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    res.status(500).json({ error: 'Failed to subscribe' })
  }
})

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
newsletterRouter.post('/unsubscribe', async (req: Request, res: Response) => {
  try {
    const result = subscribeSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    const { email } = result.data

    const supabase = getSupabase()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email.toLowerCase())

    if (error) throw error

    res.json({ success: true, message: 'Successfully unsubscribed' })
  } catch (error) {
    console.error('Error unsubscribing:', error)
    res.status(500).json({ error: 'Failed to unsubscribe' })
  }
})

