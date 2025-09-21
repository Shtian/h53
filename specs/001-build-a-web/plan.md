# Implementation Plan: H53 Family Cabin Portal

**Branch**: `001-build-a-web` | **Date**: 2025-09-21 | **Spec**: /Users/shtian/Code/shtian/h53/specs/001-build-a-web/spec.md
**Input**: Feature specification from `/specs/001-build-a-web/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Deliver a secure family-only H53 portal backed by shared domain libraries, surfaced through a Next.js 15 App Router web experience, with Clerk-powered authentication, Convex-backed data services, UploadThing-managed album uploads, and a handbook rendered via shadcn/ui components with Tailwind CSS styling.

## Technical Context
**Language/Version**: TypeScript 5.6 (Node.js 20 LTS)  
**Primary Dependencies**: Next.js 15 (App Router), Clerk, Convex, UploadThing, shadcn/ui, Tailwind CSS, Biome  
**Storage**: Convex database tables for metadata; UploadThing-backed object storage for images  
**Testing**: Vitest (unit), Playwright (integration/E2E), Contract tests via OpenAPI + Mock Service Worker  
**Target Platform**: Web (desktop + mobile) via Vercel deployment  
**Project Type**: web (frontend + backend)  
**Performance Goals**: Authenticated page loads ≤ 500ms p95 on broadband; album image CDN delivery ≤ 1s p95  
**Constraints**: Must operate in low-maintenance mode (family managed); require audit logging for auth attempts; support offline-ready handbook caching  
**Scale/Scope**: <50 active users; album entries expected <5k; handbook articles <200

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Library-First Delivery**: PASS – Introduce `packages/h53-core` (domain rules) and `packages/h53-convex` (Convex data access abstractions) consumed by `apps/web`, Convex functions, and CLI tooling.
- **CLI Boundary Contracts**: PASS – Build `packages/h53-cli` with commands (`sync-content`, `seed-admin`, `export-logs`) that wrap Convex mutations and expose human-readable + JSON output for automation.
- **Test-Driven Proof**: PASS – Establish Vitest suites per library and Mock Service Worker contract tests before implementation; CI blocks merges without failing tests first.
- **Integration Evidence**: PASS – Plan Playwright flows for login→album→handbook, plus contract verification of Convex HTTP endpoints and CLI behaviors.
- **Operational Observability**: PASS – Use structured logging via Pino in Next.js/CLI, Convex analytics hooks, and Vercel monitoring; CLI emits JSON logs for ingestion.

Document any deviations in Complexity Tracking alongside mitigation or approval rationale.

## Project Structure

### Documentation (this feature)
```
specs/001-build-a-web/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
```

### Source Code (repository root)
```
apps/
├── web/                 # Next.js 15 frontend (App Router + Clerk auth views)
├── convex/              # Convex functions exposed via HTTP endpoints
packages/
├── h53-core/            # Domain entities, validation, shared types
├── h53-convex/          # Convex client/server abstractions + UploadThing integration
└── h53-cli/             # CLI entry point exposing admin commands via Convex

infrastructure/
└── uploadthing/         # UploadThing config + server-side handlers

tests/
├── unit/
├── contract/
└── integration/
```

**Structure Decision**: Option 2 (web application with frontend + backend) to separate UI and API concerns while keeping shared libraries reusable.

## Phase 0: Outline & Research
1. **Extract unknowns**: Clerk multi-user setup, Convex schema design, UploadThing storage region + quotas, shadcn component theming, Tailwind design tokens, offline handbook caching with App Router.
2. **Research tasks executed**:
   - Clerk invitations + role mapping for small private communities.
   - Convex document modeling for album + handbook data and access control.
   - UploadThing size limits, storage backing options, and moderation pipeline.
   - Tailwind + shadcn integration patterns with Biome formatting and linting.
   - Service worker and App Router caching mechanics for offline handbook access.
3. **Findings consolidated in** `/Users/shtian/Code/shtian/h53/specs/001-build-a-web/research.md` with decisions + rationales.

## Phase 1: Design & Contracts
- **Libraries**: `h53-core` exposes domain entities + validation; `h53-convex` encapsulates Convex queries/mutations and UploadThing policies; `h53-cli` orchestrates admin tasks via library APIs.
- **API Surface**: Next.js route handlers proxy Convex actions, maintaining `/api/session`, `/api/album`, `/api/handbook` endpoints defined in `contracts/portal-openapi.yaml`.
- **CLI Surface**: Commands wrap Convex HTTP endpoints using shared auth tokens for automation (seed admin, import album batch, publish handbook, export logs).
- **Data Model**: Documented in `data-model.md` with entity fields, validation, and Convex-specific requirements (e.g., `_id`, `_creationTime`).
- **Testing Plan**: Contract tests built with MSW + Vitest for endpoints; Convex integration verified via Playwright flows; CLI snapshot tests for JSON output.
- **Quickstart**: Instructions updated for Clerk, Convex, UploadThing, Tailwind, shadcn, and Biome; see `quickstart.md`.
- **Agent Context**: `.specify/scripts/bash/update-agent-context.sh codex` executed to keep toolchain alignment.

## Phase 2: Task Planning Approach
- `/tasks` command will convert data-model + contract endpoints + quickstart steps into ~28 tasks.
- Parallelization: Convex schema + library scaffolding proceed separately once query/mutation interfaces codified; frontend + API tasks gated by contract tests.
- Observability tasks baked in (Convex audit log collection, structured logging middleware) per Constitution P5.

## Phase 3+: Future Implementation
*Beyond /plan scope.*

## Complexity Tracking
*No deviations—library-first, CLI boundary, testing, integration, observability all satisfied.*


## Progress Tracking
*This checklist is updated during execution flow*

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*
