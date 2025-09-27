"use client";

import { useEffect, useState } from "react";

type Article = {
  _id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt?: string;
  updatedAt: string;
};

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/articles", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to load articles");
        const data = await response.json();
        setArticles(
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

  if (loading) return <p className="text-slate-200">Loading guides…</p>;
  if (error) return <p className="text-red-300">{error}</p>;

  if (articles.length === 0) {
    return <p className="text-slate-300">No articles published yet. Check back soon!</p>;
  }

  return (
    <div className="space-y-6">
      {articles.map(article => (
        <article key={article._id} className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-slate-500">
            <span>{article.category}</span>
            <span>
              {(article.publishedAt ?? article.updatedAt) &&
                new Date(article.publishedAt ?? article.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">{article.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{article.summary}</p>
        </article>
      ))}
    </div>
  );
}
