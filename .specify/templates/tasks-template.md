# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: targeted routes, Convex functions, validation flows, manual verification notes
2. Load optional design documents:
   → data-model.md: Extract entities → schema/UI state tasks
   → contracts/: Each file → implementation + documentation tasks (tests optional)
   → research.md: Extract decisions → setup or configuration tasks
   → quickstart.md: Extract manual verification steps → validation tasks
3. Generate tasks by category:
   → Setup: scaffolding, auth gating, configuration
   → Core: Convex mutations/queries, server components, client components
   → Integration: Clerk wiring, external APIs, logging hooks
   → Verification: manual walkthroughs, optional automated tests, documentation updates
   → Polish: accessibility, performance, cleanup
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Manual verification tasks follow core implementation unless prep work is required earlier
5. Number tasks sequentially (T001, T002...)
6. Generate dependency notes
7. Provide parallel execution suggestions (only independent [P] tasks)
8. Validate task completeness:
   → Auth, data flow, Tailwind, and manual verification coverage accounted for
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- Application routes live under `src/app/` (use nested segments for auth scopes).
- Shared logic resides in `src/lib/` (validation, logging, utilities).
- Convex functions and schema belong in `convex/`.
- Optional automated tests live under `tests/` (create if needed).
- Tailwind utilities belong in JSX via class names; avoid standalone CSS beyond `src/app/globals.css`.

## Phase 3.1: Setup
- [ ] T001 Confirm or scaffold authenticated route or layout modules (e.g., `src/app/(authenticated)/[feature]/page.tsx`).
- [ ] T002 [P] Update configuration or environment helpers (e.g., `src/lib/types.ts`, `.env.example`) required by the feature.
- [ ] T003 [P] Note manual verification prerequisites in `specs/[###-feature-name]/quickstart.md` (credentials, data seeding, tools).

## Phase 3.2: Core Implementation
- [ ] T004 Implement data access or utility changes (e.g., `convex/[feature].ts`, `src/lib/weather/[feature].ts`).
- [ ] T005 [P] Add or adjust Zod validation/types in `src/lib/validation/[feature].ts` (or relevant module).
- [ ] T006 Build or update server components/handlers (e.g., `src/app/layout.tsx`, route handlers) ensuring Clerk gating remains intact.
- [ ] T007 Build or update client components (e.g., `src/components/[feature]/`) with Tailwind-first styling and accessibility hooks.
- [ ] T008 Integrate logging via `src/lib/logging.ts` for key success/failure paths.

## Phase 3.3: Integration & Verification
- [ ] T009 Connect external services (e.g., weather APIs) or Convex queries as planned, handling fallbacks gracefully.
- [ ] T010 [P] Execute documented manual verification steps; update `quickstart.md` with actual outcomes and screenshots/notes.
- [ ] T011 [P] (Optional) Add automated coverage (Vitest/Playwright) when useful; record results alongside manual notes.
- [ ] T012 Update documentation artifacts (plan/README/AGENTS.md) with any changes introduced during implementation.

## Phase 3.4: Polish
- [ ] T013 Review responsive layout and accessibility (focus states, keyboard traps, ARIA) and adjust Tailwind classes as needed.
- [ ] T014 [P] Run `npm run lint` and capture status in plan/tasks log.
- [ ] T015 Remove temporary scaffolding, TODO markers, and dead code before completion.

## Dependencies
- Setup (T001–T003) precedes core implementation.
- Core implementation (T004–T008) must finish before manual verification (T010) or optional automation (T011).
- Logging (T008) should be in place before verification to observe failures.
- Documentation updates (T012) depend on completed integration steps.

## Parallel Example
```
# Example parallel block after core implementation:
Task: "T010 [P] Execute documented manual verification steps; update quickstart.md"
Task: "T011 [P] (Optional) Add automated coverage (Vitest/Playwright) when useful; record results"
Task: "T014 [P] Run `npm run lint` and capture status in plan/tasks log"
```

## Notes
- [P] tasks require independent files or workflows with no shared mutations or race conditions.
- Manual verification notes must reflect actual behavior after implementation; keep them in `quickstart.md` or plan.
- Automated tests are optional; when added, prefer Vitest for logic and Playwright for authenticated flows.
- Document any intentional public route exposure with product approval before closing tasks.

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → implementation task (and optional automation task)
   - If no contracts are needed, record rationale instead of generating tasks

2. **From Data Model**:
   - Each entity/state → implementation task ensuring validation and usage in UI/services
   - Relationships → follow-up tasks for derived or aggregated data

3. **From Manual Verification (quickstart.md)**:
   - Each step → verification task capturing expected outcome and logs
   - Failure scenarios → fallback validation tasks

4. **Ordering**:
   - Setup → Core implementation → Integration → Verification → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] Clerk authentication remains enforced for all touched routes/components
- [ ] Convex usage aligns with schema expectations (no shadow data stores)
- [ ] Tailwind-only styling confirmed (no stray CSS files)
- [ ] Manual verification tasks added and linked to quickstart/plan outputs
- [ ] Optional automated tests clearly marked (if generated)
- [ ] Tasks reference exact file paths or spec artifacts
