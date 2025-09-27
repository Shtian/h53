import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getConvexClient } from "@/lib/convex/client";
import { guestbookInputSchema } from "@/lib/validation";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = getConvexClient();
  const entries = await client.query("guestbook:listPublic", {
    clerkUserId: userId,
  });
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json();
  const payload = guestbookInputSchema.parse(json);
  const client = getConvexClient();
  const id = await client.mutation("guestbook:create", {
    clerkUserId: userId,
    ...payload,
  });
  return NextResponse.json({ id }, { status: 201 });
}
