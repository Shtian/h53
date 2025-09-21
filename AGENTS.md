# h53 Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-09-21

## Active Technologies
- TypeScript 5.6 (Node.js 20 LTS) + Next.js 15 (App Router), Clerk, Convex, UploadThing, shadcn/ui, Tailwind CSS, Biome (001-build-a-web)
- Convex database tables for metadata; UploadThing-backed object storage for images (001-build-a-web)

## Project Structure
```
apps/
  web/
  convex/
packages/
  h53-core/
  h53-convex/
  h53-cli/
tests/
  unit/
  contract/
  integration/
```

## Commands
pnpm test
pnpm biome check

## Code Style
Biome for linting/formatting across TypeScript + React codebase

## Recent Changes
- 001-build-a-web: Added TypeScript 5.6 (Node.js 20 LTS) + Next.js 15 (App Router), Clerk, Convex, UploadThing, shadcn/ui, Tailwind CSS, Biome

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
