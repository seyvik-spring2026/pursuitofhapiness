# Remove Projects GitHub Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the GitHub source link beneath the Projects grid without changing the portfolio cards.

**Architecture:** Keep the existing Projects page structure and delete only its standalone source-link motion block. Protect the user-visible result with the existing rendered-page integration test suite.

**Tech Stack:** Next.js 14, React 18, Node test runner

## Global Constraints

- Remove only the GitHub icon and “View Source on GitHub” link on `/projects`.
- Do not add a replacement element or alter project cards.

---

### Task 1: Remove the Projects source link

**Files:**
- Modify: `tests/homepage-selected-work.test.mjs`
- Modify: `app/projects/page.tsx`

**Interfaces:**
- Consumes: The server-rendered HTML response from `GET /projects`.
- Produces: A Projects page with no public repository link beneath its card grid.

- [ ] **Step 1: Write the failing rendered-page test**

Add a test that fetches `/projects` and asserts the HTML contains neither `View Source on GitHub` nor `github.com/seyvik-spring2026/pursuitofhapiness`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/homepage-selected-work.test.mjs`

Expected: FAIL because the current page renders the GitHub source link.

- [ ] **Step 3: Remove the source-link block**

Delete the `motion.div` that contains the GitHub anchor and icon from `app/projects/page.tsx`. Leave the project grid and its wrapping containers unchanged.

- [ ] **Step 4: Verify tests and production build**

Run: `node --test tests/homepage-selected-work.test.mjs tests/resume.test.mjs tests/video-fullscreen.test.mjs`

Run: `npm run build`

Expected: All tests pass and the build exits successfully.

- [ ] **Step 5: Commit and deploy**

Stage the two application/test files and the approved design/plan documents, commit the change, push `master`, deploy the exact commit to Vercel production, and verify `/projects` on the custom domain.
