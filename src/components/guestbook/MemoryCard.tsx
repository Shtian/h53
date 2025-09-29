import Image from "next/image";
import type { ReactNode } from "react";
import type { GuestbookEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

type MemoryCardProps = {
  memory: GuestbookEntry;
  actions?: ReactNode;
  className?: string;
};

export function MemoryCard({ memory, actions, className }: MemoryCardProps) {
  const displayDate = new Date(memory.createdAt);
  const formattedDate = new Intl.DateTimeFormat("nb-no", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(displayDate);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/50 backdrop-blur",
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-300/80">
            {formattedDate}
          </p>
          <h3 className="text-2xl font-semibold text-slate-50">
            {memory.title}
          </h3>
          {memory.authorName ? (
            <p className="text-xs text-slate-400">
              Shared by {memory.authorName}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="ml-auto flex gap-2 text-slate-200">{actions}</div>
        ) : null}
      </header>

      <div className="relative mt-5 flex items-center justify-center overflow-hidden ">
        <Image
          src={memory.photoUrl}
          alt={memory.photoAltText ?? memory.title}
          width={960}
          height={1280}
          sizes="(max-width: 768px) 100vw, 75vw"
          className="h-auto max-h-[30rem] w-full object-contain"
        />
      </div>

      {memory.description ? (
        <p className="mt-4 text-sm leading-relaxed text-slate-200">
          {memory.description}
        </p>
      ) : null}
    </article>
  );
}
