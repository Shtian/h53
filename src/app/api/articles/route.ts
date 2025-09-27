import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getConvexClient } from "@/lib/convex/client";
import { articleInputSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const categoryParam = request.nextUrl.searchParams.get("category") ?? undefined;
  const allowedCategories = ["usage", "maintenance", "safety", "history"] as const;
  const category = allowedCategories.includes(categoryParam as any)
    ? (categoryParam as (typeof allowedCategories)[number])
    : undefined;
  const client = getConvexClient();
  const articles = await client.query("articles:list", {
    clerkUserId: userId,
    category,
  });
  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json();
  const payload = articleInputSchema.parse(json);
  const { published, ...rest } = payload;
  const client = getConvexClient();
  const id = await client.mutation("articles:upsert", {
    clerkUserId: userId,
    ...rest,
    publish: published ?? false,
  });
  return NextResponse.json({ id }, { status: 200 });
}
