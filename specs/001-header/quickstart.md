# Quickstart – Global Cabin Header

## Prerequisites
- Node.js >= 20 and pnpm dependencies installed (`pnpm install`).
- Clerk environment variables configured for local sign-in (copy from `.env.example`).
- Optional: set `YRNO_COORDINATES` in `.env.local` if you need cabin weather for a different location.

## Automated Checks (optional)
1. `npm run lint` – confirm Tailwind/TypeScript usage stays clean.
2. (Optional) `npm run test` – execute any Vitest suites that exist for the header.
3. (Optional) `npm run test:e2e -- --project=chromium tests/e2e/header-navigation.spec.ts` – run Playwright coverage if present.

## Manual Verification
1. `npm run dev` and open `https://localhost:3000`.
2. Sign in via Clerk and confirm the header renders with logo, Articles, Guestbook, weather badge (Celsius), and profile button.
3. Resize to below Tailwind `md` breakpoint; open the shadcn drawer menu and ensure it fills the viewport below the header, traps focus, and closes via the Close button or swipe/ESC gesture.
4. Disconnect network or simulate yr.no failure; fallback text "Weather unavailable" must appear and console should log an `logEvent` entry.
5. Click the H53 logo while on `/`; confirm no reload occurs. Navigate to `/articles` and back to `/guestbook` using overlay links and verify overlay auto-closes on navigation.
