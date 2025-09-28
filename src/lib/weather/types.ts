export type WeatherSnapshot = {
  temperatureC: number;
  condition: string;
  capturedAt?: string;
  expiresAt?: string;
};

export const WEATHER_UNAVAILABLE_LABEL = "Weather unavailable";

export const WEATHER_FALLBACK: WeatherSnapshot = {
  temperatureC: Number.NaN,
  condition: WEATHER_UNAVAILABLE_LABEL,
};

export function formatWeatherSummary(snapshot: WeatherSnapshot | null | undefined) {
  if (!snapshot || Number.isNaN(snapshot.temperatureC)) {
    return WEATHER_UNAVAILABLE_LABEL;
  }

  const rounded = Math.round(snapshot.temperatureC * 10) / 10;
  return `${rounded.toFixed(1)}°C · ${snapshot.condition}`;
}
