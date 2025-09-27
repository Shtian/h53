"use client";

import { useEffect, useState } from "react";

type GuestbookEntry = {
  _id: string;
  title: string;
  caption: string;
  photoUrl: string;
  photoAltText?: string;
  tags?: string[];
  createdAt: string;
};

export function GuestbookGrid() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/guestbook", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to load guestbook");
        const data = await response.json();
        setEntries(
          (data as any[]).map(item => ({
            ...item,
            _id: String(item._id ?? crypto.randomUUID()),
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <p className="text-slate-200">Loading memories…</p>;
  }

  if (error) {
    return <p className="text-red-300">{error}</p>;
  }

  if (entries.length === 0) {
    return <p className="text-slate-300">No guestbook entries yet. Be the first to share a memory!</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {entries.map(entry => (
        <article key={entry._id} className="overflow-hidden rounded-2xl bg-white/90 shadow-lg shadow-slate-900/20">
          <img
            src={entry.photoUrl}
            alt={entry.photoAltText ?? entry.title}
            className="h-48 w-full object-cover"
          />
          <div className="space-y-3 p-5 text-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500">
              <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
              {entry.tags?.map(tag => (
                <span key={tag} className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-white">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{entry.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{entry.caption}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
