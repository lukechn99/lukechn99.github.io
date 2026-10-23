import type { GeoFeature } from '../types.ts'
import es from './es.ts'
import vi from './vi.ts'
import zh from './zh.ts'

const NAMES: Record<string, Record<string, string>> = { es, vi, zh }

/** A feature's name in the given language, falling back to English. */
export function localGeoName(f: GeoFeature, lang: string | undefined): string {
    return (lang && NAMES[lang]?.[f.id]) || f.name
}
