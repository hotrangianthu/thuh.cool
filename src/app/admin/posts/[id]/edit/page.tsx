import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import EditPostForm from '@/components/admin/EditPostForm'

async function getPost(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    redirect('/admin/posts')
  }

  return <EditPostForm post={post} />
}

