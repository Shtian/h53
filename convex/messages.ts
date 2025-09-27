import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("author"), identity.email))
      .collect();
  },
});

export const postMessage = mutation({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.email) throw Error("No identity or email found");

    const newMessageId = await ctx.db.insert("messages", {
      message: args.message,
      author: identity.email,
    });
    return newMessageId;
  },
});
