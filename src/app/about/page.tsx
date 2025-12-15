import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-zinc-300 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-4">About ThuH</h1>
        <p className="mb-6">Just a builder trying to make sense of the world through code and prose.</p>
        <Link href="/" className="text-accent-orange hover:underline">
          Return home
        </Link>
      </div>
    </div>
  )
}

