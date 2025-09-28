# Phase 0 Research: Complete the Articles Page

## Decision 1: Markdown source and manual ordering
- **Decision**: Store article markdown files under `content/articles/{slug}.md` with frontmatter fields `{ title: string, publishedAt: string (ISO), order: number, summary?: string }`; the build will sort by `order` ascending and fall back to `publishedAt`.
- **Rationale**: A dedicated `content/` tree keeps editorial assets alongside code, supports git-based versioning, and the `order` field satisfies the manual-listing requirement while still allowing chronological fallback.
- **Alternatives considered**:
  - `src/content` directory – rejected to keep app code (TypeScript) separate from markdown resources.
  - Using Convex collections – rejected because the spec mandates local markdown and avoiding new persistence.

## Decision 2: Markdown parsing and rendering pipeline
- **Decision**: Parse files with `gray-matter` for frontmatter, validate via Zod, and render body content in server components using `react-markdown` with the `remark-gfm` and `rehype-slug` plugins.
- **Rationale**: `react-markdown` works in RSC contexts, keeps dependencies light, and supports GitHub-flavored markdown features that editors expect; Zod validation enforces required metadata before rendering.
- **Alternatives considered**:
  - Adopting MDX/`@next/mdx` – rejected to avoid complex bundling and maintain pure markdown simplicity for non-technical editors.
  - Converting to raw HTML with `unified` + `rehype-stringify` – rejected because it would require `dangerouslySetInnerHTML` and lose React component overrides.

## Decision 3: Tailwind typography styling approach
- **Decision**: Add the official `@tailwindcss/typography` plugin through the existing Tailwind PostCSS entrypoint and apply `prose prose-invert` classes to article bodies.
- **Rationale**: The plugin delivers consistent typographic defaults with minimal custom CSS, aligning with the requirement to use Tailwind typography while keeping styling utility-first.
- **Alternatives considered**:
  - Hand-curating typography utilities for each HTML tag – rejected for maintenance overhead and inconsistent spacing.
  - Introducing a custom CSS module – rejected due to the Tailwind-only constraint.

## Decision 4: Weather fallback and build failure handling
- **Decision**: Extend weather snapshot utilities to return a discriminated union `{ kind: "success" | "error" }`, render an error icon + popover via Radix Popover when `kind === "error"`, and throw during build if any referenced markdown file fails validation or reading.
- **Rationale**: A typed union keeps header consumers explicit about failure states, and throwing in the loader ensures unreadable content halts deployment per the spec while still surfacing a friendly runtime fallback if weather fails.
- **Alternatives considered**:
  - Keeping weather summary as a plain string – rejected because it cannot signal the UI to show the required popover fallback.
  - Swallowing build errors and filtering articles at runtime – rejected to honor the “fail the build” requirement and avoid shipping partial content.
