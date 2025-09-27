# Data Model: H53 Family Cabin Website

## Entities

- **Attributes**: `clerkUserId` (unique), `email` (unique), `displayName`, `photoUrl` (optional), `createdAt`, `updatedAt`, `lastLoginAt` (optional).
- **Relationships**: One-to-many with `GuestbookEntry` (author) and `Article` (author).
- **Validation**: Clerk user id required and immutable; email MUST be RFC-compliant; display name between 2-60 characters.

### GuestbookEntry
- **Primary Keys**: `id` (UUID)
- **Attributes**: `familyMemberId`, `title`, `caption`, `photoStorageId`, `photoUrl`, `photoAltText`, `tags` (string[]), `visibility` (`public` | `hidden`), `createdAt`, `updatedAt`.
- **Relationships**: Belongs to `FamilyMember`; optional many-to-many to `Reaction` if added later.
- **Validation**: Caption required (<= 1,000 chars); `photoStorageId` required and references Convex file storage; signed `photoUrl` generated on read; enforce 4MB image constraint pre-upload; authors may hide entries when desired.

### Article
- **Primary Keys**: `id` (UUID)
- **Attributes**: `familyMemberId`, `title`, `summary`, `contentMarkdown`, `category` (`usage` | `maintenance` | `safety` | `history`), `coverImageStorageId`, `coverImageUrl`, `publishedAt`, `updatedAt`.
- **Relationships**: Belongs to `FamilyMember`; optional attachments stored separately.
- **Validation**: Title 10-120 chars; summary <= 280 chars; content required; category required; optional cover image stored via Convex storage; only the original author may edit.

### WeatherSnapshot
- **Primary Keys**: composite `locationCode` + `capturedAt` (timestamp) or `id` (UUID)
- **Attributes**: `locationCode` (yr.no station id), `temperatureC`, `condition`, `windSpeed`, `precipitation`, `capturedAt`, `expiresAt`, `source` (constant `yr.no`), `rawPayload` (JSON blob).
- **Relationships**: None direct; consumed by header widget.
- **Validation**: `expiresAt` = `capturedAt + 6h`; data older than 6 hours automatically invalidated.

## State Transitions

- **Guestbook Visibility**: `public` entries shown on site; `hidden` used when contributors choose to archive a memory.
- **Article Publishing**: Draft saved (no `publishedAt`); publishing sets `publishedAt` and is available to any authenticated contributor.

## Derived Data & Indexing

- Define Convex indexes on `guestbookEntries` (`createdAt`, `visibility`) for chronological feeds and moderation filtering.
- Define Convex indexes on `articles` (`category`, `publishedAt`) for article listings.
- Purge `weatherSnapshots` records older than 7 days via scheduled Convex job to keep storage minimal.
