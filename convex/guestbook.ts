import { v } from "convex/values";
import {
  type GuestbookEntryCreateInput,
  type GuestbookEntryUpdateInput,
  guestbookEntryCreateSchema,
  guestbookEntryUpdateSchema,
} from "../src/lib/validation";
import type { Id } from "./_generated/dataModel";
import {
  type MutationCtx,
  mutation,
  type QueryCtx,
  query,
} from "./_generated/server";

async function requireIdentity(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}

function validateCreateInput(input: GuestbookEntryCreateInput) {
  return guestbookEntryCreateSchema.parse(input);
}

function validateUpdateInput(input: GuestbookEntryUpdateInput) {
  return guestbookEntryUpdateSchema.parse(input);
}

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireIdentity(ctx);
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return { uploadUrl };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireIdentity(ctx);

    const entries = await ctx.db
      .query("guestbookEntries")
      .withIndex("by_created")
      .order("desc")
      .filter((q) => q.eq(q.field("deletedAt"), undefined))
      .collect();

    return entries.map((entry) => ({
      ...entry,
      id: entry._id,
    }));
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageStorageId: v.string(),
    imageAltText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const input = validateCreateInput(args);

    const storageId = input.imageStorageId as Id<"_storage">;
    const photoUrl = await ctx.storage.getUrl(storageId);
    if (!photoUrl) {
      throw new Error("Image upload not found");
    }

    const now = new Date().toISOString();

    const entryId = await ctx.db.insert("guestbookEntries", {
      authorClerkId: identity.subject,
      authorName: identity.name ?? identity.email ?? undefined,
      authorImageUrl: identity.pictureUrl ?? undefined,
      title: input.title,
      description: input.description,
      photoStorageId: input.imageStorageId,
      photoUrl,
      photoAltText: input.imageAltText,
      createdAt: now,
      updatedAt: now,
    });

    // ctx.log.info("guestbook.create", {
    //   entryId,
    //   clerkId: identity.subject,
    //   storageId: input.imageStorageId,
    // });

    return entryId;
  },
});

export const update = mutation({
  args: {
    id: v.id("guestbookEntries"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageStorageId: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
  },
  handler: async (ctx, rawArgs) => {
    const identity = await requireIdentity(ctx);
    const args = validateUpdateInput(rawArgs);

    const entryId = args.id as Id<"guestbookEntries">;
    const entry = await ctx.db.get(entryId);
    if (!entry || entry.deletedAt) {
      throw new Error("Memory not found");
    }

    if (entry.authorClerkId !== identity.subject) {
      throw new Error("Not authorised to edit this memory");
    }

    const updates: Partial<typeof entry> = {};

    if (args.title !== undefined) {
      updates.title = args.title;
    }
    if (args.description !== undefined) {
      updates.description = args.description;
    }
    if (args.imageAltText !== undefined) {
      updates.photoAltText = args.imageAltText;
    }

    if (args.imageStorageId !== undefined) {
      const newStorageId = args.imageStorageId as Id<"_storage">;
      const newUrl = await ctx.storage.getUrl(newStorageId);
      if (!newUrl) {
        throw new Error("Updated image upload not found");
      }
      await ctx.storage.delete(entry.photoStorageId as Id<"_storage">);
      updates.photoStorageId = args.imageStorageId;
      updates.photoUrl = newUrl;
    }

    updates.updatedAt = new Date().toISOString();

    await ctx.db.patch(entryId, updates);

    // ctx.log.info("guestbook.update", {
    //   entryId,
    //   clerkId: identity.subject,
    //   storageId: updates.photoStorageId ?? entry.photoStorageId,
    // });

    return { success: true };
  },
});

export const deleteMemory = mutation({
  args: { id: v.id("guestbookEntries") },
  handler: async (ctx, { id }) => {
    const identity = await requireIdentity(ctx);

    const entry = await ctx.db.get(id);
    if (!entry || entry.deletedAt) {
      throw new Error("Memory not found");
    }

    if (entry.authorClerkId !== identity.subject) {
      throw new Error("Not authorised to delete this memory");
    }

    await ctx.db.patch(id, {
      deletedAt: new Date().toISOString(),
    });

    await ctx.storage.delete(entry.photoStorageId as Id<"_storage">);

    // ctx.log.info("guestbook.delete", {
    //   entryId: id,
    //   clerkId: identity.subject,
    //   storageId: entry.photoStorageId,
    // });

    return { success: true };
  },
});
