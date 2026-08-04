'use client'

import { useEffect } from 'react'
import type { FlagshipLocale } from '@/data/flagship'

export default function DocumentLanguage({ locale }: { locale: FlagshipLocale }) {
  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = locale
    return () => { document.documentElement.lang = previous || 'en' }
  }, [locale])

  return null
}

