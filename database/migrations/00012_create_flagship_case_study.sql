-- Migration: Women-led household-business case study in Bình Định
-- Created: 2026-08-05
-- This schema is additive. The nationwide flagship intake tables remain unchanged.

CREATE TABLE IF NOT EXISTS flagship_case_cycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title_vi VARCHAR(240) NOT NULL,
  title_en VARCHAR(240) NOT NULL,
  public_geography_vi VARCHAR(200) NOT NULL,
  public_geography_en VARCHAR(200) NOT NULL,
  private_commune_name VARCHAR(200),
  cohort_definition TEXT NOT NULL,
  target_min SMALLINT NOT NULL CHECK (target_min > 0),
  target_max SMALLINT NOT NULL CHECK (target_max >= target_min),
  status VARCHAR(32) NOT NULL CHECK (status IN (
    'selection', 'ledger_reconstruction', 'field_research',
    'co_design', 'pilot', 'follow_up', 'complete', 'archived'
  )),
  started_on DATE NOT NULL,
  public_updated_on DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS flagship_case_fieldwork (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID NOT NULL REFERENCES flagship_case_cycles(id) ON DELETE RESTRICT,
  public_code VARCHAR(40) NOT NULL UNIQUE,
  occurred_on DATE NOT NULL,
  public_location VARCHAR(200) NOT NULL DEFAULT 'Bình Định',
  private_location VARCHAR(240),
  participant_category VARCHAR(60) NOT NULL CHECK (participant_category IN (
    'women_led_household_business', 'cooperative_member', 'womens_union_actor',
    'local_delivery_actor', 'financial_practitioner', 'policy_expert',
    'researcher', 'other'
  )),
  format VARCHAR(40) NOT NULL CHECK (format IN (
    'structured_interview', 'exploratory_conversation',
    'retrospective_recollection', 'practitioner_interview',
    'direct_observation', 'co_design_workshop'
  )),
  evidence_available BOOLEAN NOT NULL DEFAULT false,
  evidence_reference VARCHAR(500),
  consent_scope VARCHAR(32) NOT NULL CHECK (consent_scope IN (
    'not_recorded', 'private_use', 'anonymous_quote', 'attributed_quote'
  )),
  anonymized_insight TEXT,
  follow_up_action TEXT,
  public_aggregate BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CHECK (evidence_available = false OR evidence_reference IS NOT NULL),
  CHECK (public_aggregate = false OR (evidence_available = true AND verified_at IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS flagship_case_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fieldwork_id UUID NOT NULL UNIQUE REFERENCES flagship_case_fieldwork(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  contact_channel VARCHAR(200) NOT NULL,
  recontact_consent BOOLEAN NOT NULL DEFAULT false,
  consented_at TIMESTAMPTZ,
  delete_by DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '24 months')::date,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CHECK (recontact_consent = false OR consented_at IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS flagship_case_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID NOT NULL REFERENCES flagship_case_cycles(id) ON DELETE RESTRICT,
  claim_vi TEXT NOT NULL,
  claim_en TEXT NOT NULL,
  source_label VARCHAR(300) NOT NULL,
  source_url TEXT,
  source_type VARCHAR(40) NOT NULL CHECK (source_type IN (
    'primary_institutional', 'research_literature', 'fieldwork', 'mixed', 'other'
  )),
  source_year VARCHAR(20) NOT NULL,
  confidence VARCHAR(20) NOT NULL CHECK (confidence IN (
    'high', 'moderate', 'exploratory', 'contested'
  )),
  competing_evidence TEXT,
  project_use VARCHAR(200) NOT NULL,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (verification_status IN (
    'pending', 'verified', 'rejected', 'superseded'
  )),
  public_snapshot BOOLEAN NOT NULL DEFAULT false,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CHECK (public_snapshot = false OR (verification_status = 'verified' AND reviewed_at IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS flagship_case_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID NOT NULL REFERENCES flagship_case_cycles(id) ON DELETE RESTRICT,
  artifact_key VARCHAR(120) NOT NULL,
  version VARCHAR(30) NOT NULL,
  publication_date DATE NOT NULL,
  revision_date DATE NOT NULL,
  change_summary_vi TEXT NOT NULL,
  change_summary_en TEXT NOT NULL,
  reason_vi TEXT NOT NULL,
  reason_en TEXT NOT NULL,
  evidence_references TEXT[] NOT NULL DEFAULT '{}',
  public_snapshot BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (artifact_key, version)
);

CREATE TABLE IF NOT EXISTS flagship_case_pilot_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID NOT NULL REFERENCES flagship_case_cycles(id) ON DELETE RESTRICT,
  participant_code VARCHAR(40) NOT NULL UNIQUE,
  enrollment_status VARCHAR(20) NOT NULL DEFAULT 'enrolled' CHECK (enrollment_status IN (
    'enrolled', 'active', 'completed', 'withdrawn', 'lost_to_follow_up'
  )),
  baseline_completed_on DATE,
  follow_up_completed_on DATE,
  baseline_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  follow_up_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  withdrawal_reason TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS flagship_case_cost_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID NOT NULL REFERENCES flagship_case_cycles(id) ON DELETE RESTRICT,
  cost_block VARCHAR(160) NOT NULL,
  classification VARCHAR(12) NOT NULL CHECK (classification IN ('fixed', 'variable')),
  source_label VARCHAR(300) NOT NULL,
  source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('quote', 'actual', 'estimate', 'assumption')),
  source_date DATE NOT NULL,
  low_vnd NUMERIC(14, 0) CHECK (low_vnd >= 0),
  base_vnd NUMERIC(14, 0) CHECK (base_vnd >= 0),
  high_vnd NUMERIC(14, 0) CHECK (high_vnd >= 0),
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  public_snapshot BOOLEAN NOT NULL DEFAULT false,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CHECK (low_vnd IS NULL OR base_vnd IS NULL OR low_vnd <= base_vnd),
  CHECK (base_vnd IS NULL OR high_vnd IS NULL OR base_vnd <= high_vnd),
  CHECK (public_snapshot = false OR (verification_status = 'verified' AND reviewed_at IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS idx_flagship_case_fieldwork_cycle ON flagship_case_fieldwork(cycle_id, occurred_on DESC);
CREATE INDEX IF NOT EXISTS idx_flagship_case_fieldwork_format ON flagship_case_fieldwork(format);
CREATE INDEX IF NOT EXISTS idx_flagship_case_claims_status ON flagship_case_claims(cycle_id, verification_status);
CREATE INDEX IF NOT EXISTS idx_flagship_case_pilot_cycle ON flagship_case_pilot_records(cycle_id, enrollment_status);
CREATE INDEX IF NOT EXISTS idx_flagship_case_costs_cycle ON flagship_case_cost_items(cycle_id, verification_status);
CREATE INDEX IF NOT EXISTS idx_flagship_case_contacts_delete ON flagship_case_contacts(delete_by);

ALTER TABLE flagship_case_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_case_fieldwork ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_case_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_case_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_case_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_case_pilot_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE flagship_case_cost_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages flagship case cycles" ON flagship_case_cycles FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship case fieldwork" ON flagship_case_fieldwork FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship case contacts" ON flagship_case_contacts FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship case claims" ON flagship_case_claims FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship case versions" ON flagship_case_versions FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship case pilot" ON flagship_case_pilot_records FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages flagship case costs" ON flagship_case_cost_items FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

INSERT INTO flagship_case_cycles (
  slug, title_vi, title_en, public_geography_vi, public_geography_en,
  cohort_definition, target_min, target_max, status, started_on, public_updated_on
) VALUES (
  'binh-dinh-women-led-household-businesses',
  'Hộ kinh doanh do phụ nữ dẫn dắt tại Bình Định',
  'Women-led Household Businesses in Bình Định',
  'Một xã hiện hành tại Bình Định · đang lựa chọn',
  'One current commune in Bình Định · selection underway',
  'Women aged 18+ who lead a household business, receive recurring but variable business income, and participate in household financial decisions.',
  15, 20, 'ledger_reconstruction', '2025-01-01', '2026-08-05'
) ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE flagship_case_fieldwork IS 'Private auditable metadata and de-identified summaries; raw sensitive notes remain outside the public dataset.';
COMMENT ON TABLE flagship_case_contacts IS 'PII isolated from case-study research records and scheduled for deletion within 24 months by default.';
COMMENT ON TABLE flagship_case_claims IS 'Claims must be verified before export into the version-controlled public snapshot.';

