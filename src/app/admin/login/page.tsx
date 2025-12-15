'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const redirect = searchParams.get('redirect') || '/admin'
        router.push(redirect)
      }
    })
  }, [router, searchParams, supabase])

  if (!mounted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.png"
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover scale-105 animate-slow-pan"
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />
        <div className="relative z-20 text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover scale-105 animate-slow-pan"
          style={{ objectPosition: 'center' }}
        />
      </div>
      {/* Gradient Overlay for Readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />
      
      <div className="relative z-20 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-zinc-300">Sign in to manage your content</p>
        </div>
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#7c3aed',
                    brandAccent: '#6d28d9',
                  },
                },
              },
            }}
            providers={['google']}
            redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?next=/admin` : '/auth/callback?next=/admin'}
          />
        </div>
      </div>
    </div>
  )
}

