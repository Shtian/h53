import { getCachedWeatherSnapshot } from "@/lib/weather/getCachedSnapshot";
import { HeaderShell } from "./HeaderShell";

export async function HeaderData() {
  const weatherState = await getCachedWeatherSnapshot();
  return <HeaderShell weather={weatherState} />;
}
