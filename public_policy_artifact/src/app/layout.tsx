import type { Metadata } from 'next'
import './globals.css'
import Nav from '@policy/components/layout/nav'
import Footer from '@policy/components/layout/footer'

export const metadata: Metadata = {
  title: {
    default: 'Tran Gian Thu Ho — Policy Research',
    template: '%s | Tran Gian Thu Ho',
  },
  description:
    'Policy researcher and product strategist focused on rural digital inclusion, fintech access, and Vietnam\'s 2025–2035 development plan.',
  keywords: ['public policy', 'Vietnam', 'rural development', 'fintech', 'research portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
