<!--
Sync Impact Report
Version change: 1.0.0 → 1.1.0
Modified principles:
- Technology Stack Guardrails (Tailwind CSS-first requirement)
Added sections: none
Removed sections: none
Templates requiring updates: none
Follow-up TODOs: none
-->

# H53 Constitution

## Core Principles

### Conventional Commit Cadence

- MUST use Conventional Commits for every commit, including scope where meaningful.
- MUST commit after each discrete task or failing test to preserve a reviewable trail.
  Rationale: Frequent, structured commits keep work auditable and enable reliable automation.

### TypeScript Everywhere

- MUST implement runtime code in TypeScript with `strict` mode enabled; JavaScript requires explicit exemption recorded in plan.md.
- MUST ensure shared types live in versioned modules and flow from backend to frontend without duplication.
  Rationale: Strong typing reduces regressions and keeps contracts self-documenting.

### Zod 4 External Validation

- MUST parse and validate every external input (HTTP payloads, environment vars, config files).
- MUST reject or sanitize invalid data before it reaches business logic and log schema violations.
  Rationale: Consistent validation stops unsafe data at the boundary and hardens automation.

## Technology Stack Guardrails

- Plan and task documents MUST highlight any deviation requests for governance review before execution.
- Tailwind CSS styling MUST use the Tailwind v4 CSS-first configuration via in-file `@config` or theme directives; repositories MUST NOT include standalone `tailwind.config.*` files.

## Development Workflow

- Plans MUST include a Constitution Check confirming Conventional Commit coverage, framework versions, and validation approach.
- Tasks MUST schedule validation and TypeScript setup before feature work; code review MUST block until Zod schemas land.
- Continuous integration MUST run TypeScript type checks, linting, and Zod schema tests on every merge candidate.
- Release notes MUST map to Conventional Commit history so stakeholders can trace changes to principles.

## Governance

- Amendments REQUIRE an RFC citing desired changes, impact analysis, and proposed semantic version bump.
- Versioning policy: PATCH for clarifications, MINOR for new guidance, MAJOR for altered or replaced principles.
- Compliance reviews: every plan.md and tasks.md MUST document principle adherence; reviewers MUST flag violations before merge.
- Governance decisions and ratified amendments MUST live in repository history with traceable Conventional Commits.

**Version**: 1.1.0 | **Ratified**: 2025-09-24 | **Last Amended**: 2025-09-24
