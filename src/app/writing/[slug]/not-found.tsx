import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark text-zinc-300 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Note not found</h1>
        <p className="mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/writing" className="text-accent-orange hover:underline">
          Back to writing
        </Link>
      </div>
    </div>
  )
}

