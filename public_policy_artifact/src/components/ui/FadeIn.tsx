'use client'

import { useEffect, useRef, useState } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  className?: string
  style?: React.CSSProperties
}

const offsets: Record<Direction, string> = {
  up: 'translateY(24px)',
  down: 'translateY(-24px)',
  left: 'translateX(24px)',
  right: 'translateX(-24px)',
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : offsets[direction],
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
