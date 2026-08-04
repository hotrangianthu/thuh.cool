import { getAllResearch, getResearchSlugs, type ResearchPost } from './mdx'

export type { ResearchPost }

export function listResearch(): ResearchPost[] {
  return getAllResearch()
}

export function getStaticResearchParams() {
  return getResearchSlugs().map((slug) => ({ slug }))
}
