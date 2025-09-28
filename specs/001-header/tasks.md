# Tasks: Global Cabin Header

**Input**: Design documents from `/specs/001-header/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Task List
- [X] T001 Split header scaffolding by creating `src/components/layout/HeaderData.tsx` (server placeholder) and `src/components/layout/HeaderShell.tsx` (client placeholder) that mirrors the current markup and props wiring.
- [X] T002 [P] Add shared `WeatherSnapshot` typings and helper exports in `src/lib/weather/types.ts` (imported by both server/client layers).
- [X] T003 [P] Update `.env.example` and `specs/001-header/quickstart.md` prerequisites to mention optional `YRNO_COORDINATES` override and Clerk sign-in steps.
- [X] T004 Implement cached weather helper in `src/lib/weather/getCachedSnapshot.ts` using `fetch` revalidation (3600s) and map to `WeatherSnapshot`.
- [X] T005 [P] Adjust `src/lib/weather/fetchYrNo.ts` (or related module) to expose a safe fallback object when the upstream payload is missing fields.
- [X] T006 Update `src/components/layout/HeaderData.tsx` to fetch via the cached helper, handle fallback/error logging, and pass props to the client shell.
- [X] T007 Build interactive burger drawer logic in `src/components/layout/HeaderShell.tsx` with Tailwind classes, focus trap, shadcn buttons, dismissal handling, and `logEvent` instrumentation.
- [X] T008 Ensure `src/components/layout/Header.tsx` re-exports the new server component (or becomes a thin wrapper) and remove obsolete code.
- [X] T009 Update `src/app/layout.tsx` (and any other import sites) to use the new header export without client boundaries leaks.
- [X] T010 [P] Wire logging hooks in `src/lib/logging.ts` usages so weather fetch failures and overlay state exceptions are captured with context.
- [X] T011 [P] Execute manual verification steps in `specs/001-header/quickstart.md`, capturing outcomes/fallback screenshots and updating the doc with notes.
- [X] T012 [P] (Optional) Add automated coverage (Vitest component spec under `tests/vitest/header.spec.tsx` or Playwright flow) if desired, documenting results alongside manual notes.
- [X] T013 [P] Run `npm run lint` and record status within plan or tasks log.
- [X] T014 Remove temporary scaffolding/TODO comments across touched files and ensure dead code is cleaned up.

## Dependency Notes
- T001 precedes all subsequent work; it migrates the existing component into server/client shells.
- T002 feeds typings used by T004–T007; update prior to wiring helpers.
- T004 depends on T002 and must complete before T006.
- T005 refines helper behavior before client/server wiring (T006/T007).
- T006 and T007 must finish before re-export/integration tasks (T008–T009).
- Logging (T010) builds on the implementations from T006/T007.
- Manual/optional verification (T011–T012) can only run after T006–T010 and integration (T009).
- Lint and cleanup (T013–T014) close out the sequence.

## Parallel Execution Example
```
# After completing T009, run the independent finishing tasks in parallel:
/specify run-task T010
/specify run-task T011
/specify run-task T013
```

## Validation Checklist
- Clerk authentication remains enforced post-refactor.
- Cached weather helper returns Celsius-only values with graceful fallback.
- Burger overlay meets accessibility requirements (focus trap, ESC, logging).
- Manual verification notes in quickstart reflect actual observed behavior.
- Optional automated tests, if added, are documented and passing.
- `npm run lint` completes without new violations.
