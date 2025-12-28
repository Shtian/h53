# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start Next.js dev server
pnpm build        # Production build
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm test         # Run Vitest unit tests
pnpm test:e2e     # Run Playwright E2E tests
pnpm convex:dev   # Start Convex dev server (required for backend)
```

Run both `pnpm dev` and `pnpm convex:dev` simultaneously for local development.

## Architecture Overview

**Stack**: Next.js 15.5 (App Router) + Convex (backend/database) + Clerk (auth) + Tailwind CSS 4

### Key Directories

- `src/app/` - Next.js App Router pages
- `src/components/` - React components (ui/ contains Shadcn/Radix primitives)
- `src/lib/` - Utilities, validation schemas, and domain logic
- `convex/` - Backend: schema, queries, mutations (types auto-generated in `_generated/`)
- `content/articles/` - Markdown files for articles (parsed at runtime)

### Server vs Client Components

Server components (default) handle data fetching; client components (`"use client"`) handle interactivity.

**Pattern**: Server components preload Convex queries, pass to client components:
```typescript
// Server: preload with auth token
const token = await getAuthToken();
const data = await preloadQuery(api.guestbook.list, {}, { token });

// Client: consume preloaded data
const entries = usePreloadedQuery(data);
```

### Authentication Flow

1. Clerk middleware protects all routes except `/` (see `src/middleware.ts`)
2. `ClerkProvider` wraps app in root layout
3. `ConvexProviderWithClerk` binds Convex to Clerk auth
4. Server components use `getAuthToken()` from `src/lib/auth/clerk.tsx` for authenticated Convex calls
5. Convex mutations validate identity via `ctx.auth.getUserIdentity()`

### Convex Patterns

- Schema defined in `convex/schema.ts`
- Soft deletes: use `deletedAt` timestamp field
- File uploads: `generateUploadUrl()` → POST to storage → use `storageId` in mutations
- Authorization: check `identity.subject` matches `authorClerkId` for edit/delete

### Validation

Zod schemas in `src/lib/validation/` are shared between client and Convex backend.

## Configuration

- **TypeScript**: Strict mode, path alias `@/*` → `./src/*`
- **Biome**: Linting and formatting (2-space indent)
- **Images**: Remote patterns allow `*.yr.no` and `*.convex.cloud`
- **Dark theme**: Root HTML has `class="dark"`, use Tailwind dark utilities
