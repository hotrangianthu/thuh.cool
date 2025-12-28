'use client';

import SocialIcons from './SocialIcons';
import NewsletterForm from './NewsletterForm';
import { cn } from '@/lib/utils';

interface FooterProps {
    subHeader?: string;
    className?: string;
}

export default function Footer({ subHeader = "Personal digital vault", className }: FooterProps) {
    return (
        <footer className={cn("w-full mt-auto pt-16 border-t border-white/5", className)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 w-full pb-8">
                <div className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-serif font-bold text-white/90">Ho Tran Gian Thu</p>
                        <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">{subHeader}</p>
                    </div>
                    <SocialIcons />
                </div>
                <NewsletterForm />
            </div>
        </footer>
    );
}
