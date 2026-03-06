import type { ItineraryItem } from './types.ts';

const STORAGE_KEY = 'map_itinerary_items';

export function loadItems(): ItineraryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ItineraryItem[];
  } catch {
    return [];
  }
}

export function saveItems(items: ItineraryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
