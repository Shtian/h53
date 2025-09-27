import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Authenticated, Unauthenticated } from "convex/react";
import ConvexClientProvider from "@/lib/convex/convex-clerk-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H53 Family Cabin",
  description:
    "Weather, guestbook memories, and maintenance knowledge for the H53 family cabin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="bg-slate">
      <ClerkProvider>
        <ConvexClientProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-transparent`}
          >
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <Authenticated>
                <UserButton />
              </Authenticated>
              <Unauthenticated>
                <SignInButton>
                  <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Logg inn
                  </button>
                </SignInButton>
              </Unauthenticated>
            </header>
            <main className="flex min-h-[calc(100vh-4rem)] flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-50">
              {children}
            </main>
          </body>
        </ConvexClientProvider>
      </ClerkProvider>
    </html>
  );
}
