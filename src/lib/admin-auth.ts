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

