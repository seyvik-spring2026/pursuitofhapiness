# Homepage Selected Work Design

## Goal

Update the homepage Selected Work section so it highlights the desired four projects in a deliberate order and gives visitors a clear path to the full projects page.

## Project order

The homepage grid will display exactly these projects:

1. Founder Storytelling Series (`founder-storytelling`)
2. ArcAngel Pitch Comp (`arcangel`)
3. Truemed (`truemed`)
4. Cash Flows (Stripe Series) (`cash-flows`)

The full Projects page is outside this change and will retain its current order and content.

## All Projects link

A centered, compact black pill will sit below the four-card grid. It will:

- Read `All Projects →`.
- Link to `/projects` using the existing Next.js `Link` component.
- Use the site's existing JetBrains Mono interface font through the `font-mono` utility.
- Use white text, fully rounded edges, and compact horizontal and vertical padding.
- Include a restrained hover treatment that lifts the pill slightly and softens the black background.
- Maintain a comfortable visual gap below the grid on mobile and desktop.

## Implementation scope

Only `app/page.tsx` needs production changes. Existing project data, card behavior, navigation, and the full Projects page remain unchanged.

## Verification

- Confirm the four homepage cards render in the specified order.
- Confirm the All Projects pill renders beneath the grid and links to `/projects`.
- Run the production build.
- Inspect the homepage in the local browser at mobile and desktop widths.
- Confirm no new browser console errors appear.

## Deployment constraint

The work remains local for review. Do not push or deploy it.
