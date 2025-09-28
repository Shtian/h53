import "server-only";

import { unstable_cache } from "next/cache";
import { logEvent } from "@/lib/logging";
import { fetchYrNoSnapshot } from "@/lib/weather/fetchYrNo";
import {
  toWeatherBannerState,
  type WeatherBannerState,
  weatherErrorState,
} from "@/lib/weather/state";
import { WEATHER_UNAVAILABLE_LABEL } from "@/lib/weather/types";

const loadSnapshot = unstable_cache(fetchYrNoSnapshot, ["weather:snapshot"], {
  revalidate: 3600,
});

export async function getCachedWeatherSnapshot(): Promise<WeatherBannerState> {
  try {
    const snapshot = await loadSnapshot();
    return toWeatherBannerState(snapshot);
  } catch (error) {
    logEvent("weather.snapshot.error", {
      message: "Unable to load cached weather snapshot",
      error: error instanceof Error ? error.message : error,
    });
    return weatherErrorState(WEATHER_UNAVAILABLE_LABEL);
  }
}
