'use client'

import { useRouter } from 'next/navigation'
import { Eye, Edit, Trash2, Download } from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/types/admin'
import { exportPostToMDX, downloadMDX } from '@/lib/mdx-export'

interface PostActionsProps {
  post: Post
  categoryName?: string
}

export function PostActions({ post, categoryName }: PostActionsProps) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return

    const res = await fetch(`/api/admin/posts/${post.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete post')
    }
  }

  function handleExport() {
    const mdx = exportPostToMDX(post, categoryName)
    downloadMDX(mdx, post.slug)
  }

  return (
    <div className="flex items-center gap-2 ml-4">
      {post.status === 'published' && (
        <Link
          href={`/writing/${post.slug}`}
          target="_blank"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          title="View"
        >
          <Eye size={16} />
        </Link>
      )}
      <button
        onClick={handleExport}
        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
        title="Export MDX"
      >
        <Download size={16} />
      </button>
      <Link
        href={`/admin/posts/${post.id}/edit`}
        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
        title="Edit"
      >
        <Edit size={16} />
      </Link>
      <button
        onClick={handleDelete}
        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

