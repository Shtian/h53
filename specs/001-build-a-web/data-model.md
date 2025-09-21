# Data Model – H53 Family Cabin Portal

## FamilyMember
- **Description**: Authenticated household user with access to portal content, persisted as a Convex document.
- **Fields**:
  - `_id` (Convex Id<"family_members">)
  - `_creationTime` (number)
  - `clerk_user_id` (string, unique)
  - `email` (string, unique)
  - `full_name` (string)
  - `role` (enum: `viewer`, `content_admin`)
  - `status` (enum: `invited`, `active`, `suspended`)
  - `last_login_at` (number | null)
- **Validation**:
  - Clerk MUST confirm email before elevating to `content_admin`.
  - Suspended members denied Convex access token issuance.
- **Relationships**:
  - One-to-many with `AlbumEntry` (`uploaded_by_id`).
  - One-to-many with `HandbookArticle` (`author_id`).
  - One-to-many with `AuditLog`.

## AlbumEntry
- **Description**: Represents a single album item referencing an UploadThing asset and metadata.
- **Fields**:
  - `_id` (Convex Id<"album_entries">)
  - `_creationTime` (number)
  - `title` (string, ≤ 120 chars)
  - `caption` (string, markdown allowed)
  - `image_key` (string, UploadThing key)
  - `image_url` (string)
  - `taken_at` (number)
  - `uploaded_at` (number)
  - `uploaded_by_id` (Convex Id<"family_members">)
  - `visibility` (enum: `family`, `archived`)
  - `tags` (array<string>)
- **Validation**:
  - `taken_at` and `uploaded_at` required.
  - `visibility=family` required for default feed.
- **Relationships**:
  - Belongs to `FamilyMember` (uploader).
  - Indexed by `uploaded_at` descending for newest-first feed.

## HandbookArticle
- **Description**: Cabin handbook entry with guidance for family members, compiled from Markdown into Convex.
- **Fields**:
  - `_id` (Convex Id<"handbook_articles">)
  - `_creationTime` (number)
  - `slug` (string, unique)
  - `title` (string)
  - `summary` (string ≤ 240 chars)
  - `content_markdown` (string)
  - `publish_state` (enum: `draft`, `published`, `archived`)
  - `tags` (array<string>)
  - `published_at` (number | null)
  - `updated_at` (number)
  - `author_id` (Convex Id<"family_members">)
- **Validation**:
  - `published_at` required when `publish_state=published`.
  - Slug immutable after publication.
- **Relationships**:
  - Belongs to `FamilyMember` (author).

## AuditLog
- **Description**: Records authentication and privileged operations for observability.
- **Fields**:
  - `_id` (Convex Id<"audit_logs">)
  - `_creationTime` (number)
  - `actor_id` (Convex Id<"family_members"> | null)
  - `event_type` (enum: `login_success`, `login_failure`, `album_create`, `handbook_publish`, `cli_run`)
  - `event_payload` (Record<string, unknown>)
  - `occurred_at` (number)
- **Validation**:
  - Payload MUST include correlation identifiers for CLI commands.
- **Relationships**:
  - Optional reference to `FamilyMember`.

## Derived Views
- **AlbumFeedView**: Convex query that orders `AlbumEntry` newest-first with computed `is_recent` flag (<30 days).
- **HandbookIndexView**: Static JSON generated during build for published articles feeding offline cache manifest.

## State Transitions
- `FamilyMember.status`: `invited` → (`active` | `suspended`); `active` → `suspended` or remain.
- `HandbookArticle.publish_state`: `draft` → `published` (requires content_admin) → `archived`.
- `AlbumEntry.visibility`: `family` ↔ `archived` (archived entries hidden from default feed).
