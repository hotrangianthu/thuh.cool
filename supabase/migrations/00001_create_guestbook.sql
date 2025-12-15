-- Migration: Create guestbook table
-- Created: 2025-01-01
-- Description: Initial guestbook table for storing visitor messages

CREATE TABLE IF NOT EXISTS guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  message VARCHAR(280) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster sorting by creation date
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read guestbook entries
CREATE POLICY "Anyone can read guestbook" ON guestbook
  FOR SELECT USING (true);

-- Policy: Anyone can insert guestbook entries (public guestbook)
CREATE POLICY "Anyone can insert guestbook" ON guestbook
  FOR INSERT WITH CHECK (true);

-- Add comment for documentation
COMMENT ON TABLE guestbook IS 'Public guestbook for visitor messages';

