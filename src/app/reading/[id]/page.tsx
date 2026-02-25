'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { curriculumData } from '@/lib/reading-data';
import PersonaNav from '../components/PersonaNav';
import PersonaSidebar from '../components/PersonaSidebar';
import ModuleTabs from '../components/ModuleTabs';
import BookGrid, { type CompletionEntry } from '../components/BookGrid';
import { useAuth } from '@/components/auth-context';
import Footer from '@/components/Footer';

function normalizeCompletions(raw: unknown): CompletionEntry[] {
    if (!Array.isArray(raw)) return [];
    return raw.map((item: { bookId?: string; review?: string; rating?: number } | string) =>
        typeof item === 'string'
            ? { bookId: item, review: undefined, rating: undefined }
            : { bookId: item.bookId!, review: item.review, rating: item.rating }
    );
}

function parsePersonaIndex(id: string | string[] | undefined): number {
    const n = typeof id === 'string' ? parseInt(id, 10) : 0;
    if (!Number.isFinite(n) || n < 1 || n > curriculumData.length) return 0;
    return n - 1;
}

function getTotalBookCount(): number {
    return curriculumData.reduce(
        (sum, p) => sum + (p.modules?.reduce((m, mod) => m + (mod.books?.length ?? 0), 0) ?? 0),
        0
    );
}

