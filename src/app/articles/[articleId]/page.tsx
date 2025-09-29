import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getArticleContent, loadArticleSlugs } from "@/lib/articles";
import { markdownToHtml } from "@/lib/articles/markdown";

export async function generateStaticParams() {
  const slugs = await loadArticleSlugs();
  return slugs.map((slug) => ({ articleId: slug }));
}

type ArticlePageParams = { articleId: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticlePageParams>;
}): Promise<Metadata> {
  const { articleId } = await params;
  const article = await getArticleContent(articleId);
  if (!article) {
    return {
      title: "Artikkel · H53",
    };
  }

  return {
    title: `${article.frontmatter.title} · H53`,
    description: article.frontmatter.summary,
  } satisfies Metadata;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<ArticlePageParams>;
}) {
  const { articleId } = await params;
  const article = await getArticleContent(articleId);

  if (!article) {
    notFound();
  }

  const html = markdownToHtml(article.body);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12 text-slate-50">
      <Link
        className="text-sm text-slate-300 transition hover:text-white"
        href="/articles"
      >
        ← Tilbake til informasjon
      </Link>
      <article
        className="prose prose-slate lg:prose-xl prose-invert max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown content
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
