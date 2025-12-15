import { createClient } from '@/lib/supabase-server'
import { Post } from '@/types/admin'
import { Note } from '@/types'

export async function getPublishedPosts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data || []) as Post[]
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return null
  }

  return data as Post
}

export function postToNote(post: Post): Note {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: post.published_at
      ? new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : new Date(post.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    category: post.category?.name || 'Writing',
    preview: post.excerpt || '',
    content: post.content || '',
  }
}

