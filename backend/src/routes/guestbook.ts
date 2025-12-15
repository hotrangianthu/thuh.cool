import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { getSupabase } from '../lib/supabase'

export const guestbookRouter = Router()

// Validation schema
const createMessageSchema = z.object({
  name: z.string().min(1).max(50).trim(),
  message: z.string().min(1).max(280).trim(),
})

// GET /api/guestbook - Fetch all messages
guestbookRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    res.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
    res.json(data || [])
  } catch (error) {
    console.error('Error fetching guestbook:', error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

// POST /api/guestbook - Create a new message
guestbookRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Validate input
    const result = createMessageSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors[0]?.message || 'Invalid input',
      })
    }

    const { name, message } = result.data

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json(data)
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    res.status(500).json({ error: 'Failed to create message' })
  }
})

