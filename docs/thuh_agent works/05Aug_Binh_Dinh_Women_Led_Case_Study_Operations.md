# Bình Định Women-led Household-business Case Study — Operations

## Architecture

The nationwide `From Income to Assets` project remains the main flagship and retains its existing public intake, decision tool, evidence record, and API workflow. A persistent project-track navigation adds a narrower, read-only case study without replacing or deleting the nationwide work.

- Vietnamese: `/flagship/from-income-to-assets/women-led-household-businesses`
- English: `/flagship/from-income-to-assets/en/women-led-household-businesses`
- Supporting records in each language: `/methods`, `/evidence`, `/pilot`, and `/learning-log`

The first cohort is 15–20 women-led household businesses or cooperative members in one current commune in Bình Định. Until a commune has been selected and disclosure reviewed, the public geography remains “selection underway.” Recruitment is offline through one cooperative, Women’s Union group, or trusted local household-business network. The case-study route has no public application or contact mechanism.

## Public record

The public pages are generated from the version-controlled snapshot in `src/data/flagship-case-study.ts`. They do not query live research tables or expose live totals. Empty, unverified measures display “Not yet verified.”

The evidence-ledger and pilot-cost CSV routes use the same snapshot as the public pages, so page and download values cannot drift independently. Only reviewed claims and sourced costs should be promoted into that file through a reviewed code change.

## Private research operations

Apply `database/migrations/00012_create_flagship_case_study.sql` separately from the legacy aggregate migration. It creates isolated service-role-only tables for:

- research cycles;
- de-identified fieldwork records;
- separately stored participant contacts;
- evidence claims and source review;
- artifact versions;
- pseudonymous pilot records; and
- sourced pilot costs.

No nationwide flagship table is altered. Contact information is isolated from the research record and has a default deletion date within 24 months. Raw notes should stay outside public exports; the database stores only an opaque evidence reference and an anonymized insight.

The authenticated admin workspace is at `/admin/flagship/case-studies/binh-dinh-women-led`. Admins can classify fieldwork, record sources and costs, verify disclosure-safe evidence, maintain pseudonymous pilot enrollment, and register artifact versions.

## Publication gate

1. Confirm the fieldwork format, evidence reference, and consent scope.
2. Remove identifying detail from any insight proposed for publication.
3. Mark eligible records, claims, or costs verified in the admin workspace.
4. Download the protected review bundle from `/api/admin/flagship/case-study/export`.
5. Reconcile the bundle to the private ledger and consent record.
6. Promote only approved aggregates, claims, and cost values into `src/data/flagship-case-study.ts`.
7. Add a bilingual version-log entry with the date, reason, and evidence references.
8. Run `npx tsc --noEmit`, `npm run build`, and `git diff --check` before publication.

The review bundle intentionally omits contacts, private locations, raw notes, pilot participant codes, and baseline/follow-up response payloads. A short exploratory pilot may report usability, comprehension, short-term behavior, delivery feasibility, and participant feedback. It may not claim causal impact, poverty reduction, long-term asset growth, or province/nationwide representativeness.
