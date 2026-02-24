import type { Metadata } from 'next'
import { Inter, Mynerve, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const mynerve = Mynerve({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handwriting',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
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

// Base64 blur placeholder for LCP bg (dark cloudy sky tone) - avoids layout shift
const BG_BLUR =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDEwIDEwIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxYTFhMWIiLz48L3N2Zz4='

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
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BG_BLUR}
            className="object-cover scale-105 animate-slow-pan"
            style={{ objectPosition: 'center' }}
          />
          {/* No gradient overlay to keep it clean */}
        </div>
        {children}
      </body>
    </html>
  )
}

