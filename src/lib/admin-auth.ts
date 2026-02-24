import { createClient } from '@supabase/supabase-js'

/**
 * Verify if a user is an admin
 * Uses service role key for secure verification
 */
export async function verifyAdmin(userId: string): Promise<boolean> {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY not configured')
    return false
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    console.error('NEXT_PUBLIC_SUPABASE_URL not configured')
    return false
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data, error } = await supabaseAdmin
    .from('user_profiles')
    .select('is_admin')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error verifying admin:', error)
    return false
  }

  return data?.is_admin === true
}

/**
 * Get the admin user ID whose completions to show for public/visitor requests.
 * Prefers the admin who HAS completion records (so data displays correctly).
 * Falls back to first admin if no completions exist yet.
 */
export async function getPrimaryAdminId(): Promise<string | null> {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!supabaseServiceKey || !supabaseUrl) return null

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Prefer admin who has completions (only admins can insert, so user_id in book_completions = admin)
  const { data: completionRow } = await supabaseAdmin
    .from('book_completions')
    .select('user_id')
    .limit(1)
    .single()

  if (completionRow?.user_id) {
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('id', completionRow.user_id)
      .eq('is_admin', true)
      .single()
    if (profile) return profile.id
  }

  // Fallback: first admin
  const { data } = await supabaseAdmin
    .from('user_profiles')
    .select('id')
    .eq('is_admin', true)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  return data?.id ?? null
}

