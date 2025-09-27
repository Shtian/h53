import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getConvexClient } from "@/lib/convex/client";
import { guestbookUpdateSchema } from "@/lib/validation";

interface Params {
  params: { entryId: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json();
  const update = guestbookUpdateSchema.parse(json);
  const client = getConvexClient();
  await client.mutation("guestbook:update", {
    clerkUserId: userId,
    entryId: params.entryId,
    ...update,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = getConvexClient();
  await client.mutation("guestbook:remove", {
    clerkUserId: userId,
    entryId: params.entryId,
  });
  return NextResponse.json({ ok: true });
}
