-- Migration: Create newsletter subscribers table
-- Created: 2025-01-01
-- Description: Store newsletter email subscriptions

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  unsubscribed_at TIMESTAMPTZ
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users (admin) can read subscribers
-- For now, we'll use service role key for backend operations
CREATE POLICY "Service role can manage newsletter" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

-- Policy: Anyone can subscribe (insert only, no read of others' emails)
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Add comment for documentation
COMMENT ON TABLE newsletter_subscribers IS 'Email subscribers for newsletter';

