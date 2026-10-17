import type { PeopleNode } from '../types.ts'
import es from './es.ts'
import vi from './vi.ts'
import zh from './zh.ts'

/** Translated group names; English lives on the nodes themselves. */
const NAMES: Record<string, Record<string, string>> = { es, vi, zh }

/** The group's name in the given language, falling back to English. */
export function localName(node: PeopleNode, lang: string | undefined): string {
    return (lang && NAMES[lang]?.[node.id]) || node.name
}

/** Drops a trailing parenthetical, ASCII or full-width: "Thai (Siamese)" → "Thai". */
export function shortName(name: string): string {
    return name.replace(/\s*[(（][^)）]*[)）]\s*$/, '')
}
