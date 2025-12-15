import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Post } from '@/types/admin'
import { PostActions } from '@/components/admin/PostActions'

async function getPosts(status?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data } = await query
  return (data || []) as Post[]
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const posts = await getPosts(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-zinc-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-accent-purple hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status || status === 'all'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'published'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'draft'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/posts?status=archived"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            status === 'archived'
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-900/70 backdrop-blur-sm text-zinc-300 hover:bg-zinc-800/70'
          }`}
        >
          Archived
        </Link>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50 overflow-hidden">
        {posts.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.category && (
                        <span className="text-xs text-zinc-500">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-300 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>
                        Created: {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      {post.published_at && (
                        <span>
                          Published: {format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <PostActions post={post} categoryName={post.category?.name} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-300 mb-4">No posts found.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-accent-orange hover:underline"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
