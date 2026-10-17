import type { PeopleEvent } from '../types.ts'
import es from './es.ts'
import vi from './vi.ts'
import zh from './zh.ts'

/** Translated event names; English lives on the events themselves. */
const NAMES: Record<string, Record<string, string>> = { es, vi, zh }

export function localEventName(e: PeopleEvent, lang: string | undefined): string {
    return (lang && NAMES[lang]?.[e.id]) || e.name
}
