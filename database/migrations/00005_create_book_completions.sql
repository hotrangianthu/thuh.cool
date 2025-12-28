-- Create book_completions table
CREATE TABLE IF NOT EXISTS public.book_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL, -- Format: {personaId}_{moduleIndex}_{bookIndex}
    completed_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, book_id)
);

-- Enable RLS
ALTER TABLE public.book_completions ENABLE ROW LEVEL SECURITY;

-- Policies
-- Allow anyone to view completions (public)
CREATE POLICY "Public can view completions"
    ON public.book_completions
    FOR SELECT
    TO public
    USING (true);

-- Only admins can manage (insert/update/delete) completions
CREATE POLICY "Admins can manage completions"
    ON public.book_completions
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND is_admin = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND is_admin = true
        )
    );
