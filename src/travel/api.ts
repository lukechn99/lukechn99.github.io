import type { NominatimResult, WeatherData, DailyForecast, WMOCode } from './types.ts';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

export async function searchLocations(query: string): Promise<NominatimResult[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '8',
  });

  const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
    headers: { 'Accept-Language': 'en' },
  });

  if (!res.ok) throw new Error('Location search failed');
  return res.json() as Promise<NominatimResult[]>;
}

export async function reverseGeocode(lat: number, lon: number): Promise<NominatimResult> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    format: 'json',
    addressdetails: '1',
  });

  const res = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
    headers: { 'Accept-Language': 'en' },
  });

  if (!res.ok) throw new Error('Reverse geocode failed');
  return res.json() as Promise<NominatimResult>;
}

const WMO_DESCRIPTIONS: Record<WMOCode, { description: string; icon: string }> = {
  0:  { description: 'Clear sky',            icon: 'sun' },
  1:  { description: 'Mainly clear',         icon: 'sun' },
  2:  { description: 'Partly cloudy',        icon: 'cloud-sun' },
  3:  { description: 'Overcast',             icon: 'cloud' },
  45: { description: 'Fog',                  icon: 'cloud-fog' },
  48: { description: 'Rime fog',             icon: 'cloud-fog' },
  51: { description: 'Light drizzle',        icon: 'cloud-rain' },
  53: { description: 'Moderate drizzle',     icon: 'cloud-rain' },
  55: { description: 'Dense drizzle',        icon: 'cloud-rain' },
  56: { description: 'Freezing drizzle',     icon: 'cloud-rain' },
  57: { description: 'Freezing drizzle',     icon: 'cloud-rain' },
  61: { description: 'Slight rain',          icon: 'cloud-rain' },
  63: { description: 'Moderate rain',        icon: 'cloud-rain' },
  65: { description: 'Heavy rain',           icon: 'cloud-rain' },
  66: { description: 'Freezing rain',        icon: 'cloud-rain' },
  67: { description: 'Freezing rain',        icon: 'cloud-rain' },
  71: { description: 'Slight snow',          icon: 'snowflake' },
  73: { description: 'Moderate snow',        icon: 'snowflake' },
  75: { description: 'Heavy snow',           icon: 'snowflake' },
  77: { description: 'Snow grains',          icon: 'snowflake' },
  80: { description: 'Slight showers',       icon: 'cloud-rain' },
  81: { description: 'Moderate showers',     icon: 'cloud-rain' },
  82: { description: 'Violent showers',      icon: 'cloud-rain' },
  85: { description: 'Slight snow showers',  icon: 'snowflake' },
  86: { description: 'Heavy snow showers',   icon: 'snowflake' },
  95: { description: 'Thunderstorm',         icon: 'cloud-storm' },
  96: { description: 'Thunderstorm w/ hail', icon: 'cloud-storm' },
  99: { description: 'Thunderstorm w/ hail', icon: 'cloud-storm' },
};

function decodeWMO(code: number): { description: string; icon: string } {
  return WMO_DESCRIPTIONS[code as WMOCode] ?? { description: 'Unknown', icon: 'cloud' };
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    timezone: 'auto',
    forecast_days: '7',
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error('Weather fetch failed');

  const data = await res.json();
  const current = data.current;
  const wmo = decodeWMO(current.weather_code);

  const daily: DailyForecast[] = (data.daily.time as string[]).map(
    (date: string, i: number) => {
      const dayWmo = decodeWMO(data.daily.weather_code[i]);
      return {
        date,
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        description: dayWmo.description,
        icon: dayWmo.icon,
        precipitationProbability: data.daily.precipitation_probability_max[i],
      };
    }
  );

  return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    description: wmo.description,
    icon: wmo.icon,
    daily,
    fetchedAt: new Date().toISOString(),
  };
}
