import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getConvexClient } from "@/lib/convex/client";

async function loadArticle(articleId: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const client = getConvexClient();
  return await client.query("articles:get", {
    clerkUserId: userId,
    articleId,
  });
}

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const article = await loadArticle(params.articleId);
  return {
    title: article ? `${article.title} · H53 Cabin` : "Article · H53 Cabin",
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { articleId: string };
}) {
  const article = await loadArticle(params.articleId);
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-slate-50">
        <p>
          Article not found.{" "}
          <Link className="underline" href="/articles">
            Return to articles
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12 text-slate-50">
      <Link
        className="text-sm text-slate-300 hover:text-white"
        href="/articles"
      >
        ← Back to articles
      </Link>
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-slate-400">
          {article.category}
        </span>
        <h1 className="text-4xl font-semibold">{article.title}</h1>
        <p className="text-sm text-slate-300">
          {(article.publishedAt ?? article.updatedAt) &&
            new Date(
              article.publishedAt ?? article.updatedAt
            ).toLocaleDateString()}
        </p>
      </div>
      <article className="prose prose-invert max-w-none">
        <p>{article.summary}</p>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: article.contentMarkdown }} />
      </article>
    </div>
  );
}
