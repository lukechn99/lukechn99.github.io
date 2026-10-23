/** [latitude, longitude] */
export type LatLng = [number, number]

/**
 * One drawable piece of an event or feature: a pin, a route or border, a hand-drawn
 * outline, or a rough circular area. Where public/peoples/shapes.json has a real outline
 * for the item, that replaces its areas/outlines (and its lines, if it has real lines).
 * Hand-drawn lines are smoothed when drawn unless `straight` is set.
 */
export type EventShape =
    | { point: LatLng, label?: string }
    /** `keep`: a route that stays even when a real outline replaces the item's other shapes. */
    | { line: LatLng[], straight?: boolean, keep?: boolean }
    | { poly: LatLng[] }
    | { area: LatLng, km: number }

export type EventKind = 'conflict' | 'treaty' | 'migration' | 'place'

/**
 * A pivotal event or landmark. It never appears on the map by itself: it is linked from
 * the neighbour notes, and shown only while the region it was clicked from is in focus.
 */
export interface PeopleEvent {
    id: string
    name: string
    /** Display date, e.g. "1995" or "1932–33". */
    date: string
    kind: EventKind
    summary: string
    /** Exact phrases in the neighbour notes that link to this event. */
    match: string[]
    shapes: EventShape[]
}
