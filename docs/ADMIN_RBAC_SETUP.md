# Admin Role-Based Access Control (RBAC) Setup Guide

This guide explains how to set up and use the admin RBAC system for `thuh.cool`.

## Overview

The admin system uses role-based access control (RBAC) to restrict admin access to authorized users only. All authenticated users can sign in with Google OAuth, but only users with `is_admin = true` in the `user_profiles` table can access the admin interface.

## Setup Steps

### 1. Run Database Migration

Run the user_profiles migration in your Supabase SQL Editor:

**Option A: Run individual migration**
```sql
-- Copy and paste the contents of:
-- database/migrations/00004_create_user_profiles.sql
```

**Option B: Run all migrations**
```sql
-- Copy and paste the contents of:
-- database/migrations/all_migrations.sql
```

This will:
- Create the `user_profiles` table with `is_admin` column
- Set up Row Level Security (RLS) policies
- Create a trigger to automatically create profiles when users sign up

### 2. Grant Admin Access

After a user has signed up with Google OAuth, grant them admin access:

**Option A: Grant by email (recommended)**
```sql
-- Run in Supabase SQL Editor:
-- database/scripts/grant_admin_by_email.sql

-- Or manually:
UPDATE public.user_profiles
SET 
  is_admin = true,
  updated_at = NOW()
WHERE email = 'htgt52hz@gmail.com';
```

**Option B: Grant during profile creation**
```sql
-- Run in Supabase SQL Editor:
-- database/scripts/grant_admin.sql

-- This will create the profile if it doesn't exist and set is_admin = true
```

### 3. Verify Admin Status

Check if admin access was granted correctly:

```sql
SELECT 
  id,
  email,
  is_admin,
  created_at,
  updated_at
FROM public.user_profiles
WHERE email = 'htgt52hz@gmail.com';
```

You should see `is_admin = true`.

### 4. Environment Variables

Ensure you have the following environment variables set:

```env
# Required for admin verification
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Already configured
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Where to find the Service Role Key:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the "service_role" key (keep this secret!)
3. Add it to your `.env.local` file (for local dev) or Vercel/Cloudflare environment variables (for production)

## How It Works

### Authentication Flow

1. **User signs in** with Google OAuth at `/admin/login`
2. **Supabase creates** a user in `auth.users` table
3. **Trigger automatically creates** a profile in `user_profiles` table with `is_admin = false`
4. **Middleware checks** if user is authenticated AND has `is_admin = true`
5. **If admin**: User can access `/admin` routes
6. **If not admin**: User is redirected to homepage with error

### Security Layers

1. **Middleware** (`src/middleware.ts`): Checks admin status before allowing access to `/admin` routes
2. **API Routes** (`src/app/api/admin/**`): Verifies admin status for all admin API operations
3. **Database RLS**: Row Level Security policies prevent users from modifying their own `is_admin` flag

## Managing Admin Users

### Grant Admin Access

```sql
UPDATE public.user_profiles
SET is_admin = true, updated_at = NOW()
WHERE email = 'user@example.com';
```

### Revoke Admin Access

```sql
UPDATE public.user_profiles
SET is_admin = false, updated_at = NOW()
WHERE email = 'user@example.com';
```

### List All Admins

```sql
SELECT id, email, full_name, created_at
FROM public.user_profiles
WHERE is_admin = true
ORDER BY created_at;
```

## Troubleshooting

### "Forbidden" error when accessing admin

**Cause**: User is authenticated but doesn't have `is_admin = true`

**Solution**: 
1. Check if user profile exists: `SELECT * FROM user_profiles WHERE email = 'user@example.com';`
2. If profile doesn't exist, the trigger should create it on next sign-in
3. Grant admin access using the SQL scripts above

### "SUPABASE_SERVICE_ROLE_KEY not configured" error

**Cause**: Missing environment variable

**Solution**:
1. Add `SUPABASE_SERVICE_ROLE_KEY` to your environment variables
2. Restart your development server or redeploy

### User profile not created automatically

**Cause**: Trigger might not be set up correctly

**Solution**:
1. Check if trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
2. Re-run the migration to recreate the trigger
3. Manually create profile if needed:
   ```sql
   INSERT INTO public.user_profiles (id, email, is_admin)
   SELECT id, email, false
   FROM auth.users
   WHERE email = 'user@example.com'
   ON CONFLICT (id) DO NOTHING;
   ```

## Security Notes

- **Never expose** `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- **Only use** service role key in server-side code (middleware, API routes)
- **Regular users** cannot modify their own `is_admin` flag (enforced by RLS)
- **Admin verification** happens on every request to ensure security

## Files Modified

- `src/middleware.ts` - Added admin verification
- `src/lib/admin-auth.ts` - New admin verification utility
- `src/app/api/admin/posts/[id]/route.ts` - Added admin checks to API routes
- `database/migrations/00004_create_user_profiles.sql` - New migration
- `database/scripts/grant_admin.sql` - Admin grant script
- `database/scripts/grant_admin_by_email.sql` - Admin grant by email script

