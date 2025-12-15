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
      className={`font-handwriting text-accent-orange ml-3 inline-block transition-opacity duration-500 -rotate-2 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      {ACTIVITIES[index]}
    </span>
  )
}

