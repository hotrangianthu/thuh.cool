import { Metadata } from 'next';
import { AuthProvider } from '@/components/auth-context';
import AuthStatusBadge from '@/components/AuthStatusBadge';

export const metadata: Metadata = {
    title: '2026 Identity Roadmap | ThuH',
    description: 'A structured year of reading designed to shape a specific version of yourself. Curated book lists across 5 unique personas.',
    openGraph: {
        title: '2026 Identity Roadmap | ThuH',
        description: 'A structured year of reading designed to shape a specific version of yourself.',
        type: 'website',
    },
};

export default function ReadingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AuthStatusBadge />
            {children}
        </AuthProvider>
    );
}
