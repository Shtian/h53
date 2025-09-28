import { ClerkProvider } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";

export function CabinClerkProvider({ children }: PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export async function getAuthToken() {
  return (await (await auth()).getToken({ template: "convex" })) ?? undefined;
}
