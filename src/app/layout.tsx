import type { Metadata } from 'next'
import { Inter, Mynerve, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth-context'
import AuthStatusBadge from '@/components/AuthStatusBadge'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const mynerve = Mynerve({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-handwriting',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
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

import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mynerve.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <div className="fixed inset-0 z-[-1]">
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
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80" />
        </div>
        <AuthProvider>
          <AuthStatusBadge />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

