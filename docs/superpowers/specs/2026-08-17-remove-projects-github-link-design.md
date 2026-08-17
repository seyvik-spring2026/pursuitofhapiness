# Remove Projects GitHub Link Design

## Goal

Remove only the GitHub icon and “View Source on GitHub” link shown beneath the project cards on the Projects page.

## Scope

- Delete the complete source-code link block from `/projects`.
- Preserve the project cards, their order, links, motion, and surrounding page styling.
- Do not add a replacement footer or call to action.

## Verification

- A rendered-page regression test confirms `/projects` no longer exposes the source link or repository URL.
- Existing project-page tests continue to pass.
- The production build succeeds, and the deployed Projects page is checked in the browser.
