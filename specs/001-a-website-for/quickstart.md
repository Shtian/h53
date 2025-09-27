# Quickstart: H53 Family Cabin Website

## 1. Bootstrap Project
1. `npx create-next-app@latest h53 --ts --use-npm --app --eslint --src-dir`
2. Upgrade dependencies to Next.js 15.5, TailwindCSS 4.1 (CSS-first), Convex latest, Clerk SDK latest, Zod 4.x.
3. Enable TypeScript `strict`, `noImplicitAny`, and `exactOptionalPropertyTypes` in `tsconfig.json`.

## 2. Configure Tooling
1. Install Convex CLI (`npm install convex`) and run `npx convex dev init` to configure project + environment variables.
2. Install Husky + commitlint for Conventional Commits; add lint-staged for formatting.
3. Configure ESLint with Next.js + testing presets; add Vitest + Testing Library config.

## 3. Define Schemas & DB
1. Model Convex collections/functions in `convex/schema.ts` mirroring `data-model.md` entity definitions.
2. Implement Convex mutations/queries for guestbook, articles, weather snapshots, and profile touchpoints.
3. Create Zod schemas in `src/lib/validation/` for accounts, guestbook, and articles and reuse in Convex functions.
4. Configure Tailwind customization via CSS-first `@config` or `@theme` directives inside `src/app/globals.css`; do not create a `tailwind.config.*` file.

## 4. Weather Integration
1. Create server action `src/lib/weather/fetchYrNo.ts` that requests yr.no endpoint and caches responses for 6 hours.
2. Add fallback messaging when cache empty or fetch fails; log with structured logger.

## 5. Authentication
1. Configure Clerk application with email magic link authentication and enable organization-less single tenant setup.
2. Use Clerk middleware to require login on all routes except `/` and `/api/health`.
3. Sync display name/photo locally the first time a user signs in (optional enrichment).

## 6. Guestbook & Articles
1. Implement guestbook CRUD API routes in `app/api/guestbook/route.ts` using Convex actions and Zod.
2. Build public guestbook pages in `app/(public)/guestbook` with responsive photo grid.
3. Implement articles index + detail, referencing Markdown content stored in Convex collections.

## 7. Manual Verification
1. Smoke test guestbook creation/edit flow with two different browser sessions.
2. Confirm article publishing renders correctly and redirects unauthenticated visitors back to landing.
3. Observe weather fallback messaging by forcing the yr.no request to fail (e.g., temporary network disable).

## 8. Deployment Checklist
1. Link Convex project to production deployment and configure environment variables in Vercel.
2. Configure Cron-like revalidation for weather (Vercel Edge Config or On-demand ISR).
3. Set up Clerk sender identity for transactional emails.
4. Verify Conventional Commit compliance with `npm run commitlint -- --from=HEAD~5`.
