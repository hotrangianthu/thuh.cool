-- Script to grant admin access to a specific user
-- Usage: Run this in Supabase SQL Editor after user has signed up
-- Replace 'htgt52hz@gmail.com' with the actual admin email

-- First, ensure the user_profiles table exists and user has a profile
-- If user doesn't have a profile yet, create one
INSERT INTO public.user_profiles (id, email, is_admin)
SELECT 
  au.id,
  au.email,
  true as is_admin
FROM auth.users au
WHERE au.email = 'htgt52hz@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET 
  is_admin = true,
  updated_at = NOW();

-- Verify the update
SELECT 
  id,
  email,
  is_admin,
  created_at,
  updated_at
FROM public.user_profiles
WHERE email = 'htgt52hz@gmail.com';

