'use client'

import { useEffect, useState } from 'react'

interface ScrollProgressProps {
  accentColor?: string
  height?: number
}

export default function ScrollProgress({
  accentColor = '#1B3A5C',
  height = 3,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    function handleScroll() {
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      if (scrollHeight <= 0) return
      setProgress((scrollTop / scrollHeight) * 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: accentColor,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  )
}
