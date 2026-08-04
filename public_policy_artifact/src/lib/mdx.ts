import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(
  process.cwd(),
  'public_policy_artifact',
  'src',
  'content',
  'research'
)

export interface ResearchFrontmatter {
  title: string
  date: string
  abstract: string
  tags: string[]
  wordCount?: number
  status?: 'published' | 'draft'
}

export interface ResearchPost {
  slug: string
  frontmatter: ResearchFrontmatter
  content: string
}

export function getResearchSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function getResearchBySlug(slug: string): ResearchPost {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as ResearchFrontmatter,
    content,
  }
}

export function getAllResearch(): ResearchPost[] {
  const slugs = getResearchSlugs()
  return slugs
    .map((slug) => getResearchBySlug(slug))
    .filter((post) => post.frontmatter.status !== 'draft')
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}
