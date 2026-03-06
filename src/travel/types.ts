export interface ItineraryItem {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lon: number;
  address: {
    road?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
  category?: string;
  type?: string;
  tags: string[];
  notes: string;
  rating?: number;
  startDate: string;
  endDate: string;
  weather?: WeatherData;
  addedAt: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  daily?: DailyForecast[];
  fetchedAt: string;
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  precipitationProbability: number;
}

export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    postcode?: string;
    county?: string;
    suburb?: string;
    neighbourhood?: string;
  };
}

export type WMOCode =
  | 0 | 1 | 2 | 3 | 45 | 48
  | 51 | 53 | 55 | 56 | 57
  | 61 | 63 | 65 | 66 | 67
  | 71 | 73 | 75 | 77
  | 80 | 81 | 82
  | 85 | 86
  | 95 | 96 | 99;

const HOTEL_TYPES = new Set([
  'hotel', 'motel', 'hostel', 'guest_house', 'bed_and_breakfast',
  'resort', 'apartment', 'chalet', 'camp_site',
]);

export function isHotelLocation(result: NominatimResult): boolean {
  const type = result.type?.toLowerCase() ?? '';
  const cls = result.class?.toLowerCase() ?? '';
  const name = result.display_name?.toLowerCase() ?? '';

  if (HOTEL_TYPES.has(type)) return true;
  if (cls === 'tourism' && HOTEL_TYPES.has(type)) return true;

  return /\b(hotel|motel|hostel|inn|resort|lodge|suites?)\b/.test(name);
}
