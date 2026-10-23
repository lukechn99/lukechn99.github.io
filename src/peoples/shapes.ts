import type { Geometry, Position } from 'geojson'
import type { LatLng } from './events/types.ts'

/**
 * Real outlines from Natural Earth (built by scripts/peoples/build-shapes.mjs), keyed
 * "geo:<feature id>" or "event:<event id>". Real polygons replace an item's hand-drawn
 * areas; real lines replace its hand-drawn lines.
 */
export interface PreciseShape { polys?: Geometry, lines?: Geometry }
export type PreciseShapes = Record<string, PreciseShape>

let pending: Promise<PreciseShapes> | null = null

/** Loads public/peoples/shapes.json once; resolves to {} if it can't be fetched. */
export function loadPreciseShapes(): Promise<PreciseShapes> {
    pending ??= fetch(new URL('peoples/shapes.json', document.baseURI))
        .then(r => (r.ok ? r.json() as Promise<PreciseShapes> : {}))
        .catch(() => ({}))
    return pending
}

function eachPosition(g: Geometry, fn: (p: Position) => void) {
    switch (g.type) {
        case 'Point': fn(g.coordinates); break
        case 'MultiPoint': case 'LineString': g.coordinates.forEach(fn); break
        case 'MultiLineString': case 'Polygon': g.coordinates.forEach(r => r.forEach(fn)); break
        case 'MultiPolygon': g.coordinates.forEach(p => p.forEach(r => r.forEach(fn))); break
        case 'GeometryCollection': g.geometries.forEach(x => eachPosition(x, fn)); break
    }
}

/** [[south, west], [north, east]] of a precise shape, or null if it has none. */
export function preciseBounds(s: PreciseShape | undefined): [LatLng, LatLng] | null {
    if (!s) return null
    let s0 = 90, w = 180, n = -90, e = -180
    for (const g of [s.polys, s.lines]) {
        if (!g) continue
        eachPosition(g, ([lng = 0, lat = 0]) => { s0 = Math.min(s0, lat); n = Math.max(n, lat); w = Math.min(w, lng); e = Math.max(e, lng) })
    }
    return n < s0 ? null : [[s0, w], [n, e]]
}

/**
 * Chaikin corner-cutting: turns a hand-placed polyline into a smooth curve that stays
 * close to the waypoints and keeps both ends fixed.
 */
export function smoothLine(line: LatLng[], iterations = 3): LatLng[] {
    let pts = line
    for (let k = 0; k < iterations && pts.length > 2; k++) {
        const out: LatLng[] = [pts[0]!]
        for (let i = 0; i < pts.length - 1; i++) {
            const [a0, a1] = pts[i]!, [b0, b1] = pts[i + 1]!
            out.push([0.75 * a0 + 0.25 * b0, 0.75 * a1 + 0.25 * b1], [0.25 * a0 + 0.75 * b0, 0.25 * a1 + 0.75 * b1])
        }
        out.push(pts[pts.length - 1]!)
        pts = out
    }
    return pts
}
