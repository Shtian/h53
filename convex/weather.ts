import { mutation, query } from "convex/server";
import { v } from "convex/values";
import { ensureMember } from "./members";

const LOCATION_CODE = "61.17553,10.63208";

export const latest = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    await ensureMember(ctx, args.clerkUserId);
    return await ctx.db
      .query("weatherSnapshots")
      .withIndex("by_location", q => q.eq("locationCode", LOCATION_CODE))
      .order("desc")
      .first();
  },
});

export const upsert = mutation({
  args: {
    temperatureC: v.float64(),
    condition: v.string(),
    windSpeed: v.float64(),
    precipitation: v.float64(),
    capturedAt: v.string(),
    expiresAt: v.string(),
    rawPayload: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("weatherSnapshots")
      .withIndex("by_location", q => q.eq("locationCode", LOCATION_CODE))
      .order("desc")
      .first();

    if (existing && existing.capturedAt === args.capturedAt) {
      await ctx.db.patch(existing._id, {
        temperatureC: args.temperatureC,
        condition: args.condition,
        windSpeed: args.windSpeed,
        precipitation: args.precipitation,
        expiresAt: args.expiresAt,
        rawPayload: args.rawPayload,
      });
      return existing._id;
    }

    return await ctx.db.insert("weatherSnapshots", {
      locationCode: LOCATION_CODE,
      temperatureC: args.temperatureC,
      condition: args.condition,
      windSpeed: args.windSpeed,
      precipitation: args.precipitation,
      capturedAt: args.capturedAt,
      expiresAt: args.expiresAt,
      source: "yr.no",
      rawPayload: args.rawPayload,
    });
  },
});
