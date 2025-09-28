# API Contracts: Guestbook Memory Entries

All surfaces are implemented as Convex functions. Schemas referenced are defined in `src/lib/validation/guestbook.ts` and mirror the data model constraints.

## Queries

### `guestbook.list`
- **Args**: none (auth context determines visibility).
- **Auth**: Clerk session required; callers must be signed in via Clerk.
- **Response**: Array of
  ```ts
  {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    imageAltText?: string;
    createdAt: string; // ISO
    authorClerkId: string;
    authorName?: string;
    authorImageUrl?: string;
  }
  ```
  Ordered by `createdAt` descending. Results exclude entries where `deletedAt` is set.

## Mutations

### `guestbook.generateUploadUrl`
- **Args**: none.
- **Response**: `{ uploadUrl: string }`
- **Notes**: Client uploads the file using `uploadUrl`. The Convex upload response returns the `storageId`, which is forwarded to create/update mutations.

### `guestbook.create`
- **Args**: `GuestbookEntryCreateInput`
  ```ts
  {
    title: string;
    description?: string;
    imageStorageId: string;
    imageAltText?: string;
  }
  ```
- **Derived fields**: Mutation resolves `photoUrl` via `ctx.storage.getUrl(storageId)` and stamps timestamps/author metadata from Clerk identity.
- **Response**: Newly created entry ID (`Id<"guestbookEntries">`).

### `guestbook.update`
- **Args**: `GuestbookEntryUpdateInput`
  ```ts
  {
    id: Id<"guestbookEntries">;
    title?: string;
    description?: string;
    imageStorageId?: string;
    imageAltText?: string;
  }
  ```
- **Behaviour**: Validates caller is author via `authorClerkId`; if `imageStorageId` provided, fetches new URL and deletes the previous asset from Convex storage.
- **Response**: `{ success: true }` after mutation completes.

### `guestbook.deleteMemory`
- **Args**: `{ id: Id<"guestbookEntries"> }`
- **Behaviour**: Soft deletes by setting `deletedAt` and removing the stored image from Convex storage; only authors may invoke.
- **Response**: `{ success: true }`

## Error Surface
- 401 Unauthorized: No Clerk identity found.
- 403 Forbidden: Clerk user not signed in or not the original author.
- 404 Not Found: Entry ID missing or already deleted.
- 413 Payload Too Large: Triggered client-side when file exceeds 10 MB (enforced before mutation call).
- 415 Unsupported Media Type: Client validation stops non-JPEG/PNG uploads; mutation double-checks and logs incidents.

## Observability Hooks
- Mutations emit structured logs with action type (`create|update|delete`) and entry ID.
- Storage operations capture storage ID to aid cleanup debugging.
