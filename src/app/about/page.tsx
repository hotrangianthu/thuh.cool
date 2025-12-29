import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen text-zinc-300 py-20 flex flex-col">
      <div className="max-w-3xl mx-auto px-6 flex-grow w-full flex flex-col">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">About ThuH</h1>
          <p className="text-lg">Just a builder trying to make sense of the world through code and prose.</p>
          <div className="mt-8">
            <Link href="/" className="text-accent-orange hover:underline">
              Return home
            </Link>
          </div>
        </div>

        <Footer subHeader="Personal digital vault" />
      </div>
    </div>
  )
}

