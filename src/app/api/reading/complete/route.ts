import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdmin, getPrimaryAdminId } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const isAdmin = await verifyAdmin(user.id);
        if (!isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { bookId, completed, review, rating } = await request.json();

        if (!bookId) {
            return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
        }

        if (completed) {
            const upsertPayload: Record<string, unknown> = {
                user_id: user.id,
                book_id: bookId,
            };
            if (typeof review === 'string') {
                upsertPayload.review = review.trim() || null;
            }
            const ratingNum = typeof rating === 'number' ? rating : parseInt(String(rating), 10);
            if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
                upsertPayload.rating = ratingNum;
            } else if (rating === null) {
                upsertPayload.rating = null;
            }
            const { error } = await supabase
                .from('book_completions')
                .upsert(upsertPayload, { onConflict: 'user_id,book_id' });

            if (error) throw error;
        } else {
            const { error } = await supabase
                .from('book_completions')
                .delete()
                .eq('user_id', user.id)
                .eq('book_id', bookId);

            if (error) throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error toggling book completion:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Use logged-in admin if they're admin; otherwise fall back to first admin (for visitors)
        let adminUserId: string | null = null;
        if (user) {
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('id')
                .eq('id', user.id)
                .eq('is_admin', true)
                .single();
            if (profile) adminUserId = profile.id;
        }
        if (!adminUserId) {
            adminUserId = await getPrimaryAdminId();
        }

        if (!adminUserId) {
            return NextResponse.json({ completions: [] });
        }

        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseFetch = serviceKey && supabaseUrl
            ? createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
            : supabase;

        let data: { book_id: string; review?: string | null; rating?: number | null }[] = [];
        const { data: fullData, error: fullError } = await supabaseFetch
            .from('book_completions')
            .select('book_id, review, rating')
            .eq('user_id', adminUserId);

        if (fullError) {
            const msg = (fullError.message || '').toLowerCase();
            const isColumnError = msg.includes("'review'") || msg.includes("'rating'") || msg.includes('column') || fullError.code === 'PGRST204';
            if (isColumnError) {
                const { data: fallbackData, error: fallbackError } = await supabaseFetch
                    .from('book_completions')
                    .select('book_id')
                    .eq('user_id', adminUserId);
                if (fallbackError) throw fallbackError;
                data = (fallbackData || []).map((d: { book_id: string }) => ({ book_id: d.book_id, review: null, rating: null }));
            } else {
                throw fullError;
            }
        } else {
            data = fullData || [];
        }

        const completions = data.map((d) => {
            const r = typeof d.rating === 'number' ? d.rating : parseInt(String(d.rating ?? ''), 10);
            return {
                bookId: d.book_id,
                review: d.review || undefined,
                rating: !isNaN(r) && r >= 1 && r <= 5 ? r : undefined,
            };
        });
        const res = NextResponse.json({ completions });
        res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
        return res;
    } catch (error: any) {
        console.error('Error fetching book completions:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
