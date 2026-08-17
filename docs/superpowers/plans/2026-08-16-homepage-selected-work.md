# Homepage Selected Work Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the four Selected Work cards on the homepage and add a centered All Projects pill linking to the full projects page.

**Architecture:** Keep the existing data-driven `ProjectCard` rendering in `app/page.tsx`. Change only the ordered slug list and add one existing-style `Link` below the grid, without changing project data or the full Projects page.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Node.js built-in test runner

## Global Constraints

- The homepage order must be Founder Storytelling Series, ArcAngel Pitch Comp, Truemed, then Cash Flows (Stripe Series).
- The CTA copy must be `All Projects →` and its destination must be `/projects`.
- The CTA must use the existing `font-mono` utility backed by JetBrains Mono.
- Only `app/page.tsx` may receive production changes.
- Do not push or deploy the work; keep it local for review.

---

### Task 1: Homepage Selected Work content and CTA

**Files:**
- Create: `tests/homepage-selected-work.test.mjs`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `PROJECTS: Record<string, ProjectData>` from `lib/projects.ts` and Next.js `Link` already imported by `app/page.tsx`.
- Produces: `HOME_PROJECTS` containing the four ordered slugs and one homepage link with visible text `All Projects →` and `href="/projects"`.

- [ ] **Step 1: Write the failing source-level regression tests**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');

test('homepage selected work uses the requested project order', () => {
  assert.match(
    source,
    /const HOME_PROJECTS = \['founder-storytelling', 'arcangel', 'truemed', 'cash-flows'\];/,
  );
});

test('homepage includes a monospaced All Projects pill linking to the projects page', () => {
  assert.match(source, /href="\/projects"/);
  assert.match(source, /font-mono[^"\n]*rounded-full/);
  assert.match(source, /All Projects →/);
});
```

- [ ] **Step 2: Run the regression tests and verify the requested behavior is absent**

Run: `node --test tests/homepage-selected-work.test.mjs`

Expected: both tests fail because the current order is different and the pill does not exist.

- [ ] **Step 3: Implement the requested homepage order**

Replace the existing constant in `app/page.tsx` with:

```ts
const HOME_PROJECTS = ['founder-storytelling', 'arcangel', 'truemed', 'cash-flows'];
```

- [ ] **Step 4: Add the compact All Projects pill after the card grid**

Add this immediately after the grid and before the Selected Work section's closing container:

```tsx
<motion.div {...fadeUp} className="flex justify-center mt-12 md:mt-16">
  <Link
    href="/projects"
    className="inline-flex items-center rounded-full bg-black px-6 py-3 font-mono text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80"
  >
    All Projects →
  </Link>
</motion.div>
```

- [ ] **Step 5: Run the regression tests and verify they pass**

Run: `node --test tests/homepage-selected-work.test.mjs`

Expected: 2 tests pass and 0 tests fail.

- [ ] **Step 6: Run the production build**

Run: `npm run build`

Expected: Next.js exits with status 0 and reports successful compilation.

- [ ] **Step 7: Verify behavior in the local browser**

Open `http://localhost:3000/` and confirm:

1. The four card headings appear in the required order.
2. The pill is centered below the grid and reads `All Projects →`.
3. The pill uses the site's monospaced interface font and remains legible against the sunset background.
4. The pill navigates to `http://localhost:3000/projects`.
5. Mobile and desktop layouts have comfortable spacing and no horizontal overflow.
6. The browser console contains no new errors.

- [ ] **Step 8: Leave the implementation unpushed for user review**

Do not run `git push` or any deployment command. Report the local URL and changed files to the user.
