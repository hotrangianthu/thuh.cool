'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function Editor({ content, onChange, placeholder }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent-orange underline',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-invert prose-zinc max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Link URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b border-zinc-800 bg-zinc-950">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${
            editor.isActive('bold') ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${
            editor.isActive('italic') ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          <Italic size={18} />
        </button>
        <div className="w-px h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400'
          }`}
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400'
          }`}
        >
          <Heading2 size={18} />
        </button>
        <div className="w-px h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${
            editor.isActive('bulletList') ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-zinc-800 transition-colors ${
            editor.isActive('orderedList') ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          <ListOrdered size={18} />
        </button>
        <div className="w-px h-6 bg-zinc-800 mx-1" />
        <button
          onClick={addLink}
          className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400"
        >
          <ImageIcon size={18} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

