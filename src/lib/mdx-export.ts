import { Post } from '@/types/admin'

export function exportPostToMDX(post: Post, categoryName?: string): string {
  const frontmatter = {
    title: post.title,
    slug: post.slug,
    date: post.published_at || post.created_at,
    category: categoryName || 'writing',
    status: post.status,
  }

  const frontmatterString = Object.entries(frontmatter)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n')

  return `---
${frontmatterString}
---

${post.excerpt ? `> ${post.excerpt}\n\n` : ''}${post.content || ''}
`
}

export function downloadMDX(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.mdx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

