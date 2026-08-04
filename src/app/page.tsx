import ActivityTicker from '@/components/ActivityTicker'
import SocialIcons from '@/components/SocialIcons'
import NewsletterForm from '@/components/NewsletterForm'
import NavLinks from '@/components/NavLinks'


export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden">


      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen w-full max-w-5xl flex-col justify-between px-6 py-12 md:px-12 md:py-24">
        {/* Hero Text - positioned at ~1/3 from top */}
        <header className="mt-[8vh] flex flex-col items-start justify-start md:mt-[12vh]">
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
