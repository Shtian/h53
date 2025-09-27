import type { QueryCtx, MutationCtx } from "convex/server";
export async function ensureMember(ctx: QueryCtx | MutationCtx, clerkUserId: string) {
  const existing = await ctx.db
    .query("familyMembers")
    .withIndex("by_clerk_id", q => q.eq("clerkUserId", clerkUserId))
    .unique();
  const now = new Date().toISOString();

  if (existing) {
    await ctx.db.patch(existing._id, {
      updatedAt: now,
      lastLoginAt: now,
    });
    return existing;
  }

  const memberId = await ctx.db.insert("familyMembers", {
    clerkUserId,
    displayName: "Cabin Member",
    photoUrl: undefined,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  });
  const newMember = await ctx.db.get(memberId);
  if (!newMember) {
    throw new Error("Failed to create member");
  }
  return newMember;
}
