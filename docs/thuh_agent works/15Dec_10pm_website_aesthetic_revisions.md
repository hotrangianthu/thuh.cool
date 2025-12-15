# Website aesthetic revisions
_Exported on 12/15/2025 at 22:37:18 GMT+7 from Cursor (2.2.20)_

---

**User**

REVISE THE WHOLE /ADMIN all pages  to core thuh.cool aesthetics 
- Use 1 consistent background (pls render the image to optimize the page load as best fast as possible)

2/ on homepage, bring the core 'ThuH is xyz' a little aligning on the left and bigger in text size. 
Use a different handwritten font for the verb part - Referencing this font 

---

**Cursor**

I see from your images that you want to:
1. Apply the cloudy background aesthetic from the homepage to all admin pages
2. Make the homepage "ThuH is xyz" larger and left-aligned
3. Use the handwritten font shown in the third image (looks like the "educating" style) for the verb part

Let me explore the codebase to understand the current structure and identify what needs to change.

Let me also check the ActivityTicker component and the tailwind config for fonts:

Let me check a few admin pages to understand their current structure:

Let me check the remaining admin pages:

I now have a clear understanding of the codebase. Before creating the plan, I have one clarifying question:

---

**User**

Mynerve this font, - make the size large, and can overlay ThuH is at some point to show playfulness of the texts. 

---

**Cursor**

Got it! You want to use the **Mynerve** font for the verb part, make it large, and have it playfully overlay with "ThuH is" text. Now I have everything needed to create the plan.

---

**User**

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**


Implementing the plan. Starting with the admin background and homepage hero updates.



Implementing the changes, starting with the font swap and admin background updates.


```typescriptreact
import type { Metadata } from 'next'
import { Inter, Mynerve } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const mynerve = Mynerve({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-handwriting',
})

export const metadata: Metadata = {
  title: 'Ho Tran Gian Thu',
  description: 'Personal digital vault of ThuH - A builder making sense of the world through code and prose.',
  keywords: ['personal website', 'digital garden', 'blog', 'ThuH'],
  authors: [{ name: 'ThuH' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Ho Tran Gian Thu',
    description: 'Personal digital vault of ThuH',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ho Tran Gian Thu',
    description: 'Personal digital vault of ThuH',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${kaushanScript.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


```

