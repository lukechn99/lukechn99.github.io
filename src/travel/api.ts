import type { NominatimResult, WeatherData, DailyForecast, WMOCode } from './types.ts';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const PHOTON_BASE = 'https://photon.komoot.io';

interface PhotonFeature {
  geometry: { coordinates: [number, number] };
  properties: {
    osm_id?: number;
    osm_type?: string;
    osm_key?: string;
    osm_value?: string;
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    district?: string;
    county?: string;
    type?: string;
  };
}

function photonToNominatim(f: PhotonFeature): NominatimResult {
  const p = f.properties;
  const [lon, lat] = f.geometry.coordinates;

  const nameParts = [
    p.name,
    p.street && p.housenumber ? `${p.housenumber} ${p.street}` : p.street,
    p.city ?? p.district,
    p.state,
    p.country,
  ].filter(Boolean);

  return {
    place_id: p.osm_id ?? Math.floor(Math.random() * 1e9),
    licence: 'Photon/OSM',
    osm_type: (p.osm_type === 'N' ? 'node' : p.osm_type === 'W' ? 'way' : 'relation'),
    osm_id: p.osm_id ?? 0,
    lat: lat.toString(),
    lon: lon.toString(),
    display_name: nameParts.join(', '),
    class: p.osm_key ?? '',
    type: p.osm_value ?? p.type ?? '',
    importance: 0.5,
    address: {
      ...(p.street && { road: p.street }),
      ...(p.city && { city: p.city }),
      ...(p.state && { state: p.state }),
      ...(p.country && { country: p.country }),
      ...(p.postcode && { postcode: p.postcode }),
      ...(p.county && { county: p.county }),
    },
  };
}

async function searchPhoton(query: string): Promise<NominatimResult[]> {
  const params = new URLSearchParams({ q: query, limit: '12', lang: 'en' });
  const res = await fetch(`${PHOTON_BASE}/api?${params}`);
  if (!res.ok) return [];
  const data = await res.json() as { features: PhotonFeature[] };
  return (data.features ?? []).map(photonToNominatim);
}

async function searchNominatim(query: string): Promise<NominatimResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '12',
  });
  const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
    headers: { 'Accept-Language': 'en' },
  });
  if (!res.ok) return [];
  return res.json() as Promise<NominatimResult[]>;
}

function deduplicateResults(results: NominatimResult[]): NominatimResult[] {
  const seen = new Set<string>();
  return results.filter(r => {
    const coordKey = `${parseFloat(r.lat).toFixed(4)},${parseFloat(r.lon).toFixed(4)}`;
    const nameKey = r.display_name.split(',')[0]?.toLowerCase().trim();
    const key = `${nameKey}|${coordKey}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function fuzzyScore(query: string, result: NominatimResult): number {
  const q = query.toLowerCase();
  const name = (result.display_name.split(',')[0] ?? '').toLowerCase();
  const full = result.display_name.toLowerCase();

  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  if (name.includes(q)) return 60;
  if (full.includes(q)) return 40;

  let score = 0;
  let qi = 0;
  for (let i = 0; i < name.length && qi < q.length; i++) {
    if (name[i] === q[qi]) { score += 3; qi++; }
  }
  return score;
}

export async function searchLocations(query: string): Promise<NominatimResult[]> {
  if (!query.trim()) return [];

  const [photonResults, nominatimResults] = await Promise.all([
    searchPhoton(query).catch(() => [] as NominatimResult[]),
    searchNominatim(query).catch(() => [] as NominatimResult[]),
  ]);

  const merged = [...photonResults, ...nominatimResults];
  const unique = deduplicateResults(merged);

  unique.sort((a, b) => fuzzyScore(query, b) - fuzzyScore(query, a));

  return unique.slice(0, 15);
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
