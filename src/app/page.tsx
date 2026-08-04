import ActivityTicker from '@/components/ActivityTicker'
import NavLinks from '@/components/NavLinks'


export default function Home() {
  return (
    <main className="relative flex min-h-[100svh] w-full flex-col items-center overflow-x-hidden">


      {/* Main Content */}
      <div className="relative z-20 flex min-h-[100svh] w-full max-w-5xl flex-col px-6 py-8 md:px-12 md:py-14">
        {/* Hero Text */}
        <header className="mt-[4vh] flex shrink-0 flex-col items-start justify-start pb-8 md:mt-[6vh] md:pb-10">
          <div className="flex flex-col -space-y-2 md:-space-y-3">
            <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg">
              ThuH is
            </h1>
            <ActivityTicker />
          </div>
        </header>

        {/* Primary navigation */}
        <section className="mt-auto grid w-full grid-cols-1 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] md:gap-x-8" aria-label="Site destinations">
          <div className="min-w-0 md:col-start-1">
            <NavLinks />
          </div>
        </section>
      </div>
    </main>
  )
}
