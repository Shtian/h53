"use client";

import { ReactNode } from "react";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

import { MemoryCard } from "@/components/guestbook/MemoryCard";
import type { GuestbookEntry } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

type GuestbookGridProps = {
  actions?: (entry: GuestbookEntry) => ReactNode;
  initialEntries?: Preloaded<typeof api.guestbook.list>;
};

export function GuestbookGrid({ actions, initialEntries }: GuestbookGridProps) {
  const data = usePreloadedQuery(initialEntries);

  if (!data) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[320px] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-10 text-center">
        <p className="text-base font-medium text-slate-100">
          No memories yet. Be the first to add one!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((entry) => (
        <MemoryCard key={entry.id} memory={entry} actions={actions?.(entry)} />
      ))}
    </div>
  );
}
