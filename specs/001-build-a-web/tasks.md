# Tasks: H53 Family Cabin Portal

**Input**: Design documents from `/specs/001-build-a-web/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Phase 3.1: Setup
- [x] T001 Establish pnpm workspace scaffolding (`package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.gitignore`) at repo root.
- [x] T002 Scaffold Next.js 15 App Router app with Tailwind + shadcn config in `apps/web` and register workspace scripts.
- [x] T003 Initialize Convex project under `apps/convex/` with generated client/server stubs and env wiring.
- [x] T004 Create package skeletons (`package.json`, tsconfig, entrypoints) for `packages/h53-core`, `packages/h53-convex`, and `packages/h53-cli`.
- [x] T005 Configure tooling: add `biome.json`, `vitest.config.ts`, `playwright.config.ts`, and npm scripts for lint/test in root `package.json`.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T006 [P] Author MSW-backed contract test for GET /session in `tests/contract/session.contract.test.ts`.
- [ ] T007 [P] Author contract test for GET /album (list) in `tests/contract/album-list.contract.test.ts`.
- [ ] T008 [P] Author contract test for GET /album/{id} in `tests/contract/album-detail.contract.test.ts`.
- [ ] T009 [P] Author contract test for GET /handbook in `tests/contract/handbook-list.contract.test.ts`.
- [ ] T010 [P] Author contract test for GET /handbook/{slug} in `tests/contract/handbook-detail.contract.test.ts`.
- [ ] T011 [P] Author contract test for GET /audit-logs in `tests/contract/audit-logs.contract.test.ts`.
- [ ] T012 [P] Add CLI contract test validating `sync-content` JSON/human output in `tests/contract/cli/sync-content.contract.test.ts`.
- [ ] T013 [P] Add CLI contract test for `export-logs` pagination + correlation IDs in `tests/contract/cli/export-logs.contract.test.ts`.
- [ ] T014 [P] Script Playwright flow for Clerk login → album browsing in `tests/integration/portal-album.spec.ts`.
- [ ] T015 [P] Script Playwright flow for handbook navigation + offline cache validation in `tests/integration/portal-handbook-offline.spec.ts`.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T016 [P] Implement `packages/h53-core/src/family-member.ts` types + zod validators.
- [ ] T017 [P] Implement `packages/h53-core/src/album-entry.ts` types + validation helpers.
- [ ] T018 [P] Implement `packages/h53-core/src/handbook-article.ts` types + content metadata mappers.
- [ ] T019 [P] Implement `packages/h53-core/src/audit-log.ts` types + event factories.
- [ ] T020 Define Convex schema, indexes, and role guards in `apps/convex/convex/schema.ts`.
- [ ] T021 [P] Implement family member queries/mutations in `packages/h53-convex/src/family.ts`.
- [ ] T022 [P] Implement album queries/mutations + UploadThing policies in `packages/h53-convex/src/album.ts`.
- [ ] T023 [P] Implement handbook queries/mutations + markdown compilation in `packages/h53-convex/src/handbook.ts`.
- [ ] T024 [P] Implement audit log writers/readers in `packages/h53-convex/src/audit-log.ts`.
- [ ] T025 Implement CLI command `seed-admin` with Clerk/Convex integration in `packages/h53-cli/src/commands/seed-admin.ts`.
- [ ] T026 Implement CLI command `sync-content` (Markdown ingest + UploadThing assets) in `packages/h53-cli/src/commands/sync-content.ts`.
- [ ] T027 Implement CLI command `export-logs` with JSON/human serializers in `packages/h53-cli/src/commands/export-logs.ts`.
- [ ] T028 [P] Implement Clerk-aware `/app/api/session/route.ts` handler delegating to Convex.
- [ ] T029 [P] Implement `/app/api/album/route.ts` handler (sorting + paging) for list endpoint.
- [ ] T030 [P] Implement `/app/api/album/[id]/route.ts` handler including 404 + archived behavior.
- [ ] T031 [P] Implement `/app/api/handbook/route.ts` handler returning summaries.
- [ ] T032 [P] Implement `/app/api/handbook/[slug]/route.ts` handler returning full article + cache headers.
- [ ] T033 [P] Implement `/app/api/audit-logs/route.ts` handler enforcing `content_admin` role.
- [ ] T034 Build Clerk provider shell + navigation layout in `apps/web/app/layout.tsx` and `apps/web/app/(portal)/page.tsx`.
- [ ] T035 Build album listing UI with shadcn cards & sorting toggle in `apps/web/app/(portal)/album/page.tsx`.
- [ ] T036 Build album detail route with responsive UploadThing image and metadata timeline in `apps/web/app/(portal)/album/[id]/page.tsx`.
- [ ] T037 Build handbook index page with searchable list in `apps/web/app/(portal)/handbook/page.tsx`.
- [ ] T038 Build handbook article page with markdown rendering + offline hint in `apps/web/app/(portal)/handbook/[slug]/page.tsx`.
- [ ] T039 Build admin upload UI integrating UploadThing dropzone + role gate in `apps/web/app/(admin)/upload/page.tsx`.

## Phase 3.4: Integration
- [ ] T040 Wire UploadThing server handlers + file router in `infrastructure/uploadthing/handlers.ts` and register in `apps/web/app/api/uploadthing/core.ts`.
- [ ] T041 Add structured logging + audit log pipeline (Pino transport + Convex writes) in `packages/h53-convex/src/logging.ts` and `apps/web/middleware.ts`.
- [ ] T042 Implement service worker + Next-PWA config for handbook offline cache (`apps/web/next.config.mjs`, `apps/web/public/sw.js`).
- [ ] T043 Connect Playwright + Vitest CI workflows in `.github/workflows/ci.yml` to enforce TDD + lint + contract suites.

## Phase 3.5: Polish
- [ ] T044 [P] Add unit tests for core validators in `tests/unit/h53-core.spec.ts`.
- [ ] T045 [P] Add CLI snapshot/fixture tests in `tests/unit/h53-cli.spec.ts`.
- [ ] T046 [P] Document runbooks & environment setup in `docs/h53-portal.md`.
- [ ] T047 Run Lighthouse/Playwright performance + accessibility checks and capture report in `docs/h53-portal-metrics.md`.

## Dependencies
- T001 → T002-T005 (workspace before app/package scaffolds).
- T002-T005 → T006-T015 (tests require project skeleton).
- T006-T015 → T016-T047 (implementation waits for failing tests).
- T020 precedes T021-T024 (schema before Convex modules).
- T021-T027 precede API route handlers (T028-T033) and frontend tasks (T034-T039).
- Integration tasks (T040-T043) depend on core implementation completion.
- Polish tasks (T044-T047) execute after all functional work is merged.

## Parallel Execution Example
```
# Launch contract and integration tests in parallel once setup completes:
codex task-run T006
codex task-run T007
codex task-run T008
codex task-run T009
codex task-run T010
codex task-run T011
codex task-run T012
codex task-run T013
codex task-run T014
codex task-run T015
```

## Notes
- [P] tasks modify distinct files; avoid parallelizing tasks targeting shared modules.
- Verify every change maintains Clerk auth requirements and Convex role checks per constitution (Observability + Library-First).
- Update stakeholder confirmations (Clerk tier, UploadThing region, Convex plan, design palette) during relevant tasks.
