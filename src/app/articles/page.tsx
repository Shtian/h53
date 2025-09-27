import { ArticleList } from "@/components/articles/ArticleList";

export const metadata = {
  title: "H53 Cabin Articles",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 text-slate-50">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Usage & maintenance guides</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Keep the cabin running smoothly with curated notes on cleaning routines, seasonal
          shut-downs, and safety tips.
        </p>
      </header>
      <ArticleList />
    </div>
  );
}
