import { HeaderShell } from "./HeaderShell";

import { getCachedWeatherSnapshot } from "@/lib/weather/getCachedSnapshot";
import { formatWeatherSummary } from "@/lib/weather/types";

export async function HeaderData() {
  const snapshot = await getCachedWeatherSnapshot();
  const weatherSummary = formatWeatherSummary(snapshot);

  return <HeaderShell weatherSummary={weatherSummary} />;
}
