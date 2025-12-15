'use client'

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="hover:text-zinc-300 transition-colors"
    >
      Back to top
    </button>
  )
}

