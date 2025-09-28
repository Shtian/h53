# Tasks: Guestbook Memory Entries

**Input**: Design documents from `/specs/003-guestbook-my-family/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Task List
- **T001 [X]** Update `convex/schema.ts` so `guestbookEntries` stores author metadata directly (e.g., `authorClerkId`, `authorName`, optional `authorImageUrl`), removes the unused `familyMemberId` reference, and keeps the `by_created` index. Regenerate Convex types after the change.
- **T002 [X]** Extend `src/lib/types.ts` and add `src/lib/validation/guestbook.ts` with updated types/Zod schemas that mirror the new schema fields and constraints (single JPEG/PNG <=10 MB, optional description). Update `src/lib/validation/index.ts` exports. Depends on: T001.
- **T003 [X]** Implement Convex functions in `convex/guestbook.ts` (`generateUploadUrl`, `list`, `create`, `update`, delete) using Clerk session identity, enforcing author-only edits/deletes, emitting structured `ctx.log` entries, and cleaning Convex storage on delete. Depends on: T001.
- **T004 [X]** Use Convex hooks/functions directly in components (no shared helper module) and ensure code paths import `api.guestbook.*` where needed. Depends on: T002, T003.
- **T005 [X]** Create `src/components/guestbook/MemoryCard.tsx` to render memories (image, formatted date, title, optional description, action menu trigger) using Tailwind + shadcn patterns. Depends on: T004.
- **T006 [X]** Refactor `src/components/guestbook/GuestbookGrid.tsx` to load real data via the new helpers, handle loading/empty/error states, and render `MemoryCard` instances; remove placeholder data. Depends on: T004, T005.
- **T007 [X]** Implement `src/app/guestbook/AddEntryButton.tsx` client component with shadcn dialog, Zod-powered form, Convex upload URL flow, validation messaging, and optimistic refresh. Depends on: T002, T003, T004.
- **T008 [X]** Implement `src/app/guestbook/EditMemoryDialog.tsx` handling edit/delete flows with confirmation UI, reusing validation + logging, and refreshing the grid after actions. Depends on: T003, T004.
- **T009 [X]** Update `src/app/guestbook/page.tsx` to compose the grid with add/edit dialogs, ensure the route stays Clerk-gated, and prefetch initial data in the server component for fast renders. Depends on: T006, T007, T008.
- **T010 [X]** Wire structured logging for UI-triggered actions (e.g., via `src/lib/logging.ts`) so create/update/delete outcomes are traceable; ensure Convex logs include storage IDs and Clerk user IDs. Depends on: T003, T007, T008.
- **T011 [X]** Run through the manual quickstart checklist (mobile upload, validation error, edit, delete, sign-out guard) and document observed results plus log references in `specs/003-guestbook-my-family/quickstart.md`. Depends on: T009, T010.
- **T012 [X]** Update design docs to reflect the “all signed-in users are family” assumption (plan.md summary, data-model author fields, contracts response shape) and capture manual verification notes. Depends on: T011.
- **T013 [P]** Run `npm run lint`, resolve any issues, and record status in `plan.md` Progress Tracking. Depends on: T011. *(Attempted via `pnpm lint`; blocked because `@rushstack/eslint-patch` fails with ESLint 9.36.0 in this environment — see run log for details.)*
- **T014** Perform final cleanup: remove TODOs, dead code, unused helpers, verify soft-deleted entries are filtered everywhere, and produce a `git status` summary for review readiness. Depends on: T012, T013. *(Pending final sign-off until lint task succeeds.)*

## Parallel Execution Guidance
```
# After Convex layer is complete (post T003):
task-agent run T005 &
task-agent run T007 &
task-agent run T008
wait

# Finishing touches:
task-agent run T012 &
task-agent run T013
wait
```

## Validation Checklist
- [ ] Clerk authentication enforced for `/guestbook` and Convex mutations
- [ ] Convex schema stores author identity without auxiliary tables
- [ ] Single-image upload flow uses Convex storage + retry messaging
- [ ] Tailwind + shadcn dialog patterns applied (no custom CSS)
- [ ] Manual verification results captured in quickstart
- [ ] Branch linted clean and ready for review
