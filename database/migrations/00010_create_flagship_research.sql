-- Migration: From Income to Assets research intake
-- Created: 2026-08-04
-- Public submissions are accepted only through server routes using the service role.

CREATE TABLE IF NOT EXISTS flagship_screenings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('vi', 'en')),
  province VARCHAR(100) NOT NULL,
  primary_segment VARCHAR(40) NOT NULL CHECK (primary_segment IN ('micro_entrepreneur', 'household_business', 'smallholder')),
  adult_confirmed BOOLEAN NOT NULL,
  rural_confirmed BOOLEAN NOT NULL,
  decision_maker_confirmed BOOLEAN NOT NULL,
  eligible BOOLEAN NOT NULL,
  consent_version VARCHAR(40) NOT NULL,
  consented_at TIMESTAMPTZ NOT NULL,
  outreach_source VARCHAR(80) NOT NULL DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS flagship_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  screening_id UUID NOT NULL UNIQUE REFERENCES flagship_screenings(id) ON DELETE RESTRICT,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('vi', 'en')),
  province VARCHAR(100) NOT NULL,
  primary_segment VARCHAR(40) NOT NULL CHECK (primary_segment IN ('micro_entrepreneur', 'household_business', 'smallholder')),
  income_stability VARCHAR(160) NOT NULL,
  saving_frequency VARCHAR(160) NOT NULL,
  shock_capacity VARCHAR(160) NOT NULL,
  top_barrier VARCHAR(160) NOT NULL,
  priority_asset VARCHAR(160) NOT NULL,
  segment_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  schema_version SMALLINT NOT NULL DEFAULT 1,
  completed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS flagship_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('vi', 'en')),
  province VARCHAR(100) NOT NULL,
  primary_segment VARCHAR(40) NOT NULL CHECK (primary_segment IN ('micro_entrepreneur', 'household_business', 'smallholder')),
  story TEXT NOT NULL CHECK (char_length(story) BETWEEN 40 AND 3000),
  quote_consent BOOLEAN NOT NULL DEFAULT false,
  consent_version VARCHAR(40) NOT NULL,
  consented_at TIMESTAMPTZ NOT NULL,
  outreach_source VARCHAR(80) NOT NULL DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS flagship_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES flagship_responses(id) ON DELETE CASCADE,
  story_id UUID REFERENCES flagship_stories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  contact_channel VARCHAR(180) NOT NULL,
  followup_consent BOOLEAN NOT NULL DEFAULT false,
  consented_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CHECK ((response_id IS NOT NULL)::int + (story_id IS NOT NULL)::int = 1)
);

CREATE TABLE IF NOT EXISTS flagship_partner_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('vi', 'en')),
  organization VARCHAR(160) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  role VARCHAR(120) NOT NULL,
  contact_channel VARCHAR(180) NOT NULL,
  support TEXT NOT NULL CHECK (char_length(support) BETWEEN 20 AND 2000),
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'active', 'closed')),
  consent_version VARCHAR(40) NOT NULL,
  consented_at TIMESTAMPTZ NOT NULL,
  outreach_source VARCHAR(80) NOT NULL DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS flagship_business_referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('vi', 'en')),
  referrer_name VARCHAR(100) NOT NULL,
  referrer_contact VARCHAR(180) NOT NULL,
  referrer_relationship VARCHAR(40) NOT NULL CHECK (referrer_relationship IN (
    'owner_member', 'employee', 'customer_supplier', 'community_member',
    'professional', 'know_personally', 'do_not_know_directly', 'other'
  )),
  entity_name VARCHAR(160) NOT NULL,
  entity_type VARCHAR(40) NOT NULL CHECK (entity_type IN (
    'business', 'cooperative', 'household_group', 'community_organization', 'other'
  )),
  province VARCHAR(100) NOT NULL,
  referral_reason TEXT NOT NULL CHECK (char_length(referral_reason) BETWEEN 40 AND 2000),
  contact_permission VARCHAR(40) NOT NULL CHECK (contact_permission IN (
    'not_shared', 'public_business_contact', 'shared_with_permission'
  )),
  referred_contact_name VARCHAR(100),
  referred_contact_channel VARCHAR(180),
  contact_source VARCHAR(300),
  permission_confirmed BOOLEAN NOT NULL DEFAULT false,
  connection_preference VARCHAR(40) NOT NULL CHECK (connection_preference IN (
    'contact_referrer', 'referrer_introduces', 'project_contacts_entity'
  )),
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'contacted', 'connected', 'closed')),
  consent_version VARCHAR(40) NOT NULL,
  referrer_consented_at TIMESTAMPTZ NOT NULL,
  outreach_source VARCHAR(80) NOT NULL DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CHECK (
    (contact_permission = 'not_shared' AND referred_contact_name IS NULL AND referred_contact_channel IS NULL AND contact_source IS NULL AND permission_confirmed = false)
    OR (contact_permission = 'public_business_contact' AND referred_contact_channel IS NOT NULL AND contact_source IS NOT NULL AND permission_confirmed = false)
    OR (contact_permission = 'shared_with_permission' AND referred_contact_channel IS NOT NULL AND permission_confirmed = true)
  ),
  CHECK (connection_preference <> 'project_contacts_entity' OR contact_permission <> 'not_shared')
);

CREATE INDEX IF NOT EXISTS idx_flagship_screenings_created ON flagship_screenings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_flagship_screenings_province ON flagship_screenings(province);
CREATE INDEX IF NOT EXISTS idx_flagship_responses_segment ON flagship_responses(primary_segment);
CREATE INDEX IF NOT EXISTS idx_flagship_responses_province ON flagship_responses(province);
CREATE INDEX IF NOT EXISTS idx_flagship_stories_created ON flagship_stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_flagship_partners_status ON flagship_partner_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_flagship_referrals_status ON flagship_business_referrals(status);
CREATE INDEX IF NOT EXISTS idx_flagship_referrals_province ON flagship_business_referrals(province);
CREATE INDEX IF NOT EXISTS idx_flagship_referrals_entity_type ON flagship_business_referrals(entity_type);

ALTER TABLE flagship_screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_partner_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_business_referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages flagship screenings" ON flagship_screenings FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship responses" ON flagship_responses FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship stories" ON flagship_stories FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship contacts" ON flagship_contacts FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship partner inquiries" ON flagship_partner_inquiries FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship business referrals" ON flagship_business_referrals FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

COMMENT ON TABLE flagship_contacts IS 'PII isolated from research answers; retain for no more than 24 months by default.';
COMMENT ON TABLE flagship_responses IS 'Structured From Income to Assets research responses; contains no direct identifiers.';
COMMENT ON TABLE flagship_business_referrals IS 'Introductions to relevant businesses and community groups. Contact permission records the referrer statement and does not constitute research consent by the referred party.';
