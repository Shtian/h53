import { z } from "zod";

import {
  ArticleFrontmatterSchema,
  type ArticleFrontmatter,
} from "@/lib/articles/frontmatter";

export const ArticleContentSchema = z.object({
  slug: z.string().min(1, "slug is required"),
  frontmatter: ArticleFrontmatterSchema,
  body: z.string().min(1, "article body cannot be empty"),
});

export type ArticleContent = z.infer<typeof ArticleContentSchema>;

export type ArticleSummary = {
  slug: string;
  title: string;
  publishedAt: string;
  order: number;
  summary?: string;
};

export function validateArticleContent(input: unknown): ArticleContent {
  return ArticleContentSchema.parse(input);
}

export function toArticleSummary(content: ArticleContent): ArticleSummary {
  return {
    slug: content.slug,
    title: content.frontmatter.title,
    publishedAt: content.frontmatter.publishedAt,
    order: content.frontmatter.order,
    summary: content.frontmatter.summary,
  } satisfies ArticleSummary;
}

export function sortArticleSummaries(
  entries: ReadonlyArray<ArticleSummary>,
): ArticleSummary[] {
  return [...entries].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }

    const publishedA = Date.parse(a.publishedAt);
    const publishedB = Date.parse(b.publishedAt);

    if (Number.isNaN(publishedA) || Number.isNaN(publishedB)) {
      return 0;
    }

    return publishedB - publishedA;
  });
}

export type ParsedArticleFile = ArticleFrontmatter & { body: string };
