'use server'

import { revalidatePath } from 'next/cache'
import { verifyAdmin } from '@/lib/admin-auth'
import { getFlagshipAdminClient } from '@/lib/flagship-server'
import { createClient } from '@/lib/supabase-server'

const adminPath = '/admin/flagship/case-studies/binh-dinh-women-led'

async function requireAdmin() {
  const auth = await createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user || !(await verifyAdmin(user.id))) throw new Error('Unauthorized')
  return user
}

function required(formData: FormData, key: string) {
  const value = String(formData.get(key) || '').trim()
  if (!value) throw new Error(`${key} is required`)
  return value
}

function optional(formData: FormData, key: string) {
  const value = String(formData.get(key) || '').trim()
  return value || null
}

function optionalAmount(formData: FormData, key: string) {
  const value = optional(formData, key)
  if (value === null) return null
  const amount = Number(value)
  if (!Number.isFinite(amount) || amount < 0) throw new Error(`${key} must be a non-negative number`)
  return Math.round(amount)
}

export async function addFieldworkRecord(formData: FormData) {
  const user = await requireAdmin()
  const evidenceReference = optional(formData, 'evidenceReference')
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_fieldwork').insert({
    cycle_id: required(formData, 'cycleId'),
    public_code: required(formData, 'publicCode').toUpperCase(),
    occurred_on: required(formData, 'occurredOn'),
    public_location: optional(formData, 'publicLocation') || 'Bình Định',
    private_location: optional(formData, 'privateLocation'),
    participant_category: required(formData, 'participantCategory'),
    format: required(formData, 'format'),
    evidence_available: Boolean(evidenceReference),
    evidence_reference: evidenceReference,
    consent_scope: required(formData, 'consentScope'),
    anonymized_insight: optional(formData, 'anonymizedInsight'),
    follow_up_action: optional(formData, 'followUpAction'),
    public_aggregate: false,
    created_by: user.id,
  })
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function verifyFieldworkRecord(formData: FormData) {
  const user = await requireAdmin()
  const id = required(formData, 'id')
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_fieldwork').update({
    verified_at: new Date().toISOString(),
    verified_by: user.id,
    public_aggregate: true,
    updated_at: new Date().toISOString(),
  }).eq('id', id).eq('evidence_available', true)
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function addEvidenceClaim(formData: FormData) {
  const user = await requireAdmin()
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_claims').insert({
    cycle_id: required(formData, 'cycleId'),
    claim_vi: required(formData, 'claimVi'),
    claim_en: required(formData, 'claimEn'),
    source_label: required(formData, 'sourceLabel'),
    source_url: optional(formData, 'sourceUrl'),
    source_type: required(formData, 'sourceType'),
    source_year: required(formData, 'sourceYear'),
    confidence: required(formData, 'confidence'),
    competing_evidence: optional(formData, 'competingEvidence'),
    project_use: required(formData, 'projectUse'),
    verification_status: 'pending',
    public_snapshot: false,
    created_by: user.id,
  })
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function verifyEvidenceClaim(formData: FormData) {
  const user = await requireAdmin()
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_claims').update({
    verification_status: 'verified',
    reviewed_at: new Date().toISOString(),
    reviewed_by: user.id,
    updated_at: new Date().toISOString(),
  }).eq('id', required(formData, 'id'))
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function addArtifactVersion(formData: FormData) {
  const user = await requireAdmin()
  const evidenceReferences = String(formData.get('evidenceReferences') || '').split(',').map((item) => item.trim()).filter(Boolean)
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_versions').insert({
    cycle_id: required(formData, 'cycleId'),
    artifact_key: required(formData, 'artifactKey'),
    version: required(formData, 'version'),
    publication_date: required(formData, 'publicationDate'),
    revision_date: required(formData, 'revisionDate'),
    change_summary_vi: required(formData, 'changeVi'),
    change_summary_en: required(formData, 'changeEn'),
    reason_vi: required(formData, 'reasonVi'),
    reason_en: required(formData, 'reasonEn'),
    evidence_references: evidenceReferences,
    public_snapshot: false,
    created_by: user.id,
  })
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function addPilotRecord(formData: FormData) {
  const user = await requireAdmin()
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_pilot_records').insert({
    cycle_id: required(formData, 'cycleId'),
    participant_code: required(formData, 'participantCode').toUpperCase(),
    enrollment_status: required(formData, 'enrollmentStatus'),
    created_by: user.id,
  })
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function addCostItem(formData: FormData) {
  const user = await requireAdmin()
  const low = optionalAmount(formData, 'lowVnd')
  const base = optionalAmount(formData, 'baseVnd')
  const high = optionalAmount(formData, 'highVnd')
  if (low !== null && base !== null && low > base) throw new Error('Low scenario cannot exceed base')
  if (base !== null && high !== null && base > high) throw new Error('Base scenario cannot exceed high')
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_cost_items').insert({
    cycle_id: required(formData, 'cycleId'),
    cost_block: required(formData, 'costBlock'),
    classification: required(formData, 'classification'),
    source_label: required(formData, 'sourceLabel'),
    source_type: required(formData, 'sourceType'),
    source_date: required(formData, 'sourceDate'),
    low_vnd: low,
    base_vnd: base,
    high_vnd: high,
    verification_status: 'pending',
    public_snapshot: false,
    created_by: user.id,
  })
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

export async function verifyCostItem(formData: FormData) {
  const user = await requireAdmin()
  const supabase = getFlagshipAdminClient()
  const { error } = await supabase.from('flagship_case_cost_items').update({
    verification_status: 'verified',
    reviewed_at: new Date().toISOString(),
    reviewed_by: user.id,
    updated_at: new Date().toISOString(),
  }).eq('id', required(formData, 'id'))
  if (error) throw new Error(error.message)
  revalidatePath(adminPath)
}

