import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  familyMembers: defineTable({
    clerkUserId: v.string(),
    displayName: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
    lastLoginAt: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkUserId"]),
  guestbookEntries: defineTable({
    familyMemberId: v.id("familyMembers"),
    title: v.string(),
    caption: v.string(),
    photoStorageId: v.string(),
    photoUrl: v.string(),
    photoAltText: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    visibility: v.literal("public", "hidden"),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_created", ["createdAt"])
    .index("by_visibility", ["visibility"]),
  articles: defineTable({
    familyMemberId: v.id("familyMembers"),
    title: v.string(),
    summary: v.string(),
    contentMarkdown: v.string(),
    category: v.literal("usage", "maintenance", "safety", "history"),
    coverImageStorageId: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    updatedAt: v.string(),
    publishedAt: v.optional(v.string()),
  })
    .index("by_category", ["category", "publishedAt"])
    .index("by_published_at", ["publishedAt"]),
  weatherSnapshots: defineTable({
    locationCode: v.string(),
    temperatureC: v.float64(),
    condition: v.string(),
    windSpeed: v.float64(),
    precipitation: v.float64(),
    capturedAt: v.string(),
    expiresAt: v.string(),
    source: v.string(),
    rawPayload: v.any(),
  }).index("by_location", ["locationCode", "capturedAt"]),
});
