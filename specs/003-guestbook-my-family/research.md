# Research: Guestbook Memory Entries

## Decision Log

### Modal & Interaction Pattern
- **Decision**: Reuse the existing shadcn dialog primitives already published under `src/components/ui/dialog.tsx`, layering the add-entry form inside a client component that gates on Clerk authentication.
- **Rationale**: Aligns with the spec instruction to mirror current guestbook visuals, keeps styling within Tailwind+shadcn, and minimizes net-new design work.
- **Alternatives considered**: Building a bespoke drawer or page redirect was rejected because it breaks the inline creation flow and increases cognitive load on mobile.

### Photo Upload Pipeline
- **Decision**: Use Convex file storage with `ctx.storage` by exposing a mutation that issues signed upload URLs and a companion action to materialize the stored file and return a HTTPS URL for rendering.
- **Rationale**: Convex storage satisfies the constitution requirement to keep data in Convex, supports direct-from-phone uploads, and avoids adding third-party storage services.
- **Alternatives considered**: Uploading through Next.js route handlers or directly to Vercel Blob was rejected to avoid introducing a second persistence layer and extra auth plumbing.

### Memory Date Handling
- **Decision**: Stamp the display date using the Convex server timestamp at creation and prevent user overrides.
- **Rationale**: Ensures consistent ordering, avoids conflicting edits when memories are backdated, and honours the spec revision that the created timestamp is the display date.
- **Alternatives considered**: Allowing users to enter a custom memory date was rejected for now because it complicates sorting and validation logic without explicit product need.

### Edit/Delete Authorization
- **Decision**: Restrict update/delete mutations to the original author by comparing the session Clerk subject with the stored `authorClerkId` directly on the memory record.
- **Rationale**: Keeps the experience safe for family members, avoids maintaining a separate `familyMembers` table, and ties ownership to Clerk authentication.
- **Alternatives considered**: Admin-only moderation or open editing were rejected because the spec mandates self-service edits by contributors while preserving privacy.

### Observability & Manual QA
- **Decision**: Instrument Convex mutations with structured logs (`ctx.log`) and document a manual verification flow covering create, edit, delete, and error fallbacks, including upload failure retries.
- **Rationale**: Aligns with Constitution Principle V, ensures we can trace state transitions, and provides a repeatable smoke test before release.
- **Alternatives considered**: Relying purely on frontend console logs was rejected because it would not capture backend events or satisfy observability expectations.
