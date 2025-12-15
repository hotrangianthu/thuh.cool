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

