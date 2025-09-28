import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  guestbookEntries: defineTable({
    authorClerkId: v.string(),
    authorName: v.optional(v.string()),
    authorImageUrl: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    photoStorageId: v.string(),
    photoUrl: v.string(),
    photoAltText: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
    deletedAt: v.optional(v.string()),
  }).index("by_created", ["createdAt"]),
  articles: defineTable({
    familyMemberId: v.id("familyMembers"),
    title: v.string(),
    summary: v.string(),
    contentMarkdown: v.string(),
    coverImageStorageId: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    updatedAt: v.string(),
    publishedAt: v.optional(v.string()),
  }).index("by_published_at", ["publishedAt"]),
  messages: defineTable({
    message: v.string(),
    author: v.string(),
  }),
});
