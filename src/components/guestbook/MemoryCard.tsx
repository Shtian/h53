import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MemoryCardProps = {
  memory: {
    id: string;
    title: string;
    description?: string | null;
    photoUrl: string;
    photoAltText?: string | null;
    createdAt: string;
    authorName?: string | null;
  };
  actions?: ReactNode;
  className?: string;
};

export function MemoryCard({ memory, actions, className }: MemoryCardProps) {
  const displayDate = new Date(memory.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(displayDate);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/90 shadow-lg shadow-slate-900/20",
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={memory.photoUrl}
          alt={memory.photoAltText ?? memory.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-5 text-slate-800">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              {formattedDate}
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              {memory.title}
            </h3>
            {memory.authorName ? (
              <p className="text-xs text-slate-500">Shared by {memory.authorName}</p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0 text-right">{actions}</div> : null}
        </header>
        {memory.description ? (
          <p className="text-sm leading-relaxed text-slate-600">
            {memory.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}
