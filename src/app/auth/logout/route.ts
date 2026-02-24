import { createClient } from '@/lib/supabase-server'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Server-side logout route.
 * Clears Supabase auth cookies so the user is fully signed out.
 * Use this instead of client-only signOut for reliable logout with SSR cookies.
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const next = request.nextUrl.searchParams.get('next') || '/'
  return NextResponse.redirect(new URL(next, request.url))
}