```typescriptreact
import type { Metadata } from 'next'
import { Inter, Mynerve } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const mynerve = Mynerve({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-handwriting',
})

export const metadata: Metadata = {
  title: 'Ho Tran Gian Thu',
  description: 'Personal digital vault of ThuH - A builder making sense of the world through code and prose.',
  keywords: ['personal website', 'digital garden', 'blog', 'ThuH'],
  authors: [{ name: 'ThuH' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Ho Tran Gian Thu',
    description: 'Personal digital vault of ThuH',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ho Tran Gian Thu',
    description: 'Personal digital vault of ThuH',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mynerve.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


```

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0a',
        'accent-orange': '#ffba75',
        'accent-purple': '#7c3aed',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'Mynerve', 'cursive'],
      },
      animation: {
        'slow-pan': 'slow-pan 60s infinite alternate ease-in-out',
      },
      keyframes: {
        'slow-pan': {
          '0%': { transform: 'scale(1.05) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1.05) translate(0, 0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import Image from 'next/image'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // We rely on middleware for access control. If user is null, we render content
  // without the admin sidebar (e.g. login page).
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="relative min-h-screen text-zinc-100 overflow-hidden">
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
      
      <div className="relative z-20 flex">
        {user && <AdminSidebar />}
        <main className={user ? 'flex-1 ml-64 p-8' : 'flex-1 p-8'}>
          {children}
        </main>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import {
  LayoutDashboard,
  FileText,
  Plus,
  FolderTree,
  LogOut,
  Home,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/posts/new', label: 'New Post', icon: Plus },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900/70 backdrop-blur-md border-r border-zinc-800/50 flex flex-col z-30">
      <div className="p-6 border-b border-zinc-800/50">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-accent-orange">ThuH</span>
          <span className="text-zinc-300">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
        >
          <Home size={18} />
          <span>View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}


```

```typescriptreact
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import {
  LayoutDashboard,
  FileText,
  Plus,
  FolderTree,
  LogOut,
  Home,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/posts/new', label: 'New Post', icon: Plus },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900/70 backdrop-blur-md border-r border-zinc-800/50 flex flex-col z-30">
      <div className="p-6 border-b border-zinc-800/50">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-accent-orange">ThuH</span>
          <span className="text-zinc-300">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-800/70 text-white backdrop-blur-sm'
                  : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800/50 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
        >
          <Home size={18} />
          <span>View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}


```

```typescriptreact
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import {
  LayoutDashboard,
  FileText,
  Plus,
  FolderTree,
  LogOut,
  Home,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/posts/new', label: 'New Post', icon: Plus },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900/70 backdrop-blur-md border-r border-zinc-800/50 flex flex-col z-30">
      <div className="p-6 border-b border-zinc-800/50">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-accent-orange">ThuH</span>
          <span className="text-zinc-300">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-800/70 text-white backdrop-blur-sm'
                  : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800/50 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors"
        >
          <Home size={18} />
          <span>View Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800/50 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}


```

```typescriptreact
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


```

```typescriptreact
import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
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
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        {/* Spacer for vertical centering */}
        <div className="hidden md:block" aria-hidden="true" />

        {/* Hero Text */}
        <header className="flex flex-col items-start justify-center mt-20 md:mt-0">
          <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg relative">
            <span className="inline-block">ThuH is</span>
            <ActivityTicker />
          </h1>
        </header>

        {/* Footer Navigation Area */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mt-auto w-full">
          {/* Left Column: Links */}
          <div className="space-y-8">
            <NavLinks />
            <SocialIcons />
          </div>

          {/* Right Column: Newsletter */}
          <NewsletterForm />
        </footer>
      </div>
    </main>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect, useCallback } from 'react'

const ACTIVITIES = ['building', 'educating', 'hiking', 'writing', 'thinking']
const FADE_DURATION = 500
const DISPLAY_DURATION = 3000

export default function ActivityTicker() {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const cycleActivity = useCallback(() => {
    setIsVisible(false)
    
    const fadeTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length)
      setIsVisible(true)
    }, FADE_DURATION)

    return () => clearTimeout(fadeTimeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleActivity, DISPLAY_DURATION)
    return () => clearInterval(interval)
  }, [cycleActivity])

  return (
    <span
      className={`font-handwriting text-accent-orange absolute left-0 top-0 text-6xl md:text-8xl transition-opacity duration-500 -rotate-2 translate-x-8 md:translate-x-12 translate-y-[-0.1em] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
      style={{ 
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
      }}
    >
      {ACTIVITIES[index]}
    </span>
  )
}


```


Fixing the ActivityTicker positioning for the overlay effect:



Refining ActivityTicker positioning for a better overlay effect:


```typescriptreact
'use client'

import { useState, useEffect, useCallback } from 'react'

const ACTIVITIES = ['building', 'educating', 'hiking', 'writing', 'thinking']
const FADE_DURATION = 500
const DISPLAY_DURATION = 3000

export default function ActivityTicker() {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const cycleActivity = useCallback(() => {
    setIsVisible(false)
    
    const fadeTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length)
      setIsVisible(true)
    }, FADE_DURATION)

    return () => clearTimeout(fadeTimeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleActivity, DISPLAY_DURATION)
    return () => clearInterval(interval)
  }, [cycleActivity])

  return (
    <span
      className={`font-handwriting text-accent-orange absolute left-0 top-0 text-6xl md:text-8xl transition-opacity duration-500 -rotate-2 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
      style={{ 
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
        transform: 'translateX(0.5em) translateY(-0.15em) rotate(-2deg)',
      }}
    >
      {ACTIVITIES[index]}
    </span>
  )
}


```


Adjusting the overlay positioning for a better playful effect:


```typescriptreact
import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
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
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        {/* Spacer for vertical centering */}
        <div className="hidden md:block" aria-hidden="true" />

        {/* Hero Text */}
        <header className="flex flex-col items-start justify-center mt-20 md:mt-0">
          <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg relative inline-block">
            <span className="inline-block relative z-10">ThuH is</span>
            <ActivityTicker />
          </h1>
        </header>

        {/* Footer Navigation Area */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mt-auto w-full">
          {/* Left Column: Links */}
          <div className="space-y-8">
            <NavLinks />
            <SocialIcons />
          </div>

          {/* Right Column: Newsletter */}
          <NewsletterForm />
        </footer>
      </div>
    </main>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect, useCallback } from 'react'

const ACTIVITIES = ['building', 'educating', 'hiking', 'writing', 'thinking']
const FADE_DURATION = 500
const DISPLAY_DURATION = 3000

export default function ActivityTicker() {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const cycleActivity = useCallback(() => {
    setIsVisible(false)
    
    const fadeTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length)
      setIsVisible(true)
    }, FADE_DURATION)

    return () => clearTimeout(fadeTimeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleActivity, DISPLAY_DURATION)
    return () => clearInterval(interval)
  }, [cycleActivity])

  return (
    <span
      className={`font-handwriting text-accent-orange absolute left-0 top-0 text-6xl md:text-8xl transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
      style={{ 
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
        transform: 'translateX(0.4em) translateY(-0.1em) rotate(-3deg)',
        zIndex: 5,
      }}
    >
      {ACTIVITIES[index]}
    </span>
  )
}


```


Checking for linting errors and verifying the font import:



No linting errors. Verifying the font import works and checking if other admin pages need updates. Reviewing admin pages to ensure consistent styling:



Updating admin page text colors for better contrast against the new background:


```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-300">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-300">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-300">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


```


Updating other admin pages for consistent glass-morphism styling:



Updating remaining admin pages for consistent glass-morphism styling:



Updating these pages for consistent styling:


```typescriptreact
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Post } from '@/types/admin'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts(status?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data } = await query
  return (data || []) as Post[]
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const posts = await getPosts(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-zinc-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status || status === 'all'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'published'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'draft'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/posts?status=archived"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'archived'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
        >
          Archived
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-zinc-500">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      {post.published_at && (
                        <span>
                          Published: {format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <PostActions post={post} categoryName={post.category?.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No posts found.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-accent-orange hover:underline"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Post } from '@/types/admin'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts(status?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data } = await query
  return (data || []) as Post[]
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const posts = await getPosts(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-zinc-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status || status === 'all'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'published'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'draft'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/posts?status=archived"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'archived'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Archived
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-zinc-500">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      {post.published_at && (
                        <span>
                          Published: {format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <PostActions post={post} categoryName={post.category?.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No posts found.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-accent-orange hover:underline"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Post } from '@/types/admin'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts(status?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data } = await query
  return (data || []) as Post[]
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const posts = await getPosts(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-zinc-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status || status === 'all'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'published'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'draft'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/posts?status=archived"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'archived'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Archived
        </Link>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-zinc-500">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      {post.published_at && (
                        <span>
                          Published: {format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <PostActions post={post} categoryName={post.category?.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No posts found.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-accent-orange hover:underline"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Post } from '@/types/admin'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts(status?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data } = await query
  return (data || []) as Post[]
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const posts = await getPosts(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-zinc-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status || status === 'all'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'published'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'draft'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/posts?status=archived"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'archived'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Archived
        </Link>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-zinc-500">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-300 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      {post.published_at && (
                        <span>
                          Published: {format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <PostActions post={post} categoryName={post.category?.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No posts found.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-accent-orange hover:underline"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

```

```typescriptreact
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Post } from '@/types/admin'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts(status?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data } = await query
  return (data || []) as Post[]
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const posts = await getPosts(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-zinc-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status || status === 'all'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'published'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'draft'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/posts?status=archived"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'archived'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Archived
        </Link>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-zinc-500">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-300 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      {post.published_at && (
                        <span>
                          Published: {format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <PostActions post={post} categoryName={post.category?.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-300 mb-4">No posts found.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-accent-orange hover:underline"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

```

```typescriptreact
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@/components/admin/Editor'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'

export default function NewPostPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('*').order('sort_order')
      if (data) setCategories(data)
    }
    loadCategories()
  }, [supabase])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug) {
      alert('Title and slug are required')
      return
    }

    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const postData: any = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        category_id: categoryId || null,
        status,
        author_id: user?.id || null,
      }

      if (status === 'published') {
        postData.published_at = new Date().toISOString()
      }

      const { error } = await supabase.from('posts').insert([postData])

      if (error) throw error

      router.push('/admin/posts')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">New Post</h1>
        <p className="text-zinc-300">Create a new blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              placeholder="Post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              placeholder="post-slug"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
              placeholder="Brief description of the post..."
            />
            <p className="text-xs text-zinc-500 mt-1">{excerpt.length}/500</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Content *
            </label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@/components/admin/Editor'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'

export default function NewPostPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('*').order('sort_order')
      if (data) setCategories(data)
    }
    loadCategories()
  }, [supabase])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug) {
      alert('Title and slug are required')
      return
    }

    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const postData: any = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        category_id: categoryId || null,
        status,
        author_id: user?.id || null,
      }

      if (status === 'published') {
        postData.published_at = new Date().toISOString()
      }

      const { error } = await supabase.from('posts').insert([postData])

      if (error) throw error

      router.push('/admin/posts')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">New Post</h1>
        <p className="text-zinc-300">Create a new blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              placeholder="Post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              placeholder="post-slug"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
              placeholder="Brief description of the post..."
            />
            <p className="text-xs text-zinc-500 mt-1">{excerpt.length}/500</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Content *
            </label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}


```


Updating EditPostForm and Categories page:


```typescriptreact
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@/components/admin/Editor'
import { createClient } from '@/lib/supabase-client'
import { Post, Category } from '@/types/admin'

interface EditPostFormProps {
  post: Post
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [content, setContent] = useState(post.content || '')
  const [excerpt, setExcerpt] = useState(post.excerpt || '')
  const [categoryId, setCategoryId] = useState(post.category_id || '')
  const [status, setStatus] = useState(post.status)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('*').order('sort_order')
      if (data) setCategories(data)
    }
    loadCategories()
  }, [supabase])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug) {
      alert('Title and slug are required')
      return
    }

    setLoading(true)
    try {
      const postData: any = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        category_id: categoryId || null,
        status,
      }

      if (status === 'published' && post.status !== 'published') {
        postData.published_at = new Date().toISOString()
      }

      const { error } = await supabase.from('posts').update(postData).eq('id', post.id)

      if (error) throw error

      router.push('/admin/posts')
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Post</h1>
        <p className="text-zinc-300">Update your blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              placeholder="Post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              placeholder="post-slug"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'draft' | 'published' | 'archived')
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
              placeholder="Brief description of the post..."
            />
            <p className="text-xs text-zinc-500 mt-1">{excerpt.length}/500</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Content *
            </label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@/components/admin/Editor'
import { createClient } from '@/lib/supabase-client'
import { Post, Category } from '@/types/admin'

interface EditPostFormProps {
  post: Post
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [content, setContent] = useState(post.content || '')
  const [excerpt, setExcerpt] = useState(post.excerpt || '')
  const [categoryId, setCategoryId] = useState(post.category_id || '')
  const [status, setStatus] = useState(post.status)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('*').order('sort_order')
      if (data) setCategories(data)
    }
    loadCategories()
  }, [supabase])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug) {
      alert('Title and slug are required')
      return
    }

    setLoading(true)
    try {
      const postData: any = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        category_id: categoryId || null,
        status,
      }

      if (status === 'published' && post.status !== 'published') {
        postData.published_at = new Date().toISOString()
      }

      const { error } = await supabase.from('posts').update(postData).eq('id', post.id)

      if (error) throw error

      router.push('/admin/posts')
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Post</h1>
        <p className="text-zinc-300">Update your blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              placeholder="Post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              placeholder="post-slug"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'draft' | 'published' | 'archived')
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
              placeholder="Brief description of the post..."
            />
            <p className="text-xs text-zinc-500 mt-1">{excerpt.length}/500</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Content *
            </label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-400">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-400 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-400 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-400 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-300 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-300 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-400 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-300 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-300 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-300 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-300 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-lg border border-zinc-800/50 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    if (data) setCategories(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return

    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      alert('Failed to delete category')
    } else {
      loadCategories()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-300">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-300">Manage post categories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            setEditing(null)
            loadCategories()
          }}
        />
      )}

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {categories.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-zinc-300 mb-2">{category.slug}</p>
                    {category.description && (
                      <p className="text-sm text-zinc-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditing(category)
                        setShowForm(true)
                      }}
                      className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/70 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-300 mb-4">No categories yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-orange hover:underline"
            >
              Create your first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryForm({
  category,
  onClose,
  onSuccess,
}: {
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}) {
  const supabase = createClient()
  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [description, setDescription] = useState(category?.description || '')
  const [sortOrder, setSortOrder] = useState(category?.sort_order || 0)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      alert('Name and slug are required')
      return
    }

    setLoading(true)
    try {
      const data = {
        name,
        slug,
        description: description || null,
        sort_order: sortOrder,
      }

      if (category) {
        const { error } = await supabase
          .from('categories')
          .update(data)
          .eq('id', category.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('categories').insert([data])
        if (error) throw error
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-lg border border-zinc-800/50 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {category ? 'Edit Category' : 'New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!category || !slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


```


Checking for linting errors and verifying the implementation:



All changes are complete. Summary:

## Completed implementation

### Admin pages — cloudy background aesthetic
- Added cloudy background image (`/bg.png`) with Next.js Image optimization to admin layout
- Applied gradient overlay for readability across all admin pages
- Updated AdminSidebar with glass-morphism styling (`bg-zinc-900/70 backdrop-blur-md`)
- Added cloudy background to login page with glass-morphism form container
- Updated all admin pages (Dashboard, Posts, Categories, New Post, Edit Post) with consistent glass-morphism cards and improved text contrast

### Homepage hero text update
- Swapped Kaushan_Script font for Mynerve font in `layout.tsx` and `tailwind.config.ts`
- Left-aligned hero text container
- Increased text size from `text-5xl md:text-7xl` to `text-6xl md:text-8xl`
- Positioned ActivityTicker to overlay "ThuH is" with:
  - Absolute positioning within the h1
  - Slight rotation (-3deg) and offset for a playful effect
  - Larger size matching the main text
  - Text shadow for depth

All changes are complete with no linting errors. The admin pages now use the cloudy background aesthetic, and the homepage hero text uses the Mynerve font with a larger, left-aligned, playful overlay effect.

---

**User**

Not overlapping total texts 
- Break down texts to 2 lines, 
- Space between 2 lines can be close like this example 
- Also enlarge the verb texts even larger than now "educating", "writing".... 

---

**Cursor**

I see! You want a two-line layout with the verb below "ThuH is" with tight spacing, and the verb should be even larger. Let me fix that:

```typescriptreact
import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
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
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        {/* Spacer for vertical centering */}
        <div className="hidden md:block" aria-hidden="true" />

        {/* Hero Text */}
        <header className="flex flex-col items-start justify-center mt-20 md:mt-0">
          <div className="flex flex-col -space-y-2 md:-space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg">
              ThuH is
            </h1>
            <ActivityTicker />
          </div>
        </header>

        {/* Footer Navigation Area */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mt-auto w-full">
          {/* Left Column: Links */}
          <div className="space-y-8">
            <NavLinks />
            <SocialIcons />
          </div>

          {/* Right Column: Newsletter */}
          <NewsletterForm />
        </footer>
      </div>
    </main>
  )
}


```

```typescriptreact
'use client'

import { useState, useEffect, useCallback } from 'react'

const ACTIVITIES = ['building', 'educating', 'hiking', 'writing', 'thinking']
const FADE_DURATION = 500
const DISPLAY_DURATION = 3000

export default function ActivityTicker() {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const cycleActivity = useCallback(() => {
    setIsVisible(false)
    
    const fadeTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length)
      setIsVisible(true)
    }, FADE_DURATION)

    return () => clearTimeout(fadeTimeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleActivity, DISPLAY_DURATION)
    return () => clearInterval(interval)
  }, [cycleActivity])

  return (
    <span
      className={`font-handwriting text-accent-orange text-7xl md:text-9xl transition-opacity duration-500 block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
      style={{ 
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
        transform: 'rotate(-2deg)',
        lineHeight: 0.9,
      }}
    >
      {ACTIVITIES[index]}
    </span>
  )
}


