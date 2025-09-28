"use client";

import { useState, type CSSProperties } from "react";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type HeaderShellProps = {
  weatherSummary: string;
};

const HEADER_STYLE = { "--header-height": "4rem" } as CSSProperties;

export function HeaderShell({ weatherSummary }: HeaderShellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/40 bg-slate-900 px-6 py-4 text-slate-100 backdrop-blur"
      style={HEADER_STYLE}
    >
      <div className="flex items-center gap-3">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="uppercase tracking-widest md:hidden"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls="header-mobile-drawer"
            >
              Meny
            </Button>
          </DrawerTrigger>
          <DrawerContent className="min-h-[50svh] p-0 bg-slate-900 text-slate-400 border-none">
            <div
              id="header-mobile-drawer"
              className="flex h-full flex-col overflow-auto p-6"
            >
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-xs uppercase tracking-widest text-slate-400">
                  Navigasjon
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="uppercase tracking-widest text-slate-100"
                  >
                    Lukk
                  </Button>
                </DrawerClose>
              </div>
              <nav className="mt-8 flex flex-col gap-6 text-lg">
                <Link
                  href="/guestbook"
                  onClick={() => setIsOpen(false)}
                  className="uppercase tracking-widest text-slate-300 transition hover:text-white"
                >
                  Gjestebok
                </Link>
                <Link
                  href="/articles"
                  onClick={() => setIsOpen(false)}
                  className="uppercase tracking-widest text-slate-300 transition hover:text-white"
                >
                  Informasjon
                </Link>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
        >
          <span className="rounded bg-slate-800 px-2 py-1">H53</span>
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
        <span className="rounded-full bg-slate-800/60 px-3 py-1 inline">
          {weatherSummary}
        </span>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
