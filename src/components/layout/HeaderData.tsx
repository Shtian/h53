import { HeaderShell } from "./HeaderShell";

import { getCachedWeatherSnapshot } from "@/lib/weather/getCachedSnapshot";

export async function HeaderData() {
  const weatherState = await getCachedWeatherSnapshot();
  return <HeaderShell weather={weatherState} />;
}
