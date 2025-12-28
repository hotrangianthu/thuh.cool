'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Module } from '@/lib/reading-data';

interface ModuleTabsProps {
    modules: Module[];
    activeModuleIndex: number;
    onSelectModule: (index: number) => void;
    accentColor: string;
}

export default function ModuleTabs({
    modules,
    activeModuleIndex,
    onSelectModule,
    accentColor,
}: ModuleTabsProps) {
    return (
        <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
            {modules.map((mod, i) => {
                const isActive = i === activeModuleIndex;
                const shortTitle = mod.title.split('. ')[1] || mod.title;

                return (
                    <button
                        key={i}
                        onClick={() => onSelectModule(i)}
                        className={cn(
                            "whitespace-nowrap px-1 pb-3 text-sm font-medium transition-all relative",
                            isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        {shortTitle}
                        {isActive && (
                            <div
                                className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full"
                                style={{ backgroundColor: accentColor }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
