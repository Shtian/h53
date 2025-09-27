import { mutation, query } from "convex/server";
import { v } from "convex/values";
import { ensureMember } from "./members";

export const listPublic = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    await ensureMember(ctx, args.clerkUserId);
    return await ctx.db.query("guestbookEntries").order("desc").take(100);
  },
});

export const create = mutation({
  args: {
    clerkUserId: v.string(),
    title: v.string(),
    caption: v.string(),
    photoStorageId: v.string(),
    photoUrl: v.string(),
    photoAltText: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    visibility: v.optional(v.literal("public")),
  },
  handler: async (ctx, args) => {
    const member = await ensureMember(ctx, args.clerkUserId);
    const now = new Date().toISOString();
    return await ctx.db.insert("guestbookEntries", {
      familyMemberId: member._id,
      title: args.title,
      caption: args.caption,
      photoStorageId: args.photoStorageId,
      photoUrl: args.photoUrl,
      photoAltText: args.photoAltText,
      tags: args.tags,
      visibility: args.visibility ?? "public",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    clerkUserId: v.string(),
    entryId: v.id("guestbookEntries"),
    title: v.optional(v.string()),
    caption: v.optional(v.string()),
    visibility: v.optional(v.literal("public")),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const member = await ensureMember(ctx, args.clerkUserId);
    const entry = await ctx.db.get(args.entryId);
    if (!entry || entry.familyMemberId !== member._id) {
      throw new Error("Entry not found or you are not the author");
    }
    await ctx.db.patch(args.entryId, {
      title: args.title ?? entry.title,
      caption: args.caption ?? entry.caption,
      visibility: args.visibility ?? entry.visibility,
      tags: args.tags ?? entry.tags,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const remove = mutation({
  args: {
    clerkUserId: v.string(),
    entryId: v.id("guestbookEntries"),
  },
  handler: async (ctx, args) => {
    const member = await ensureMember(ctx, args.clerkUserId);
    const entry = await ctx.db.get(args.entryId);
    if (!entry || entry.familyMemberId !== member._id) {
      throw new Error("Entry not found or you are not the author");
    }
    await ctx.db.delete(args.entryId);
  },
});
