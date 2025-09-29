"use client";

import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { ReactNode } from "react";
import type { api } from "@/../convex/_generated/api";

import { MemoryCard } from "@/components/guestbook/MemoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { GuestbookEntry } from "@/lib/types";

type GuestbookGridProps = {
  actions?: (entry: GuestbookEntry) => ReactNode;
  initialEntries: Preloaded<typeof api.guestbook.list>;
};

const DOT_CLASSES =
  "pointer-events-none absolute left-[-28px] top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-900 bg-sky-400 shadow-lg shadow-sky-500/40 md:block";

const LINE_CLASSES =
  "pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-slate-700/40 md:block";

export function GuestbookGrid({ actions, initialEntries }: GuestbookGridProps) {
  const data = usePreloadedQuery(initialEntries);

  if (!data) {
    return (
      <div className="relative md:pl-16">
        <div className={LINE_CLASSES} />
        <div className="space-y-10">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative md:pl-12">
              <div className={DOT_CLASSES} />
              <article className="rounded-2xl border border-slate-800/40 bg-slate-900/40 p-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-3 h-8 w-3/5" />
                <Skeleton className="mt-6 h-48 w-full rounded-xl" />
                <Skeleton className="mt-4 h-16 w-full" />
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-10 text-center">
        <p className="text-base font-medium text-slate-100">
          Ingen her bilder ennå. Bli den første til å legge til!
        </p>
      </div>
    );
  }

  return (
    <div className="relative md:pl-16">
      <div className={LINE_CLASSES} />
      <div className="space-y-12">
        {data.map((entry) => (
          <div key={entry.id} className="relative md:pl-12">
            <div className={DOT_CLASSES} />
            <MemoryCard
              memory={entry}
              actions={actions?.(entry)}
              className="md:ml-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
