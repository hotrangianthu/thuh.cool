'use client'

import { useEffect, useRef, useState } from 'react'

interface TypeWriterProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
  style?: React.CSSProperties
  startDelay?: number
}

export default function TypeWriter({
  text,
  speed = 38,
  onComplete,
  className,
  style,
  startDelay = 0,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setDisplayed(text)
      onComplete?.()
      return
    }

    const startTimer = setTimeout(() => {
      function typeNext() {
        const i = indexRef.current
        if (i >= text.length) {
          onComplete?.()
          return
        }
        setDisplayed(text.slice(0, i + 1))
        indexRef.current = i + 1
        timerRef.current = setTimeout(typeNext, speed)
      }
      typeNext()
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [text, speed, onComplete, startDelay])

  return (
    <span className={className} style={style} aria-label={text}>
      {displayed}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: 'currentColor',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'tw-blink 0.8s step-end infinite',
          opacity: displayed.length === text.length ? 0 : 1,
        }}
      />
    </span>
  )
}
