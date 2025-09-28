import { z } from "zod";

const isoDateString = z
  .string()
  .min(1, "publishedAt is required")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "publishedAt must be an ISO 8601 date string",
  });

const orderField = z
  .union([
    z.number(),
    z
      .string()
      .min(1, "order is required")
      .transform((value) => Number.parseInt(value, 10)),
  ])
  .pipe(
    z
      .number()
      .int("order must be an integer")
      .min(0, "order must be at least 0")
      .max(999, "order must be 999 or less"),
  );

export const ArticleFrontmatterSchema = z.object({
  title: z
    .string()
    .min(1, "title is required")
    .max(160, "title must be 160 characters or less"),
  publishedAt: isoDateString,
  order: orderField,
  summary: z
    .string()
    .min(20, "summary should provide a short description")
    .max(320, "summary must be 320 characters or less")
    .optional(),
});

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

export function validateArticleFrontmatter(input: unknown): ArticleFrontmatter {
  return ArticleFrontmatterSchema.parse(input);
}
