import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'


export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">


      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col h-full justify-between py-12 md:py-24">
        {/* Hero Text - positioned at ~1/3 from top */}
        <header className="flex flex-col items-start justify-start mt-[15vh] md:mt-[20vh]">
          <div className="flex flex-col -space-y-2 md:-space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg">
              ThuH is
            </h1>
            <ActivityTicker />
          </div>
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

