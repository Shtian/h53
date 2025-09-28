# Implementation Plan: Complete the Articles Page

**Branch**: `[002-complete-the-articles]` | **Date**: 2025-09-28 | **Spec**: specs/002-complete-the-articles/spec.md
**Input**: Feature specification from `/specs/002-complete-the-articles/spec.md`

## Summary
Members need a Clerk-gated Articles destination that loads instantly by building the index and detail experiences from markdown files stored in the repo. We will statically generate the listing according to manual ordering metadata, render article bodies with Tailwind typography styling, surface header weather with an error-icon popover fallback, and fail the build whenever referenced article content is missing.

## Technical Context
**Language/Version**: TypeScript 5.5 (strict)  
**Primary Dependencies**: Next.js 15.5 App Router, React 19, Tailwind CSS 4.1, Clerk auth, yr.no weather helper, local markdown parsing  
**Storage**: Local filesystem markdown bundle checked into the repo (no Convex usage)  
**Testing / Verification**: Manual quickstart walkthrough (Playwright optional if time permits)  
**Target Platform**: Web (Next.js deployed via Vercel workflow)  
**Project Type**: web  
**Performance Goals**: Serve article index/detail via static generation; header fallback must render within the existing layout without delaying first paint  
**Constraints**: Tailwind-only styling, Clerk-enforced authentication, manual ordering defined in article metadata, build must fail on unreadable article files, maintain dynamic header weather behavior  
**Scale/Scope**: Single authenticated listing route plus article detail view, supporting a handful (≤20) curated articles in the initial batch

## Constitution Check
- **Auth Guarding**: Listing and article detail will remain under the existing Clerk-gated layout; unauthenticated visitors see the standard sign-in prompt in the header experience.
- **Convex-First Data Flow**: No new persistence—article content is sourced from local markdown during build, and existing Convex collections remain untouched.
- **Tailwind-Only Styling**: Article listing and body presentation will use Tailwind utilities plus the typography plugin; no new global CSS beyond documented tokens.
- **Typed Contracts**: Frontmatter parsing will be validated with shared Zod schemas so required fields (title, publish date, manual order) are enforced before rendering.
- **Manual Verification & Observability**: Quickstart checklist will cover article navigation, weather fallback popover, empty state, and build-failure guardrails with logging through `src/lib/logging.ts` when applicable.

## Project Structure
```
specs/002-complete-the-articles/
├── plan.md
└── spec.md

src/
├── app/
│   ├── api/
│   ├── articles/
│   │   ├── page.tsx
│   │   └── [articleId]/
│   │       └── page.tsx
│   ├── guestbook/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── articles/
│   ├── guestbook/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── auth/
│   ├── logging.ts
│   ├── utils.ts
│   ├── validation/
│   └── weather/
└── middleware.ts
```

**Structure Decision**: Single Next.js web app using `src/app` for routes, with shared UI and utilities under `src/components` and `src/lib`.

## Phase 0: Outline & Research
- Confirm markdown source location, frontmatter requirements, and manual ordering strategy for the Articles collection.
- Determine how to integrate Tailwind typography with existing layout components without violating styling guardrails.
- Review existing weather/header implementation to ensure the error-icon popover fits current component contracts.
- Validate build-time failure strategy and logging expectations so unreadable markdown halts deployment.

_Output_: `/specs/002-complete-the-articles/research.md` consolidating the above decisions.

## Phase 1: Design & Contracts
- Document article metadata and listing relationships in `/specs/002-complete-the-articles/data-model.md`, including required frontmatter and build safeguards.
- Capture contract rationale in `/specs/002-complete-the-articles/contracts/README.md`, noting that no external APIs or Convex mutations are introduced.
- Produce `/specs/002-complete-the-articles/quickstart.md` outlining manual verification for listing, detail view, empty state, weather fallback, and build failure expectations.
- Run `.specify/scripts/bash/update-agent-context.sh codex` after documenting new tech context so repository assistants reflect the latest stack details.

## Phase 2: Task Planning Approach
The forthcoming `/tasks` run will pull from the spec, research, and design artifacts to create 15–20 ordered tasks. Tasks will start with preparing markdown content scaffolding and Zod validation, continue through listing/detail UI work, header fallback integration, and end with manual verification plus build guard checks. Optional automation (e.g., linting or unit tests) can be appended if contributors choose.

## Phase 3+: Future Implementation
- Phase 3 (`/tasks`): Generate implementation task list from plan artifacts.
- Phase 4: Execute tasks—implement markdown loaders, listing/detail pages, and header fallback.
- Phase 5: Validate manually using quickstart; optionally run lint/tests before merge.

## Complexity Tracking
No constitutional deviations identified.

## Progress Tracking
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
- [ ] Complexity deviations documented

---
*Based on Constitution v2.0.0 - See `/memory/constitution.md`*
