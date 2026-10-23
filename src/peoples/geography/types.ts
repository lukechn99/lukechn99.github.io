import type { EventShape, LatLng } from '../events/types.ts'

export type FeatureKind = 'mountains' | 'river' | 'desert' | 'water' | 'plain' | 'forest' | 'plateau'

/**
 * A physical feature (range, river, desert, strait…) shown on the geography overlay.
 * Its card explains why it matters and how it shaped each people around it.
 */
export interface GeoFeature {
    id: string
    name: string
    kind: FeatureKind
    /** Where the marker sits; defaults to the middle of the first shape. */
    at?: LatLng
    shapes: EventShape[]
    /** What and where it is. */
    summary: string
    /** Why it matters for the peoples of the region. */
    importance: string
    /** Group id → how this feature shaped or helps define that group. */
    peoples: Record<string, string>
}
