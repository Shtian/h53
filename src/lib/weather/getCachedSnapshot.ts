import "server-only";

import { unstable_cache } from "next/cache";

import { fetchYrNoSnapshot } from "@/lib/weather/fetchYrNo";
import {
  WEATHER_FALLBACK,
  WEATHER_UNAVAILABLE_LABEL,
  WeatherSnapshot,
} from "@/lib/weather/types";
import { logEvent } from "@/lib/logging";

const loadSnapshot = unstable_cache(async () => {
  const snapshot = await fetchYrNoSnapshot();
  return {
    temperatureC: snapshot.temperatureC,
    condition: snapshot.condition,
    capturedAt: snapshot.capturedAt,
    expiresAt: snapshot.expiresAt,
  } satisfies WeatherSnapshot;
}, ["weather:snapshot"], { revalidate: 3600 });

export async function getCachedWeatherSnapshot(): Promise<WeatherSnapshot> {
  try {
    return await loadSnapshot();
  } catch (error) {
    logEvent("weather.snapshot.error", {
      message: "Unable to load cached weather snapshot",
      error: error instanceof Error ? error.message : error,
    });
    return {
      ...WEATHER_FALLBACK,
      condition: WEATHER_UNAVAILABLE_LABEL,
    } satisfies WeatherSnapshot;
  }
}
