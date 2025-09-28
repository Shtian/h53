import {
  WEATHER_FALLBACK,
  WEATHER_UNAVAILABLE_LABEL,
  type WeatherSnapshot,
} from "./types";
import { logEvent } from "@/lib/logging";

const COORDINATES = process.env.YRNO_COORDINATES ?? "61.17553,10.63208";

interface YrNoResponse {
  properties: {
    timeseries: Array<{
      time: string;
      data: {
        instant: {
          details: {
            air_temperature?: number;
            wind_speed?: number;
          };
        };
        next_1_hours?: {
          details?: {
            precipitation_amount?: number;
          };
          summary?: {
            symbol_code?: string;
          };
        };
      };
    }>;
  };
}

type YrNoSnapshot = WeatherSnapshot & {
  windSpeed: number | null;
  precipitation: number | null;
  rawPayload: YrNoResponse | null;
};

export async function fetchYrNoSnapshot(): Promise<YrNoSnapshot> {
  const [latitude, longitude] = COORDINATES.split(",").map((value) =>
    value.trim()
  );
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "H53 Cabin Website (hobby project)",
    },
  });

  if (!response.ok) {
    const error = new Error(`yr.no request failed: ${response.status}`);
    logEvent("weather.snapshot.network_error", {
      status: response.status,
      statusText: response.statusText,
    });
    throw error;
  }

  const payload = (await response.json()) as YrNoResponse;
  const [latest] = payload.properties.timeseries;
  if (!latest) {
    logEvent("weather.snapshot.payload_missing", {
      detail: "yr.no payload missing timeseries data",
    });
    return {
      ...WEATHER_FALLBACK,
      windSpeed: null,
      precipitation: null,
      capturedAt: undefined,
      expiresAt: undefined,
      rawPayload: payload,
    };
  }

  const airTemperature = latest.data.instant?.details?.air_temperature;
  const windSpeed = latest.data.instant?.details?.wind_speed ?? null;
  const precipitation =
    latest.data.next_1_hours?.details?.precipitation_amount ?? null;
  const condition =
    latest.data.next_1_hours?.summary?.symbol_code ?? WEATHER_UNAVAILABLE_LABEL;

  const capturedAt = latest.time;
  const expiresAt = capturedAt
    ? new Date(new Date(capturedAt).getTime() + 6 * 60 * 60 * 1000).toISOString()
    : undefined;

  if (typeof airTemperature !== "number") {
    logEvent("weather.snapshot.temperature_missing", {
      capturedAt,
    });
    return {
      ...WEATHER_FALLBACK,
      windSpeed,
      precipitation,
      capturedAt,
      expiresAt,
      rawPayload: payload,
    };
  }

  return {
    temperatureC: airTemperature,
    condition,
    capturedAt,
    expiresAt,
    windSpeed,
    precipitation,
    rawPayload: payload,
  };
}
