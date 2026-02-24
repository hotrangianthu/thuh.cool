-- Add rating column (1-5 stars) for admin's book rating when marked complete
ALTER TABLE public.book_completions
ADD COLUMN IF NOT EXISTS rating SMALLINT CHECK (rating >= 1 AND rating <= 5);

COMMENT ON COLUMN public.book_completions.rating IS 'Admin 1-5 star rating for completed books.';
