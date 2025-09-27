const COORDINATES = process.env.YRNO_COORDINATES ?? "61.17553,10.63208";

interface YrNoResponse {
  properties: {
    timeseries: Array<{
      time: string;
      data: {
        instant: {
          details: {
            air_temperature: number;
            wind_speed: number;
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

export async function fetchYrNoSnapshot() {
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
    throw new Error(`yr.no request failed: ${response.status}`);
  }

  const payload = (await response.json()) as YrNoResponse;
  const [latest] = payload.properties.timeseries;
  if (!latest) {
    throw new Error("yr.no payload missing timeseries data");
  }

  const temperatureC = latest.data.instant.details.air_temperature;
  const windSpeed = latest.data.instant.details.wind_speed;
  const precipitation =
    latest.data.next_1_hours?.details?.precipitation_amount ?? 0;
  const condition = latest.data.next_1_hours?.summary?.symbol_code ?? "unknown";

  const capturedAt = latest.time;
  const expiresAt = new Date(
    new Date(capturedAt).getTime() + 6 * 60 * 60 * 1000
  ).toISOString();

  return {
    temperatureC,
    windSpeed,
    precipitation,
    condition,
    capturedAt,
    expiresAt,
    rawPayload: payload,
  };
}
