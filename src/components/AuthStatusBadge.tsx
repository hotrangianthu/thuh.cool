'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function AuthStatusBadge() {
    const [status, setStatus] = useState<'CHECKING' | 'ADMIN' | 'LOGGED_IN' | 'GUEST'>('CHECKING');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const client = createClient();
                const { data: { session } } = await client.auth.getSession();

                if (!session?.user) {
                    setStatus('GUEST');
                    return;
                }

                const { data: profile } = await client
                    .from('user_profiles')
                    .select('is_admin')
                    .eq('id', session.user.id)
                    .single();

                if (profile?.is_admin) {
                    setStatus('ADMIN');
                } else {
                    setStatus('LOGGED_IN');
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setStatus('GUEST');
            }
        };

        checkAuth();

        // Listen for auth changes
        const client = createClient();
        const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
            // Force re-check on any auth event
            checkAuth();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const getStatusText = () => {
        switch (status) {
            case 'CHECKING': return '...'; // Minimal processing state
            case 'ADMIN': return 'ADMIN';
            case 'LOGGED_IN': return 'LOGGED IN';
            case 'GUEST': return 'GUEST';
        }
    };

    // Only admins or those checking need to see something distinct
    // Guests see "GUEST" but very subtle
    const isGreen = status === 'ADMIN';

    return (
        <div className="fixed top-4 right-4 z-50 text-[10px] font-mono flex gap-3 items-center opacity-30 hover:opacity-100 transition-opacity pointer-events-none hover:pointer-events-auto">
            <span className={isGreen ? "text-green-500 font-bold" : "text-zinc-500"}>
                ● {getStatusText()}
            </span>
            {status !== 'ADMIN' && status !== 'CHECKING' && (
                <Link
                    href="/admin/login"
                    className="underline hover:text-white pointer-events-auto"
                >
                    Admin Login
                </Link>
            )}
        </div>
    );
}
