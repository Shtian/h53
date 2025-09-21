import { z } from "zod";

/**
 * Placeholder schema to validate that the package wiring is functional.
 * Real domain entities are defined during Phase 3.3 tasks (T016-T019).
 */
export const placeholderEntitySchema = z.object({
  id: z.string().uuid("placeholder"),
  createdAt: z.date()
});

export type PlaceholderEntity = z.infer<typeof placeholderEntitySchema>;
