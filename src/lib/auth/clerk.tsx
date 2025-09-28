import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { PropsWithChildren } from "react";

export function CabinClerkProvider({ children }: PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export async function getAuthToken() {
  return (await (await auth()).getToken({ template: "convex" })) ?? undefined;
}
