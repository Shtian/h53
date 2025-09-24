# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: Next.js version target, Tailwind token strategy, TypeScript strict status, Zod schema coverage, structure
2. Load optional design documents:
   → data-model.md: Extract entities → typed model tasks
   → contracts/: Each file → contract test task with Zod schemas
   → research.md: Extract decisions → setup tasks (tooling, data sources)
3. Generate tasks by category:
   → Setup: Next.js 15.5+ bootstrap, TailwindCSS 4.1+ config, linting + Conventional Commit tooling
   → Tests: contract, integration, component tests in TypeScript before implementation
   → Core: app routes, services, shared types, UI components
   → Integration: data access, environment validation, logging/observability
   → Polish: accessibility, performance, documentation, refactors
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests MUST precede implementation (TDD)
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
- **Backend companion**: `apps/api/src/`, `apps/api/tests/`
- **Shared packages**: `packages/{name}/src/`
- Paths shown below assume a single Next.js app with optional API companion

## Phase 3.1: Setup
- [ ] T001 Initialize Next.js >=15.5 project with TypeScript strict mode (`create-next-app --ts`)
- [ ] T002 Install and configure TailwindCSS >=4.1 with tokens in `tailwind.config.ts`
- [ ] T003 Add Zod v4 dependency and seed `src/lib/validation/` with shared schemas
- [ ] T004 [P] Configure ESLint, Prettier, commitlint, and CI to enforce Conventional Commits

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test POST /api/users in `tests/contract/users.post.test.ts`
- [ ] T006 [P] Contract test GET /api/users/[id] in `tests/contract/users.get.test.ts`
- [ ] T007 [P] Integration test user registration journey in `tests/integration/user-registration.spec.ts`
- [ ] T008 [P] Component test for `<UserForm />` Tailwind tokens in `tests/unit/components/UserForm.test.tsx`

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T009 [P] Define Zod schemas in `src/lib/validation/user.ts`
- [ ] T010 [P] Implement `app/api/users/route.ts` with Zod-validated handlers
- [ ] T011 [P] Build `src/services/user-service.ts` with typed domain logic
- [ ] T012 [P] Create `app/(routes)/users/page.tsx` using typed props and Tailwind tokens
- [ ] T013 Synchronize shared types in `src/lib/types.ts`

## Phase 3.4: Integration
- [ ] T014 Wire `user-service` to persistence layer (e.g., Prisma) with typed adapters
- [ ] T015 Validate environment variables in `src/lib/config.ts` using Zod v4
- [ ] T016 Instrument request logging and error tracking in `src/middleware/logging.ts`

## Phase 3.5: Polish
- [ ] T017 [P] Eliminate `any` escapes and satisfy TypeScript strict mode across changed files
- [ ] T018 [P] Execute Playwright/Lighthouse checks and capture accessibility budgets
- [ ] T019 [P] Update `docs/quickstart.md` with Next.js, TailwindCSS, Zod versions and setup steps
- [ ] T020 Confirm commit history complies with Conventional Commits before merge

## Dependencies
- Tests (T005-T008) before implementation (T009-T013)
- T009 blocks T010 and T011
- T011 blocks T014
- T015 blocks T016 when config drives logging
- Implementation before polish (T017-T020)

## Parallel Example
```
# Launch T005-T008 together:
Task: "Contract test POST /api/users in tests/contract/users.post.test.ts"
Task: "Contract test GET /api/users/[id] in tests/contract/users.get.test.ts"
Task: "Integration test user registration journey in tests/integration/user-registration.spec.ts"
Task: "Component test for <UserForm /> Tailwind tokens in tests/unit/components/UserForm.test.tsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Commit after each task using Conventional Commits
- Ensure Zod v4 validation covers every entry point (API routes, env, forms)
- Tailwind tokens live in `tailwind.config.ts` and should be reused, not duplicated

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → TypeScript contract test [P]
   - Each endpoint → Next.js route or server action task
   
2. **From Data Model**:
   - Each entity → Zod schema + service layer task [P]
   - Relationships → data access and shared type synchronization
   
3. **From User Stories**:
   - Each story → integration or e2e flow [P]
   - Quickstart scenarios → documentation and validation tasks

4. **Ordering**:
   - Setup → Tests → Schemas/services → UI/API → Integration → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All external boundaries have Zod schema tasks
- [ ] Next.js >=15.5 and TailwindCSS >=4.1 tasks included
- [ ] TypeScript strict mode enforcement task present
- [ ] Tests precede implementation
- [ ] Parallel tasks operate on different files
- [ ] Each task specifies exact file path
- [ ] Conventional Commit workflow task present
