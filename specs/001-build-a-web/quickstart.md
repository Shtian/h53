# Quickstart – H53 Family Cabin Portal

## Prerequisites
- Node.js 20 LTS and pnpm 9 installed.
- Clerk account with organization/roles enabled.
- Convex project configured locally (`convex` CLI authenticated).
- UploadThing project backed by S3 storage.
- Vercel CLI (optional) for preview deployments.

## 1. Clone and Install
```bash
pnpm install
pnpm convex dev --once   # generate Convex types
```

## 2. Configure Environment
Create `.env` with:
```
NEXT_PUBLIC_CABIN_NAME=H53
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CONVEX_DEPLOYMENT=...
UPLOADTHING_TOKEN=...
UPLOADTHING_APP_ID=...
```

## 3. Prepare Database & Seed
```bash
pnpm convex dev
pnpm --filter h53-cli seed-admin --format human
pnpm --filter h53-cli sync-content --format human
pnpm --filter h53-cli sync-content --format json
```
- `sync-content` loads sample album entries + handbook markdown.
- JSON output validates CLI boundary contracts.

## 4. Run Development Servers
```bash
pnpm --filter convex dev
pnpm --filter web dev
```
- Convex functions exposed via `/api/*` run on localhost:3001.
- Web app proxies API and enforces Clerk login on localhost:3000.

## 5. Validate User Journeys
1. Log in with seeded family account.
2. Navigate to Album → confirm newest-first ordering and timestamp display.
3. Open an album entry → verify larger image + metadata.
4. Navigate to Handbook → check list of published articles and open at least one.
5. Toggle offline mode in browser devtools → confirm handbook articles remain accessible via service worker cache.

## 6. Run Tests (TDD Baseline)
```bash
pnpm test:unit
pnpm test:contract
pnpm test:integration
```
- Ensure contract tests fail until API/CLI implementations are complete (Red phase).

## 7. Observability Spot Check
```bash
pnpm --filter h53-cli export-logs --format json | jq '.'
```
- Confirm audit log entries exist for login + content admin actions.

## 8. Deployment Prep
- Push feature branch to origin.
- Create Vercel preview (`vercel --prebuilt`).
- Run `pnpm biome check` to ensure static analysis passes.

## Completion Criteria
- Plan checklist satisfied (Phase 0-2).
- Contract and integration tests failing with TODO markers ready for implementation.
- Stakeholder review scheduled to confirm Clerk, Convex, and UploadThing selections.
