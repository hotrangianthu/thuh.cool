import { createClient } from '@/lib/supabase-server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/admin'
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    const redirectUrl = new URL('/admin/login', request.url)
    redirectUrl.searchParams.set('error', error)
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      const redirectUrl = new URL('/admin/login', request.url)
      redirectUrl.searchParams.set('error', 'auth_failed')
      return NextResponse.redirect(redirectUrl)
    }

    // Successfully exchanged code for session - redirect to admin
    return NextResponse.redirect(new URL(next, request.url))
  }

  // No code provided - redirect to login
  return NextResponse.redirect(new URL('/admin/login', request.url))
}

