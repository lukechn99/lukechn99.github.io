import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { ActionIcon, Anchor, Badge, Breadcrumbs, Button, Group, Paper, SimpleGrid, Stack, Text, Title, Tooltip, useComputedColorScheme } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { IconArrowUp, IconWorld, IconX } from "@tabler/icons-react"
import { relationsOf } from "./peoples/relations/index.ts"
import { LITERATURE } from "./peoples/literature.ts"
import { localName, shortName } from "./peoples/names/index.ts"
import { EVENT_BY_ID, linkEvents, type EventKind, type LatLng, type PeopleEvent } from "./peoples/events/index.ts"
import { localEventName } from "./peoples/events/names/index.ts"
import type { Feature, FeatureCollection, MultiPolygon, Polygon, Position } from "geojson"
import type { GeometryCollection, MultiPolygon as TopoMultiPolygon, Polygon as TopoPolygon, Topology } from "topojson-specification"
import type { GeoJSON as LeafletGeoJSON, Layer, Map as LeafletMap, Path } from "leaflet"
import {
    PEOPLE_NODES, NODE_BY_ID, ROOTS, childrenOf, depthOf, leavesUnder, pathTo,
} from "./peoples/index.ts"
import type { PeopleNode } from "./peoples/index.ts"

/* ------------------------------------------------------------------ */
/* Zoom → tree depth                                                   */
/* ------------------------------------------------------------------ */

/** Below these zoom levels the map shows depth 1, 2, 3; at or above the last, every leaf. */
const DEPTH_THRESHOLDS = [3, 4, 5]

/** Esri's light or dark grey canvas basemap. */
const basemapUrl = (dark: boolean) =>
    `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${dark ? 'Dark' : 'Light'}_Gray_Base/MapServer/tile/{z}/{y}/{x}`

const makeBasemap = (L: typeof import("leaflet"), dark: boolean) => L.tileLayer(basemapUrl(dark), {
    maxZoom: 16,
    noWrap: true,
    bounds: L.latLngBounds([-85, -180], [85, 180]),
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ · Regions from <a href="https://www.naturalearthdata.com/">Natural Earth</a> provinces',
})

/** The default world framing (inhabited latitudes, one copy of the world). */
const WORLD_VIEW: [[number, number], [number, number]] = [[-56, -170], [78, 180]]

function zoomDepth(zoom: number): number {
    const i = DEPTH_THRESHOLDS.findIndex(t => zoom < t)
    return i === -1 ? DEPTH_THRESHOLDS.length + 1 : i + 1
}

/**
 * Which nodes to draw.
 * - Nothing selected: the zoom level decides how deep to go everywhere.
 * - A group selected ("focus"): only that group's subtree is drawn, at least one
 *   level below it (deeper if the zoom asks for it). Everything else is left as base map.
 */
function visibleNodes(selectedId: string | null, zDepth: number): PeopleNode[] {
    const out: PeopleNode[] = []
    const walk = (node: PeopleNode, depth: number, minDepth: number) => {
        const kids = childrenOf(node.id)
        if (kids.length > 0 && depth < Math.max(zDepth, minDepth)) kids.forEach(k => walk(k, depth + 1, minDepth))
        else out.push(node)
    }
    if (selectedId) {
        const node = NODE_BY_ID.get(selectedId)
        if (node) {
            const d = depthOf(selectedId)
            walk(node, d, d + 1)
            return out
        }
    }
    ROOTS.forEach(r => walk(r, 1, 1))
    return out
}

/* ------------------------------------------------------------------ */
/* Colors: one hue per family, children fan out around their parent  */
/* ------------------------------------------------------------------ */

/** Hues for top-level groups, or for the language family that several top-level groups share. */
const ROOT_HUES: Record<string, number> = {
    'Indo-European': 214, 'Sino-Tibetan': 2, 'Afro-Asiatic': 32, 'Niger-Congo': 128, 'turkic': 168,
    'Austronesian': 276, 'dravidian': 328, 'Uralic': 24, 'mongols': 268, 'Caucasian': 52,
    'Austroasiatic': 92, 'tai-kadai': 302, 'japonic': 318, 'koreans': 45, 'Nilo-Saharan': 70,
    'khoe-san': 145, 'indigenous-americas': 12, 'papuans': 300, 'aboriginal-australians': 22, 'basques': 58,
}

const SIBLING_HUE_OFFSETS = [0, 42, -42, 84, -84, 21, -21, 63, -63, 105, -105, 126]
/** Groups whose children fan out the other way, to avoid clashing with neighbours. */
const FLIPPED_FAMILIES = new Set(['turkic'])

/** Siblings for colouring: a top-level group's siblings are the other groups of its language family. */
function colorSiblings(node: PeopleNode): PeopleNode[] {
    if (node.parent) return childrenOf(node.parent)
    return node.family ? ROOTS.filter(r => r.family === node.family) : [node]
}

/** Depth as if language families were still a level, so shades match the family's spread. */
function colorDepth(id: string): number {
    return depthOf(id) + (pathTo(id)[0]?.family ? 1 : 0)
}

const hueCache = new Map<string, number>()
function nodeHue(id: string): number {
    const cached = hueCache.get(id)
    if (cached !== undefined) return cached
    const node = NODE_BY_ID.get(id)!
    let hue: number
    if (!node.parent && !node.family) {
        hue = ROOT_HUES[id] ?? 0
    } else {
        const siblings = colorSiblings(node)
        const i = siblings.findIndex(s => s.id === id)
        // Siblings fan out around the parent's (or family's) hue so neighbours differ, while
        // the first keeps the base hue. Deeper levels fan out less.
        const offset = SIBLING_HUE_OFFSETS[i % SIBLING_HUE_OFFSETS.length] ?? 0
        const flip = FLIPPED_FAMILIES.has(pathTo(id)[0]?.id ?? '') ? -1 : 1
        const base = node.parent ? nodeHue(node.parent) : ROOT_HUES[node.family!] ?? 0
        hue = base + flip * offset * (colorDepth(id) > 2 ? 0.6 : 1)
    }
    hueCache.set(id, hue)
    return hue
}

