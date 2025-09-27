import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { fetchYrNoSnapshot } from "@/lib/weather/fetchYrNo";

async function getWeatherSummary() {
  try {
    const snapshot = await fetchYrNoSnapshot();
    const temperature = Math.round(snapshot.temperatureC * 10) / 10;
    return `${temperature.toFixed(1)}°C · ${snapshot.condition}`;
  } catch (error) {
    console.warn("Unable to fetch weather", error);
    return "Weather unavailable";
  }
}

export async function Header() {
  const weather = await getWeatherSummary();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/40 bg-slate-900/80 px-6 py-4 text-slate-100 backdrop-blur">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
          <span className="rounded bg-slate-800 px-2 py-1">H53</span>
          <span>Family Cabin</span>
        </Link>
        <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
          <Link className="hover:text-white" href="/guestbook">
            Guestbook
          </Link>
          <Link className="hover:text-white" href="/articles">
            Articles
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="hidden rounded-full bg-slate-800/60 px-3 py-1 md:inline">{weather}</span>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton afterSignInUrl="/" />
        </SignedOut>
      </div>
    </header>
  );
}
