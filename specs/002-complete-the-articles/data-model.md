# Phase 1 Data Model: Complete the Articles Page

## Entities

### ArticleFrontmatter
- **Fields**:
  - `title` (string, required): Display title used in lists and detail pages.
  - `publishedAt` (ISO 8601 string, required): Publish date rendered in the list if summary exists.
  - `order` (integer, required): Manual ordering weight; lower values appear first.
  - `summary` (string, optional): Short description surfaced in the listing card.
- **Validation Rules**:
  - `publishedAt` must parse to a valid date; invalid values cause build failure.
  - `order` must be an integer within 0–999; duplicates are allowed but preserve file-system ordering as tiebreaker.

### ArticleContent
- **Fields**:
  - `slug` (string, required): Derived from filename, used in routes and URLs.
  - `frontmatter` (ArticleFrontmatter, required): Validated metadata described above.
  - `body` (markdown string, required): Original markdown content to render through `react-markdown`.
  - `compiled` (ReactNode, derived): Markdown transformed with typography-aware components.
- **Relationships**:
  - Belongs to exactly one `ArticleListing` collection.

### ArticleListing
- **Fields**:
  - `articles` (ArticleSummary[], required): Array containing `slug`, `title`, `publishedAt`, optional `summary`, and `order` for listing display.
  - `generatedAt` (Date, derived): Build timestamp helpful for debugging mismatches.
- **Rules**:
  - Source data pulls from all markdown files in `content/articles`.
  - Missing files or validation failures raise a build-time error.
  - Sorting uses `order` ascending; matching values fall back to descending `publishedAt`.

### WeatherBannerState
- **Fields**:
  - `kind` (`"success" | "error"`, required): Switch for header rendering.
  - `summary` (string, required when `kind="success"`): Formatted weather text.
  - `message` (string, required when `kind="error"`): Popover copy explaining weather unavailability.
- **Rules**:
  - Consumers must handle both kinds; Articles header shows icon + popover when `kind="error"`.
  - Weather service failures should log a diagnostic entry before providing the error state.

## Relationships Overview
- `ArticleListing` aggregates many `ArticleContent` entities.
- `WeatherBannerState` is produced by weather helpers and consumed by header components.
- Articles pages (`/articles` and `/articles/[slug]`) consume both `ArticleListing` and `ArticleContent`.

## State Transitions
1. **Content author commits markdown** → validated during Next build → success publishes content; failure halts build with descriptive error.
2. **Runtime weather fetch succeeds** → banner receives `{ kind: "success" }` and renders numeric summary.
3. **Runtime weather fetch fails** → banner receives `{ kind: "error" }` and renders error icon with popover message.
