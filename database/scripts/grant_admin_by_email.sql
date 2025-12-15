-- Alternative: Grant admin by email (if user already has profile)
-- This updates existing user_profiles record

UPDATE public.user_profiles
SET 
  is_admin = true,
  updated_at = NOW()
WHERE email = 'htgt52hz@gmail.com';

-- Verify the update
SELECT 
  id,
  email,
  is_admin,
  created_at,
  updated_at
FROM public.user_profiles
WHERE email = 'htgt52hz@gmail.com';

