'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getReportSlideUrl, type SaPartnersReport } from '@/data/sa-partners'

export default function SlideViewer({ report, count }: { report: SaPartnersReport; count: number }) {
  const [slide, setSlide] = useState(1)

  const previous = () => setSlide((current) => Math.max(1, current - 1))
  const next = () => setSlide((current) => Math.min(count, current + 1))

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count])

  return (
    <div className="sa-slide-viewer" aria-label={`${report.title} slide viewer`}>
      <div className="sa-slide-stage">
        <Image
          src={getReportSlideUrl(report, slide)}
          alt={`${report.title}, slide ${slide} of ${report.slideCount}`}
          fill
          priority={slide === 1}
          sizes="(max-width: 1120px) 100vw, 1080px"
        />
      </div>
      <div className="sa-slide-toolbar">
        <button type="button" onClick={previous} disabled={slide === 1} aria-label="Previous slide"><ChevronLeft size={17} /></button>
        <span>Slide {slide} / {report.access === 'public' ? report.slideCount : `${count} preview`}</span>
        <div className="sa-slide-dots" aria-label="Choose a slide">
          {Array.from({ length: count }, (_, index) => index + 1).map((page) => (
            <button
              type="button"
              key={page}
              className={page === slide ? 'active' : ''}
              onClick={() => setSlide(page)}
              aria-label={`Show slide ${page}`}
              aria-current={page === slide ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={next} disabled={slide === count} aria-label="Next slide"><ChevronRight size={17} /></button>
      </div>
    </div>
  )
}
