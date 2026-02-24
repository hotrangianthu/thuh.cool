'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Pencil, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookCardProps {
    number: number;
    title: string;
    author: string;
    why: string;
    isCompleted: boolean;
    review?: string;
    rating?: number;
    isAdmin: boolean;
    onToggle: () => void;
    onSaveReview?: (review: string) => void;
    onSaveRating?: (rating: number) => void;
    accentColor: string;
    bgAccent: string;
}

const STARS = [1, 2, 3, 4, 5] as const;

export default function BookCard({
    number,
    title,
    author,
    why,
    isCompleted,
    review,
    rating,
    isAdmin,
    onToggle,
    onSaveReview,
    onSaveRating,
    accentColor,
    bgAccent,
}: BookCardProps) {
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [draftReview, setDraftReview] = useState(review ?? '');

    const handleSaveReview = () => {
        if (onSaveReview && draftReview.trim()) {
            onSaveReview(draftReview.trim());
        }
        setIsEditingReview(false);
    };

    const handleStarClick = (value: number) => {
        if (isAdmin && isCompleted && onSaveRating) {
            onSaveRating(value);
        }
    };

    return (
        <div
            className={cn(
                'group relative rounded-xl p-5 flex flex-col h-full transition-all duration-300',
                isCompleted
                    ? 'bg-emerald-950/30 border border-emerald-500/25 hover:border-emerald-500/40'
                    : 'bg-zinc-900/50 border border-white/5 hover:-translate-y-1 hover:bg-zinc-900'
            )}
        >
            <div className="flex items-start justify-between mb-3 gap-3">
                <span className="text-xs font-mono text-zinc-600 shrink-0">
                    #{(number).toString().padStart(2, '0')}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                    {isCompleted ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Finished
                        </span>
                    ) : null}

                    {isAdmin ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onToggle();
                            }}
                            className={cn(
                                'transition-all duration-300 hover:scale-110 focus:outline-none',
                                isCompleted ? 'text-emerald-500' : 'text-zinc-700 hover:text-zinc-500'
                            )}
                        >
                            {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                    ) : (
                        <div
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{
                                backgroundColor: isCompleted ? '#10b981' : accentColor,
                            }}
                        />
                    )}
                </div>
            </div>

            <h5
                className={cn(
                    'font-serif font-bold text-lg leading-tight mb-1 transition-colors',
                    isCompleted ? 'text-emerald-100' : 'text-zinc-100 group-hover:text-white'
                )}
            >
                {title}
            </h5>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-4">
                {author}
            </p>

            <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                <p className="text-sm text-zinc-400 leading-relaxed italic">
                    &quot;{why}&quot;
                </p>

                {isCompleted && (
                    <div className="space-y-2">
                        {/* Star rating - your rating on completed books */}
                        <div className="flex items-center gap-0.5" role="group" aria-label="Your rating">
                            {STARS.map((value) => {
                                const filled = rating !== undefined && value <= rating;
                                const isInteractive = isAdmin && onSaveRating;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => handleStarClick(value)}
                                        disabled={!isInteractive}
                                        className={cn(
                                            'p-0.5 transition-all',
                                            isInteractive && 'hover:scale-110 cursor-pointer',
                                            !isInteractive && 'cursor-default'
                                        )}
                                        aria-label={`${value} star${value === 1 ? '' : 's'}`}
                                        title={isAdmin ? `Rate ${value} star${value === 1 ? '' : 's'}` : undefined}
                                    >
                                        <Star
                                            size={18}
                                            className={cn(
                                                filled ? 'fill-amber-400 text-amber-400' : 'text-zinc-600',
                                                isInteractive && !filled && 'hover:text-amber-500/60'
                                            )}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Review section */}
                        {isEditingReview ? (
                            <div className="space-y-2">
                                <textarea
                                    value={draftReview}
                                    onChange={(e) => setDraftReview(e.target.value)}
                                    placeholder="Add your classic review..."
                                    className="w-full text-sm bg-zinc-900/80 border border-emerald-500/30 rounded-lg px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none"
                                    rows={3}
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSaveReview}
                                        className="text-xs font-medium px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDraftReview(review ?? '');
                                            setIsEditingReview(false);
                                        }}
                                        className="text-xs font-medium px-3 py-1.5 text-zinc-500 hover:text-zinc-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : review ? (
                            <div className="relative">
                                <p className="text-sm text-emerald-200/90 leading-relaxed pl-4 border-l-2 border-emerald-500/40">
                                    {review}
                                </p>
                                {isAdmin && onSaveReview && (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingReview(true)}
                                        className="absolute -top-1 right-0 p-1 text-zinc-500 hover:text-emerald-400 transition-colors"
                                        aria-label="Edit review"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                )}
                            </div>
                        ) : isAdmin && onSaveReview ? (
                            <button
                                type="button"
                                onClick={() => setIsEditingReview(true)}
                                className="flex items-center gap-1.5 text-xs text-emerald-500/80 hover:text-emerald-500 font-medium"
                            >
                                <Pencil size={12} />
                                Add your review
                            </button>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
