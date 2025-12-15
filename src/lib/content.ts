import { Note } from '@/types'

// Mock data - replace with MDX or CMS integration later
export const notes: Note[] = [
  {
    id: '1',
    title: 'The Art of Digital Gardening',
    slug: 'digital-gardening',
    date: 'Oct 15, 2025',
    category: 'Thinking',
    preview: 'Why we should treat our websites like gardens, not streams.',
    content: `
      <p>The internet was originally designed as a library—an archive of linked documents. Over the last decade, it has transformed into a stream.</p>
      <p>Digital gardening is a return to the library, but with a twist. It's not just about archiving; it's about <em>cultivating</em>.</p>
      <h3>The Principles</h3>
      <ul>
        <li><strong>Topography over Timeline:</strong> Organize by context, not just by when you wrote it.</li>
        <li><strong>Continuous Growth:</strong> Edit old posts. Refine ideas over years.</li>
      </ul>
    `,
  },
  {
    id: '2',
    title: 'System vs. Goals',
    slug: 'systems-goals',
    date: 'Sep 28, 2025',
    category: 'Productivity',
    preview: 'Winners and losers have the same goals. The difference is the system.',
    content: `
      <p>Goal: Write a book.</p>
      <p>System: Write 500 words every morning at 8 AM.</p>
      <p>Goals provide direction, but systems provide progress. In this vault, I focus on the systems that allow knowledge to compound over time.</p>
    `,
  },
  {
    id: '3',
    title: 'Statement on AI Safety',
    slug: 'ai-safety',
    date: 'Aug 10, 2025',
    category: 'Engineering',
    preview: 'Thoughts on the recent developments in autonomous agents.',
    content: `
      <p>We are moving from "chatbots" to "agents". The distinction is agency. A chatbot waits for you to speak. An agent acts on your behalf.</p>
      <p>The security implications of this shift are massive and largely unexplored.</p>
    `,
  },
]

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug)
}

export function getAllNotes(): Note[] {
  return notes
}

