# Implementation Plan: Guestbook Memory Entries

**Branch**: `003-guestbook-my-family` | **Date**: 2025-09-28 | **Spec**: [/specs/003-guestbook-my-family/spec.md](/specs/003-guestbook-my-family/spec.md)
**Input**: Feature specification from `/specs/003-guestbook-my-family/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → Completed successfully.
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Context populated from spec, repository survey, and research decisions.
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → No violations detected; logged compliance notes.
   → Progress Tracking updated: Initial Constitution Check (PASS).
5. Execute Phase 0 → research.md
   → Completed; all open clarifications were resolved via documented decisions.
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent file updated.
7. Re-evaluate Constitution Check section
   → No new violations; Progress Tracking updated (PASS).
8. Plan Phase 2 → Describe task generation approach (no tasks.md yet).
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 9. Phases 3-5 are executed by later commands or manual implementation work.

## Summary

Implement an authenticated guestbook that lets any signed-in Clerk user (treated as family) create, edit, and delete single-photo memories directly from the `/guestbook` page. Entries are stored in Convex, surface immediately after submission, and rely on a shadcn dialog workflow that supports mobile uploads, inline validation, and graceful error handling.

## Technical Context

**Language/Version**: TypeScript 5.5 (strict) with Next.js 15.5 App Router  
**Primary Dependencies**: Next.js App Router, React 19, Convex 1.27, Clerk, Tailwind 4.1, shadcn UI dialog, Convex storage  
**Storage**: Convex tables (`guestbookEntries`) plus Convex file storage for images  
**Testing / Verification**: Manual quickstart walkthrough (create/edit/delete/upload failure)
**Target Platform**: Web (Next.js deployment on Vercel + Convex backend)  
**Project Type**: Single Next.js + Convex project  
**Performance Goals**: Render first 30 memories in <300 ms Convex query time; image uploads complete within Convex signed URL expiration (15 min)  
**Constraints**: Tailwind-only styling, Clerk-authenticated routes, images limited to JPEG/PNG <=10 MB, single photo per entry, soft-delete semantics  
**Scale/Scope**: Hobby-family usage (<1k memories, low concurrency); focus on delightful mobile experience and author self-service

## Constitution Check

- **Auth Guarding**: `/guestbook` already protected by Clerk middleware; all new UI controls render inside authenticated-only components. Convex mutations will reject unauthenticated users and ensure the caller is an invited family member.
- **Convex-First Data Flow**: Create/read/update/delete flows use Convex mutations/queries exclusively. Image blobs remain in Convex storage; no alternate data stores introduced.
- **Tailwind-Only Styling**: UI enhancements reuse existing `src/components/ui` shadcn primitives and Tailwind utility classes. No new global CSS planned.
- **Typed Contracts**: Zod schemas (`guestbookEntryCreateSchema`, `guestbookEntryUpdateSchema`) back all Convex mutations and client forms, ensuring inferred types across server/client boundaries.
- **Manual Verification & Observability**: Quickstart checklist drafted; Convex handlers will log structured events (`create|update|delete`) with entry and user IDs. Upload retries surface actionable messaging to the user.

## Project Structure

### Documentation (this feature)

```
specs/003-guestbook-my-family/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── guestbook.md
```

### Source Code (repository root)

```
convex/
├── guestbook.ts          # New/expanded Convex queries & mutations
├── schema.ts             # Guestbook table stores author metadata inline
└── auth.config.ts

src/
├── app/
│   └── guestbook/
│       ├── page.tsx      # Loads Guestbook experience (update with data fetching)
│       ├── AddEntryButton.tsx   # New client component controlling dialog & form
│       └── EditMemoryDialog.tsx # Shared edit/delete dialog (client component)
├── components/
│   └── guestbook/
│       ├── GuestbookGrid.tsx    # Updated to consume Convex data + actions
│       └── MemoryCard.tsx       # New presentational card with action menu
├── lib/
│   ├── validation/guestbook.ts  # Zod schemas & inferred types
│   └── logging.ts               # Existing logging utilities used for observability
└── middleware.ts                # Already enforcing Clerk auth
```

**Structure Decision**: Single Next.js App Router project with Convex backend. Feature work spans `convex` functions, guestbook UI components under `src/components/guestbook`, and authenticated client components in `src/app/guestbook`.

## Phase 0: Outline & Research

1. Unknowns & targets identified in Technical Context were resolved:
   - Modal experience confirmed to reuse shadcn dialog primitives.
   - File upload pipeline standardized on Convex storage signed URLs.
   - Display date locked to server submission timestamp.
   - Author-only edit/delete authorization defined.
   - Observability approach documented (Convex logs + manual QA).
2. Research tasks executed (see `research.md`) covering UI pattern, storage flow, authorization, and observability best practices.
3. Findings consolidated into decision log with rationale and rejected alternatives. No open clarifications remain.

**Output**: `research.md`

## Phase 1: Design & Contracts

1. Entities, fields, and relationships captured in `data-model.md`, including soft-delete handling and Convex indexes.
2. Contracts for Convex queries/mutations documented in `contracts/guestbook.md` (create, list, update, delete, upload URL issuance) with error surfaces.
3. Manual verification flow authored in `quickstart.md`, covering happy path, validation errors, edit/delete, and observability checks.
4. Agent context updated to reflect new technologies and recent changes.

**Output**: `data-model.md`, `contracts/guestbook.md`, `quickstart.md`, updated `AGENTS.md`

## Phase 2: Task Planning Approach

**Task Generation Strategy**:

- Derive tasks from data model, contracts, and UI architecture: start with Convex schema updates, then mutations/queries, client data fetching, UI dialog/validation, and observability steps.
- Include manual verification tasks mirroring the quickstart checklist; optionally tag stretch items (e.g., empty state polish).

**Ordering Strategy**:

1. Update Convex schema + validations (foundation for rest of work).
2. Implement Convex functions and wiring (`generateUploadUrl`, `create`, `list`, `update`, `deleteMemory`).
3. Hook client data layer (React server component loader + client hooks).
4. Build dialog UI and validation flows (create/edit).
5. Add delete confirmation and logging.
6. Finish with manual QA + documentation updates.

**Estimated Output**: 16–20 ordered tasks covering backend, frontend, logging, and verification.

## Phase 3+: Future Implementation

- **Phase 3** (/tasks): Generate `tasks.md` from template using ordering above.
- **Phase 4**: Execute tasks, ensuring lint passes and Tailwind-only styling.
- **Phase 5**: Run manual quickstart, capture logs, and secure sign-off.

## Complexity Tracking

No constitutional deviations identified; table not required.

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

**Run Log**:
- 2025-09-28: `pnpm lint` → failed (`@rushstack/eslint-patch` incompatible with ESLint 9.36.0 in this environment).

---

_Based on Constitution v2.0.0 - See `/memory/constitution.md`_
