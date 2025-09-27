import { z } from "zod";

export const guestbookInputSchema = z.object({
  title: z.string().min(3).max(120),
  caption: z.string().min(1).max(1000),
  photoStorageId: z.string(),
  photoUrl: z.string().url(),
  photoAltText: z.string().max(160).optional(),
  tags: z.array(z.string().max(24)).max(8).optional(),
  visibility: z.enum(["public", "hidden"]).default("public"),
});

export const guestbookUpdateSchema = guestbookInputSchema.partial();

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

export type GuestbookInput = z.infer<typeof guestbookInputSchema>;
export type GuestbookUpdateInput = z.infer<typeof guestbookUpdateSchema>;
export type ArticleInput = z.infer<typeof articleInputSchema>;
export type WeatherSnapshotInput = z.infer<typeof weatherSnapshotSchema>;
