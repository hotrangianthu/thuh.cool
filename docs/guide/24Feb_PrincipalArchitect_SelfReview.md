# Principal Architect Self-Review: ThuH Admin API Fixes

**Reviewer stance:** Chief Principal Architect Engineer  
**Scope:** Code changes against plan, expected outcomes, ThuH web performance  
**Date:** 24 Feb 2026  

---

## 1. Plan Compliance Summary

| Task | Plan Requirement | Implementation | Status |
|------|------------------|----------------|--------|
| Task 1 | POST /api/admin/posts, verifyAdmin, insert server-side | Created route, matches spec | DONE |
| Task 2 | Replace direct insert with fetch, 30s timeout, setLoading in finally | Implemented | DONE |
| Task 3 | credentials: 'include', verify GET select chain | Both done | DONE |
| Task 4 | Replace alert with inline error UI | Both New Post and Reading pages | DONE |

**Plan gaps not implemented:**
- Task 3: "Optionally add client-side retry if 403" — not done
- Task 4: "Log API errors with request/response context" — only `console.error(err)`, no request/response metadata

---

## 2. Architectural Assessment

### 2.1 Post Creation Flow

**Improvement delivered:** Moving from browser→Supabase to browser→API→Supabase removes the "Creating..." hang by:
1. Server-side Supabase (better connection, no RLS edge cases from stale client session)
2. AbortController timeout (30s) — UI recovers even if backend hangs
3. Inline error surface — user sees failure instead of stuck state

**Remaining risk:** Large payloads (base64 images from TipTap) still flow through the API. Next.js body parser default is ~1MB; Vercel serverless request size limit ~4.5MB. A post with multiple embedded base64 charts (as in the screenshot) can exceed this and cause 413 or silent failure.

**Recommendation:** Add Content-Length guard in API or document max post size. Consider image upload to storage (e.g. Supabase Storage) and replace base64 with URLs in content before save.

### 2.2 Reading Completion Flow

**Improvement delivered:**  
- `credentials: 'include'` ensures session cookies reach the route handler  
- Inline error when toggle fails (403/401/500)  
- Better logging on failure  

**Observation:** GET `/api/reading/complete` does not require auth. It finds "first admin" in `user_profiles` and returns their completions. This works for single-admin ThuH but is brittle if multiple admins exist (arbitrary choice of "first").

### 2.3 Auth Pattern Duplication

Reading page uses two auth sources:
1. `useAuth()` → `profile?.is_admin`
2. Direct Supabase check → `manualAdminCheck`

Both run on mount. This adds latency and two sources of truth. The manual check exists to handle "new tabs" where AuthProvider may not have hydrated. Acceptable for now; consider consolidating if more admin-gated features are added.

---

## 3. Performance Analysis

### 3.1 New Post Page

| Aspect | Current | Impact |
|--------|---------|--------|
| Categories load | `useEffect` + Supabase client on mount | Extra client roundtrip; could be server-fetched and passed as props |
| Submit payload | Full HTML + optional base64 | Large JSON can slow parse/stringify; streaming not used |
| Timeout | 30s | Reasonable; user gets feedback if backend stalls |

**Recommendation:** Categories could be fetched in a server component/layout and passed to `NewPostPage` to shave one roundtrip.

### 3.2 Reading Page

| Aspect | Current | Impact |
|--------|---------|--------|
| curriculumData | Static import (~400+ lines) | Bundled in page JS; consider dynamic import if tree-shaking does not isolate |
| Completions fetch | 5s timeout, credentials | Appropriate |
| Two auth checks | Parallel (auth + completions) | Slight overhead; completions do not block on auth for display |

**Recommendation:** Remove `console.log` calls (DIRECT AUTH CHECK) before production — they add noise and minor perf cost.

### 3.3 API Routes

- No explicit caching headers (Cache-Control) on GET `/api/reading/complete`. Completions change infrequently; short-lived cache (e.g. 60s) could reduce load for visitors.
- POST routes correctly use no-store semantics.

---

## 4. Security Review

### 4.1 Input Validation

**POST /api/admin/posts:**
- `title`, `slug` — presence only; no length or format validation
- `slug` — could allow unusual characters; recommend alphanumeric + hyphens
- `status` — accepts any string; should be restricted to `'draft' | 'published'`
- `content` — raw HTML stored; rendered with `dangerouslySetInnerHTML` on `/writing/[slug]` — **XSS risk** if content is ever editable by non-trusted parties

For single-admin ThuH, risk is low but worth documenting. Consider:
- DOMPurify (or similar) on stored HTML before render
- Stricter status validation in API

### 4.2 Error Leakage

500 handler returns `error.message`, which can expose internal details (e.g. DB constraint names). Prefer generic message for 500; log full error server-side only.

---

## 5. Resilience and UX

| Scenario | Handling |
|----------|----------|
| Network timeout | AbortController aborts fetch; error banner shown; loading resets |
| 401/403 | Error message surfaced; user can retry or re-auth |
| Supabase down | 500; generic error; no silent hang |
| Duplicate slug | Supabase unique constraint; error returned; message may be technical |

**Good:** No more indefinite "Creating..." state. User always gets feedback.

---

## 6. Technical Debt

1. **Debug logs:** `console.log('DIRECT AUTH CHECK - ...')` in Reading page — remove or guard with `process.env.NODE_ENV === 'development'`
2. **Supabase client alias:** `supabase-server` exports `createClient = createServerClient`; reading/complete uses `createServerClient`; admin/posts uses `createClient`. Inconsistent but functionally equivalent.
3. **Unused variable:** `authStatus` in Reading page is computed but not used in JSX (likely leftover from earlier UI)

---

## 7. Verdict and Recommendations

### Summary

The implementation meets the plan’s main goals:
- Post creation no longer hangs indefinitely
- Reading completion has better error handling and credential handling
- Inline errors replace alerts

### Priority Fixes (Before Production)

1. **Remove debug `console.log`** from Reading page (lines 33, 42)
2. **Validate `status`** in POST /api/admin/posts: only allow `'draft' | 'published'`
3. **Stricter slug validation** (e.g. `/^[a-z0-9-]+$/`) to avoid invalid URLs

### Future Improvements

1. **Payload size:** Document or enforce max post size; consider external image storage for rich content
2. **Caching:** Add `Cache-Control: private, max-age=60` to GET `/api/reading/complete` for public visitors
3. **Categories:** Server-fetch categories for New Post page to avoid client roundtrip
4. **XSS:** Sanitize post HTML before storing or before render on `/writing/[slug]`

---

*Self-review complete. Implementation is production-viable with minor hardening.*
