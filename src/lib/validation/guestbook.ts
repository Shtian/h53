import { z } from "zod";

export const guestbookEntryCreateSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(1000).optional(),
  imageStorageId: z.string().min(1),
  imageAltText: z.string().max(160).optional(),
});

export const guestbookEntryUpdateSchema = z
  .object({
    id: z.string(),
    title: z.string().min(3).max(120).optional(),
    description: z.string().max(1000).optional(),
    imageStorageId: z.string().min(1).optional(),
    imageAltText: z.string().max(160).optional(),
  })
  .refine(
    (value) =>
      value.title !== undefined ||
      value.description !== undefined ||
      value.imageStorageId !== undefined ||
      value.imageAltText !== undefined,
    {
      message: "Update must include at least one field to change.",
      path: ["title"],
    },
  );

export type GuestbookEntryCreateInput = z.infer<typeof guestbookEntryCreateSchema>;
export type GuestbookEntryUpdateInput = z.infer<typeof guestbookEntryUpdateSchema>;
