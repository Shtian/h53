import {
  isYrNoSymbolCode,
  YRNO_SYMBOL_CODES,
  type YrNoSymbolCode,
} from "@/lib/weather/icons";

const WEATHER_SYMBOL_BASE_TRANSLATIONS: Record<string, string> = {
  clearsky: "klarvær",
  fair: "lettskyet",
  partlycloudy: "delvis skyet",
  cloudy: "skyet",
  fog: "tåke",
  lightrain: "lett regn",
  lightrainandthunder: "lett regn og torden",
  lightrainshowers: "lette regnbyger",
  lightrainshowersandthunder: "lette regnbyger og torden",
  lightsleet: "lett sludd",
  lightsleetandthunder: "lett sludd og torden",
  lightsleetshowers: "lette sluddbyger",
  lightssleetshowersandthunder: "lette sluddbyger og torden",
  lightsnow: "lett snø",
  lightsnowandthunder: "lett snø og torden",
  lightsnowshowers: "lette snøbyger",
  lightssnowshowersandthunder: "lette snøbyger og torden",
  rain: "regn",
  rainandthunder: "regn og torden",
  rainshowers: "regnbyger",
  rainshowersandthunder: "regnbyger og torden",
  heavyrain: "kraftig regn",
  heavyrainandthunder: "kraftig regn og torden",
  heavyrainshowers: "kraftige regnbyger",
  heavyrainshowersandthunder: "kraftige regnbyger og torden",
  sleet: "sludd",
  sleetandthunder: "sludd og torden",
  sleetshowers: "sluddbyger",
  sleetshowersandthunder: "sluddbyger og torden",
  heavysleet: "kraftig sludd",
  heavysleetandthunder: "kraftig sludd og torden",
  heavysleetshowers: "kraftige sluddbyger",
  heavysleetshowersandthunder: "kraftige sluddbyger og torden",
  snow: "snø",
  snowandthunder: "snø og torden",
  snowshowers: "snøbyger",
  snowshowersandthunder: "snøbyger og torden",
  heavysnow: "kraftig snø",
  heavysnowandthunder: "kraftig snø og torden",
  heavysnowshowers: "kraftige snøbyger",
  heavysnowshowersandthunder: "kraftige snøbyger og torden",
};

const WEATHER_SYMBOL_TRANSLATIONS: Record<YrNoSymbolCode, string> =
  Object.fromEntries(
    YRNO_SYMBOL_CODES.map((code) => {
      const [base] = code.split("_");
      const translation =
        WEATHER_SYMBOL_BASE_TRANSLATIONS[base] ?? code.replace(/_/g, " ");
      return [code, translation];
    }),
  ) as Record<YrNoSymbolCode, string>;

export function translateWeatherSymbol(
  symbolCode: string | null | undefined,
): string {
  if (!symbolCode) {
    return "ukjent vær";
  }

  const normalized = symbolCode.toLowerCase();
  if (isYrNoSymbolCode(normalized)) {
    return (
      WEATHER_SYMBOL_TRANSLATIONS[normalized] ?? normalized.replace(/_/g, " ")
    );
  }

  return normalized.replace(/_/g, " ");
}
