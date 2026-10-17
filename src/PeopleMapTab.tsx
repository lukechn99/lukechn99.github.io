import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ActionIcon, Anchor, Badge, Breadcrumbs, Button, Group, Paper, ScrollArea, SimpleGrid, Stack, Text, Title, Tooltip } from "@mantine/core"
import { IconArrowUp, IconWorld, IconX } from "@tabler/icons-react"
import { relationsOf } from "./peoples/relations/index.ts"
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
const LEVEL_NAMES = ['Language families', 'Branches', 'Sub-branches', 'Peoples']

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

const ROOT_HUES: Record<string, number> = {
    'indo-european': 214, 'sino-tibetan': 2, 'afro-asiatic': 32, 'niger-congo': 128, 'turkic': 168,
    'austronesian': 276, 'dravidian': 328, 'uralic': 24, 'mongols': 268, 'caucasian': 52,
    'austroasiatic': 92, 'tai-kadai': 302, 'japonic': 318, 'koreans': 45, 'nilo-saharan': 70,
    'khoe-san': 145, 'indigenous-americas': 12, 'papuans': 300, 'aboriginal-australians': 22, 'basques': 58,
}

const SIBLING_HUE_OFFSETS = [0, 42, -42, 84, -84, 21, -21, 63, -63, 105, -105, 126]
/** Families whose children fan out the other way, to avoid clashing with neighbours. */
const FLIPPED_FAMILIES = new Set(['turkic'])

const hueCache = new Map<string, number>()
function nodeHue(id: string): number {
    const cached = hueCache.get(id)
    if (cached !== undefined) return cached
    const node = NODE_BY_ID.get(id)!
    let hue: number
    if (!node.parent) {
        hue = ROOT_HUES[id] ?? 0
    } else {
        const siblings = childrenOf(node.parent)
        const i = siblings.findIndex(s => s.id === id)
        // Siblings fan out around the parent's hue so neighbours differ, while the
        // first child keeps the family hue. Deeper levels fan out less.
        const offset = SIBLING_HUE_OFFSETS[i % SIBLING_HUE_OFFSETS.length] ?? 0
        const flip = FLIPPED_FAMILIES.has(pathTo(id)[0]?.id ?? '') ? -1 : 1
        hue = nodeHue(node.parent) + flip * offset * (depthOf(id) > 2 ? 0.6 : 1)
    }
    hueCache.set(id, hue)
    return hue
}

interface Hsl { h: number, s: number, l: number }

