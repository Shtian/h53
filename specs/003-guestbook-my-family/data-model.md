# Data Model: Guestbook Memory Entries

## Overview
The guestbook feature persists signed-in family memories in Convex. Every contributor is already authenticated with Clerk, so author information is stored directly on each memory entry—no separate `familyMembers` table is required. Entries keep a single image, descriptive metadata, and audit fields so authors can edit or delete their contributions later.

### guestbookEntries (Convex table)
- `_id` (system) — primary identifier for each memory.
- `authorClerkId` (string) — Clerk subject identifier of the contributor; used for authorisation checks.
- `authorName` (string, optional) — friendly display name sourced from Clerk.
- `authorImageUrl` (string, optional) — Clerk profile image for future UI use.
- `title` (string, 3–120 chars) — memory headline.
- `description` (string, 0–1000 chars, optional) — narrative text; omit or store empty string when unused.
- `photoStorageId` (string) — Convex storage ID of the uploaded asset.
- `photoUrl` (string) — signed URL returned from Convex for display.
- `photoAltText` (string, optional, <=160 chars) — accessibility text derived from the title.
- `createdAt` (string ISO timestamp) — server timestamp at creation; doubles as display date.
- `updatedAt` (string ISO timestamp) — refreshed on every edit.
- `deletedAt` (string ISO timestamp, optional) — set when an author deletes the entry; null indicates active.
- Indexing: `by_created` on `createdAt` (descending when queried) for newest-first ordering; queries exclude rows with `deletedAt` set.

## Relationships
- None. Clerk identity is sufficient to secure author operations; ownership checks compare `authorClerkId` to the current session.

## Derived Client Models
- `MemoryCard` (UI): { id, title, description, imageUrl, imageAltText, createdAt, authorName } sourced directly from the query payload; no joins required.

## Validation Contracts
- `guestbookEntryCreateSchema` (Zod):
  - `title`: string().min(3).max(120)
  - `description`: string().max(1000)
- `imageStorageId`: string().min(1)
- `imageAltText`: string().max(160).optional()
- `guestbookEntryUpdateSchema` (Zod):
  - `{ id: string }` + optional title, description, imageStorageId, imageAltText; refinement enforces at least one field change.

## State Transitions
1. **Draft Upload** (client): user obtains upload URL, posts file, captures `storageId` from Convex response.
2. **Created**: mutation validates payload, ensures author membership, stores entry with identical timestamps for `createdAt`/`updatedAt`.
3. **Updated**: mutation validates author owns entry, applies partial changes, updates `updatedAt`; `createdAt` untouched.
4. **Deleted**: mutation marks `deletedAt` and optionally removes image from storage; active queries filter out `deletedAt` entries. (Physical deletion can be added later via maintenance tasks.)

## Data Volume & Scale
- Expected volume: <1k entries total, with low concurrency (family usage). Convex default limits are sufficient; no sharding or pagination beyond "load 30 latest" needed initially.

## Retention & Compliance
- Entries remain until an author deletes them; deletion may leave activity logs but removes the item from the user-facing feed. Image storage cleanup occurs during delete mutation.
