import Link from "next/link";

import { ArticleList } from "@/components/articles/ArticleList";
import { getOrderedArticleSummaries } from "@/lib/articles";

export const metadata = {
  title: "H53 Cabin Articles",
};

export default async function ArticlesPage() {
  const articles = await getOrderedArticleSummaries();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 text-slate-50">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Usage & maintenance guides</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Keep the cabin running smoothly with curated notes on cleaning routines, seasonal
          shut-downs, and safety tips.
        </p>
      </header>
      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="rounded-3xl border border-slate-200/10 bg-slate-900/50 p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">Ingen artikler publisert ennå</h2>
          <p className="mt-3 text-sm text-slate-300">
            Redaktørteamet jobber med å fylle opp kunnskapsbasen. I mellomtiden finner du viktig
            informasjon på forsiden.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border border-slate-200/30 px-5 py-2 text-sm uppercase tracking-widest text-slate-200 transition hover:border-white hover:text-white"
          >
            Til forsiden
          </Link>
        </div>
      )}
    </div>
  );
}
