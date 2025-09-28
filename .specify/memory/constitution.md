<!--
Sync Impact Report
Version change: 1.0.0 → 2.0.0
Modified principles:
- II. Convex-Orchestrated Data Flow (removed automated test pairing requirement)
- IV. Typed Contracts With Zod (removed automated test mandate)
- V. Testable and Observable Delivery → V. Observable Delivery & Manual Verification
Added sections: none
Removed sections: Automated test obligations across principles, guardrails, and workflow
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs: none
-->

# H53 Family Cabin Constitution

## Core Principles

### I. Authenticated Experiences Only

- Every Next.js route, API handler, Convex function, and UI entry point MUST enforce Clerk authentication; unauthenticated visitors are redirected to the hosted sign-in.
- Exceptions to authentication MUST be approved in writing by the product owner and documented in the relevant spec and plan before work begins.
- Authenticated experiences MUST use Clerk primitives (`Authenticated`, `SignedIn`, session hooks) or equivalent server-side checks rather than custom gating.
  Rationale: The cabin content is member-exclusive; consistent Clerk gating preserves privacy and security expectations.

### II. Convex-Orchestrated Data Flow

- Persistent state MUST be defined in `convex/schema.ts` and accessed exclusively through Convex mutations and queries.
- No feature may introduce alternate data stores or bypass Convex without a governance-approved migration plan.
- Each new Convex function MUST document its access controls and validation expectations inside the implementation plan before release.
  Rationale: Convex provides the canonical data layer; a single entry point keeps contracts enforceable and auditable.

### III. Tailwind CSS-First Interfaces

- UI styling MUST rely on Tailwind CSS 4.1 utility classes and design tokens within JSX/TSX; no CSS modules, styled-components, or ad-hoc stylesheets are permitted.
- Changes to `src/app/globals.css` MUST be limited to documented design tokens, with rationale captured in the plan.
- Shared UI patterns MUST be expressed as composable components that reuse Tailwind utilities rather than duplicating style definitions.
  Rationale: Utility-first styling keeps the surface area small and ensures rapid, predictable UI iteration.

### IV. Typed Contracts With Zod

- All external inputs (Clerk payloads, Convex arguments, request bodies, environment variables) MUST be validated with Zod schemas exported for type inference.
- Data crossing server/client boundaries MUST use the shared Zod schema-derived TypeScript types; manual casting is prohibited.
- Validation failures MUST surface typed error shapes, and the implementation plan MUST note how the failure mode was manually verified before release.
  Rationale: Zod-backed contracts guarantee runtime safety while preserving end-to-end type inference.

### V. Observable Delivery & Manual Verification

- Every feature MUST document the manual verification steps executed before release (e.g., quickstart flows, in-app smoke checks).
- Logging and metrics hooks MUST route through `src/lib/logging.ts` (or approved observability modules) for every meaningful state transition.
- Known failure paths MUST degrade gracefully with user-facing fallbacks and logged diagnostics.
  Rationale: For this hobby project, lightweight manual QA combined with instrumentation provides sufficient confidence without mandatory automated tests.

## Technical Guardrails

- Next.js 15.5 App Router features (server components, route handlers, metadata) are the default; client components require justification in the plan.
- TypeScript runs in `strict` mode and MUST remain warning-free in CI (`npm run lint`).
- Clerk’s hosted sign-in is the sole authentication surface; custom auth experiences are not allowed.
- Weather data integrations MUST wrap the official yr.no API helpers in `src/lib/weather/` and may opt into Next.js request caching when persistence is unnecessary.
- Always use Shadcn for ui components if they fit the task. If an existing shadcn component that might fit is not added to the repo already, prompt me. Current shadcn components are in `/src/components/ui`.
- Automated tests are optional; when created, prefer Vitest for logic and Playwright for authenticated flows.
- Environment configuration MUST use `.env` variables surfaced through typed helpers; no direct `process.env` access in components.

## Workflow & Review Protocols

- Specs and plans MUST reiterate the member-only assumption and flag any proposed public content for governance review.
- Implementation plans MUST document compliance with each core principle before Phase 0 proceeds.
- Code reviews MUST focus on Clerk gating, Convex usage, Tailwind adherence, Zod validation, and updated manual verification notes; automated tests may be added at contributor discretion.
- Every merged feature MUST record manual verification steps and lint status in the associated plan or task log.
- Runtime documentation (e.g., quickstarts, runbooks) MUST be updated alongside feature delivery when workflows change.

## Governance

- **Amendment Process**: Submit a pull request updating this constitution and affected templates; require approval from the project maintainer and one additional reviewer before merge.
- **Versioning Policy**: Increment versions using Semantic Versioning (MAJOR for breaking governance changes, MINOR for new principles/sections, PATCH for clarifications); record the rationale in the Sync Impact Report.
- **Compliance Reviews**: Conduct a constitution compliance audit quarterly and after every MAJOR version bump; document findings in the repository wiki or equivalent log.
- **Deviation Handling**: Any temporary exception MUST include a remediation task and expiration date within the feature plan.

**Version**: 2.0.0 | **Ratified**: 2025-09-27 | **Last Amended**: 2025-09-27
