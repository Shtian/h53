"use client";

type Article = {
  _id: string;
  title: string;
  summary: string;
  publishedAt?: string;
  updatedAt: string;
};

export function ArticleList() {
  const articles: Article[] = [
    {
      _id: "abc",
      summary: "Badstue guide",
      title: "Badstue",
      updatedAt: new Date().getTime().toString(),
    },
  ];

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <article
          key={article._id}
          className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-slate-900/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-slate-500">
            <span>
              {(article.publishedAt ?? article.updatedAt) &&
                new Date(
                  article.publishedAt ?? article.updatedAt
                ).toLocaleDateString()}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">
            {article.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {article.summary}
          </p>
        </article>
      ))}
    </div>
  );
}
