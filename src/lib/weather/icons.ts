import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Minus,
  Moon,
  Sun,
  SunSnow,
} from "lucide-react";

const YRNO_SYMBOL_CODES = [
  "clearsky_day",
  "clearsky_night",
  "clearsky_polartwilight",
  "fair_day",
  "fair_night",
  "fair_polartwilight",
  "lightssnowshowersandthunder_day",
  "lightssnowshowersandthunder_night",
  "lightssnowshowersandthunder_polartwilight",
  "lightsnowshowers_day",
  "lightsnowshowers_night",
  "lightsnowshowers_polartwilight",
  "heavyrainandthunder",
  "heavysnowandthunder",
  "rainandthunder",
  "heavysleetshowersandthunder_day",
  "heavysleetshowersandthunder_night",
  "heavysleetshowersandthunder_polartwilight",
  "heavysnow",
  "heavyrainshowers_day",
  "heavyrainshowers_night",
  "heavyrainshowers_polartwilight",
  "lightsleet",
  "heavyrain",
  "lightrainshowers_day",
  "lightrainshowers_night",
  "lightrainshowers_polartwilight",
  "heavysleetshowers_day",
  "heavysleetshowers_night",
  "heavysleetshowers_polartwilight",
  "lightsleetshowers_day",
  "lightsleetshowers_night",
  "lightsleetshowers_polartwilight",
  "snow",
  "heavyrainshowersandthunder_day",
  "heavyrainshowersandthunder_night",
  "heavyrainshowersandthunder_polartwilight",
  "snowshowers_day",
  "snowshowers_night",
  "snowshowers_polartwilight",
  "fog",
  "snowshowersandthunder_day",
  "snowshowersandthunder_night",
  "snowshowersandthunder_polartwilight",
  "lightsnowandthunder",
  "heavysleetandthunder",
  "lightrain",
  "rainshowersandthunder_day",
  "rainshowersandthunder_night",
  "rainshowersandthunder_polartwilight",
  "rain",
  "lightsnow",
  "lightrainshowersandthunder_day",
  "lightrainshowersandthunder_night",
  "lightrainshowersandthunder_polartwilight",
  "heavysleet",
  "sleetandthunder",
  "lightrainandthunder",
  "sleet",
  "lightssleetshowersandthunder_day",
  "lightssleetshowersandthunder_night",
  "lightssleetshowersandthunder_polartwilight",
  "lightsleetandthunder",
  "partlycloudy_day",
  "partlycloudy_night",
  "partlycloudy_polartwilight",
  "sleetshowersandthunder_day",
  "sleetshowersandthunder_night",
  "sleetshowersandthunder_polartwilight",
  "rainshowers_day",
  "rainshowers_night",
  "rainshowers_polartwilight",
  "snowandthunder",
  "sleetshowers_day",
  "sleetshowers_night",
  "sleetshowers_polartwilight",
  "cloudy",
  "heavysnowshowersandthunder_day",
  "heavysnowshowersandthunder_night",
  "heavysnowshowersandthunder_polartwilight",
  "heavysnowshowers_day",
  "heavysnowshowers_night",
  "heavysnowshowers_polartwilight",
] as const;

export type YrNoSymbolCode = (typeof YRNO_SYMBOL_CODES)[number];

const SYMBOL_LOOKUP = new Set<string>(YRNO_SYMBOL_CODES);

const DEFAULT_ICON: LucideIcon = Minus;
export const ERROR_ICON: LucideIcon = Minus;

function isYrNoSymbolCode(value: string): value is YrNoSymbolCode {
  return SYMBOL_LOOKUP.has(value as YrNoSymbolCode);
}

