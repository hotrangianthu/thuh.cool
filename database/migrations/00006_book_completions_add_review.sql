-- Add review column to book_completions for admin's personal review when marking complete
ALTER TABLE public.book_completions
ADD COLUMN IF NOT EXISTS review TEXT;

COMMENT ON COLUMN public.book_completions.review IS 'Admin/owner personal review shown to visitors when book is marked complete.';
