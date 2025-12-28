'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { curriculumData } from '@/lib/reading-data';
import PersonaNav from './components/PersonaNav';
import PersonaSidebar from './components/PersonaSidebar';
import ModuleTabs from './components/ModuleTabs';
import BookGrid from './components/BookGrid';
import { useAuth } from '@/components/auth-context';
import Footer from '@/components/Footer';

export default function ReadingPage() {
    const [activePersonaIndex, setActivePersonaIndex] = useState(0);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [completions, setCompletions] = useState<string[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const { profile } = useAuth();
    const isAdmin = profile?.is_admin === true;

    const activePersona = curriculumData[activePersonaIndex];
    const activeModule = activePersona.modules[activeModuleIndex];

    // Load completions
    useEffect(() => {
        async function fetchCompletions() {
            try {
                const response = await fetch('/api/reading/complete');
                if (response.ok) {
                    const data = await response.json();
                    setCompletions(data.completions || []);
                }
            } catch (err) {
                console.error('Failed to fetch completions:', err);
            } finally {
                setIsDataLoading(false);
            }
        }
        fetchCompletions();
    }, []);

    const handleToggleCompletion = async (bookId: string) => {
        if (!isAdmin) return;

        const isCompleted = completions.includes(bookId);
        const newCompletions = isCompleted
            ? completions.filter(id => id !== bookId)
            : [...completions, bookId];

        setCompletions(newCompletions);

        try {
            const response = await fetch('/api/reading/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, completed: !isCompleted }),
            });

            if (!response.ok) {
                // Rollback on error
                setCompletions(completions);
                console.error('Failed to update completion status');
            }
        } catch (err) {
            setCompletions(completions);
            console.error('Error toggling completion:', err);
        }
    };

    const handleSelectPersona = (index: number) => {
        setActivePersonaIndex(index);
        setActiveModuleIndex(0);
    };

    return (
        <div className="min-h-screen bg-bg-dark text-zinc-100 font-sans selection:bg-zinc-100 selection:text-black flex flex-col">
            {/* Background decoration - subtle gradient to match homepage vibe */}
            <div className="fixed inset-0 bg-gradient-to-tr from-zinc-900/20 via-black to-zinc-900/20 -z-10" />

            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="group text-sm text-zinc-500 hover:text-white flex items-center gap-2 transition-all"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">
                            2026 Identity Roadmap
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-[0.3em]">
                            Curated Book Lists / 300 Books
                        </p>
                    </div>

                    <div className="hidden md:block text-right">
                        <p className="text-xs text-zinc-600 italic">
                            "A structured year of reading designed to shape a specific version of yourself."
                        </p>
                    </div>
                </header>

                <PersonaNav
                    activePersonaIndex={activePersonaIndex}
                    onSelectPersona={handleSelectPersona}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Sidebar */}
                    <div className="lg:col-span-4">
                        <PersonaSidebar persona={activePersona} />
                    </div>

                    {/* Right: Content */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-zinc-900/30 rounded-3xl border border-white/5 p-6 md:p-8 backdrop-blur-sm shadow-2xl min-h-[800px]">
                        <ModuleTabs
                            modules={activePersona.modules}
                            activeModuleIndex={activeModuleIndex}
                            onSelectModule={setActiveModuleIndex}
                            accentColor={activePersona.hex}
                        />

                        <div className="mt-8 flex-grow">
                            {isDataLoading ? (
                                <div className="h-64 flex items-center justify-center text-zinc-600">
                                    <Loader2 className="animate-spin mr-2" /> Loading library...
                                </div>
                            ) : (
                                <BookGrid
                                    title={activeModule.title}
                                    desc={activeModule.desc}
                                    books={activeModule.books}
                                    personaId={activePersona.id}
                                    moduleIndex={activeModuleIndex}
                                    completions={completions}
                                    isAdmin={isAdmin}
                                    onToggleCompletion={handleToggleCompletion}
                                    accentColor={activePersona.hex}
                                    bgAccent={activePersona.bgHex}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <Footer subHeader="2026 Reading Roadmap" />
            </div>
        </div>
    );
}
