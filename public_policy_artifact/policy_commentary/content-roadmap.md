# Vietnam Budget Infographics — Content Roadmap

## Purpose
Define the data sourcing workflow, update cadence, and content pipeline for populating
each sector page with verified, citable budget data.

---

## 1. Official Sources to Monitor

### Primary (Ministry-level)
| Ministry / Agency | URL | Data Available |
|---|---|---|
| Ministry of Finance (MOF) | mof.gov.vn | State budget, debt bulletins, settlement reports |
| Ministry of Planning & Investment (MPI) | mpi.gov.vn | Public investment, disbursement rates, 5-year plan |
| General Statistics Office (GSO) | gso.gov.vn | GDP, sector shares, socio-economic data |
| National Assembly | quochoi.vn | Budget resolutions, approved ceilings |
| State Bank of Vietnam (SBV) | sbv.gov.vn | Monetary policy, banking sector, green finance |

### Sector-specific
| Sector | Ministry | Key Documents |
|---|---|---|
| Healthcare | MOH (moh.gov.vn) | Annual Health Report, Health Accounts (NHA) |
| Education | MOET (moet.gov.vn) | Education Statistics Yearbook |
| Infrastructure | MPI + MOT (mpit.gov.vn, mot.gov.vn) | Public Investment Monitoring Report |
| Defense | MOD (mod.gov.vn) | Limited public disclosure; use MOF budget tables |
| Agriculture | MARD (mard.gov.vn) | Agriculture Development Report |
| Environment | MONRE (monre.gov.vn) | Environment Status Report, NDC progress |
| Technology | MIC + MOST (mic.gov.vn, most.gov.vn) | Digital Vietnam Report, R&D Survey |
| Social Protection | MOLISA + VSS (molisa.gov.vn, baohiemxahoi.gov.vn) | Labor & Social Report, BHXH Annual Report |
| Debt Management | MOF Debt Dept. | Public Debt Bulletin (quarterly) |

### Multilateral Cross-checks
- World Bank Vietnam: worldbank.org/en/country/vietnam
- IMF Article IV Consultation (annual)
- ADB Vietnam: adb.org/countries/viet-nam
- SIPRI Military Expenditure Database (defense sector)
- ILO Vietnam (social protection benchmarks)

---

## 2. Update Frequency

| Document Type | Frequency | Typical Release Lag |
|---|---|---|
| State Budget Settlement | Annual | ~6 months post-year-end (June/July) |
| Mid-year Budget Review | Semi-annual | July/August |
| Public Investment Disbursement | Quarterly | ~4 weeks post-quarter |
| Public Debt Bulletin | Quarterly | ~6 weeks post-quarter |
| MOH / MOET Statistics Yearbook | Annual | Q2/Q3 following year |
| National Assembly Budget Resolution | Annual | November (pre-year approval) |
| IMF Article IV | Annual | Variable (typically Q2/Q3) |

---

## 3. Content Pipeline Process

### Phase 1: Data Collection (per sector, per cycle)
1. Check official ministry website for latest annual/quarterly release.
2. Download source document (PDF or Excel). Save to `data/raw/[sector]/[year]/`.
3. Extract key metrics into `data/sectors.json` under `key_metrics_data` field.
4. Note source URL, publication date, and document title for citation.

### Phase 2: Verification
1. Cross-check headline figure against at least one multilateral source (WB, IMF, ADB).
2. Flag discrepancies >5% for manual review.
3. Record verification status in `data/data-log.csv`.

### Phase 3: Content Authoring
1. Write 2–3 sentence policy commentary per metric (what changed, why it matters).
2. Draft infographic brief (chart type, data range, comparison benchmark).
3. Populate `metric-value` fields in sector HTML page.
4. Replace `content-placeholder` div with actual chart markup or embedded visualization.

### Phase 4: Review & Publish
1. Peer review: verify source citations are accurate.
2. Update `header-meta` in index.html with new "Updated: [Quarter] [Year]" date.
3. Commit to repo with note: `data: update [sector] [quarter] [year]`.

---

## 4. Priority Order (Q2 2026)

| Priority | Sector | Rationale |
|---|---|---|
| 1 | Debt Management | MOF Debt Bulletin Q1 2026 available now |
| 2 | Infrastructure | MPI Q1 2026 disbursement report due |
| 3 | Healthcare | MOH Annual Report 2025 expected Q2 |
| 4 | Social Protection | VSS BHXH 2025 Annual Report |
| 5 | Education | MOET Yearbook 2025 |
| 6 | Technology | MIC Digital Vietnam 2025 Report |
| 7 | Agriculture | MARD Development Report 2025 |
| 8 | Environment | MONRE + JETP 2025 progress |
| 9 | Defense | MOF budget tables (limited disclosure) |

---

## 5. File Naming Conventions

```
data/
  raw/
    [sector]/
      [yyyy]/
        [source-agency]_[document-name]_[yyyy].[ext]
  processed/
    [sector]_[yyyy]_q[q]_metrics.json
  data-log.csv        # tracks: sector, metric, value, source, date, verified_by
```

---

## 6. Publication Options

### Option A: GitLab Pages (Recommended for Grab internal)
1. Create GitLab repo in `gitlab.myteksi.net/gianthu-ho/vietnam-budget-infographics`
2. Add `.gitlab-ci.yml`:
   ```yaml
   pages:
     stage: deploy
     script:
       - mkdir .public
       - cp -r * .public
       - mv .public public
     artifacts:
       paths:
         - public
     only:
       - main
   ```
3. Push to main branch - auto-deploys to `https://gianthu-ho.pages.myteksi.net/vietnam-budget-infographics`

### Option B: GitHub Pages (Public-facing)
1. Create public repo: `github.com/giant-tran/vietnam-budget-infographics`
2. Enable GitHub Pages in Settings > Pages > Deploy from main branch
3. Accessible at `https://giant-tran.github.io/vietnam-budget-infographics`

### Option C: Vercel/Netlify (Zero-config static hosting)
1. Connect repo to Vercel/Netlify
2. Auto-deploys on push
3. Custom domain support: `vietnambudget.info` (optional)

---

## 7. Content Update Workflow

### Quarterly Update Cycle
1. **Week 1**: Download new ministry reports (MOF, MPI, sector ministries)
2. **Week 2**: Extract metrics, update `data/budget-YYYY.json`
3. **Week 3**: Update sector HTML pages with new data
4. **Week 4**: Review, verify sources, publish

### Social Distribution
- LinkedIn: Share infographic screenshots with commentary
- Twitter/X: Thread key findings with charts
- Policy circles: Share with VCCI, AmCham, think tanks

---

## 8. Next Actions

- [x] Set up web app scaffold with ECharts
- [x] Create budget data JSON structure
- [x] Build dashboard with pie/trend charts
- [x] Populate 3 sector pages (Healthcare, Education, Infrastructure)
- [ ] Set up `data/raw/` directory structure
- [ ] Download MOF Public Debt Bulletin Q1 2026
- [ ] Create `data/data-log.csv` template
- [ ] Complete remaining 6 sector pages with charts
- [ ] Deploy to GitLab Pages / GitHub Pages
- [ ] Create first LinkedIn post with infographic screenshot
