-- Migration: Sa. Partners qualified report inquiries
-- Created: 2026-08-04
-- Public submissions are accepted only through the server route using the service role.

CREATE TABLE IF NOT EXISTS sa_partner_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_slug VARCHAR(100) NOT NULL,
  report_code VARCHAR(8) NOT NULL,
  report_title VARCHAR(240) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  organization VARCHAR(160) NOT NULL,
  role VARCHAR(120) NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 20 AND 2000),
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sa_partner_inquiries_status_created
  ON sa_partner_inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sa_partner_inquiries_report
  ON sa_partner_inquiries(report_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sa_partner_inquiries_email
  ON sa_partner_inquiries(email);

CREATE OR REPLACE FUNCTION update_sa_partner_inquiry_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_sa_partner_inquiry_updated_at ON sa_partner_inquiries;
CREATE TRIGGER set_sa_partner_inquiry_updated_at
  BEFORE UPDATE ON sa_partner_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_sa_partner_inquiry_timestamp();

ALTER TABLE sa_partner_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages Sa Partners inquiries"
  ON sa_partner_inquiries FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

COMMENT ON TABLE sa_partner_inquiries IS 'Private sales inquiries for qualified Sa. Partners research access.';
