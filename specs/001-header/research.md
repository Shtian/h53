# Phase 0 Research – Global Cabin Header

## Decision Log

### Weather snapshot caching
- **Decision**: Wrap `fetchYrNoSnapshot` in a server-level helper that calls `fetch` with `revalidate: 3600` and serialises only the needed fields for the client shell.
- **Rationale**: Keeps weather reads Next.js-idiomatic, avoids Convex writes, and ensures the header renders quickly with cached data while still refreshing once per hour.
- **Alternatives considered**: Persisting the snapshot in Convex (rejected: violates spec direction and adds needless consistency work); client-only caching with `useEffect` (rejected: causes hydration mismatch and delays data).

### Header architecture split
- **Decision**: Expose a server component (`HeaderData`) that fetches weather and passes props to a new client component (`HeaderShell`) responsible for menu state and Clerk UI.
- **Rationale**: Preserves server rendering for authenticated routes, keeps weather data close to layout, and isolates interactive logic where hooks can run.
- **Alternatives considered**: Keep existing single client component (rejected: would require duplicating fetch logic client-side); convert entire layout to client (rejected: heavier bundle and loses server rendering benefits).

### Mobile overlay accessibility
- **Decision**: Implement a Tailwind-styled fullscreen overlay using semantic `<dialog role="dialog" aria-modal="true">` semantics with manual focus trapping and ESC/overlay dismissal.
- **Rationale**: Satisfies WCAG expectations without adding dependencies, keeps bundle size small, and aligns with constitution’s Tailwind-first guideline.
- **Alternatives considered**: Introduce a headless UI library (rejected: new dependency footprint); rely on CSS-only dropdown (rejected: poor accessibility and focus management).

### Observability for failure flows
- **Decision**: Log weather fetch failures and overlay state errors using `logEvent` with contextual metadata; display "Weather unavailable" fallback copy.
- **Rationale**: Meets constitution observability mandate and keeps supportable telemetry without external tooling.
- **Alternatives considered**: Silent failures (rejected: no diagnostics); custom logging wrapper (rejected: existing util already matches need).
