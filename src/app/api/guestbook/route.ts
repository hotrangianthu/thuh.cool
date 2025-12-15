import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

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
    const body = await request.json()
    const { name, message } = body

    // Validation
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required' }, 
        { status: 400 }
      )
    }

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (trimmedName.length > 50) {
      return NextResponse.json(
        { error: 'Name must be 50 characters or less' }, 
        { status: 400 }
      )
    }

    if (trimmedMessage.length > 280) {
      return NextResponse.json(
        { error: 'Message must be 280 characters or less' }, 
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: trimmedName, message: trimmedMessage }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    return NextResponse.json(
      { error: 'Failed to create message' }, 
      { status: 500 }
    )
  }
}

