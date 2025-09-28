import { preloadQuery } from "convex/nextjs";

import { GuestbookClient } from "./GuestbookClient";
import { api } from "@/../convex/_generated/api";
import { getAuthToken } from "@/lib/auth/clerk";

export const metadata = {
  title: "H53 Guestbook",
};

export default async function GuestbookPage() {
  const token = await getAuthToken();
  const initialEntries = await preloadQuery(api.guestbook.list, {}, { token });

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-10 text-slate-50">
      <GuestbookClient initialEntries={initialEntries} />
    </main>
  );
}
