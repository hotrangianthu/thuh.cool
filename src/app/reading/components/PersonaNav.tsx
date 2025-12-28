'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { curriculumData } from '@/lib/reading-data';
import { Crown, Rocket, BookOpen, Bot, Users } from 'lucide-react';

interface PersonaNavProps {
    activePersonaIndex: number;
    onSelectPersona: (index: number) => void;
}

const iconMap: Record<string, React.ReactNode> = {
    "fa-chess-king": <Crown size={16} />,
    "fa-rocket": <Rocket size={16} />,
    "fa-book-open": <BookOpen size={16} />,
    "fa-robot": <Bot size={16} />,
    "fa-users": <Users size={16} />,
};

export default function PersonaNav({
    activePersonaIndex,
    onSelectPersona,
}: PersonaNavProps) {
    return (
        <nav className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
            {curriculumData.map((p, i) => {
                const isActive = i === activePersonaIndex;
                const Icon = iconMap[p.icon] || <div className="w-2 h-2 rounded-full bg-current" />;

                return (
                    <button
                        key={p.id}
                        onClick={() => onSelectPersona(i)}
                        className={cn(
                            "flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 text-sm font-bold shadow-sm",
                            isActive
                                ? "text-white scale-105 shadow-lg border-transparent"
                                : "bg-zinc-900/50 text-zinc-500 border-white/5 hover:bg-zinc-900 hover:text-zinc-300"
                        )}
                        style={{
                            backgroundColor: isActive ? p.hex : undefined,
                            borderColor: isActive ? p.hex : undefined
                        }}
                    >
                        {/* Icon Render */}
                        <div className={cn(isActive ? "text-white" : "")} style={{ color: !isActive ? p.hex : undefined }}>
                            {Icon}
                        </div>

                        <span className="hidden sm:inline">{p.name.replace('The ', '')}</span>
                        <span className="sm:hidden">{p.name.split(' ').pop()}</span>
                    </button>
                );
            })}
        </nav>
    );
}