```

Done! The changes create a two-line layout:

1. **"ThuH is"** on the first line
2. **The verb (building, educating, etc.)** on the second line below it
3. **Negative spacing** (`-space-y-2 md:-space-y-4`) brings the lines close together
4. **Enlarged verb text** from `text-6xl md:text-8xl` to `text-7xl md:text-9xl` (larger than before)
5. **Slight rotation** (-2deg) on the verb for playfulness
6. **Tight line height** (0.9) to keep it compact

The layout now matches your reference image with "ThuH is" on top and the larger handwritten verb below with minimal gap between them.

---

**User**

Move this text component downwards a little bit on homepage, at around 1/3 of the height 

---

**Cursor**

```typescriptreact
import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
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
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        {/* Hero Text - positioned at ~1/3 from top */}
        <header className="flex flex-col items-start justify-start mt-[15vh] md:mt-[20vh]">
          <div className="flex flex-col -space-y-2 md:-space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg">
              ThuH is
            </h1>
            <ActivityTicker />
          </div>
        </header>

        {/* Footer Navigation Area */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mt-auto w-full">
          {/* Left Column: Links */}
          <div className="space-y-8">
            <NavLinks />
            <SocialIcons />
          </div>

          {/* Right Column: Newsletter */}
          <NewsletterForm />
        </footer>
      </div>
    </main>
  )
}


```

Done! The hero text is now positioned at approximately 1/3 from the top using `mt-[15vh] md:mt-[20vh]` (15-20% viewport height margin from the top). This pushes it down from the top while keeping the footer navigation at the bottom.

---

**User**

Where is the verbs in our code - direct me there for me to adjust the actual verbs showing 'writing', hikinh...

---

**Cursor**

The verbs are defined in `src/components/ActivityTicker.tsx` at line 5:

```5:5:src/components/ActivityTicker.tsx
const ACTIVITIES = ['building', 'educating', 'hiking', 'writing', 'thinking']
```

You can edit this array to change the verbs that rotate. Just modify the strings in the array to whatever activities you want to display.

```typescriptreact
const ACTIVITIES = ['building', 'educating', 'hiking', 'writing', 'thinking']
```

