# From Income to Assets — Flagship Project Implementation Plan

## Purpose

Build a Vietnamese-first, bilingual public-interest research platform that documents and studies how income-earning rural households in Vietnam move from irregular income toward savings, resilience, and productive asset ownership.

The initiative is intentionally described as an independent project, research initiative, and open policy notebook. It must demonstrate ongoing public-interest work without presenting targets or ordinary commercial experience as completed community impact.

## Product

- Canonical Vietnamese route: `/flagship/from-income-to-assets`
- English route: `/flagship/from-income-to-assets/en`
- Convenience redirect: `/public-policy/from-income-to-assets`
- Cross-traffic: a distinct Flagship Project entry on the main homepage and a featured project card near the top of `/public-policy`
- Landing-page sections: research question, evidence ledger, progress timeline, income-to-assets framework, sampling pathways, coverage, decision tool, methods, outputs, privacy, partner outreach, and project updates

## Participation and Research Design

Use a short screener to confirm age, rural connection, household financial decision-making, location, and respondent segment. Eligible visitors continue into a common questionnaire with dedicated modules for micro-entrepreneurs, household businesses, and smallholders.

The project supports three coordinated contribution pathways:

1. Structured household survey
2. Anonymous story with separate interview opt-in
3. Partner inquiry for cooperatives, researchers, community groups, NGOs, financial providers, and local institutions

Contact details must be stored separately from research answers. The survey must not request identification numbers, bank details, exact addresses, or exact income. Public outputs use aggregated results and disclose methodological limitations.

## Evidence and Measurement

Every metric is explicitly marked `verified`, `pending`, or `target`. Unverified historic counts must never appear as achieved results. Initial targets are nationwide outreach across the 34 current provincial-level units, 600 completed surveys, 60 interviews or stories, 15 partners, one learning session, one open decision tool, and one policy memo.

The existing six Tây Ninh conversations from March 2024 may be referenced only as pre-project grounding. The Jan 2025–present timeline remains editable and requires founder-supplied evidence before any milestone can be marked verified.

Measure recruitment and completion, representation by segment and region, tool usage, learning-session knowledge change, intended action, consented follow-up behavior, and partner feedback.

## Data, Privacy, and Operations

- Store screeners, responses, stories, contacts, and partner inquiries in protected Supabase tables with no public read access.
- Accept submissions through validated server endpoints using the service-role client, rate limiting, consent-version recording, payload limits, and bot traps.
- Provide an authenticated admin overview for funnel counts, sampling gaps, and follow-up work.
- Publish a bilingual privacy notice covering purpose, fields, consent, withdrawal, retention, and publication practices.
- Default identifiable-contact retention to 24 months, subject to legal review under Vietnam's Personal Data Protection Law No. 91/2025/QH15.

## Verification

Verify bilingual routes, screener and segment branching, consent, PII separation, API validation, RLS restrictions, admin authorization, aggregate disclosure safeguards, accessibility, reduced motion, responsive layouts, metadata, TypeScript, lint, and the production build.

Production launch requires reviewed privacy language, deployed database migration, successful end-to-end submissions, and removal or resolution of all evidence-pending placeholders.
