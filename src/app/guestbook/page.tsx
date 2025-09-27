import { GuestbookGrid } from "@/components/guestbook/GuestbookGrid";

export const metadata = {
  title: "H53 Guestbook",
};

export default function GuestbookPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 text-slate-50">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Family memories</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Browse cabin updates and shared stories from relatives. Once you sign in, you can add your own memories right from this page.
        </p>
      </header>
      <GuestbookGrid />
    </div>
  );
}
