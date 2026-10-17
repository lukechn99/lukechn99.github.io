import type { PeopleEvent } from './types.ts'
import { europeEvents } from './europe.ts'
import { asiaEvents } from './asia.ts'
import { africaPacificEvents } from './africaPacific.ts'
import { americasEvents } from './americas.ts'

export type { PeopleEvent, EventShape, EventKind, LatLng } from './types.ts'

export const EVENTS: PeopleEvent[] = [...europeEvents, ...asiaEvents, ...africaPacificEvents, ...americasEvents]
export const EVENT_BY_ID: Map<string, PeopleEvent> = new Map(EVENTS.map(e => [e.id, e]))

const PHRASE_TO_EVENT = new Map<string, string>()
for (const e of EVENTS) for (const m of e.match) PHRASE_TO_EVENT.set(m, e.id)
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// Longest phrases first so "The Algerian war of independence (1954–62)" wins over "the Algerian war".
const PHRASE_RE = new RegExp([...PHRASE_TO_EVENT.keys()].sort((a, b) => b.length - a.length).map(escape).join('|'), 'g')

/** A note split into plain text and event links. */
export type NotePart = string | { text: string, eventId: string }

export function linkEvents(text: string): NotePart[] {
    const parts: NotePart[] = []
    let last = 0
    for (const m of text.matchAll(PHRASE_RE)) {
        const eventId = PHRASE_TO_EVENT.get(m[0])
        if (!eventId || m.index === undefined) continue
        if (m.index > last) parts.push(text.slice(last, m.index))
        parts.push({ text: m[0], eventId })
        last = m.index + m[0].length
    }
    if (last < text.length) parts.push(text.slice(last))
    return parts
}
