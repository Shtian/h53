import type { WeatherSnapshot } from "@/lib/weather/types";
import { formatWeatherSummary, WEATHER_UNAVAILABLE_LABEL } from "@/lib/weather/types";

export type WeatherBannerState =
  | {
      kind: "success";
      summary: string;
    }
  | {
      kind: "error";
      message: string;
    };

export function toWeatherBannerState(
  snapshot: WeatherSnapshot | null | undefined,
  message = "Weather data is currently unavailable",
): WeatherBannerState {
  if (!snapshot || Number.isNaN(snapshot.temperatureC)) {
    return {
      kind: "error",
      message,
    } satisfies WeatherBannerState;
  }

  return {
    kind: "success",
    summary: formatWeatherSummary(snapshot),
  } satisfies WeatherBannerState;
}

export function weatherErrorState(message?: string): WeatherBannerState {
  return {
    kind: "error",
    message: message ?? WEATHER_UNAVAILABLE_LABEL,
  } satisfies WeatherBannerState;
}

export function weatherSuccessState(summary: string): WeatherBannerState {
  return {
    kind: "success",
    summary,
  } satisfies WeatherBannerState;
}