interface Hsl { h: number, s: number, l: number }

function baseHsl(id: string): Hsl {
    const node = NODE_BY_ID.get(id)!
    const siblings = colorSiblings(node)
    const i = siblings.findIndex(s => s.id === id)
    return {
        h: ((nodeHue(id) % 360) + 360) % 360,
        s: [60, 55, 66, 50, 62][i % 5] ?? 60,
        l: [46, 58, 40, 64, 52][i % 5] ?? 50,
    }
}

const hslCss = (c: Hsl) => `hsl(${c.h.toFixed(0)}, ${c.s}%, ${c.l}%)`

function nodeColor(id: string): string {
    return hslCss(baseHsl(id))
}

function tooClose(a: Hsl, b: Hsl): boolean {
    const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h))
    return dh < 30 && Math.abs(a.l - b.l) < 14
}

/**
 * Give each visible region its family-based color, but nudge it (hue, then lightness)
 * when it would look too much like a neighbouring region.
 */
function assignColors(ids: string[], adjacency: Map<string, Set<string>>): Map<string, string> {
    const chosen = new Map<string, Hsl>()
    const order = [...ids].sort((a, b) => (adjacency.get(b)?.size ?? 0) - (adjacency.get(a)?.size ?? 0))
    for (const id of order) {
        const base = baseHsl(id)
        const neighbours = [...(adjacency.get(id) ?? [])].map(n => chosen.get(n)).filter((c): c is Hsl => !!c)
        let pick = base
        search:
        for (const dh of [0, 34, -34, 68, -68, 102, -102]) {
            for (const dl of [0, 14, -12, 22]) {
                const c = { h: (base.h + dh + 360) % 360, s: base.s, l: Math.max(32, Math.min(70, base.l + dl)) }
                if (!neighbours.some(n => tooClose(n, c))) { pick = c; break search }
            }
        }
        chosen.set(id, pick)
    }
    return new Map([...chosen].map(([id, c]) => [id, hslCss(c)]))
}

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                    */
/* ------------------------------------------------------------------ */

/** Leaflet's private view-change hooks (the ones flyTo uses). */
interface LeafletMoveInternals {
    _moveStart(zoomChanged: boolean, noMoveStart: boolean): unknown
    _move(center: import("leaflet").LatLng, zoom: number): unknown
    _moveEnd(zoomChanged: boolean): unknown
}

type LeafTopology = Topology<{ leaves: GeometryCollection<{ leaf: string }> }>
type LeafGeometry = TopoPolygon<{ leaf: string }> | TopoMultiPolygon<{ leaf: string }>

function ringArea(ring: Position[]): number {
    let a = 0
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi = 0, yi = 0] = ring[i] ?? []
        const [xj = 0, yj = 0] = ring[j] ?? []
        a += (xj + xi) * (yj - yi)
    }
    return Math.abs(a / 2)
}

/** Signed distance from a point to a ring: positive inside, negative outside. */
function signedDistance(x: number, y: number, ring: Position[]): number {
    let inside = false
    let minSq = Infinity
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [ax = 0, ay = 0] = ring[i] ?? []
        const [bx = 0, by = 0] = ring[j] ?? []
        if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside
        let dx = bx - ax, dy = by - ay
        let px = ax, py = ay
        if (dx !== 0 || dy !== 0) {
            const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
            px = ax + t * dx; py = ay + t * dy
        }
        dx = x - px; dy = y - py
        minSq = Math.min(minSq, dx * dx + dy * dy)
    }
    return (inside ? 1 : -1) * Math.sqrt(minSq)
}

interface LabelPoint { lat: number, lng: number, radius: number }

/**
 * Bounds of a group's main body: its pieces from largest down until 90% of its
 * area is covered, so far-flung islands (the Falklands for the English, Hawaii
 * for Americans) don't drag the view into the ocean.
 */
function focusBounds(geom: Polygon | MultiPolygon): [[number, number], [number, number]] | null {
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
    const parts = polys
        .map(p => p[0])
        .filter((r): r is Position[] => !!r && r.length > 3)
        .map(r => ({ r, a: ringArea(r) }))
        .sort((x, y) => y.a - x.a)
    const total = parts.reduce((t, x) => t + x.a, 0)
    if (!parts.length || total <= 0) return null
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    let covered = 0
    for (const { r, a } of parts) {
        for (const [x = 0, y = 0] of r) {
            minX = Math.min(minX, x); maxX = Math.max(maxX, x)
            minY = Math.min(minY, y); maxY = Math.max(maxY, y)
        }
        covered += a
        if (covered >= total * 0.9) break
    }
    return [[minY, minX], [maxY, maxX]]
}

/** Approximate pole of inaccessibility of a ring: the interior point farthest from any edge. */
function poleOf(fullRing: Position[]): LabelPoint | null {
    const stride = Math.ceil(fullRing.length / 400)
    const ring = stride > 1 ? fullRing.filter((_, i) => i % stride === 0) : fullRing
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (const [x = 0, y = 0] of ring) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x)
        minY = Math.min(minY, y); maxY = Math.max(maxY, y)
    }
    let cx = (minX + maxX) / 2, cy = (minY + maxY) / 2
    let w = maxX - minX, h = maxY - minY
    let bestD = signedDistance(cx, cy, ring)
    const N = 12
    for (let iter = 0; iter < 4; iter++) {
        const x0 = cx - w / 2, y0 = cy - h / 2
        for (let i = 0; i <= N; i++) {
            for (let j = 0; j <= N; j++) {
                const x = x0 + (w * i) / N, y = y0 + (h * j) / N
                const d = signedDistance(x, y, ring)
                if (d > bestD) { bestD = d; cx = x; cy = y }
            }
        }
        w /= 4; h /= 4
    }
    return bestD > 0 ? { lng: cx, lat: cy, radius: bestD } : null
}

