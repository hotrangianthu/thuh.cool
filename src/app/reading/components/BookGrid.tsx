'use client';

import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/lib/reading-data';

export type CompletionEntry = { bookId: string; review?: string; rating?: number };

interface BookGridProps {
    title: string;
    desc: string;
    books: Book[];
    personaId: string;
    moduleIndex: number;
    completions: CompletionEntry[];
    isAdmin: boolean;
    onToggleCompletion: (bookId: string, review?: string, rating?: number) => void;
    onSaveReview?: (bookId: string, review: string) => void;
    onSaveRating?: (bookId: string, rating: number) => void;
    accentColor: string;
    bgAccent: string;
}

export default function BookGrid({
    title,
    desc,
    books,
    personaId,
    moduleIndex,
    completions,
    isAdmin,
    onToggleCompletion,
    onSaveReview,
    onSaveRating,
    accentColor,
    bgAccent,
}: BookGridProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h3
                        className="text-2xl font-serif font-bold mb-2"
                        style={{ color: accentColor }}
                    >
                        {title}
                    </h3>
                    <p className="text-sm text-zinc-400 italic border-l-2 border-zinc-800 pl-4 py-1">
                        {desc}
                    </p>
                </div>
                <div className="flex items-center">
                    <span className="text-[10px] font-bold px-3 py-1 bg-zinc-900 border border-white/5 rounded-full text-zinc-500 uppercase tracking-widest">
                        {books.length} Books
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {books.map((book, i) => {
                    const bookId = `${personaId}_${moduleIndex}_${i}`;
                    const entry = completions.find((c) => c.bookId === bookId);
                    const isCompleted = !!entry;
                    return (
                        <BookCard
                            key={bookId}
                            number={(moduleIndex * 12) + i + 1}
                            title={book.t}
                            author={book.a}
                            why={book.w}
                            isCompleted={isCompleted}
                            review={entry?.review}
                            rating={entry?.rating}
                            isAdmin={isAdmin}
                            onToggle={() => onToggleCompletion(bookId)}
                            onSaveReview={onSaveReview ? (r) => onSaveReview(bookId, r) : undefined}
                            onSaveRating={onSaveRating ? (r) => onSaveRating(bookId, r) : undefined}
                            accentColor={accentColor}
                            bgAccent={bgAccent}
                        />
                    );
                })}
            </div>
        </div>
    );
}
