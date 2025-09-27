import { ClerkProvider } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";

export function CabinClerkProvider({ children }: PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
