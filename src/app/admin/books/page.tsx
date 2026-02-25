'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, Save, X, Book as BookIcon } from 'lucide-react';
import { curriculumData } from '@/lib/reading-data';

interface Book {
    id: string;
    title: string;
    author: string;
    why: string;
    persona_id: string;
    module_index: number;
    order_index: number;
}

export default function AdminBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/books');
            if (!res.ok) throw new Error('Failed to fetch books');
            const data = await res.json();
            setBooks(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingBook) return;

        try {
            setIsSaving(true);
            const method = editingBook.id ? 'PUT' : 'POST';
            const res = await fetch('/api/admin/books', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingBook),
            });

            if (!res.ok) throw new Error('Failed to save book');

            await fetchBooks();
            setEditingBook(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this book?')) return;

        try {
            const res = await fetch(`/api/admin/books?id=${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete book');

            await fetchBooks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const personas = curriculumData.map(p => ({ id: p.id, name: p.name, modules: p.modules }));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Book Management</h1>
                    <p className="text-zinc-400">Manage your reading lists and curriculum.</p>
                </div>
                <button
                    onClick={() => setEditingBook({
                        title: '',
                        author: '',
                        why: '',
                        persona_id: personas[0]?.id || '',
                        module_index: 0,
                        order_index: books.length
                    })}
                    className="bg-accent-orange hover:bg-accent-orange/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Add Book
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)}><X size={18} /></button>
                </div>
            )}

            {editingBook && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">
                                {editingBook.id ? 'Edit Book' : 'Add New Book'}
                            </h2>
                            <button onClick={() => setEditingBook(null)} className="text-zinc-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Title</label>
                                    <input
                                        required
                                        value={editingBook.title || ''}
                                        onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Author</label>
                                    <input
                                        required
                                        value={editingBook.author || ''}
                                        onChange={e => setEditingBook({ ...editingBook, author: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Why this book?</label>
                                <textarea
                                    rows={3}
                                    value={editingBook.why || ''}
                                    onChange={e => setEditingBook({ ...editingBook, why: e.target.value })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Persona</label>
                                    <select
                                        value={editingBook.persona_id || ''}
                                        onChange={e => setEditingBook({ ...editingBook, persona_id: e.target.value, module_index: 0 })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                                    >
                                        {personas.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Module</label>
                                    <select
                                        value={editingBook.module_index || 0}
                                        onChange={e => setEditingBook({ ...editingBook, module_index: parseInt(e.target.value) })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                                    >
                                        {personas.find(p => p.id === editingBook.persona_id)?.modules.map((m, i) => (
                                            <option key={i} value={i}>{m.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Order Index</label>
                                    <input
                                        type="number"
                                        value={editingBook.order_index || 0}
                                        onChange={e => setEditingBook({ ...editingBook, order_index: parseInt(e.target.value) })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingBook(null)}
                                    className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-accent-orange hover:bg-accent-orange/90 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <Loader2 className="animate-spin mb-4" size={40} />
                    <p>Loading library...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {personas.map(persona => {
                        const personaBooks = books.filter(b => b.persona_id === persona.id);
                        if (personaBooks.length === 0) return null;

                        return (
                            <div key={persona.id} className="bg-zinc-900/40 rounded-xl border border-zinc-800/50 overflow-hidden">
                                <div className="bg-zinc-800/30 px-6 py-4 border-b border-zinc-800/50">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <BookIcon className="text-accent-orange" size={20} />
                                        {persona.name}
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800/50">
                                                <th className="px-6 py-4 font-semibold">Title / Author</th>
                                                <th className="px-6 py-4 font-semibold text-center">Module</th>
                                                <th className="px-6 py-4 font-semibold text-center">Order</th>
                                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-800/50">
                                            {personaBooks.map(book => (
                                                <tr key={book.id} className="hover:bg-zinc-800/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-white">{book.title}</div>
                                                        <div className="text-sm text-zinc-500">{book.author}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-sm text-zinc-300">
                                                            {persona.modules[book.module_index]?.title || `Module ${book.module_index}`}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-xs font-mono text-zinc-500">{book.order_index}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => setEditingBook(book)}
                                                                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(book.id)}
                                                                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                    {books.length === 0 && (
                        <div className="text-center py-20 bg-zinc-900/40 border border-zinc-800/50 rounded-xl">
                            <BookIcon className="mx-auto text-zinc-700 mb-4" size={48} />
                            <p className="text-zinc-400">Your library is empty. Click &quot;Add Book&quot; to get started.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
