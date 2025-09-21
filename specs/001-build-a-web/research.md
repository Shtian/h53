# Phase 0 Research – H53 Family Cabin Portal

## Authentication & Family Access Control (Clerk)
- **Decision**: Use Clerk with email/password and magic-link sign-in, leveraging organization membership to gate access to the H53 portal.
- **Rationale**: Clerk provides low-friction onboarding, family-friendly UIs, and audit logs while avoiding custom auth flows.
- **Alternatives considered**:
  - Auth0: powerful but higher cost and complexity for <50 users.
  - Supabase Auth: would require additional work for organization/role semantics.

## Authorization Roles & Content Publishing
- **Decision**: Employ Clerk roles `viewer` and `content_admin`, mirrored in Convex documents and enforced via server-side middleware.
- **Rationale**: Keeps content editing restricted while enabling straightforward gating in Convex queries/mutations.
- **Alternatives considered**:
  - Fine-grained per-resource permissions: overkill for family usage.
  - Shared admin account: rejected for auditability and security.

## Data Persistence with Convex
- **Decision**: Store FamilyMember, AlbumEntry, HandbookArticle, and AuditLog documents in Convex with indexes for timestamps and published state; leverage Convex scheduler for periodic cleanups.
- **Rationale**: Convex simplifies realtime updates, handles auth context from Clerk, and removes need for manual migrations.
- **Alternatives considered**:
  - Prisma/PostgreSQL: more control but higher operational overhead.
  - Firestore: lacks first-class TypeScript server functions and Convex-style role guards.

## Image Uploads & Media Delivery
- **Decision**: Use UploadThing with S3-backed storage, enforcing 15 MB max per image and automatic creation of responsive variants.
- **Rationale**: Tight integration with Next.js 15, consistent TS types, and straightforward auth hooks for Clerk users.
- **Alternatives considered**:
  - Cloudinary: rich transformations but introduces separate auth model.
  - Direct S3 uploads: more boilerplate to secure and process files.

## Styling & Component System
- **Decision**: Adopt Tailwind CSS with shadcn/ui component primitives, themed around an “H53 Cabin” palette defined in Tailwind config.
- **Rationale**: Rapid UI assembly, accessible defaults, and maintainable design tokens.
- **Alternatives considered**:
  - Chakra UI: solid but less customizable for bespoke cabin aesthetic.
  - Custom CSS modules: slower velocity and inconsistent styling.

## Tooling & Quality Gates
- **Decision**: Standardize on Biome for linting/formatting (replacing ESLint/Prettier) and Vitest + Testing Library for unit tests; MSW for contract verification.
- **Rationale**: Biome provides fast, single-tool DX; Vitest integrates cleanly with Convex stubs.
- **Alternatives considered**:
  - ESLint + Prettier: familiar but slower and more config heavy.
  - Jest: heavier runtime compared to Vitest.

## Offline Handbook Delivery
- **Decision**: Leverage Next.js App Router caching with `prefetch={true}` and a lightweight service worker using `next-pwa` plugin to cache published handbook routes while excluding album endpoints.
- **Rationale**: Ensures handbook accessibility during limited connectivity without exposing private album assets offline.
- **Alternatives considered**:
  - Full PWA cache of entire site: conflicts with private image storage.
  - No offline support: contradicts requirement for on-site access.

## Observability & Auditing
- **Decision**: Instrument structured logs via Pino (server) and Browser console reporter, funnel Convex function events into an `audit_logs` table, and export daily JSON using CLI `export-logs`.
- **Rationale**: Aligns with Constitution P5 while minimizing ops overhead.
- **Alternatives considered**:
  - Third-party log pipeline (Logflare): optional but deferred until usage grows.

## Pending Stakeholder Confirmation
- Clerk pricing tier approval and invitation workflow expectations.
- UploadThing storage region preference and retention policy.
- Convex plan limits for daily function calls and storage volume.
- Visual design palette sign-off for shadcn component theming.
