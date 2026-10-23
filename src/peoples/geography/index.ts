import type { GeoFeature } from './types.ts'
import { eurasiaFeatures } from './eurasia.ts'
import { southernFeatures } from './southern.ts'

export type { GeoFeature, FeatureKind } from './types.ts'

export const GEO_FEATURES: GeoFeature[] = [...eurasiaFeatures, ...southernFeatures]
export const GEO_BY_ID: Map<string, GeoFeature> = new Map(GEO_FEATURES.map(f => [f.id, f]))