function baseHsl(id: string): Hsl {
    const node = NODE_BY_ID.get(id)!
    const siblings = node.parent ? childrenOf(node.parent) : ROOTS
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

const INFO_FIELDS: { key: keyof PeopleNode['info'], label: string }[] = [
    { key: 'language', label: 'Language' },
    { key: 'religion', label: 'Religion' },
    { key: 'food', label: 'Food' },
    { key: 'etymology', label: 'Origin of the name' },
    { key: 'homeland', label: 'Where they live' },
    { key: 'history', label: 'History' },
]

export default function PeopleMapTab() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapRef = useRef<LeafletMap | null>(null)
    const leafletRef = useRef<typeof import("leaflet") | null>(null)
    const mergeRef = useRef<typeof import("topojson-client")["merge"] | null>(null)
    const leafAdjacency = useRef<Map<string, Set<string>>>(new Map())
    const topologyRef = useRef<LeafTopology | null>(null)
    const geomsByLeaf = useRef<Map<string, LeafGeometry>>(new Map())
    const featureCache = useRef<Map<string, Feature<MultiPolygon, { id: string }> | null>>(new Map())
    const regionLayer = useRef<LeafletGeoJSON | null>(null)
    const outlineLayer = useRef<LeafletGeoJSON | null>(null)
    const labelLayer = useRef<Layer | null>(null)
    const anchorCache = useRef<Map<string, LabelPoint[]>>(new Map())

    const [ready, setReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [zDepth, setZDepth] = useState(1)
    const [selectedId, setSelectedId] = useState<string | null>(null)
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
                if (!topoRes.ok) throw new Error(`Map data failed to load (${topoRes.status})`)
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
                    center: [25, 20],
                    zoom: 2,
                    minZoom: 2,
                    maxZoom: 7,
                    zoomSnap: 0,
                    zoomDelta: 0.5,
                    scrollWheelZoom: false, // replaced by the eased wheel zoom below
                    worldCopyJump: true,
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

                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                    maxZoom: 16,
                    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ · Regions from <a href="https://www.naturalearthdata.com/">Natural Earth</a> provinces',
                }).addTo(map)

                // Focus outline sits above the regions; labels above that but below tooltips (650).
                map.createPane('peoples-focus').style.zIndex = '420'
                map.getPane('peoples-focus')!.style.pointerEvents = 'none'
                map.createPane('peoples-labels').style.zIndex = '450'
                map.getPane('peoples-labels')!.style.pointerEvents = 'none'

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

                // A click on empty map (not on a region) goes back to the world view.
                map.on('click', () => {
                    if (Date.now() - regionClickAt.current < 300) return
                    resetRef.current()
                })

                resizeObserver = new ResizeObserver(() => map.invalidateSize())
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
    const frame = useCallback((id: string | null) => {
        const map = mapRef.current
        const L = leafletRef.current
        if (!map || !L) return
        const feature = id ? featureFor(id) : null
        const bounds = feature ? L.geoJSON(feature).getBounds() : null
        // The world view, and groups that span most of the globe (e.g. Indo-European).
        if (!bounds || bounds.getEast() - bounds.getWest() > 200) {
            map.flyTo([25, 20], 2, { duration: 0.8 })
            return
        }
        const target = map.getBoundsZoom(bounds, false, L.point(40, 40))
        map.flyTo(bounds.getCenter(), Math.max(2, Math.min(target, 6)), { duration: 0.8 })
    }, [featureFor])

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

    const resetToWorld = useCallback(() => {
        history.current = []
        setSelectedId(null)
        frame(null)
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
            color: '#ffffff',
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
                    `<strong>${node.name}</strong>${hasKids ? `<br><span style="opacity:.7">${childrenOf(id).length} subgroups · click to explore</span>` : ''}`,
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
    }, [ready, visible, featureFor, explore, colorOf])

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
        const renderer = L.svg({ pane: 'peoples-focus' })
        outlineLayer.current = L.geoJSON(f, {
            interactive: false,
            pane: 'peoples-focus',
            style: { color: '#ffffff', weight: 7, opacity: 0.85, fill: false, renderer, lineJoin: 'round' },
        }).addTo(map)
        L.geoJSON(f, {
            interactive: false,
            pane: 'peoples-focus',
            style: { color: '#1c7ed6', weight: 2.5, opacity: 1, fill: false, renderer, lineJoin: 'round' },
        }).addTo(outlineLayer.current)
    }, [ready, selectedId, featureFor])

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
            const short = n.name.replace(/\s*\([^)]*\)\s*$/, '')
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
            const w = Math.min(160, c.radiusPx * 3, c.name.length * 6.5 + 8)
            const lines = Math.ceil((c.name.length * 6.5) / Math.max(w, 1))
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
    }, [ready, visible, featureFor, viewTick])

    /* ---- Info panel ---- */
    const path = selected ? pathTo(selected.id) : []
    const subgroups = selected ? childrenOf(selected.id) : []
    const relations = selected ? relationsOf(selected.id) : []

    return (
        <Stack gap="xs" style={{ textAlign: 'left' }}>
            <style>{`
                .peoples-label { display:flex; justify-content:center; pointer-events:none; }
                .peoples-label span {
                    font: 600 11px/1.15 system-ui, sans-serif; color:#1a1b1e; text-align:center;
                    text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 2px #fff;
                    transform: translateY(-50%); white-space: normal; max-width: 160px;
                }
            `}</style>

            <div style={{
                position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden',
                height: selected ? 'calc(58vh - 60px)' : '68vh', minHeight: 320, transition: 'height 200ms ease',
            }}>
                <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }} />

                {(!ready || error) && (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--mantine-color-body)', color: 'var(--mantine-color-text)',
                    }}>
                        {error ?? 'Loading map…'}
                    </div>
                )}

                {ready && (
                    <Paper shadow="sm" radius="md" p={6} style={{
                        position: 'absolute', top: 12, right: 12, zIndex: 1000,
                        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
                    }}>
                        <Group gap={6} wrap="nowrap">
                            <Text size="xs" c="dimmed" visibleFrom="sm">Zoom level shows:</Text>
                            <Text size="xs" fw={600} c="dark">{LEVEL_NAMES[Math.min(zDepth, LEVEL_NAMES.length) - 1]}</Text>
                            <Tooltip label="Back to the whole world">
                                <ActionIcon size="sm" variant="subtle" onClick={resetToWorld} aria-label="Reset view">
                                    <IconWorld size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Paper>
                )}
            </div>

            <Text size="xs" c="dimmed">
                Each province or state is colored by its majority (or largest) people, so minorities and mixed areas are simplified away.
                In the US, each county shows its largest ancestry or origin group (ACS 2020–2024).
                Click a region to focus on it and reveal its subgroups; close the panel to step back, or click empty map to return to the world. {PEOPLE_NODES.length} groups in all.
            </Text>

            {/* Spacer so the fixed panel never hides the caption */}
            {selected && <div style={{ height: '40vh' }} />}

            {selected && (
                <Paper
                    shadow="xl" radius="lg" withBorder
                    style={{
                        position: 'fixed', left: '50%', bottom: 12, transform: 'translateX(-50%)',
                        width: 'min(960px, calc(100vw - 24px))', maxHeight: '40vh', zIndex: 1100,
                        display: 'flex', flexDirection: 'column', textAlign: 'left',
                    }}
                >
                    <Group justify="space-between" align="flex-start" wrap="nowrap" p="md" pb="xs">
                        <Stack gap={4} style={{ minWidth: 0 }}>
                            <Breadcrumbs separator="›" separatorMargin={4} style={{ flexWrap: 'wrap' }}>
                                {path.map(n => n.id === selected.id
                                    ? <Text key={n.id} size="xs" c="dimmed">{n.name}</Text>
                                    : <Anchor key={n.id} size="xs" onClick={() => explore(n.id)}>{n.name}</Anchor>,
                                )}
                            </Breadcrumbs>
                            <Group gap="xs" align="baseline">
                                <Title order={3} style={{ lineHeight: 1.2 }}>{selected.name}</Title>
                                {selected.info.population && <Badge variant="light" color="gray">{selected.info.population}</Badge>}
                            </Group>
                        </Stack>
                        <Group gap={4} wrap="nowrap">
                            {selected.parent && (
                                <Tooltip label="Up one level">
                                    <ActionIcon variant="subtle" onClick={() => explore(selected.parent!)} aria-label="Up one level">
                                        <IconArrowUp size={18} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            <Tooltip label={history.current.length && history.current[history.current.length - 1] ? `Back to ${NODE_BY_ID.get(history.current[history.current.length - 1]!)?.name}` : 'Close and return to the world'}>
                                <ActionIcon variant="subtle" onClick={goBack} aria-label="Close">
                                    <IconX size={18} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>

                    <ScrollArea.Autosize mah="calc(40vh - 90px)" px="md" pb="md" type="auto">
                        <Stack gap="sm">
                            <Text size="sm">{selected.info.summary}</Text>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" verticalSpacing="xs">
                                {INFO_FIELDS.filter(f => selected.info[f.key]).map(f => (
                                    <div key={f.key}>
                                        <Text size="xs" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: 0.4 }}>{f.label}</Text>
                                        <Text size="sm">{selected.info[f.key]}</Text>
                                    </div>
                                ))}
                            </SimpleGrid>
                            {relations.length > 0 && (
                                <div>
                                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={4} style={{ letterSpacing: 0.4 }}>
                                        Relations with neighbours
                                    </Text>
                                    <Stack gap={6}>
                                        {relations.map((r, i) => {
                                            const other = r.with ? NODE_BY_ID.get(r.with) : undefined
                                            return (
                                                <Text key={i} size="sm">
                                                    {other
                                                        ? <Anchor fw={600} onClick={() => explore(other.id)}>{other.name.replace(/\s*\([^)]*\)\s*$/, '')}</Anchor>
                                                        : <Text span fw={600}>{r.label}</Text>}
                                                    {': '}{r.text}
                                                </Text>
                                            )
                                        })}
                                    </Stack>
                                </div>
                            )}
                            {subgroups.length > 0 && (
                                <div>
                                    <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb={4} style={{ letterSpacing: 0.4 }}>
                                        Subgroups ({subgroups.length})
                                    </Text>
                                    <Group gap={6}>
                                        {subgroups.map(s => (
                                            <Button
                                                key={s.id} size="compact-xs" radius="xl" variant="light"
                                                onClick={() => explore(s.id)}
                                                leftSection={<span style={{ width: 8, height: 8, borderRadius: 4, background: colorOf(s.id), display: 'inline-block' }} />}
                                            >
                                                {s.name}
                                            </Button>
                                        ))}
                                    </Group>
                                </div>
                            )}
                        </Stack>
                    </ScrollArea.Autosize>
                </Paper>
            )}
        </Stack>
    )
}