function mapSymbolToIcon(symbol: YrNoSymbolCode): LucideIcon {
  switch (symbol) {
    case "clearsky_day":
    case "clearsky_polartwilight":
      return Sun;
    case "clearsky_night":
      return Moon;

    case "fair_day":
    case "fair_polartwilight":
    case "partlycloudy_day":
    case "partlycloudy_polartwilight":
      return CloudSun;
    case "fair_night":
    case "partlycloudy_night":
      return CloudMoon;

    case "cloudy":
      return Cloud;
    case "fog":
      return CloudFog;

    case "lightrain":
      return CloudDrizzle;
    case "heavyrain":
      return CloudRainWind;
    case "rain":
      return CloudRain;

    case "lightrainshowers_day":
    case "lightrainshowers_polartwilight":
      return CloudSunRain;
    case "lightrainshowers_night":
      return CloudMoonRain;

    case "rainshowers_day":
    case "rainshowers_polartwilight":
      return CloudSunRain;
    case "rainshowers_night":
      return CloudMoonRain;

    case "heavyrainshowers_day":
    case "heavyrainshowers_polartwilight":
      return CloudSunRain;
    case "heavyrainshowers_night":
      return CloudMoonRain;

    case "lightsleet":
    case "sleet":
    case "heavysleet":
      return CloudHail;

    case "lightsleetshowers_day":
    case "lightsleetshowers_polartwilight":
    case "sleetshowers_day":
    case "sleetshowers_polartwilight":
      return CloudSunRain;
    case "lightsleetshowers_night":
    case "sleetshowers_night":
      return CloudMoonRain;

    case "heavysleetshowers_day":
    case "heavysleetshowers_polartwilight":
      return CloudSunRain;
    case "heavysleetshowers_night":
      return CloudMoonRain;

    case "snow":
    case "heavysnow":
    case "lightsnow":
      return CloudSnow;

    case "lightsnowshowers_day":
    case "lightsnowshowers_polartwilight":
    case "snowshowers_day":
    case "snowshowers_polartwilight":
    case "heavysnowshowers_day":
    case "heavysnowshowers_polartwilight":
      return SunSnow;
    case "lightsnowshowers_night":
    case "snowshowers_night":
    case "heavysnowshowers_night":
      return CloudSnow;

    case "heavyrainandthunder":
    case "heavysnowandthunder":
    case "rainandthunder":
    case "lightsnowandthunder":
    case "heavysleetandthunder":
    case "lightrainandthunder":
    case "sleetandthunder":
    case "lightsleetandthunder":
    case "snowandthunder":
    case "lightssnowshowersandthunder_day":
    case "lightssnowshowersandthunder_night":
    case "lightssnowshowersandthunder_polartwilight":
    case "heavysleetshowersandthunder_day":
    case "heavysleetshowersandthunder_night":
    case "heavysleetshowersandthunder_polartwilight":
    case "heavyrainshowersandthunder_day":
    case "heavyrainshowersandthunder_night":
    case "heavyrainshowersandthunder_polartwilight":
    case "snowshowersandthunder_day":
    case "snowshowersandthunder_night":
    case "snowshowersandthunder_polartwilight":
    case "rainshowersandthunder_day":
    case "rainshowersandthunder_night":
    case "rainshowersandthunder_polartwilight":
    case "lightrainshowersandthunder_day":
    case "lightrainshowersandthunder_night":
    case "lightrainshowersandthunder_polartwilight":
    case "lightssleetshowersandthunder_day":
    case "lightssleetshowersandthunder_night":
    case "lightssleetshowersandthunder_polartwilight":
    case "sleetshowersandthunder_day":
    case "sleetshowersandthunder_night":
    case "sleetshowersandthunder_polartwilight":
    case "heavysnowshowersandthunder_day":
    case "heavysnowshowersandthunder_night":
    case "heavysnowshowersandthunder_polartwilight":
      return CloudLightning;

    default:
      return DEFAULT_ICON;
  }
}

export function resolveWeatherIcon(
  symbolCode: string | null | undefined
): LucideIcon {
  if (!symbolCode) {
    return DEFAULT_ICON;
  }

  const normalized = symbolCode.toLowerCase();
  if (isYrNoSymbolCode(normalized)) {
    return mapSymbolToIcon(normalized);
  }

  return DEFAULT_ICON;
}
