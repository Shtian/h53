# Tasks: H53 Family Cabin Website

**Input**: Design documents from `/specs/001-a-website-for/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: Next.js version target, Tailwind token strategy, TypeScript strict status, Zod schema coverage, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
   → quickstart.md: Extract tooling + verification flow
3. Generate tasks by category:
   → Setup: Next.js bootstrap, Convex init, linting, auth wiring
   → Core: shared types, Convex collections, API routes, UI surfaces
   → Integration: Clerk ↔ Convex enforcement, auditing, weather cron
   → Polish: accessibility checks, docs, manual QA
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Every external boundary MUST have a Zod v4 validation task
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → Next.js >=15.5 and TailwindCSS >=4.1 tasks present?
   → TypeScript strict mode enforced?
   → Zod schemas wired to each boundary?
   → Conventional Commit workflow covered?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js app (default)**: `app/`, `src/`, `public/`, `tests/`
- **Convex backend**: `convex/`, `convex/_generated/`
- **Shared packages**: `src/lib/`, `src/components/`
- Paths shown below assume a single Next.js app backed by Convex

## Phase 3.1: Setup
- [X] T001 Bootstrap Next.js 15.5 App Router project with TypeScript strict mode (`package.json`, `tsconfig.json`, `next.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`).
- [X] T002 Add project dependencies (TailwindCSS 4.1, Convex, Clerk, Zod, Vitest, Playwright, Commitlint) and update npm scripts in `package.json` plus `.env.example` stubs.
- [X] T003 Initialize Convex project scaffolding (`convex.json`, `convex/schema.ts`, `convex/_generated/`, `.env.example` Convex keys) and add dev scripts.
- [X] T004 Configure linting, formatting, and testing tooling (`eslint.config.js`, `vitest.config.ts`, `.husky/pre-commit`, `.commitlintrc.cjs`, `playwright.config.ts`).
- [X] T005 Configure Clerk provider and middleware (`src/lib/auth/clerk.tsx`, `src/app/layout.tsx`, `middleware.ts`) with environment placeholders.

## Phase 3.2: Core Implementation
- [X] T006 Implement shared domain types and Zod schemas in `src/lib/types.ts` and `src/lib/validation/index.ts`.
- [X] T007 Define Convex data schema and indexes in `convex/schema.ts` with generated types committed.
- [X] T008 Build Convex guestbook mutations/queries with file storage enforcement in `convex/guestbook.ts`.
- [X] T009 Build Convex article mutations/queries in `convex/articles.ts` including category filters.
- [X] T010 Implement Convex weather snapshot storage plus yr.no fetch helper in `convex/weather.ts` and `src/lib/weather/fetchYrNo.ts`.
- [X] T011 Implement Next.js API routes for `/api/guestbook` and `/api/guestbook/[entryId]` in `src/app/api/guestbook/route.ts` and `src/app/api/guestbook/[entryId]/route.ts`.
- [X] T012 Implement Next.js API routes for `/api/articles` (list/detail) in `src/app/api/articles/route.ts` and `src/app/api/articles/[articleId]/route.ts`.
- [X] T013 Stitch Convex client helpers (`src/lib/convex/client.ts`, `convex/members.ts`) and ensure API handlers pass Clerk identities to mutations/queries.
- [X] T014 Build shared layout with weather header and navigation in `src/app/layout.tsx` and `src/components/layout/Header.tsx`.
- [X] T015 Build guestbook experience in `src/app/guestbook/page.tsx` with components under `src/components/guestbook/`.
- [X] T016 Build maintenance article experience in `src/app/articles/page.tsx`, `src/app/articles/[articleId]/page.tsx`, and `src/components/articles/`.

## Phase 3.3: Integration
- [ ] T018 Integrate Clerk session enforcement so only `/` and `/api/health` remain public (`middleware.ts`, middleware config, and API handlers).
- [ ] T019 Add lightweight structured logging stubs for key API routes in `src/lib/logging.ts` (or equivalent) and surface error toasts client-side.
- [ ] T020 Configure weather refresh scheduling and environment wiring (`convex/jobs/weather.ts`, `vercel.json`, `.env.example`) for 6-hour revalidation.

## Phase 3.4: Polish
- [ ] T021 [P] Perform accessibility & performance spot checks on `app/(public)/*`, capturing follow-up notes in `docs/quickstart.md`.
- [ ] T022 [P] Update README and `docs/quickstart.md` with Convex/Clerk setup steps and a manual verification checklist.

## Dependencies
- Setup (T001-T005) must complete before any implementation.
- Convex schema (T007) blocks Convex modules (T008-T010) and API routes (T011-T013).
- Weather module (T010) feeds the header component (T014) and future scheduling (T020).
- API routes (T011-T013) should finish before UI integration tasks (T014-T016) and logging (T019).

## Parallel Example
```
# After setup completes, you can run independent UI tasks together once Convex APIs are ready:
/specs/001-a-website-for$ task run T014
/specs/001-a-website-for$ task run T015
```

## Notes
- [P] tasks target distinct files; confirm no overlapping writes before parallel execution.
- Commit after each task using Conventional Commits (e.g., `feat: scaffold guestbook ui`).
- Keep Convex functions pure and validated with Zod at the boundary before mutating data.
- Coordinate environment variables centrally in `.env.example` and mirror in Vercel/Convex dashboards.

## Validation Checklist
- [ ] Zod schema tasks present for external boundaries
- [ ] Next.js >=15.5 and TailwindCSS >=4.1 setup tasks included
- [ ] TypeScript strict mode enforcement task present
- [ ] Parallel tasks operate on different files
- [ ] Each task specifies exact file path
- [ ] Conventional Commit workflow task present
