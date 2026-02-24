'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Category } from '@/types/admin'
import { Plus } from 'lucide-react'

interface CategorySelectWithAddProps {
  value: string
  onChange: (categoryId: string) => void
  categories: Category[]
  onCategoriesChange: () => void | Promise<void>
  className?: string
}

export default function CategorySelectWithAdd({
  value,
  onChange,
  categories,
  onCategoriesChange,
  className = '',
}: CategorySelectWithAddProps) {
  const supabase = useMemo(() => createClient(), [])
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="flex gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple ${className}`}
      >
        <option value="">None</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-1 px-3 py-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-accent-purple hover:bg-zinc-800/50 transition-colors shrink-0"
        title="Add new category"
      >
        <Plus size={18} />
        Add
      </button>
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={async (newCategory) => {
            await onCategoriesChange()
            onChange(newCategory.id)
            setShowAddModal(false)
          }}
          supabase={supabase}
        />
      )}
    </div>
  )
}

function AddCategoryModal({
  onClose,
  onSuccess,
  supabase,
}: {
  onClose: () => void
  onSuccess: (category: Category) => void
  supabase: ReturnType<typeof createClient>
}) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      setError('Name and slug are required')
      return
    }

    setError(null)
    setLoading(true)
    try {
      const { data: existing } = await supabase.from('categories').select('sort_order')
      const maxSort = existing?.length ? Math.max(...existing.map((c) => c.sort_order)) : 0
      const { data, error: insertError } = await supabase
        .from('categories')
        .insert([{ name, slug, description: null, sort_order: maxSort + 1 }])
        .select()
        .single()

      if (insertError) throw insertError
      onSuccess(data as Category)
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : (err as { message?: string })?.message ?? 'Failed to create category'
      const msg = raw.includes('duplicate') || raw.includes('unique') ? 'A category with this name or slug already exists. Try a different slug.' : raw
      setError(msg)
      console.error('Category create error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div
        className="bg-zinc-900/95 backdrop-blur-md rounded-lg border border-zinc-800/50 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-white mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!slug) setSlug(generateSlug(e.target.value))
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              placeholder="e.g. Tech"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple font-mono text-sm"
              placeholder="e.g. tech"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-purple hover:bg-[#6d28d9] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
