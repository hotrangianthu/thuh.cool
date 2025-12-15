import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover scale-105 animate-slow-pan"
          style={{ objectPosition: 'center' }}
        />
      </div>
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        {/* Spacer for vertical centering */}
        <div className="hidden md:block" aria-hidden="true" />

        {/* Hero Text */}
        <header className="flex flex-col items-center justify-center text-center mt-20 md:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tight drop-shadow-lg">
            ThuH is
            <ActivityTicker />
          </h1>
        </header>

        {/* Footer Navigation Area */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mt-auto w-full">
          {/* Left Column: Links */}
          <div className="space-y-8">
            <NavLinks />
            <SocialIcons />
          </div>

          {/* Right Column: Newsletter */}
          <NewsletterForm />
        </footer>
      </div>
    </main>
  )
}

