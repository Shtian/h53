"use client";

import type { Preloaded } from "convex/react";
import { GuestbookGrid } from "@/components/guestbook/GuestbookGrid";
import { Button } from "@/components/ui/button";
import type { api } from "../../../convex/_generated/api";
import { AddEntryButton } from "./AddEntryButton";
import { EditMemoryDialog } from "./EditMemoryDialog";

type GuestbookClientProps = {
  initialEntries: Preloaded<typeof api.guestbook.list>;
};

export function GuestbookClient({ initialEntries }: GuestbookClientProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold text-slate-50">
            Family memories
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Browse shared stories from the cabin crew. Add your own memories at
            any time—photos look great on mobile, too.
          </p>
        </div>
        <AddEntryButton />
      </div>

      <GuestbookGrid
        initialEntries={initialEntries}
        actions={(entry) => (
          <EditMemoryDialog entry={entry}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </EditMemoryDialog>
        )}
      />
    </div>
  );
}