export default function ReadingPersonaPage() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const personaIndex = parsePersonaIndex(id);

    const [activePersonaIndex, setActivePersonaIndex] = useState(personaIndex);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [completions, setCompletions] = useState<CompletionEntry[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [completionsLoadError, setCompletionsLoadError] = useState<string | null>(null);
    const [manualAdminCheck, setManualAdminCheck] = useState<boolean | null>(null);
    const [completionError, setCompletionError] = useState<string | null>(null);
    const { profile, loading: authLoading } = useAuth();

    const isAdmin = profile?.is_admin === true || manualAdminCheck === true;

    useEffect(() => {
        const idx = parsePersonaIndex(id);
        setActivePersonaIndex(idx);
        setActiveModuleIndex(0);
    }, [id]);

    useEffect(() => {
        const checkAuthDirectly = async () => {
            try {
                const client = (await import('@/lib/supabase-client')).createClient();
                const { data: { session } } = await client.auth.getSession();

                if (session?.user) {
                    const { data: profile, error } = await client
                        .from('user_profiles')
                        .select('is_admin')
                        .eq('id', session.user.id)
                        .single();

                    if (error) console.warn('Profile fetch error:', error.message);
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

    useEffect(() => {
        let cancelled = false;

        async function fetchWithRetry() {
            const maxAttempts = 3;
            setCompletionsLoadError(null);

            for (let attempt = 0; attempt < maxAttempts && !cancelled; attempt++) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 25000);

                    const response = await fetch('/api/reading/complete', {
                        signal: controller.signal,
                        credentials: 'include',
                        cache: 'no-store',
                    });

                    clearTimeout(timeoutId);
                    if (cancelled) return;

                    if (response.ok) {
                        const data = await response.json();
                        setCompletions(normalizeCompletions(data.completions || []));
                        setIsDataLoading(false);
                        return;
                    }

                    const errData = await response.json().catch(() => ({}));
                    setCompletionsLoadError(errData?.error || `Failed (${response.status})`);
                    break;
                } catch (err) {
                    if (cancelled) return;
                    const isRetryable = err instanceof Error && err.name === 'AbortError';
                    if (isRetryable && attempt < maxAttempts - 1) {
                        await new Promise((r) => setTimeout(r, 1500));
                        continue;
                    }
                    setCompletionsLoadError(
                        isRetryable ? 'Timed out. Refresh to retry.' : 'Could not load completions.'
                    );
                } finally {
                    if (!cancelled) setIsDataLoading(false);
                }
            }
        }

        fetchWithRetry();

        return () => {
            cancelled = true;
        };
    }, []);

    const activePersona = curriculumData[activePersonaIndex] || curriculumData[0];
    const activeModule = activePersona?.modules?.[activeModuleIndex] || activePersona?.modules?.[0];
    const totalBooks = getTotalBookCount();
    const completedCount = completions.length;
    const percentComplete = totalBooks > 0 ? Math.round((completedCount / totalBooks) * 100) : 0;

    const handleToggleCompletion = async (bookId: string, review?: string) => {
        if (!isAdmin) return;

        setCompletionError(null);
        const entry = completions.find((c) => c.bookId === bookId);
        const isCompleted = !!entry;
        const newCompletions = isCompleted
            ? completions.filter((c) => c.bookId !== bookId)
            : [...completions, { bookId, review: review ?? undefined }];

        setCompletions(newCompletions);

        try {
            const response = await fetch('/api/reading/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, completed: !isCompleted, review: review ?? undefined }),
                credentials: 'include',
            });

            if (!response.ok) {
                setCompletions(completions);
                const errData = await response.json().catch(() => ({}));
                setCompletionError(errData?.error || `Request failed (${response.status})`);
            } else {
                const refetchRes = await fetch('/api/reading/complete', {
                    credentials: 'include',
                    cache: 'no-store',
                });
                if (refetchRes.ok) {
                    const { completions: fresh } = await refetchRes.json();
                    setCompletions(normalizeCompletions(fresh));
                }
            }
        } catch (err) {
            setCompletions(completions);
            setCompletionError(err instanceof Error ? err.message : 'Failed to update. Try signing in at /admin/login.');
        }
    };

    const handleSaveReview = async (bookId: string, review: string) => {
        if (!isAdmin) return;
        setCompletionError(null);
        const entry = completions.find((c) => c.bookId === bookId);
        if (!entry) return;
        const updated = completions.map((c) => (c.bookId === bookId ? { ...c, review } : c));
        setCompletions(updated);
        try {
            const response = await fetch('/api/reading/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, completed: true, review }),
                credentials: 'include',
            });
            if (!response.ok) {
                setCompletions(completions);
                const errData = await response.json().catch(() => ({}));
                setCompletionError(errData?.error || 'Failed to save review');
            } else {
                const refetchRes = await fetch('/api/reading/complete', { credentials: 'include', cache: 'no-store' });
                if (refetchRes.ok) {
                    const { completions: fresh } = await refetchRes.json();
                    setCompletions(normalizeCompletions(fresh));
                }
            }
        } catch (err) {
            setCompletions(completions);
            setCompletionError(err instanceof Error ? err.message : 'Failed to save review');
        }
    };

    const handleSaveRating = async (bookId: string, rating: number) => {
        if (!isAdmin) return;
        setCompletionError(null);
        const entry = completions.find((c) => c.bookId === bookId);
        if (!entry) return;
        const updated = completions.map((c) => (c.bookId === bookId ? { ...c, rating } : c));
        setCompletions(updated);
        try {
            const response = await fetch('/api/reading/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, completed: true, rating }),
                credentials: 'include',
            });
            if (!response.ok) {
                setCompletions(completions);
                const errData = await response.json().catch(() => ({}));
                setCompletionError(errData?.error || 'Failed to save rating');
            } else {
                const refetchRes = await fetch('/api/reading/complete', { credentials: 'include', cache: 'no-store' });
                if (refetchRes.ok) {
                    const { completions: fresh } = await refetchRes.json();
                    setCompletions(normalizeCompletions(fresh));
                }
            }
        } catch (err) {
            setCompletions(completions);
            setCompletionError(err instanceof Error ? err.message : 'Failed to save rating');
        }
    };

    const handleSelectPersona = (index: number) => {
        setActivePersonaIndex(index);
        setActiveModuleIndex(0);
    };

    return (
        <div className="min-h-screen text-zinc-100 font-sans selection:bg-zinc-100 selection:text-black flex flex-col">
            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
                <header className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
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
                    <div
                        className="flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2.5 backdrop-blur-sm"
                        style={{ borderColor: activePersona?.hex ? `${activePersona.hex}40` : undefined }}
                    >
                        <span className="text-lg font-bold tabular-nums text-white">
                            {completedCount}/{totalBooks}
                        </span>
                        <span className="text-zinc-500 text-sm">books</span>
                        <span
                            className="text-sm font-semibold tabular-nums"
                            style={{ color: activePersona?.hex || '#ffffff' }}
                        >
                            {percentComplete}%
                        </span>
                    </div>
                </header>

                <PersonaNav
                    activePersonaIndex={activePersonaIndex}
                    onSelectPersona={handleSelectPersona}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4">
                        <PersonaSidebar persona={activePersona} />
                    </div>

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
                                    {completionsLoadError && (
                                        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400 mb-6 flex flex-wrap items-center justify-between gap-3">
                                            <span>
                                                {completionsLoadError} — Completed books may not show.
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsDataLoading(true);
                                                    setCompletionsLoadError(null);
                                                    fetch('/api/reading/complete', { credentials: 'include', cache: 'no-store' })
                                                        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
                                                        .then((d) => {
                                                            setCompletions(normalizeCompletions(d.completions || []));
                                                            setCompletionsLoadError(null);
                                                        })
                                                        .catch(() => setCompletionsLoadError('Retry failed'))
                                                        .finally(() => setIsDataLoading(false));
                                                }}
                                                className="px-3 py-1.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    {!authLoading && isAdmin && (
                                        <div className="mb-6 flex flex-col gap-3">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Admin Mode Active</span>
                                            </div>
                                            {completionError && (
                                                <div
                                                    role="alert"
                                                    className="flex items-center justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
                                                >
                                                    <span>{completionError}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setCompletionError(null)}
                                                        className="text-red-400 hover:text-red-300"
                                                        aria-label="Dismiss"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
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
                                        onSaveReview={handleSaveReview}
                                        onSaveRating={handleSaveRating}
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
