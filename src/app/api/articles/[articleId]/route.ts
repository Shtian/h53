import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getConvexClient } from "@/lib/convex/client";

interface Params {
  params: { articleId: string };
}

export async function GET(_: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = getConvexClient();
  const article = await client.query("articles:get", {
    clerkUserId: userId,
    articleId: params.articleId,
  });
  if (!article) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(article);
}
