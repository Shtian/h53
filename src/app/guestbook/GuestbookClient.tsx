"use client";

import type { Preloaded } from "convex/react";
import { Pencil } from "lucide-react";
import type { api } from "@/../convex/_generated/api";
import { GuestbookGrid } from "@/components/guestbook/GuestbookGrid";
import { Button } from "@/components/ui/button";
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
          <h1 className="text-4xl font-semibold text-slate-50">Hyttebilder</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Se bilder og last opp dine egne!
          </p>
        </div>
        <AddEntryButton />
      </div>

      <GuestbookGrid
        initialEntries={initialEntries}
        actions={(entry) => (
          <EditMemoryDialog entry={entry}>
            <Button variant="ghost" size="sm">
              <Pencil /> Endre
            </Button>
          </EditMemoryDialog>
        )}
      />
    </div>
  );
}
