"use client";

type GuestbookEntry = {
  _id: string;
  title: string;
  caption: string;
  photoUrl: string;
  tags?: string[];
  createdAt: string;
};

export function GuestbookGrid() {
  const entries: GuestbookEntry[] = [
    {
      _id: "abc",
      caption: "kult",
      createdAt: new Date().getTime + "",
      photoUrl: "https://placehold.co/600x400",
      title: "Påske",
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <article
          key={entry._id}
          className="overflow-hidden rounded-2xl bg-white/90 shadow-lg shadow-slate-900/20"
        >
          <img
            src={entry.photoUrl}
            alt={entry.title}
            className="h-48 w-full object-cover"
          />
          <div className="space-y-3 p-5 text-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500">
              <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
              {entry.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {entry.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {entry.caption}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
