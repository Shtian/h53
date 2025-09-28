# Data Model – Global Cabin Header

## Overview
- No new Convex tables are required. The header reads cached weather data from the yr.no helper and displays authenticated navigation plus UI state managed in React.

## WeatherSnapshot (derived server payload)
- **temperatureC**: `number` – rounded to one decimal before rendering; Celsius only.
- **condition**: `string` – yr.no `symbol_code` converted to human-readable text.
- **capturedAt**: `string` (ISO) – timestamp of the fetched observation, used for tooltips.
- **expiresAt**: `string` (ISO) – optional indicator for cache freshness, not persisted.
- **fallback**: `<implicit>` – when fetch fails, component supplies `{ label: "Weather unavailable" }` without numeric data.

## HeaderClientState (React)
- **isMenuOpen**: `boolean` – controls burger/overlay visibility.
- **triggerRef**: `RefObject<HTMLButtonElement>` – focus return point when overlay closes.
- **initialFocusRef**: `RefObject<HTMLAnchorElement>` – first focusable element inside overlay.
- **closeOnRouteChange**: ensures overlay resets when navigation occurs.

## External Integrations
- **Clerk session**: `SignedIn`/`UserButton` ensure authenticated-only header content.
- **Weather helper**: `fetchYrNoSnapshot` continues to source from yr.no and is now wrapped with Next.js caching semantics; no schema changes.
