import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug, getPublishedPostsStatic, postToNote } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export async function generateStaticParams() {
  const posts = await getPublishedPostsStatic()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const note = postToNote(post)

  return (
    <div className="min-h-screen bg-bg-dark text-zinc-300 font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/writing"
          className="text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-2 mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> writing
        </Link>

        <article className="prose prose-invert prose-zinc max-w-none">
          <h1 className="text-3xl font-bold text-white mb-2">{note.title}</h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-8 font-mono">
            <span>{note.date}</span>
            <span>/</span>
            <span className="text-accent-orange">{note.category}</span>
          </div>

          <div
            className="prose prose-invert prose-zinc"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </article>

        <hr className="my-12 border-zinc-800" />

        <div className="flex items-center justify-between text-sm text-zinc-500">
          <p>Thanks for reading.</p>
          <ScrollToTopButton />
        </div>
      </div>
    </div>
  )
}

