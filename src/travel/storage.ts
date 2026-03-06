import type { ItineraryItem, ItineraryMeta } from './types.ts';

const META_KEY = 'travel_itineraries_meta';
const ITEMS_PREFIX = 'travel_itinerary_';
const OLD_STORAGE_KEY = 'map_itinerary_items';

interface StoredMeta {
  activeId: string | null;
  list: ItineraryMeta[];
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readMeta(): StoredMeta {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return { activeId: null, list: [] };
    return JSON.parse(raw) as StoredMeta;
  } catch {
    return { activeId: null, list: [] };
  }
}

function writeMeta(meta: StoredMeta): void {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}

export function migrateOldStorage(): void {
  const oldData = localStorage.getItem(OLD_STORAGE_KEY);
  if (!oldData) return;
  const existing = readMeta();
  if (existing.list.length > 0) {
    localStorage.removeItem(OLD_STORAGE_KEY);
    return;
  }
  try {
    const items = JSON.parse(oldData) as ItineraryItem[];
    const id = generateId();
    writeMeta({
      activeId: id,
      list: [{ id, name: 'My Itinerary', createdAt: new Date().toISOString() }],
    });
    if (items.length > 0) {
      localStorage.setItem(ITEMS_PREFIX + id, JSON.stringify(items));
    }
  } catch {
    // corrupted data — discard
  }
  localStorage.removeItem(OLD_STORAGE_KEY);
}

export function loadItineraries(): { activeId: string | null; list: ItineraryMeta[] } {
  const { activeId, list } = readMeta();
  return { activeId, list };
}

export function setActiveItinerary(id: string): void {
  const meta = readMeta();
  meta.activeId = id;
  writeMeta(meta);
}

export function createItinerary(name: string): ItineraryMeta {
  const meta = readMeta();
  const entry: ItineraryMeta = {
    id: generateId(),
    name,
    createdAt: new Date().toISOString(),
  };
  meta.list.push(entry);
  meta.activeId = entry.id;
  writeMeta(meta);
  return entry;
}

export function deleteItinerary(id: string): string | null {
  const meta = readMeta();
  meta.list = meta.list.filter(i => i.id !== id);
  localStorage.removeItem(ITEMS_PREFIX + id);
  if (meta.activeId === id) {
    meta.activeId = meta.list.length > 0 ? meta.list[0]!.id : null;
  }
  writeMeta(meta);
  return meta.activeId;
}

export function loadItems(itineraryId: string): ItineraryItem[] {
  try {
    const raw = localStorage.getItem(ITEMS_PREFIX + itineraryId);
    if (!raw) return [];
    return JSON.parse(raw) as ItineraryItem[];
  } catch {
    return [];
  }
}

export function saveItems(itineraryId: string, items: ItineraryItem[]): void {
  localStorage.setItem(ITEMS_PREFIX + itineraryId, JSON.stringify(items));
}
