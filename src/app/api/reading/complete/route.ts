import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/admin-auth';

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

        const { bookId, completed } = await request.json();

        if (!bookId) {
            return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
        }

        if (completed) {
            const { error } = await supabase
                .from('book_completions')
                .upsert({ user_id: user.id, book_id: bookId });

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

        // Find the admin user (site owner). Assuming there's one primary admin for this site.
        // We'll fetch completions for the first admin user found.
        const { data: adminProfile } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('is_admin', true)
            .limit(1)
            .single();

        if (!adminProfile) {
            return NextResponse.json({ completions: [] });
        }

        const { data, error } = await supabase
            .from('book_completions')
            .select('book_id')
            .eq('user_id', adminProfile.id);

        if (error) throw error;

        return NextResponse.json({ completions: data.map((d: any) => d.book_id) });
    } catch (error: any) {
        console.error('Error fetching book completions:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
