import { createClient } from '@/lib/supabase-server'
import { FileText, Eye, Edit, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-300">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Total Posts</h3>
            <FileText className="text-zinc-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{totalPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Published</h3>
            <Eye className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{publishedPosts || 0}</p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-300 text-sm font-medium">Drafts</h3>
            <Edit className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">{draftPosts || 0}</p>
        </div>
      </div>

      <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg border border-zinc-800/50">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-accent-orange hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="block p-6 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-300">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-300">
              <p>No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="mt-4 inline-block text-accent-orange hover:underline"
              >
                New Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

