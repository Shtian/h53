import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Høgfjellia 53",
  description: "Hytteside",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="dark">
      <head>
        <meta name="apple-mobile-web-app-title" content="H53" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100vh] font-sans  bg-slate-950 text-slate-100`}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
