'use client'

import { useState, useEffect, useCallback } from 'react'

const ACTIVITIES = ['building', 'thinking', 'running', 'writing', 'singing']
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

