# Sa. Partners marketplace operations

The public marketplace lives at `/sa-partners`. Report metadata is maintained in
`src/data/sa-partners.ts`; source decks and full protected PDFs must never be
committed because this repository is public.

## Local source layout

- Source fleet: `private_content/sa_partners_20260601_research_fleet/`
- Generated full PDFs for manual fulfillment: `private_content/sa_partners_pdf_exports/`
- Public web assets: `public/sa-partners/reports/`

Both private directories are ignored by Git. A1 is the only report whose full
PDF and 26 slide images may appear under `public/`. Every other report must have
exactly three public slide images and no source document.

## Preparing assets

1. Install LibreOffice so the `soffice` command is available.
2. Install the local renderer:

   `python3 -m pip install --user -r scripts/requirements-sa-partners.txt`

3. Run `npm run prepare:sa-partners`.
4. Run `npm run validate:sa-partners` before committing or deploying.

The preparation command validates 37 folders and 26 slides per canonical deck,
creates a private PDF for each report, and publishes only the allowed viewer
assets. A1 duplicate/snippet files and C11 test decks are excluded explicitly.

## Database

Apply `database/migrations/00011_create_sa_partners_inquiries.sql` before using
the on-site form. The form fails closed with a direct-email fallback when the
service-role environment or table is unavailable. Inquiry records are readable
only through the authenticated admin route at `/admin/sa-partners/inquiries`.
