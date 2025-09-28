import type { WeatherSnapshot } from "@/lib/weather/types";
import { WEATHER_UNAVAILABLE_LABEL } from "@/lib/weather/types";

export type WeatherBannerState =
  | {
      kind: "success";
      temperatureC: number;
      symbol: string;
      condition: string;
    }
  | {
      kind: "error";
      message: string;
      symbol: null;
    };

export function toWeatherBannerState(
  snapshot: WeatherSnapshot | null | undefined,
  message = "Weather data is currently unavailable",
): WeatherBannerState {
  if (!snapshot || Number.isNaN(snapshot.temperatureC)) {
    return weatherErrorState(message);
  }

  return weatherSuccessState(snapshot);
}

export function weatherErrorState(message?: string): WeatherBannerState {
  return {
    kind: "error",
    message: message ?? WEATHER_UNAVAILABLE_LABEL,
    symbol: null,
  } satisfies WeatherBannerState;
}

export function weatherSuccessState(snapshot: WeatherSnapshot): WeatherBannerState {
  return {
    kind: "success",
    temperatureC: snapshot.temperatureC,
    symbol: snapshot.condition,
    condition: snapshot.condition,
  } satisfies WeatherBannerState;
}
