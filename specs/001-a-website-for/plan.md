# Implementation Plan: H53 Family Cabin Website

**Branch**: `001-a-website-for` | **Date**: 2025-09-24 | **Spec**: [/Users/shtian/Code/shtian/h53/specs/001-a-website-for/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-a-website-for/spec.md`

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
Deliver a family-friendly digital home for cabin H53 that surfaces live weather (yr.no for 61°10'31.9"N 10°37'55.5"E), showcases guestbook memories, and hosts maintenance articles. Any signed-in Clerk user can contribute. Next.js 15.5 (App Router) with TailwindCSS 4.1 in CSS-first mode (no `tailwind.config` file) powers the UI, Convex provides data + file storage, and Zod v4 guards every boundary.

## Technical Context
**Language/Version**: TypeScript (strict), Next.js 15.5 App Router  
**Primary Dependencies**: TailwindCSS 4.1, Zod v4, Convex backend, Clerk (email magic link), yr.no weather client  
**Storage**: Convex database and file storage (guestbook, articles, weather snapshots)  
**Testing**: Vitest (unit/schema), Playwright (e2e), Testing Library React (components)  
**Target Platform**: Web (Vercel deployment)  
**Project Type**: web  
**Performance Goals**: <2s TTI on broadband, weather fetch <500ms cached, optimized image delivery  
**Constraints**: 4MB upload cap via Convex, authenticated routes (except landing/health), WCAG AA, Tailwind CSS-first config (no repository config file)  
**Scale/Scope**: <=50 family accounts, <=5k guestbook posts, low concurrency

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Conventional Commit Cadence: plan commits are scoped to tasks and follow Conventional Commits.
- [x] Next.js >=15.5 Foundation: solution stays on Next.js >=15.5 with App Router usage documented.
- [x] TailwindCSS >=4.1 Styling: styling plan depends on TailwindCSS >=4.1 with centralized tokens.
- [x] TypeScript Everywhere: implementation keeps TypeScript `strict` mode and shared types.
- [x] Zod 4 External Validation: boundaries adopt Zod v4 schemas before touching business logic.

## Project Structure

### Documentation (this feature)
```
specs/001-a-website-for/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command)
```

### Source Code (repository root)
```
app/
├── layout.tsx
├── page.tsx
└── (routes)/

src/
├── components/
├── lib/
├── services/
└── styles/

convex/
├── schema.ts
├── guestbook.ts
├── articles.ts
└── ...

tests/
├── contract/
├── integration/
└── e2e/
```

**Structure Decision**: Next.js App with Convex backend modules; no separate API service beyond App Router routes. All non-landing routes run behind Clerk auth middleware.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for H53 family site"
   For each technology choice:
     Task: "Find best practices for {tech} with Convex + Next.js"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 0 Deliverables
- Record framework/runtime, simple Clerk auth setup, Convex storage strategy, and weather caching cadence.
- Note open items: Clerk sender identity and Convex deployment region/tier.
- Confirm Zod coverage, upload limits, and accessibility expectations.

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint (guestbook, articles)
   - Ensure payloads align with Zod schemas
   - Output OpenAPI schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint group
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration/e2e test scenario (approved posting, pending rejection, weather fallback)

5. **Update agent file**:
   - Run `.specify/scripts/bash/update-agent-context.sh codex`
   - Capture new tech references (Convex, Clerk, yr.no)

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

### Phase 1 Design Outline
- **Data Models**: Convex collections for familyMembers, guestbookEntries, articles, and weatherSnapshots referencing Clerk IDs.
- **API Surface**: Next.js App Router `/api` endpoints proxying to Convex actions per `contracts/site-api.openapi.yaml`.
- **Validation**: Shared Zod schemas for uploads, articles, and weather payloads; Convex mutations enforce size/format guards.
- **UI Composition**: Authenticated routes under `app/guestbook` and `app/articles`; weather header consumes cached snapshot.
- **Observability**: Use simple `logEvent` helper for API operations and rely on timestamps stored in Convex documents; schedule weather refresh via cron-triggered API route.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Base on `.specify/templates/tasks-template.md`
- Derive setup tasks for Next.js + Convex + Clerk
- Map Convex collections/entities to implementation tasks
- Cover flows for posting memories, browsing articles, and weather fallback

**Ordering Strategy**:
- Setup → Convex schema → API routes → UI routes → Integrations → Polish
- Apply `[P]` only when files differ to avoid conflicts

**Estimated Output**: 25 ±2 tasks in `tasks.md`

### Phase 2 Strategy Notes
- Tasks already generated (see `/specs/001-a-website-for/tasks.md`); keep parallel-friendly tasks marked `[P]`.
- Highlight dependencies from Convex schema to API routes to UI.

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: /tasks execution (tasks.md)  
**Phase 4**: Implementation workstreams  
**Phase 5**: Validation (tests, accessibility, deployment checklist)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
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
- [x] Complexity deviations documented (none identified)

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*
