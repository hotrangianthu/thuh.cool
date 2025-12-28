'use client';

import React from 'react';
import RadarChart from './RadarChart';
import { Persona } from '@/lib/reading-data';

interface PersonaSidebarProps {
    persona: Persona;
}

export default function PersonaSidebar({ persona }: PersonaSidebarProps) {
    return (
        <aside className="flex flex-col gap-6 h-full">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shrink-0"
                        style={{ backgroundColor: persona.hex }}
                    >
                        {/* Simplified icon representation */}
                        <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-white leading-tight">
                            {persona.name}
                        </h2>
                    </div>
                </div>

                <p className="text-sm font-medium text-zinc-400 italic border-l-4 pl-4 py-1" style={{ borderColor: persona.hex }}>
                    "{persona.vibe}"
                </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 shadow-xl flex flex-col items-center">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                    Attribute Profile
                </h4>
                <RadarChart
                    stats={persona.stats}
                    color={persona.hex}
                    bgHex={persona.bgHex}
                />
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 shadow-xl mt-auto">
                <h5 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: persona.hex }}>
                    The Objective
                </h5>
                <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    {persona.goal}
                </p>
            </div>
        </aside>
    );
}
