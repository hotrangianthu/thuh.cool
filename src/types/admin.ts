export interface Post {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  category_id: string | null
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  created_at: string
  updated_at: string
  author_id: string | null
  category?: {
    id: string
    name: string
    slug: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
  created_at: string
}

