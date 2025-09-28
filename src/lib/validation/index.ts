export * from "./guestbook";

import { z } from "zod";

export const articleInputSchema = z.object({
  title: z.string().min(10).max(120),
  summary: z.string().min(10).max(280),
  contentMarkdown: z.string().min(50),
  category: z.enum(["usage", "maintenance", "safety", "history"] as const),
  coverImageStorageId: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  published: z.boolean().default(false),
});

export const weatherSnapshotSchema = z.object({
  temperatureC: z.number(),
  condition: z.string(),
  windSpeed: z.number(),
  precipitation: z.number(),
  capturedAt: z.string(),
  expiresAt: z.string(),
  rawPayload: z.unknown(),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;
export type WeatherSnapshotInput = z.infer<typeof weatherSnapshotSchema>;
