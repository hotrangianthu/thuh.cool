'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/public-policy/research', label: 'Research' },
  { href: '/public-policy/field-notes', label: 'Field notes' },
  { href: '/public-policy/playgrounds', label: 'Tools' },
  { href: '/public-policy/prototypes', label: 'Prototypes' },
  { href: '/public-policy/voice', label: 'Voice' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div
        className="policy-nav-shell"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <div className="policy-wordmark-wrap">
          <Link href="/" className="policy-back-link">
            &larr; thuh.cool
          </Link>
          <Link href="/public-policy" className="policy-wordmark">
            Public Policy Portfolio
          </Link>
        </div>

        {/* Nav links */}
        <nav className="policy-nav-scroll" aria-label="Public policy portfolio">
          <ul
            className="policy-nav-list"
            style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '500',
                    color: 'var(--color-text-secondary)',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--color-accent)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--color-text-secondary)'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
