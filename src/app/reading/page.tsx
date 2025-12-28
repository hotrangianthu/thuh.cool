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
import { cn } from '@/lib/utils';

export default function ReadingPage() {
    const [activePersonaIndex, setActivePersonaIndex] = useState(0);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [completions, setCompletions] = useState<string[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [manualAdminCheck, setManualAdminCheck] = useState<boolean | null>(null);
    const { profile, loading: authLoading } = useAuth();

    // Primary admin check from context, fallback to manual check if needed
    const isAdmin = profile?.is_admin === true || manualAdminCheck === true;

    // Direct Supabase check for robust admin detection on new tabs
    useEffect(() => {
        const checkAuthDirectly = async () => {
            try {
                const client = (await import('@/lib/supabase-client')).createClient();
                const { data: { session } } = await client.auth.getSession();

                console.log('DIRECT AUTH CHECK - User:', session?.user?.id);

                if (session?.user) {
                    const { data: profile, error } = await client
                        .from('user_profiles')
                        .select('is_admin')
                        .eq('id', session.user.id)
                        .single();

                    if (error) console.warn('Profile fetch error:', error.message);
                    console.log('DIRECT AUTH CHECK - Is Admin:', profile?.is_admin);
                    setManualAdminCheck(profile?.is_admin || false);
                } else {
                    setManualAdminCheck(false);
                }
            } catch (e) {
                console.error('Manual auth check failed:', e);
                setManualAdminCheck(false);
            }
        };
        checkAuthDirectly();
    }, []);

    // Load completions
    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            setIsDataLoading(false);
        }, 5000);

        async function fetchCompletions() {
            try {
                const response = await fetch('/api/reading/complete', { signal: controller.signal });
                if (response.ok) {
                    const data = await response.json();
                    setCompletions(data.completions || []);
                }
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    console.warn('Completions fetch timed out');
                } else {
                    console.error('Failed to fetch completions:', err);
                }
            } finally {
                clearTimeout(timeoutId);
                setIsDataLoading(false);
            }
        }
        fetchCompletions();

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, []);

    const activePersona = curriculumData[activePersonaIndex] || curriculumData[0];
    const activeModule = activePersona?.modules?.[activeModuleIndex] || activePersona?.modules?.[0];

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

    // Safe status derivation that never gets stuck
    const safeAuthStatus = () => {
        if (manualAdminCheck === null && authLoading) return 'CHECKING...';
        if (isAdmin) return 'ADMIN MODE';
        if (profile) return 'LOGGED IN';
        return 'GUEST';
    };

    const authStatus = safeAuthStatus();

    return (
        <div className="min-h-screen bg-bg-dark text-zinc-100 font-sans selection:bg-zinc-100 selection:text-black flex flex-col">
            {/* Background decoration */}
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
                            modules={activePersona?.modules || []}
                            activeModuleIndex={activeModuleIndex}
                            onSelectModule={setActiveModuleIndex}
                            accentColor={activePersona?.hex || "#ffffff"}
                        />

                        <div className="mt-8 flex-grow">
                            {isDataLoading ? (
                                <div className="h-64 flex items-center justify-center text-zinc-600">
                                    <Loader2 className="animate-spin mr-2" /> Loading library...
                                </div>
                            ) : (
                                <>
                                    {!authLoading && isAdmin && (
                                        <div className="mb-6 flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Admin Mode Active</span>
                                        </div>
                                    )}
                                    <BookGrid
                                        title={activeModule?.title || "Library"}
                                        desc={activeModule?.desc || "Curated list of books"}
                                        books={activeModule?.books || []}
                                        personaId={activePersona?.id || "default"}
                                        moduleIndex={activeModuleIndex}
                                        completions={completions}
                                        isAdmin={isAdmin}
                                        onToggleCompletion={handleToggleCompletion}
                                        accentColor={activePersona?.hex || "#ffffff"}
                                        bgAccent={activePersona?.bgHex || "#000000"}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <Footer subHeader="2026 Reading Roadmap" />
            </div>
        </div>
    );
}
