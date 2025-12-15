import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPublishedPosts, postToNote } from '@/lib/posts'
import { Note } from '@/types'

function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/writing/${note.slug}`}
      className="group cursor-pointer block py-8 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors px-4 -mx-4 rounded-lg"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-accent-orange transition-colors">
          {note.title}
        </h3>
        <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">{note.date}</span>
      </div>
      <p className="text-zinc-400 leading-relaxed max-w-2xl">{note.preview}</p>
    </Link>
  )
}

export default async function WritingPage() {
  const posts = await getPublishedPosts()
  const notes = posts.map(postToNote)

  return (
    <div className="min-h-screen bg-bg-dark text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Writing</h1>
        </header>

        <div className="space-y-2">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  )
}

