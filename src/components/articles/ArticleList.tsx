import Link from "next/link";

import type { ArticleSummary } from "@/lib/articles/content";

type ArticleListProps = {
  articles: ArticleSummary[];
};

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <article
          key={article.slug}
          className="rounded-3xl border border-slate-200/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-900/20 transition hover:border-slate-200/40"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-slate-400">
            <span>
              {new Date(article.publishedAt).toLocaleDateString("nb-NO", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            <Link
              href={`/articles/${article.slug}`}
              className="hover:underline"
            >
              {article.title}
            </Link>
          </h3>
          {article.summary ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {article.summary}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
