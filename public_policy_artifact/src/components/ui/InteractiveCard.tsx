'use client'

import Link from 'next/link'
import { useState } from 'react'

interface InteractiveCardProps {
  children: React.ReactNode
  href?: string
  accentColor?: string
  style?: React.CSSProperties
  className?: string
}

export default function InteractiveCard({
  children,
  href,
  accentColor = '#1B3A5C',
  style,
  className,
}: InteractiveCardProps) {
  const [hovered, setHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    display: 'block',
    backgroundColor: 'var(--color-bg-card)',
    border: `1px solid ${hovered ? accentColor : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    transform: hovered ? 'translateY(-3px)' : 'none',
    boxShadow: hovered
      ? `0 8px 24px 0 rgb(0 0 0 / 0.1), 0 0 0 1px ${accentColor}22`
      : 'var(--shadow-card)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    ...style,
  }

  const inner = (
    <div
      style={baseStyle}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </Link>
    )
  }

  return inner
}
