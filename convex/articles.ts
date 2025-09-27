import { mutation, query } from "convex/server";
import { v } from "convex/values";
import { ensureMember } from "./members";

export const list = query({
  args: {
    clerkUserId: v.string(),
    category: v.optional(v.literal("usage", "maintenance", "safety", "history")),
  },
  handler: async (ctx, args) => {
    await ensureMember(ctx, args.clerkUserId);
    const items = await ctx.db.query("articles").collect();
    return items
      .filter(article => (args.category ? article.category === args.category : true))
      .sort((a, b) => (b.publishedAt ?? b.updatedAt).localeCompare(a.publishedAt ?? a.updatedAt))
      .slice(0, 100);
  },
});

export const get = query({
  args: {
    clerkUserId: v.string(),
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    await ensureMember(ctx, args.clerkUserId);
    return await ctx.db.get(args.articleId);
  },
});

export const upsert = mutation({
  args: {
    clerkUserId: v.string(),
    articleId: v.optional(v.id("articles")),
    title: v.string(),
    summary: v.string(),
    contentMarkdown: v.string(),
    category: v.literal("usage", "maintenance", "safety", "history"),
    coverImageStorageId: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    publish: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const member = await ensureMember(ctx, args.clerkUserId);
    const now = new Date().toISOString();
    if (args.articleId) {
      await ctx.db.patch(args.articleId, {
        title: args.title,
        summary: args.summary,
        contentMarkdown: args.contentMarkdown,
        category: args.category,
        coverImageStorageId: args.coverImageStorageId,
        coverImageUrl: args.coverImageUrl,
        updatedAt: now,
        publishedAt: args.publish ? now : undefined,
      });
      return args.articleId;
    }
    return await ctx.db.insert("articles", {
      familyMemberId: member._id,
      title: args.title,
      summary: args.summary,
      contentMarkdown: args.contentMarkdown,
      category: args.category,
      coverImageStorageId: args.coverImageStorageId,
      coverImageUrl: args.coverImageUrl,
      updatedAt: now,
      publishedAt: args.publish ? now : undefined,
    });
  },
});
