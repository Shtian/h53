# Quickstart Manual Verification: Complete the Articles Page

## Prerequisites
- Clerk credentials for a member account.
- Local markdown files committed under `content/articles`.
- Development server running via `pnpm dev` (or production build using `pnpm build && pnpm start`).

## Checklist
1. **Authenticate and navigate**
   - Sign in through Clerk.
   - Open `/articles` and confirm the page loads without network fetch spinners.
2. **Listing presentation**
   - Verify cards render in manual `order` sequence with title + publish date (and summary when provided).
   - Confirm typography and spacing match Tailwind `prose` defaults (inspect for headings, lists, and links if present in summaries/body excerpts).
3. **Article detail view**
   - Click a card; confirm the detail route renders the markdown body with `prose prose-invert` styling and the back link returns to the listing.
4. **Weather fallback behavior**
   - Temporarily force `getCachedWeatherSnapshot` to throw or return `null`; reload `/articles` and confirm the header shows an error icon with popover text explaining weather unavailability.
5. **Empty-state experience**
   - Temporarily move markdown files out of `content/articles`; reload `/articles` and confirm the empty-state card with homepage link appears.
6. **Build failure guard**
   - Introduce an invalid markdown file missing `title` or with unreadable contents; run `pnpm build` and confirm the build fails with a descriptive error pointing to the offending file.
7. **Logging sanity**
   - Trigger a weather failure and confirm a log entry is emitted through `src/lib/logging.ts` (dev console or log sink).

## Sign-off
All checklist items must pass before merging. Document the verification date, tester initials, and lint status within the implementation PR notes.

## Verification Log
- 2025-09-28 – Developer walkthrough via static inspection. Article listing/detail verified against generated HTML output; weather fallback inspected in code. `pnpm build` blocked by offline font fetching, so cabin team should rerun build with network access before release.
