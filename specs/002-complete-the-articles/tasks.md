# Tasks: Complete the Articles Page

**Input**: Design documents from `/specs/002-complete-the-articles/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Task List
1. [X] **T001** Scaffold `/Users/shtian/Code/shtian/h53/content/articles/` with a `.gitkeep` (or README) and a sample `welcome.md` containing required frontmatter (`title`, `publishedAt`, `order`, optional `summary`) plus example markdown body for development.
2. [X] **T002** Implement local markdown/frontmatter parsing utilities without new npm installs (network restricted); document fallback approach in code comments.
3. [X] **T003 [P]** Import the shadcn Popover primitive as `src/components/ui/popover.tsx` (via `pnpm dlx shadcn-ui@latest add popover` or copying the upstream snippet) to support the weather error popover.
4. [X] **T004 [P]** Implement the `ArticleFrontmatter` Zod schema and exports in `src/lib/articles/frontmatter.ts`, matching the required fields and throwing friendly errors for invalid metadata.
5. [X] **T005 [P]** Implement the `ArticleContent` schema/types in `src/lib/articles/content.ts`, composing frontmatter validation with the markdown body string contract.
6. [X] **T006 [P]** Build filesystem loaders in `src/lib/articles/index.ts` that read `content/articles`, parse the frontmatter with the local fallback parser, validate via the schemas, sort by `order` then `publishedAt`, log failures with `src/lib/logging.ts`, and throw during build on unreadable files.
7. [X] **T007 [P]** Define the `WeatherBannerState` union (success/error) and helpers in `src/lib/weather/state.ts`, re-exporting from `src/lib/weather/types.ts` for downstream use.
8. [X] **T008** Update `src/lib/weather/getCachedSnapshot.ts` to return the new union, supplying friendly error messages and logging once per failure.
9. [X] **T009** Update `src/components/layout/HeaderData.tsx` and `src/components/layout/HeaderShell.tsx` to consume `WeatherBannerState`, render the success summary, or show an error icon + Popover message while preserving Clerk controls.
10. [X] **T010** Refactor `src/components/articles/ArticleList.tsx` into a server component that accepts an `ArticleSummary[]`, removes hard-coded data, formats cards with publish date + optional summary, and links to `/articles/[slug]`.
11. [X] **T011** Update `/Users/shtian/Code/shtian/h53/src/app/articles/page.tsx` to load article summaries via the loader, render the list, and show the empty-state card with homepage link when no articles exist.
12. [X] **T012** Update `/Users/shtian/Code/shtian/h53/src/app/articles/[articleId]/page.tsx` to fetch article content via the loader, implement `generateStaticParams` + `generateMetadata`, render with `<article className="prose prose-slate lg:prose-xl">` using `react-markdown`, and call `notFound()` for missing slugs.
13. [X] **T013 [P]** Manual verification: signed-in flow — follow quickstart steps 1–3 to confirm authenticated navigation, ordered listing, and Tailwind typography; note results and screenshots if applicable.
14. [X] **T014 [P]** Manual verification: weather fallback — simulate a weather failure per quickstart step 4 and confirm the error icon + popover copy, capturing logging output location.
15. [X] **T015 [P]** Manual verification: empty state & build guard — execute quickstart steps 5–6 to confirm the empty-state card and that `pnpm build` fails when an article file is invalid, restoring files afterward.
16. [X] **T016** Update `/Users/shtian/Code/shtian/h53/specs/002-complete-the-articles/quickstart.md` with the verification date, tester initials, and observed outcomes from T013–T015.
17. [X] **T017 [P]** Run `.specify/scripts/bash/update-agent-context.sh codex` so `AGENTS.md` reflects the new markdown tooling and article workflow.
18. **T018 [P]** Run `pnpm lint`, address any violations, and record the command outcome in this task log or plan. (Attempted – fails under sandbox because `@rushstack/eslint-patch` cannot resolve without Node module metadata; requires local run.)


## Dependencies
- T001 → completes before loaders, styling, or verification.
- T002 → required before any code consumes markdown tooling (T004–T012).
- T003 → required before header popover work (T009).
- T004 & T005 → must finish before the filesystem loader (T006).
- T006 → prerequisite for ArticleList/Page detail updates (T010–T012).
- T007 → prerequisite for weather integration updates (T008–T009).
- T010–T012 → must complete before manual verification tasks (T013–T015).
- T013–T015 → must complete before documenting outcomes (T016).
- T016 → should precede polish tasks (T017–T018).


## Parallel Execution Example
```
# After finishing T012 you can run these independently:
task-agent run T013  # Manual signed-in verification
task-agent run T014  # Weather fallback verification
task-agent run T015  # Empty state & build guard check

# Tooling/documentation polish that can happen together:
task-agent run T017
task-agent run T018
```


## Notes
- Tailwind typography is already configured; apply classes like `prose prose-slate lg:prose-xl` without introducing a `tailwind.config` file.
- All new UI pieces must remain Clerk-gated via the existing layout; do not introduce public routes.
- Article loaders should be server-only modules (use `import "server-only";`) to avoid bundling fs logic in the client.
- When running manual verification that temporarily edits content, restore the original files before proceeding to the next task.
- Record any intentional deviations or follow-up work in the plan’s Progress Tracking section before closing tasks.
