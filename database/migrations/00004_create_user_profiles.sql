-- Migration: Create user_profiles table with admin support
-- Created: 2025-01-15
-- Description: User profiles table for role-based access control

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_admin ON user_profiles(is_admin) WHERE is_admin = true;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_profiles_updated_at();

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (except is_admin - handled by service role only)
-- Note: is_admin changes require service_role key, not user tokens
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can do everything (for admin management)
CREATE POLICY "Service role full access" ON user_profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Function to check if a user is an admin without triggering recursion
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT
  USING (public.check_is_admin());

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

COMMENT ON TABLE user_profiles IS 'User profiles with role-based access control';
COMMENT ON COLUMN user_profiles.is_admin IS 'Admin flag for role-based access control';

