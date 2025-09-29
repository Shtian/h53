"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Droplets, Wind } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ERROR_ICON, resolveWeatherIcon } from "@/lib/weather/icons";
import type { WeatherBannerState } from "@/lib/weather/state";

type HeaderShellProps = {
  weather: WeatherBannerState;
};

const HEADER_STYLE = { "--header-height": "4rem" } as CSSProperties;

const temperatureFormatter = new Intl.NumberFormat("nb-NO", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const weatherStatFormatter = new Intl.NumberFormat("nb-NO", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function HeaderShell({ weather }: HeaderShellProps) {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = useMemo(() => {
    if (weather.kind === "success") {
      return resolveWeatherIcon(weather.symbol);
    }
    return ERROR_ICON;
  }, [weather]);

  const temperatureLabel =
    weather.kind === "success"
      ? `${temperatureFormatter.format(weather.temperatureC)}°C`
      : null;

  const conditionLabel =
    weather.kind === "success" ? weather.condition : weather.message;

  const precipitationValue =
    weather.kind === "success" ? weather.precipitation : null;
  const windSpeedValue = weather.kind === "success" ? weather.windSpeed : null;

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
          <DrawerContent className="min-h-[50svh] border-none bg-slate-900 p-0 text-slate-400">
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
                <SignedIn>
                  <Link
                    href="/guestbook"
                    onClick={() => setIsOpen(false)}
                    className="uppercase tracking-widest text-slate-300 transition hover:text-white"
                  >
                    Bildebok
                  </Link>
                  <Link
                    href="/articles"
                    onClick={() => setIsOpen(false)}
                    className="uppercase tracking-widest text-slate-300 transition hover:text-white"
                  >
                    Informasjon
                  </Link>
                </SignedIn>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
        <Link
          href="/"
          className="hidden items-center gap-2 text-sm font-semibold uppercase tracking-widest md:flex"
        >
          <span className="rounded bg-slate-800 px-2 py-1">H53</span>
        </Link>
        <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
          <SignedIn>
            <Link className="hover:text-white" href="/guestbook">
              Bildebok
            </Link>
            <Link className="hover:text-white" href="/articles">
              Informasjon
            </Link>
          </SignedIn>
        </nav>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <Popover>
          <PopoverTrigger asChild>
            {weather.kind === "success" ? (
              <button
                type="button"
                aria-label={`Vær: ${conditionLabel}`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-left hover:bg-slate-800/80"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{temperatureLabel}</span>
              </button>
            ) : (
              <button
                type="button"
                aria-label="Weather information unavailable"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 transition hover:bg-amber-500/30"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            className="w-64 rounded-xl border border-slate-700/60 bg-slate-900/95 p-4 text-left text-sm text-slate-100 shadow-lg"
          >
            {weather.kind === "success" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold text-slate-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="capitalize">{conditionLabel}</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {typeof precipitationValue === "number"
                        ? `${weatherStatFormatter.format(precipitationValue)} mm nedbør`
                        : "Nedbør utilgjengelig"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Wind className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {typeof windSpeedValue === "number"
                        ? `${weatherStatFormatter.format(windSpeedValue)} m/s vind`
                        : "Vind utilgjengelig"}
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <p className="font-semibold text-amber-300">
                  Været er utilgjengelig
                </p>
                <p className="mt-2 text-slate-200">{conditionLabel}</p>
              </>
            )}
          </PopoverContent>
        </Popover>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="outline" className="bg-transparent">Logg inn</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
