# Phase 0 Research: H53 Family Cabin Website

## Decisions

### Framework & Runtime
- **Decision**: Use Next.js 15.5 App Router with TypeScript strict mode deployed on Vercel.
- **Rationale**: Matches constitutional requirement for TypeScript-first workflows, supports server-side rendering for weather caching, and simplifies deploying a single full-stack experience.
- **Alternatives Considered**: Remix (strong data loading model but smaller ecosystem); Astro (excellent content focus yet lacks built-in auth primitives). Next.js balances feature velocity and hosting simplicity.

### Authentication
- **Decision**: Implement authentication with Clerk using passwordless email links; authenticated users gain immediate access to contribution tools.
- **Rationale**: Clerk provides hosted auth flows, managed sessions, and email delivery out-of-the-box while keeping setup minimal for a family project.
- **Alternatives Considered**: NextAuth (self-managed infrastructure and email sending), Auth0 (powerful but overkill and introduces cost), custom JWT (adds security risk and maintenance burden).

### Persistence & Media Storage
- **Decision**: Use Convex as the unified backend for data and file storage, modeling collections for accounts, guestbook entries, articles, and weather snapshots with built-in file storage enforcing the 4MB cap.
- **Rationale**: Convex offers a TypeScript-native data layer, real-time mutations, and managed file storage, reducing operational overhead while aligning with the need for small-team simplicity.
- **Alternatives Considered**: PlanetScale + S3 (requires managing ORM + storage separately), Supabase (includes additional services we no longer need), SQLite (lacks hosted resilience).

### Weather Integration
- **Decision**: Consume the yr.no JSON API via a scheduled Vercel cron hitting `/api/weather/refresh`, which persists snapshots through Convex every six hours.
- **Rationale**: Aligns with user preference and spec requirement while limiting outbound calls. Cron-driven refresh ensures updated data without live polling.
- **Alternatives Considered**: OpenWeatherMap (broader global coverage but contradicts user preference), manual scraping (fragile).

### Content Editing Experience
- **Decision**: Build authenticated routes for guestbook and articles using Convex mutations with Zod validation and Tailwind UI components.
- **Rationale**: Leverages Next.js layouts and server actions, ensures validation at boundary, and keeps UI/UX consistent without admin overhead.
- **Alternatives Considered**: Off-the-shelf CMS (e.g., Sanity) would add external dependency and complexity for a hobby project.

## Outstanding Questions
- Confirm preferred email domain/sender identity for Clerk transactional emails (defaulting to cabin owner alias).
- Confirm Convex deployment region and storage tier to satisfy latency and retention expectations.

## Research Tasks Completed
- Validated yr.no API limits and confirmed 1 request per minute is well within usage for 6-hour refresh.
- Verified TailwindCSS 4.1 compatibility with Next.js App Router and confirmed CSS-first customization via `@config` in `src/app/globals.css`.
- Confirmed Clerk middleware can restrict all non-landing routes without custom approval flows.
- Verified Convex file storage enforces 4MB upload limits and supports signed delivery URLs for public viewing.
- Established Clerk middleware strategy: only `/` and `/api/health` remain public; every other route enforces session login.