/** Label anchors for the few largest pieces of a (multi)polygon, biggest first. */
function labelAnchors(geom: Polygon | MultiPolygon, max = 4): LabelPoint[] {
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
    return polys
        .map(p => p[0])
        .filter((r): r is Position[] => !!r && r.length > 3)
        .map(r => ({ r, a: ringArea(r) }))
        .filter(x => x.a > 0.5) // ignore pieces under ~0.5 square degrees
        .sort((x, y) => y.a - x.a)
        .slice(0, max)
        .map(x => poleOf(x.r))
        .filter((p): p is LabelPoint => !!p)
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/** Rough rendered width of label text: CJK glyphs are about twice as wide as Latin ones. */
const textPx = (s: string) => [...s].reduce((w, ch) => w + (/[\u2e80-\u9fff\uff00-\uffef]/.test(ch) ? 12.5 : 6.5), 0)

/** Event colours by kind; the same in both themes so the card swatch matches the map. */
const EVENT_COLORS: Record<EventKind, string> = {
    conflict: '#e03131',
    treaty: '#1c7ed6',
    migration: '#e8590c',
    place: '#7048e8',
}

/** Where an event's name label goes, and the box that frames it. */
function eventGeometry(e: PeopleEvent): { anchor: LatLng, bounds: [LatLng, LatLng] } {
    const pts: LatLng[] = []
    for (const sh of e.shapes) {
        if ('point' in sh) pts.push(sh.point)
        else if ('line' in sh) pts.push(...sh.line)
        else {
            const dLat = sh.km / 111
            const dLng = sh.km / (111 * Math.max(0.2, Math.cos(sh.area[0] * Math.PI / 180)))
            pts.push([sh.area[0] - dLat, sh.area[1] - dLng], [sh.area[0] + dLat, sh.area[1] + dLng])
        }
    }
    const lats = pts.map(p => p[0]), lngs = pts.map(p => p[1])
    const first = e.shapes[0]!
    const anchor: LatLng = 'point' in first ? first.point
        : 'area' in first ? first.area
        : first.line[Math.floor(first.line.length / 2)]!
    return { anchor, bounds: [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]] }
}

const INFO_FIELDS = ['language', 'religion', 'food', 'etymology', 'homeland', 'history'] as const

