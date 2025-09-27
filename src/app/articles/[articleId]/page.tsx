import type { Metadata } from "next";
import Link from "next/link";

function loadArticle(articleId: string) {
  return {
    _id: "abc",
    summary: "Badstue guide",
    title: "Badstue",
    updatedAt: new Date().getTime().toString(),
  };
}

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const article = loadArticle(params.articleId);
  return {
    title: article ? `${article.title} · H53 Cabin` : "Article · H53 Cabin",
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { articleId: string };
}) {
  const article = loadArticle(params.articleId);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12 text-slate-50">
      <Link
        className="text-sm text-slate-300 hover:text-white"
        href="/articles"
      >
        ← Back to articles
      </Link>
      <div className="space-y-3"></div>
      <article className="prose prose-invert max-w-none">
        <h1>{article.title}</h1>
      </article>
    </div>
  );
}
