'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookCardProps {
    number: number;
    title: string;
    author: string;
    why: string;
    isCompleted: boolean;
    isAdmin: boolean;
    onToggle: () => void;
    accentColor: string;
    bgAccent: string;
}

export default function BookCard({
    number,
    title,
    author,
    why,
    isCompleted,
    isAdmin,
    onToggle,
    accentColor,
    bgAccent,
}: BookCardProps) {
    return (
        <div
            className={cn(
                "group relative bg-zinc-900/50 border border-white/5 rounded-xl p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900",
                isCompleted && "opacity-40 grayscale-[0.5] border-green-500/20"
            )}
        >
            <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-zinc-600">#{(number).toString().padStart(2, '0')}</span>

                {isAdmin ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggle();
                        }}
                        className={cn(
                            "transition-all duration-300 hover:scale-110 focus:outline-none",
                            isCompleted ? "text-green-500" : "text-zinc-700 hover:text-zinc-500"
                        )}
                    >
                        {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                ) : (
                    <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: isCompleted ? '#22c55e' : accentColor }}
                    />
                )}
            </div>

            <h5 className="font-serif font-bold text-zinc-100 text-lg leading-tight mb-1 group-hover:text-white transition-colors">
                {title}
            </h5>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-4">
                {author}
            </p>

            <div className="mt-auto pt-4 border-t border-white/5">
                <p className="text-sm text-zinc-400 leading-relaxed italic">
                    "{why}"
                </p>
            </div>

            {isCompleted && (
                <div className="absolute inset-0 bg-green-500/5 rounded-xl pointer-events-none" />
            )}
        </div>
    );
}