export default function PeopleMapTab() {
    const { t, i18n } = useTranslation()
    const lang = i18n.resolvedLanguage
    const nameOf = useCallback((n: PeopleNode) => localName(n, lang), [lang])
    const levelNames = t('people.levels', { returnObjects: true }) as string[]
    const isDark = useComputedColorScheme('light', { getInitialValueInEffect: false }) === 'dark'
    const tileLayer = useRef<import("leaflet").TileLayer | null>(null)
    const darkRef = useRef(isDark)
    useEffect(() => {
        darkRef.current = isDark
        const map = mapRef.current
        const L = leafletRef.current
        const old = tileLayer.current
        if (!map || !L || !old) return
        // Swap in a fresh layer rather than old.setUrl(): Leaflet's redraw() skips the zoom
        // rounding, so at our fractional zooms it fetched tiles for "zoom 2.4" — misplaced, and
        // answered by Esri with "Map data not yet available". The old layer stays until the new
        // one has loaded so the basemap never blinks.
        const next = makeBasemap(L, isDark).addTo(map)
        next.bringToBack()
        tileLayer.current = next
        next.once('load', () => { old.remove() })
        return () => { if (map.hasLayer(old)) old.remove() }
    }, [isDark])
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapRef = useRef<LeafletMap | null>(null)
    const leafletRef = useRef<typeof import("leaflet") | null>(null)
    const mergeRef = useRef<typeof import("topojson-client")["merge"] | null>(null)
    const leafAdjacency = useRef<Map<string, Set<string>>>(new Map())
    const topologyRef = useRef<LeafTopology | null>(null)
    const geomsByLeaf = useRef<Map<string, LeafGeometry>>(new Map())
    const featureCache = useRef<Map<string, Feature<MultiPolygon, { id: string }> | null>>(new Map())
    const regionLayer = useRef<LeafletGeoJSON | null>(null)
    const outlineLayer = useRef<import("leaflet").LayerGroup | null>(null)
    const labelLayer = useRef<Layer | null>(null)
    const anchorCache = useRef<Map<string, LabelPoint[]>>(new Map())

    const [ready, setReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [zDepth, setZDepth] = useState(1)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    /** The event shown on the map, and which note it was opened from. Tied to the focused region. */
    const [activeEvent, setActiveEvent] = useState<{ id: string, note: number } | null>(null)
    const eventLayer = useRef<Layer | null>(null)
    useEffect(() => { setActiveEvent(null) }, [selectedId])
    const [viewTick, setViewTick] = useState(0)
    /** Previously explored groups, for the panel's close (back) button. */
    const history = useRef<(string | null)[]>([])
    /** Set when a region handled a click, so the map's own click handler ignores it. */
    const regionClickAt = useRef(0)
    const visible = useMemo(() => visibleNodes(selectedId, zDepth), [selectedId, zDepth])
    const selected = selectedId ? NODE_BY_ID.get(selectedId) ?? null : null

    /** Colors for the regions currently drawn, kept distinct between neighbours. */
    const colors = useMemo(() => {
        if (!ready) return new Map<string, string>()
        const leafOwner = new Map<string, string>()
        for (const n of visible) for (const l of leavesUnder(n.id)) leafOwner.set(l, n.id)
        const adjacency = new Map<string, Set<string>>()
        for (const [leaf, ns] of leafAdjacency.current) {
            const a = leafOwner.get(leaf)
            if (!a) continue
            for (const nb of ns) {
                const b = leafOwner.get(nb)
                if (!b || b === a) continue
                if (!adjacency.has(a)) adjacency.set(a, new Set())
                adjacency.get(a)!.add(b)
            }
        }
        return assignColors(visible.map(n => n.id), adjacency)
    }, [ready, visible])
    const colorOf = useCallback((id: string) => colors.get(id) ?? nodeColor(id), [colors])

    /** Merged polygon for any node in the tree (cached). */
    const featureFor = useCallback((id: string) => {
        const cache = featureCache.current
        if (cache.has(id)) return cache.get(id)!
        const topo = topologyRef.current
        const merge = mergeRef.current
        if (!topo || !merge) return null
        const geoms = leavesUnder(id).map(l => geomsByLeaf.current.get(l)).filter((g): g is LeafGeometry => !!g)
        const feature = geoms.length
            ? { type: 'Feature' as const, properties: { id }, geometry: merge(topo, geoms) }
            : null
        cache.set(id, feature)
        return feature
    }, [])

    /* ---- Load Leaflet, tiles and geometry once ---- */
    useEffect(() => {
        let cancelled = false
        let resizeObserver: ResizeObserver | undefined
        let wheelHandler: ((e: WheelEvent) => void) | undefined

        const load = async () => {
            try {
                const [L, topojson, topoRes] = await Promise.all([
                    import("leaflet"),
                    import("topojson-client"),
                    fetch(new URL("peoples/leaves.topo.json", document.baseURI)),
                    import("leaflet/dist/leaflet.css"),
                ])
                if (!topoRes.ok) throw new Error(t('people.loadFailed', { status: topoRes.status }))
                const topology = await topoRes.json() as LeafTopology
                if (cancelled || !mapContainer.current) return

                leafletRef.current = L
                mergeRef.current = topojson.merge
                topologyRef.current = topology
                const leafGeoms = topology.objects.leaves.geometries
                    .filter((g): g is LeafGeometry => g.type === 'Polygon' || g.type === 'MultiPolygon')
                for (const g of leafGeoms) geomsByLeaf.current.set(g.properties!.leaf, g)
                // Which leaf groups share a border (used to keep neighbouring colors distinct).
                topojson.neighbors(leafGeoms).forEach((ns, i) => {
                    const a = leafGeoms[i]!.properties!.leaf
                    const set = leafAdjacency.current.get(a) ?? new Set<string>()
                    for (const j of ns) set.add(leafGeoms[j]!.properties!.leaf)
                    leafAdjacency.current.set(a, set)
                })

                const map = L.map(mapContainer.current, {
                    center: [25, 0],
                    zoom: 2,
                    minZoom: 1,
                    maxZoom: 7,
                    maxBounds: L.latLngBounds([-85, -180], [85, 180]),
                    maxBoundsViscosity: 1,
                    zoomSnap: 0,
                    zoomDelta: 0.5,
                    scrollWheelZoom: false, // replaced by the eased wheel zoom below
                    worldCopyJump: false,
                    preferCanvas: true,
                })
                mapRef.current = map

                // Smooth wheel zoom. Each frame moves the view the way Leaflet's own flyTo does
                // (_move), so vector layers are CSS-scaled while moving and redrawn once at the end
                // (_moveEnd) instead of being re-projected every frame.
                const internals = map as unknown as LeafletMoveInternals
                let targetZoom = map.getZoom()
                let anchor = map.getSize().divideBy(2)
                let raf = 0
                let moving = false
                const step = () => {
                    const cur = map.getZoom()
                    const diff = targetZoom - cur
                    const z = Math.abs(diff) < 0.004 ? targetZoom : cur + diff * 0.22
                    const viewHalf = map.getSize().divideBy(2)
                    const offset = anchor.subtract(viewHalf).multiplyBy(1 - 1 / map.getZoomScale(z, cur))
                    internals._move(map.containerPointToLatLng(viewHalf.add(offset)), z)
                    if (z === targetZoom) {
                        raf = 0
                        moving = false
                        internals._moveEnd(true)
                        return
                    }
                    raf = requestAnimationFrame(step)
                }
                wheelHandler = (e: WheelEvent) => {
                    e.preventDefault()
                    const lineScale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1
                    const delta = Math.max(-120, Math.min(120, e.deltaY * lineScale))
                    if (!raf) targetZoom = map.getZoom()
                    targetZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), targetZoom - delta * 0.004))
                    const rect = map.getContainer().getBoundingClientRect()
                    anchor = L.point(e.clientX - rect.left, e.clientY - rect.top)
                    if (!moving) {
                        map.stop()
                        internals._moveStart(true, false)
                        moving = true
                    }
                    if (!raf) raf = requestAnimationFrame(step)
                }
                map.getContainer().addEventListener('wheel', wheelHandler, { passive: false })

                tileLayer.current = makeBasemap(L, darkRef.current).addTo(map)

                // Focus outline sits above the regions; labels above that but below tooltips (650).
                map.createPane('peoples-focus').style.zIndex = '420'
                map.getPane('peoples-focus')!.style.pointerEvents = 'none'
                map.createPane('peoples-labels').style.zIndex = '450'
                map.getPane('peoples-labels')!.style.pointerEvents = 'none'
                // Events linked from the notes draw above the region labels.
                map.createPane('peoples-events').style.zIndex = '460'
                map.getPane('peoples-events')!.style.pointerEvents = 'none'

                // React hears about the view only once it settles: the detail level and the
                // labels update after zooming stops, so nothing heavy runs mid-gesture.
                let settle = 0
                map.on('moveend zoomend', () => {
                    window.clearTimeout(settle)
                    settle = window.setTimeout(() => {
                        setZDepth(zoomDepth(map.getZoom()))
                        setViewTick(t => t + 1)
                    }, 120)
                })

                // A click on empty map (not on a region) leaves focus mode but keeps the current view.
                map.on('click', () => {
                    if (Date.now() - regionClickAt.current < 300) return
                    resetRef.current(false)
                })

                // Never zoom out so far that the single (non-repeating) world is narrower than the map.
                const fitMinZoom = () => {
                    const z = Math.log2(map.getSize().x / 256)
                    map.setMinZoom(Math.max(1, Math.ceil(z * 4) / 4))
                }
                fitMinZoom()
                map.fitBounds(WORLD_VIEW)
                resizeObserver = new ResizeObserver(() => {
                    map.invalidateSize()
                    fitMinZoom()
                })
                resizeObserver.observe(mapContainer.current)

                setZDepth(zoomDepth(map.getZoom()))
                setReady(true)
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : String(e))
            }
        }
        void load()

        return () => {
            cancelled = true
            resizeObserver?.disconnect()
            if (wheelHandler) mapRef.current?.getContainer().removeEventListener('wheel', wheelHandler)
            mapRef.current?.remove()
            mapRef.current = null
        }
    }, [])

    /* ---- Navigation: select a group and frame it ---- */
    /** Ask for the view to be framed on a group (or the world) once the layout has settled. */
    const pendingFrame = useRef<{ id: string | null } | null>(null)
    const [frameTick, setFrameTick] = useState(0)
    const frame = useCallback((id: string | null) => {
        pendingFrame.current = { id }
        setFrameTick(t => t + 1)
    }, [])

    useEffect(() => {
        const map = mapRef.current
        const L = leafletRef.current
        const req = pendingFrame.current
        if (!ready || !map || !L || !req) return
        pendingFrame.current = null
        // The map's height changes when the panel opens or closes; measure the new size first.
        const raf = requestAnimationFrame(() => {
            map.invalidateSize({ pan: false })
            const feature = req.id ? featureFor(req.id) : null
            const box = feature ? focusBounds(feature.geometry) : null
            // The world view, and groups whose main body spans most of the globe (e.g. Indo-European).
            if (!box || box[1][1] - box[0][1] > 200) {
                map.flyToBounds(WORLD_VIEW, { duration: 0.8 })
                return
            }
            map.flyToBounds(L.latLngBounds(box), { padding: L.point(48, 48), maxZoom: 6, duration: 0.8 })
        })
        return () => cancelAnimationFrame(raf)
    }, [ready, frameTick, featureFor])

    /** Explore a group, remembering where we came from. */
    const explore = useCallback((id: string) => {
        setSelectedId(prev => {
            if (prev !== id) history.current.push(prev)
            return id
        })
        frame(id)
    }, [frame])

    /** Close the panel: return to the previously explored group, or the world. */
    const goBack = useCallback(() => {
        const prev = history.current.pop() ?? null
        setSelectedId(prev)
        frame(prev)
    }, [frame])

    /** Leaves focus mode. The world button also zooms out; an empty-map click keeps the view. */
    const resetToWorld = useCallback((reframe = true) => {
        history.current = []
        setSelectedId(null)
        if (reframe) frame(null)
    }, [frame])
    const resetRef = useRef(resetToWorld)
    useEffect(() => { resetRef.current = resetToWorld }, [resetToWorld])

    /* ---- Draw the visible regions ---- */
    useEffect(() => {
        const map = mapRef.current
        const L = leafletRef.current
        if (!ready || !map || !L) return

        regionLayer.current?.remove()
        const features = visible.map(n => featureFor(n.id)).filter((f): f is Feature<MultiPolygon, { id: string }> => !!f)

        const baseStyle = (id: string) => ({
            color: isDark ? '#1a1b1e' : '#ffffff',
            weight: 1,
            opacity: 0.9,
            fillColor: colorOf(id),
            fillOpacity: 0.55,
        })

        const layer = L.geoJSON({ type: 'FeatureCollection', features } as FeatureCollection, {
            style: f => baseStyle((f!.properties as { id: string }).id),
            onEachFeature: (f, lyr) => {
                const id = (f.properties as { id: string }).id
                const node = NODE_BY_ID.get(id)!
                const hasKids = childrenOf(id).length > 0
                lyr.bindTooltip(
                    `<strong>${nameOf(node)}</strong>${hasKids ? `<br><span style="opacity:.7">${t('people.subgroupsTooltip', { count: childrenOf(id).length })}</span>` : ''}`,
                    { sticky: true, direction: 'top', offset: [0, -8] },
                )
                lyr.on({
                    mouseover: () => (lyr as Path).setStyle({ fillOpacity: 0.75, weight: 2 }),
                    mouseout: () => (lyr as Path).setStyle({ fillOpacity: 0.55, weight: 1 }),
                    click: () => {
                        regionClickAt.current = Date.now()
                        explore(id)
                    },
                })
            },
        })
        layer.addTo(map)
        regionLayer.current = layer
    }, [ready, visible, featureFor, explore, colorOf, isDark, t, nameOf])

    /* ---- Outline of the selected group ---- */
    useEffect(() => {
        const map = mapRef.current
        const L = leafletRef.current
        if (!ready || !map || !L) return
        outlineLayer.current?.remove()
        outlineLayer.current = null
        if (!selectedId) return
        const f = featureFor(selectedId)
        if (!f) return
        // A canvas, like the regions below it: during zoom the browser just stretches the bitmap,
        // so outline and fill move together (an SVG outline had to re-render every frame and lagged).
        const renderer = L.canvas({ pane: 'peoples-focus', padding: 0.5 })
        const outline = (color: string, weight: number, opacity: number) => L.geoJSON(f, {
            interactive: false,
            pane: 'peoples-focus',
            renderer,
            style: { color, weight, opacity, fill: false, lineJoin: 'round' },
        } as import('leaflet').GeoJSONOptions)
        outlineLayer.current = L.layerGroup([
            outline(isDark ? '#1a1b1e' : '#ffffff', 7, 0.85),
            outline('#1c7ed6', 2.5, 1),
        ]).addTo(map)
    }, [ready, selectedId, featureFor, isDark])

    /* ---- Labels for regions large enough on screen ---- */
    useEffect(() => {
        const map = mapRef.current
        const L = leafletRef.current
        if (!ready || !map || !L) return
        labelLayer.current?.remove()
        const group = L.layerGroup()
        const pxPerDegree = 256 * Math.pow(2, map.getZoom()) / 360
        const candidates: { name: string, a: LabelPoint, radiusPx: number }[] = []
        for (const n of visible) {
            let anchors = anchorCache.current.get(n.id)
            if (anchors === undefined) {
                const f = featureFor(n.id)
                anchors = f ? labelAnchors(f.geometry) : []
                anchorCache.current.set(n.id, anchors)
            }
            // Map labels drop trailing parentheticals; the full name is in the tooltip and panel.
            const short = shortName(nameOf(n))
            for (const a of anchors) {
                const radiusPx = a.radius * pxPerDegree
                // Only label pieces with room for the text around their deepest interior point.
                if (radiusPx >= 16) candidates.push({ name: short, a, radiusPx })
            }
        }
        // Biggest pieces first; skip any label that would collide with one already placed.
        candidates.sort((x, y) => y.radiusPx - x.radiusPx)
        const size = map.getSize()
        const placed: { x: number, y: number, w: number, h: number }[] = []
        for (const c of candidates) {
            const pt = map.latLngToContainerPoint([c.a.lat, c.a.lng])
            if (pt.x < -50 || pt.y < -20 || pt.x > size.x + 50 || pt.y > size.y + 20) continue
            const w = Math.min(160, c.radiusPx * 3, textPx(c.name) + 8)
            const lines = Math.ceil(textPx(c.name) / Math.max(w, 1))
            const h = lines * 13 + 4
            const box = { x: pt.x - w / 2, y: pt.y - h / 2, w, h }
            if (placed.some(b => box.x < b.x + b.w && b.x < box.x + box.w && box.y < b.y + b.h && b.y < box.y + box.h)) continue
            placed.push(box)
            L.marker([c.a.lat, c.a.lng], {
                pane: 'peoples-labels',
                interactive: false,
                icon: L.divIcon({
                    className: 'peoples-label',
                    html: `<span style="max-width:${w.toFixed(0)}px">${c.name}</span>`,
                    iconSize: [w, 0],
                }),
            }).addTo(group)
        }
        group.addTo(map)
        labelLayer.current = group
    }, [ready, visible, featureFor, viewTick, nameOf])

    /* ---- The event opened from a note ---- */
    const activeEventId = activeEvent?.id ?? null
    useEffect(() => {
        const map = mapRef.current
        const L = leafletRef.current
        eventLayer.current?.remove()
        eventLayer.current = null
        const ev = activeEventId ? EVENT_BY_ID.get(activeEventId) : undefined
        if (!ready || !map || !L || !ev) return
        const color = EVENT_COLORS[ev.kind]
        const halo = isDark ? '#1a1b1e' : '#ffffff'
        // Canvas, like the regions, so shapes stay put while zooming.
        const renderer = L.canvas({ pane: 'peoples-events', padding: 0.5 })
        const common = { pane: 'peoples-events', renderer, interactive: false }
        const group = L.layerGroup()
        const label = (at: LatLng, text: string, main: boolean) => L.marker(at, {
            pane: 'peoples-events', interactive: false,
            icon: L.divIcon({
                className: main ? 'peoples-event-label' : 'peoples-event-label peoples-event-sublabel',
                html: `<span>${text}</span>`,
                iconSize: [180, 0],
            }),
        }).addTo(group)
        for (const sh of ev.shapes) {
            if ('area' in sh) {
                L.circle(sh.area, { ...common, radius: sh.km * 1000, color, weight: 2, dashArray: '6 5', fillColor: color, fillOpacity: 0.14 }).addTo(group)
            } else if ('line' in sh) {
                L.polyline(sh.line, { ...common, color: halo, weight: 7, opacity: 0.85, lineJoin: 'round', lineCap: 'round' }).addTo(group)
                L.polyline(sh.line, { ...common, color, weight: 3.5, dashArray: '9 6', lineJoin: 'round', lineCap: 'round' }).addTo(group)
            }
        }
        // Pins on top of lines and areas.
        for (const sh of ev.shapes) {
            if (!('point' in sh)) continue
            L.circleMarker(sh.point, { ...common, radius: 13, stroke: false, fillColor: color, fillOpacity: 0.22 }).addTo(group)
            L.circleMarker(sh.point, { ...common, radius: 6.5, color: halo, weight: 2.5, fillColor: color, fillOpacity: 1 }).addTo(group)
            if (sh.label) label(sh.point, sh.label, false)
        }
        label(eventGeometry(ev).anchor, localEventName(ev, lang), true)
        group.addTo(map)
        eventLayer.current = group
    }, [ready, activeEventId, isDark, lang])

    // Bring the event into view alongside the focused region (or alone, if they are far apart).
    useEffect(() => {
        const map = mapRef.current
        const L = leafletRef.current
        const ev = activeEventId ? EVENT_BY_ID.get(activeEventId) : undefined
        if (!ready || !map || !L || !ev) return
        const box = L.latLngBounds(eventGeometry(ev).bounds)
        const feature = selectedId ? featureFor(selectedId) : null
        const region = feature ? focusBounds(feature.geometry) : null
        let target = box
        if (region) {
            const both = L.latLngBounds(region).extend(box)
            if (both.getEast() - both.getWest() < 160 && both.getNorth() - both.getSouth() < 90) target = both
        }
        map.flyToBounds(target, { padding: L.point(56, 56), maxZoom: 6, duration: 0.8 })
        // Framing follows the event only; region changes clear it and frame themselves.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready, activeEventId])

    const toggleEvent = useCallback((id: string, note: number) => {
        setActiveEvent(cur => (cur?.id === id && cur.note === note ? null : { id, note }))
    }, [])

    /* ---- Info panel ---- */
    const path = selected ? pathTo(selected.id) : []
    const subgroups = selected ? childrenOf(selected.id) : []
    const relations = selected ? relationsOf(selected.id) : []

    const backTarget = history.current.length ? history.current[history.current.length - 1] : null
    const backNode = backTarget ? NODE_BY_ID.get(backTarget) : undefined
    const backLabel = backTarget ? t('people.backTo', { name: backNode ? nameOf(backNode) : '' }) : t('people.closeToWorld')
    const sectionLabel = (text: string) => (
        <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={4} style={{ letterSpacing: 0.4 }}>{text}</Text>
    )

    return (
        <Stack gap="sm" style={{ textAlign: 'left' }}>
            <style>{`
                .peoples-label { display:flex; justify-content:center; pointer-events:none; }
                .peoples-lit-quote {
                    margin-top: 8px; padding: 8px 14px; white-space: pre-line;
                    border-left: 3px solid var(--mantine-color-default-border);
                    background: var(--mantine-color-default-hover); border-radius: 0 8px 8px 0;
                }
                .peoples-lit-original { font-family: Georgia, "Noto Serif", "Times New Roman", serif; line-height: 1.45; text-align: start; }
                .peoples-event-label { display:flex; justify-content:center; pointer-events:none; }
                .peoples-event-label span {
                    font: 700 12.5px/1.2 system-ui, sans-serif; text-align:center; white-space: normal; max-width: 180px;
                    color: var(--peoples-label-color); text-shadow: var(--peoples-label-halo);
                    transform: translateY(calc(-100% - 14px));
                }
                .peoples-event-sublabel span { font-weight: 600; font-size: 11px; transform: translateY(12px); opacity: .85; }
                .peoples-event-link {
                    font: inherit; color: inherit; padding: 0; background: none; border: 0; cursor: pointer;
                    text-decoration: underline dotted var(--event-color); text-decoration-thickness: 2px; text-underline-offset: 3px;
                }
                .peoples-event-link:hover, .peoples-event-link[aria-pressed="true"] {
                    text-decoration-style: solid; color: var(--event-color);
                }
                .peoples-label span {
                    font: 600 11px/1.15 system-ui, sans-serif; text-align:center;
                    color: var(--peoples-label-color); text-shadow: var(--peoples-label-halo);
                    transform: translateY(-50%); white-space: normal; max-width: 160px;
                }
            `}</style>

            <div style={{
                position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden', height: '62vh', minHeight: 360,
                ['--peoples-label-color' as string]: isDark ? '#f1f3f5' : '#1a1b1e',
                ['--peoples-label-halo' as string]: isDark
                    ? '0 0 3px #1a1b1e, 0 0 3px #1a1b1e, 0 0 2px #1a1b1e'
                    : '0 0 3px #fff, 0 0 3px #fff, 0 0 2px #fff',
            }}>
                <div ref={mapContainer} style={{ position: 'absolute', inset: 0, background: isDark ? '#2c2e33' : '#e9ecef' }} />

                {(!ready || error) && (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--mantine-color-body)', color: 'var(--mantine-color-text)',
                    }}>
                        {error ?? t('people.loading')}
                    </div>
                )}

                {ready && (
                    <Paper shadow="sm" radius="md" p={6} style={{
                        position: 'absolute', top: 12, right: 12, zIndex: 1000,
                        background: 'color-mix(in srgb, var(--mantine-color-body) 92%, transparent)', backdropFilter: 'blur(6px)',
                    }}>
                        <Group gap={6} wrap="nowrap">
                            <Text size="xs" c="dimmed" visibleFrom="sm">{t('people.zoomShows')}</Text>
                            <Text size="xs" fw={600}>{levelNames[Math.min(zDepth, levelNames.length) - 1]}</Text>
                            <Tooltip label={t('people.backToWorld')}>
                                <ActionIcon size="sm" variant="subtle" onClick={() => resetToWorld()} aria-label={t('people.backToWorld')}>
                                    <IconWorld size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Paper>
                )}
            </div>

            {/* Info section: the selected group's profile, or what the map shows */}
            <Paper radius="lg" withBorder p="md">
                {!selected ? (
                    <Stack gap="xs">
                        <Title order={4}>{t('people.aboutTitle')}</Title>
                        <Text size="sm">{t('people.about1')}</Text>
                        <Text size="sm">{t('people.about2', { count: PEOPLE_NODES.length })}</Text>
                        {i18n.resolvedLanguage !== 'en' && <Text size="xs" c="dimmed">{t('people.contentNote')}</Text>}
                    </Stack>
                ) : (
                    <Stack gap="sm">
                        <Group justify="space-between" align="flex-start" wrap="nowrap">
                            <Stack gap={4} style={{ minWidth: 0 }}>
                                <Breadcrumbs separator="›" separatorMargin={4} style={{ flexWrap: 'wrap' }}>
                                    {path.map(n => n.id === selected.id
                                        ? <Text key={n.id} size="xs" c="dimmed">{nameOf(n)}</Text>
                                        : <Anchor key={n.id} size="xs" onClick={() => explore(n.id)}>{nameOf(n)}</Anchor>,
                                    )}
                                </Breadcrumbs>
                                <Group gap="xs" align="baseline">
                                    <Title order={3} style={{ lineHeight: 1.2 }}>{nameOf(selected)}</Title>
                                    {selected.info.population && <Badge variant="light" color="gray">{selected.info.population}</Badge>}
                                </Group>
                            </Stack>
                            <Group gap={4} wrap="nowrap">
                                {selected.parent && (
                                    <Tooltip label={t('people.upOneLevel')}>
                                        <ActionIcon variant="subtle" onClick={() => explore(selected.parent!)} aria-label={t('people.upOneLevel')}>
                                            <IconArrowUp size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                <Tooltip label={backLabel}>
                                    <ActionIcon variant="subtle" onClick={goBack} aria-label="Close">
                                        <IconX size={18} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Group>

                        <Text size="sm">{selected.info.summary}</Text>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" verticalSpacing="xs">
                            {INFO_FIELDS.filter(f => selected.info[f]).map(f => (
                                <div key={f}>
                                    {sectionLabel(t(`people.fields.${f}`))}
                                    <Text size="sm">{selected.info[f]}</Text>
                                </div>
                            ))}
                        </SimpleGrid>
                        {selected && LITERATURE[selected.id] && (() => {
                            const lit = LITERATURE[selected.id]!
                            const quote = lit.original ?? lit.romanized ?? lit.translation
                            return (
                                <div>
                                    {sectionLabel(t('people.literature'))}
                                    <Text size="sm" fw={600}>
                                        {lit.title}
                                        <Text span size="xs" c="dimmed" fw={400}>{'  ·  '}{[lit.by, lit.date].filter(Boolean).join(' · ')}</Text>
                                    </Text>
                                    {quote && (
                                        <div className="peoples-lit-quote">
                                            {lit.original && <Text size="md" lang={lit.lang} dir="auto" className="peoples-lit-original">{lit.original}</Text>}
                                            {lit.romanized && <Text size="sm" fs="italic" c="dimmed" mt={lit.original ? 4 : 0}>{lit.romanized}</Text>}
                                            {lit.translation && (
                                                <Text size="sm" mt={lit.original || lit.romanized ? 6 : 0} fs={lit.original || lit.romanized ? undefined : 'italic'}>
                                                    {lit.original || lit.romanized ? `“${lit.translation}”` : lit.translation}
                                                </Text>
                                            )}
                                        </div>
                                    )}
                                    <Text size="sm" mt={6}>{lit.note}</Text>
                                </div>
                            )
                        })()}
                        {relations.length > 0 && (
                            <div>
                                {sectionLabel(t('people.relations'))}
                                <Stack gap={6}>
                                    {relations.map((r, i) => {
                                        const other = r.with ? NODE_BY_ID.get(r.with) : undefined
                                        return (
                                            <div key={i}>
                                            <Text size="sm">
                                                {other
                                                    ? <Anchor fw={600} onClick={() => explore(other.id)}>{shortName(nameOf(other))}</Anchor>
                                                    : <Text span fw={600}>{r.label}</Text>}
                                                {': '}
                                                {linkEvents(r.text).map((part, j) => typeof part === 'string'
                                                    ? part
                                                    : (
                                                        <Anchor
                                                            key={j} component="button" type="button"
                                                            onClick={() => toggleEvent(part.eventId, i)}
                                                            className="peoples-event-link"
                                                            style={{ '--event-color': EVENT_COLORS[EVENT_BY_ID.get(part.eventId)!.kind] } as CSSProperties}
                                                            aria-pressed={activeEvent?.id === part.eventId && activeEvent.note === i}
                                                            title={t('people.showOnMap')}
                                                        >
                                                            {part.text}
                                                        </Anchor>
                                                    ))}
                                            </Text>
                                                {activeEvent?.note === i && (() => {
                                                    const ev = EVENT_BY_ID.get(activeEvent.id)
                                                    return ev ? (
                                                        <Paper
                                                            withBorder radius="md" p="xs" mt={6}
                                                            style={{ borderLeft: `4px solid ${EVENT_COLORS[ev.kind]}` }}
                                                        >
                                                            <Group justify="space-between" wrap="nowrap" align="flex-start" gap="xs">
                                                                <span>
                                                                    <Text span fw={700} size="sm">{localEventName(ev, lang)}</Text>
                                                                    <Text span size="xs" c="dimmed">{'  ·  '}{t(`people.eventKinds.${ev.kind}`)} · {ev.date}</Text>
                                                                </span>
                                                                <ActionIcon size="sm" variant="subtle" color="gray" onClick={() => setActiveEvent(null)} aria-label={t('people.hideEvent')}>
                                                                    <IconX size={14} />
                                                                </ActionIcon>
                                                            </Group>
                                                            <Text size="sm" mt={2}>{ev.summary}</Text>
                                                        </Paper>
                                                    ) : null
                                                })()}
                                            </div>
                                        )
                                    })}
                                </Stack>
                            </div>
                        )}
                        {subgroups.length > 0 && (
                            <div>
                                {sectionLabel(t('people.subgroups', { count: subgroups.length }))}
                                <Group gap={6}>
                                    {subgroups.map(s => (
                                        <Button
                                            key={s.id} size="compact-xs" radius="xl" variant="light"
                                            onClick={() => explore(s.id)}
                                            leftSection={<span style={{ width: 8, height: 8, borderRadius: 4, background: colorOf(s.id), display: 'inline-block' }} />}
                                        >
                                            {nameOf(s)}
                                        </Button>
                                    ))}
                                </Group>
                            </div>
                        )}
                        {i18n.resolvedLanguage !== 'en' && <Text size="xs" c="dimmed">{t('people.contentNote')}</Text>}
                    </Stack>
                )}
            </Paper>
        </Stack>
    )
}

