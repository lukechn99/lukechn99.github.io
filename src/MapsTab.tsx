import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import {
    Stack, Text, ActionIcon, Collapse, Group, Button, Paper, TextInput, Loader, Select, Tooltip,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
    IconPlus, IconX, IconDownload, IconTrash, IconSortAscending, IconSortDescending,
    IconGripVertical, IconChevronLeft, IconChevronRight,
} from "@tabler/icons-react"
import {
    DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import {
    SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Map as LeafletMap } from "leaflet"
import type { ItineraryItem, ItineraryMeta, NominatimResult } from "./travel/types.ts"
import { isHotelLocation } from "./travel/types.ts"
import {
    migrateOldStorage, loadItineraries, setActiveItinerary,
    createItinerary as storageCreateItinerary,
    deleteItinerary as storageDeleteItinerary,
    loadItems, saveItems, generateId,
} from "./travel/storage.ts"
import { fetchWeather, fetchDrivingRoute, buildStaticMapUrl, MAPTILER_API_KEY } from "./travel/api.ts"
import type { RouteLeg } from "./travel/api.ts"
import LocationSearch from "./travel/LocationSearch.tsx"
import ItineraryItemCard from "./travel/ItineraryItemCard.tsx"
import TransitConnector from "./travel/TransitConnector.tsx"

type SortMode = 'manual' | 'date-asc' | 'date-desc'

const WEATHER_EMOJI: Record<string, string> = {
    'sun': '☀️',
    'cloud-sun': '⛅',
    'cloud': '☁️',
    'cloud-rain': '🌧️',
    'cloud-fog': '🌫️',
    'snowflake': '❄️',
    'cloud-storm': '⛈️',
}

function markerHtml(index: number, weatherIcon?: string, isActive = false): string {
    const emoji = weatherIcon ? (WEATHER_EMOJI[weatherIcon] ?? '📍') : '📍'
    const borderColor = isActive ? '#fd7e14' : '#339af0'
    const badgeBg = isActive ? '#fd7e14' : '#339af0'
    return `
      <div style="position:relative;width:42px;height:42px;">
        <div style="
          width:42px;height:42px;border-radius:50%;
          background:white;border:2.5px solid ${borderColor};
          display:flex;align-items:center;justify-content:center;
          font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.22);
        ">${emoji}</div>
        <div style="
          position:absolute;top:-5px;right:-5px;
          width:20px;height:20px;border-radius:50%;
          background:${badgeBg};color:white;
          font-size:11px;font-weight:700;
          display:flex;align-items:center;justify-content:center;
          border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.2);
        ">${index}</div>
      </div>
    `
}

interface SortableItemProps {
    item: ItineraryItem
    index: number
    isDragMode: boolean
    onUpdate: (item: ItineraryItem) => void
    onRemove: (id: string) => void
    onFocus: (item: ItineraryItem) => void
}

function SortableItem({ item, index, isDragMode, onUpdate, onRemove, onFocus }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }
    return (
        <div ref={setNodeRef} style={style}>
            <ItineraryItemCard
                item={item}
                index={index}
                onUpdate={onUpdate}
                onRemove={onRemove}
                onFocus={onFocus}
                isDragMode={isDragMode}
                dragHandleProps={isDragMode ? { ...attributes, ...listeners } : undefined}
            />
        </div>
    )
}

export default function MapsTab() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<LeafletMap | null>(null)
    const leafletRef = useRef<typeof import("leaflet") | null>(null)
    const markersRef = useRef<unknown[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [storeInit] = useState(() => {
        migrateOldStorage()
        return loadItineraries()
    })
    const [itineraries, setItineraries] = useState<ItineraryMeta[]>(storeInit.list)
    const [activeId, setActiveIdState] = useState<string | null>(storeInit.activeId)
    const [items, setItems] = useState<ItineraryItem[]>(() =>
        storeInit.activeId ? loadItems(storeInit.activeId) : []
    )
    const [creatingNew, setCreatingNew] = useState(false)
    const [newItineraryName, setNewItineraryName] = useState("")

    const [formOpen, { toggle: toggleForm, close: closeForm }] = useDisclosure(false)
    const [pendingLocation, setPendingLocation] = useState<NominatimResult | null>(null)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [exporting, setExporting] = useState(false)
    const [sortMode, setSortMode] = useState<SortMode>('manual')
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([])
    const [transitLegs, setTransitLegs] = useState<RouteLeg[]>([])
    const [activeSegment, setActiveSegment] = useState<number | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    const sortedItems = useMemo(() => {
        if (sortMode === 'manual') return items
        const withDate = items.filter(i => i.startDate)
        const withoutDate = items.filter(i => !i.startDate)
        withDate.sort((a, b) => {
            const diff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            return sortMode === 'date-asc' ? diff : -diff
        })
        return [...withDate, ...withoutDate]
    }, [items, sortMode])

    const routeKey = useMemo(() =>
        sortedItems.map(i => `${i.lat},${i.lon}`).join('|'),
        [sortedItems]
    )

    const persist = useCallback((next: ItineraryItem[]) => {
        if (!activeId) return
        setItems(next)
        saveItems(activeId, next)
    }, [activeId])

    /* ---- Map lifecycle ---- */

    useEffect(() => {
        let isCancelled = false
        let timeoutId: number | undefined
        let resizeObserver: ResizeObserver | undefined

        const loadMap = async () => {
            if (mapInstance.current || !mapContainer.current) {
                if (!isCancelled) setIsLoading(false)
                return
            }

            try {
                const [L, { MaptilerLayer }] = await Promise.all([
                    import("leaflet"),
                    import("@maptiler/leaflet-maptilersdk"),
                    import("leaflet/dist/leaflet.css"),
                ])
                if (isCancelled || !mapContainer.current) return

                leafletRef.current = L

                const map = L.map(mapContainer.current, {
                    center: [34.0459701, -118.5639983],
                    zoom: 10,
                    minZoom: 2,
                    maxZoom: 18,
                    zoomSnap: 0,
                    zoomDelta: 0.25,
                    scrollWheelZoom: false,
                    zoomAnimation: true,
                })
                mapInstance.current = map

                let targetZoom = map.getZoom()
                let animating = false

                const smoothZoom = () => {
                    const cur = map.getZoom()
                    const diff = targetZoom - cur
                    if (Math.abs(diff) < 0.005) {
                        map.setZoom(targetZoom, { animate: false })
                        animating = false
                        return
                    }
                    map.setZoom(cur + diff * 0.3, { animate: false })
                    requestAnimationFrame(smoothZoom)
                }

                map.getContainer().addEventListener('wheel', (e: WheelEvent) => {
                    e.preventDefault()
                    const delta = -e.deltaY * 0.002
                    targetZoom = Math.max(
                        map.getMinZoom(),
                        Math.min(map.getMaxZoom(), targetZoom + delta),
                    )
                    if (!animating) {
                        animating = true
                        requestAnimationFrame(smoothZoom)
                    }
                }, { passive: false })

                const mtLayer = new MaptilerLayer({ apiKey: MAPTILER_API_KEY })
                mtLayer.addTo(map)

                // Recalculate map size when container resizes (fixes wide-window off-center)
                resizeObserver = new ResizeObserver(() => {
                    if (mapInstance.current !== map) return
                    map.invalidateSize()
                })
                resizeObserver.observe(mapContainer.current)

                if (!isCancelled) setIsLoading(false)
            } catch {
                if (!isCancelled) setIsLoading(false)
            }
        }

        timeoutId = window.setTimeout(() => { void loadMap() }, 0)

        return () => {
            isCancelled = true
            if (timeoutId !== undefined) window.clearTimeout(timeoutId)
            resizeObserver?.disconnect()
            resizeObserver = undefined
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    /* ---- Markers & route drawing ---- */

    useEffect(() => {
        const map = mapInstance.current
        const L = leafletRef.current
        if (!map || !L) return

        markersRef.current.forEach((m: unknown) => (m as { remove: () => void }).remove())
        markersRef.current = []

        if (sortedItems.length === 0) return

        const bounds: [number, number][] = []

        // Determine which stop indices are part of the active segment
        const activeFrom = activeSegment !== null ? activeSegment : -1
        const activeTo = activeSegment !== null ? activeSegment + 1 : -1

        sortedItems.forEach((item, idx) => {
            const isActive = idx === activeFrom || idx === activeTo
            const icon = L.divIcon({
                html: markerHtml(idx + 1, item.weather?.icon, isActive),
                className: '',
                iconSize: [42, 42],
                iconAnchor: [21, 21],
            })

            const marker = L.marker([item.lat, item.lon], { icon }).addTo(map)
            marker.bindTooltip(`${idx + 1}. ${item.name}`, { direction: 'top', offset: [0, -24] })
            markersRef.current.push(marker)
            bounds.push([item.lat, item.lon])
        })

        // Full route — translucent light blue
        if (routeCoords.length > 1) {
            const fullLine = L.polyline(routeCoords, {
                color: '#339af0',
                weight: 3.5,
                opacity: activeSegment !== null ? 0.2 : 0.5,
            }).addTo(map)
            markersRef.current.push(fullLine)

            // Active segment — orange
            if (activeSegment !== null && transitLegs[activeSegment]?.coords.length) {
                const segLine = L.polyline(transitLegs[activeSegment].coords, {
                    color: '#fd7e14',
                    weight: 5,
                    opacity: 0.85,
                }).addTo(map)
                markersRef.current.push(segLine)
            }
        } else if (sortedItems.length > 1) {
            const polyline = L.polyline(bounds, {
                color: '#339af0',
                weight: 2.5,
                opacity: 0.4,
                dashArray: '8, 8',
            }).addTo(map)
            markersRef.current.push(polyline)
        }

        if (bounds.length === 1) {
            map.setView(bounds[0] as [number, number], 11, { animate: true })
        } else if (bounds.length > 1) {
            if (activeSegment !== null) {
                // Fit just the active segment
                const segBounds: [number, number][] = [bounds[activeSegment]!, bounds[activeSegment + 1]!].filter(Boolean)
                if (segBounds.length === 2) {
                    map.fitBounds(L.latLngBounds(segBounds), { padding: [80, 80], maxZoom: 14, animate: true })
                }
            } else {
                map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50], maxZoom: 13, animate: true })
            }
        }
    }, [sortedItems, routeCoords, transitLegs, activeSegment, isLoading])

    /* ---- Route ---- */

    useEffect(() => {
        if (sortedItems.length < 2) {
            setRouteCoords([])
            setTransitLegs([])
            setActiveSegment(null)
            return
        }

        let cancelled = false
        const coords: [number, number][] = sortedItems.map(i => [i.lat, i.lon])

        fetchDrivingRoute(coords)
            .then(result => {
                if (!cancelled) {
                    setRouteCoords(result.coords)
                    setTransitLegs(result.legs)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setRouteCoords([])
                    setTransitLegs([])
                }
            })

        return () => { cancelled = true }
    }, [routeKey])

    /* ---- Item CRUD ---- */

    const handleAddItem = async () => {
        if (!pendingLocation || !activeId) return

        const addr = pendingLocation.address
        const address: ItineraryItem['address'] = {}
        if (addr?.road) address.road = addr.road
        const city = addr?.city ?? addr?.town ?? addr?.village
        if (city) address.city = city
        if (addr?.state) address.state = addr.state
        if (addr?.country) address.country = addr.country
        if (addr?.postcode) address.postcode = addr.postcode

        const baseName = pendingLocation.display_name.split(',')[0] ?? pendingLocation.display_name
        const lat = parseFloat(pendingLocation.lat)
        const lon = parseFloat(pendingLocation.lon)
        const hotel = isHotelLocation(pendingLocation)

        const newItems: ItineraryItem[] = []

        if (hotel && startDate && endDate) {
            newItems.push({
                id: generateId(),
                name: `Check-in: ${baseName}`,
                displayName: pendingLocation.display_name,
                lat, lon, address,
                category: pendingLocation.class,
                type: pendingLocation.type,
                tags: ['hotel', 'check-in'],
                notes: '',
                startDate,
                endDate: startDate,
                addedAt: new Date().toISOString(),
            })
            newItems.push({
                id: generateId(),
                name: `Check-out: ${baseName}`,
                displayName: pendingLocation.display_name,
                lat, lon, address,
                category: pendingLocation.class,
                type: pendingLocation.type,
                tags: ['hotel', 'check-out'],
                notes: '',
                startDate: endDate,
                endDate,
                addedAt: new Date().toISOString(),
            })
        } else {
            newItems.push({
                id: generateId(),
                name: baseName,
                displayName: pendingLocation.display_name,
                lat, lon, address,
                category: pendingLocation.class,
                type: pendingLocation.type,
                tags: [],
                notes: '',
                startDate,
                endDate,
                addedAt: new Date().toISOString(),
            })
        }

        const next = [...items, ...newItems]
        persist(next)

        setPendingLocation(null)
        setStartDate("")
        setEndDate("")
        closeForm()

        try {
            const weathers = await Promise.all(
                newItems.map(i => fetchWeather(lat, lon, i.startDate).catch(() => null)),
            )
            const weatherById = new Map(
                newItems.map((item, i) => [item.id, weathers[i]] as const).filter(([, w]) => w),
            )
            const updated = next.map(i => {
                const w = weatherById.get(i.id)
                return w ? { ...i, weather: w } : i
            })
            persist(updated)
        } catch { /* weather is best-effort */ }
    }

    const handleUpdateItem = useCallback((updated: ItineraryItem) => {
        const current = items.find(i => i.id === updated.id)
        const next = items.map(i => i.id === updated.id ? updated : i)
        persist(next)

        const locationChanged = current && (current.lat !== updated.lat || current.lon !== updated.lon)
        const dateChanged = current && current.startDate !== updated.startDate

        if (locationChanged || dateChanged) {
            void (async () => {
                try {
                    const weather = await fetchWeather(updated.lat, updated.lon, updated.startDate)
                    setItems(prev => {
                        const withWeather = prev.map(i => i.id === updated.id ? { ...i, weather } : i)
                        if (activeId) saveItems(activeId, withWeather)
                        return withWeather
                    })
                } catch { /* weather is best-effort */ }
            })()
        }
    }, [items, persist, activeId])

    const handleRemoveItem = useCallback((id: string) => {
        persist(items.filter(i => i.id !== id))
    }, [items, persist])

    const handleFocusItem = useCallback((item: ItineraryItem) => {
        mapInstance.current?.setView([item.lat, item.lon], 13, { animate: true })
    }, [])

    const handleWeatherRefresh = useCallback(async (item: ItineraryItem) => {
        try {
            const weather = await fetchWeather(item.lat, item.lon, item.startDate)
            handleUpdateItem({ ...item, weather })
        } catch { /* best-effort */ }
    }, [handleUpdateItem])

    useEffect(() => {
        if (isLoading) return
        items.forEach(item => {
            if (!item.weather) {
                void handleWeatherRefresh(item)
            }
        })
    }, [isLoading])

    /* ---- Drag & drop ---- */

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        if (sortMode !== 'manual') return
        const { active, over } = event
        if (!over || active.id === over.id) return
        setItems(prev => {
            const oldIndex = prev.findIndex(i => i.id === active.id)
            const newIndex = prev.findIndex(i => i.id === over.id)
            const next = arrayMove(prev, oldIndex, newIndex)
            if (activeId) saveItems(activeId, next)
            return next
        })
    }, [sortMode, activeId])

    /* ---- Sort mode ---- */

    const cycleSortMode = useCallback(() => {
        setSortMode(prev => {
            if (prev === 'manual') return 'date-asc'
            if (prev === 'date-asc') return 'date-desc'
            return 'manual'
        })
    }, [])

    /* ---- Fit / Export ---- */

    const fitAllMarkers = useCallback(() => {
        const map = mapInstance.current
        const L = leafletRef.current
        if (!map || !L || sortedItems.length === 0) return

        const bounds: [number, number][] = sortedItems.map(i => [i.lat, i.lon])
        if (bounds.length === 1) {
            map.setView(bounds[0] as [number, number], 11, { animate: false })
        } else {
            map.fitBounds(L.latLngBounds(bounds), { padding: [60, 60], maxZoom: 13, animate: false })
        }
    }, [sortedItems])

    const activeItineraryName = itineraries.find(i => i.id === activeId)?.name ?? 'Travel Itinerary'

    const handleExportPDF = useCallback(async () => {
        if (sortedItems.length === 0 || !mapInstance.current) return
        setExporting(true)

        fitAllMarkers()
        await new Promise(r => setTimeout(r, 800))

        try {
            const jsPDFModule = await import('jspdf')
            const { jsPDF } = jsPDFModule

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
            const pageW = pdf.internal.pageSize.getWidth()
            const pageH = pdf.internal.pageSize.getHeight()
            const margin = 12
            const contentW = pageW - margin * 2
            let cursorY = margin

            pdf.setFontSize(18)
            pdf.setFont('helvetica', 'bold')
            pdf.text(activeItineraryName, margin, cursorY + 6)
            cursorY += 12

            pdf.setFontSize(9)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(120)
            pdf.text(`${sortedItems.length} stop${sortedItems.length === 1 ? '' : 's'} — exported ${new Date().toLocaleDateString()}`, margin, cursorY)
            pdf.setTextColor(0)
            cursorY += 8

            try {
                const staticUrl = buildStaticMapUrl(sortedItems, routeCoords, 800, 400)
                const mapRes = await fetch(staticUrl)
                if (mapRes.ok) {
                    const mapBlob = await mapRes.blob()
                    const mapBase64 = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onload = () => resolve(reader.result as string)
                        reader.onerror = reject
                        reader.readAsDataURL(mapBlob)
                    })
                    const cappedMapH = Math.min(contentW * 0.5, 100)
                    pdf.addImage(mapBase64, 'PNG', margin, cursorY, contentW, cappedMapH)
                    cursorY += cappedMapH + 6
                }
            } catch { /* static map unavailable */ }

            for (let i = 0; i < sortedItems.length; i++) {
                const item = sortedItems[i]!
                const blockH = 36 + (item.weather ? 6 : 0) + (item.notes ? 8 : 0) + (item.tags.length > 0 ? 6 : 0)

                if (cursorY + blockH > pageH - margin) {
                    pdf.addPage()
                    cursorY = margin
                }

                pdf.setFillColor(240, 245, 255)
                pdf.roundedRect(margin, cursorY, contentW, blockH, 2, 2, 'F')

                pdf.setFontSize(11)
                pdf.setFont('helvetica', 'bold')
                pdf.setTextColor(51, 154, 240)
                pdf.text(`${i + 1}`, margin + 3, cursorY + 5.5)
                pdf.setTextColor(0)
                pdf.text(item.name, margin + 10, cursorY + 5.5)

                cursorY += 8

                const addressParts = [item.address.road, item.address.city, item.address.state, item.address.country].filter(Boolean)
                if (addressParts.length > 0) {
                    pdf.setFontSize(8)
                    pdf.setFont('helvetica', 'normal')
                    pdf.setTextColor(100)
                    pdf.text(addressParts.join(', '), margin + 10, cursorY)
                    pdf.setTextColor(0)
                    cursorY += 5
                }

                pdf.setFontSize(8)
                pdf.setFont('helvetica', 'normal')
                const dateParts: string[] = []
                if (item.startDate) dateParts.push(`Start: ${new Date(item.startDate).toLocaleString()}`)
                if (item.endDate) dateParts.push(`End: ${new Date(item.endDate).toLocaleString()}`)
                if (dateParts.length > 0) {
                    pdf.text(dateParts.join('  |  '), margin + 10, cursorY)
                    cursorY += 5
                }

                pdf.setTextColor(120)
                pdf.text(`${item.lat.toFixed(5)}, ${item.lon.toFixed(5)}`, margin + 10, cursorY)
                pdf.setTextColor(0)
                cursorY += 5

                if (item.weather) {
                    pdf.setFontSize(8)
                    pdf.text(
                        `Weather: ${Math.round(item.weather.temperature)}°F — ${item.weather.description}`,
                        margin + 10, cursorY
                    )
                    cursorY += 5
                }

                if (item.tags.length > 0) {
                    pdf.setFontSize(7)
                    pdf.setTextColor(80)
                    pdf.text(`Tags: ${item.tags.join(', ')}`, margin + 10, cursorY)
                    pdf.setTextColor(0)
                    cursorY += 5
                }

                if (item.notes) {
                    pdf.setFontSize(8)
                    pdf.setTextColor(60)
                    const noteLines = pdf.splitTextToSize(`Notes: ${item.notes}`, contentW - 14)
                    pdf.text(noteLines.slice(0, 3), margin + 10, cursorY)
                    cursorY += Math.min(noteLines.length, 3) * 4
                    pdf.setTextColor(0)
                }

                cursorY += 4
            }

            pdf.save('travel-itinerary.pdf')
        } catch (err) {
            console.error('PDF export failed:', err)
        } finally {
            setExporting(false)
        }
    }, [sortedItems, routeCoords, fitAllMarkers, activeItineraryName])

    /* ---- Itinerary CRUD ---- */

    const handleSelectItinerary = useCallback((id: string | null) => {
        if (!id) return
        setActiveIdState(id)
        setActiveItinerary(id)
        setItems(loadItems(id))
        closeForm()
    }, [closeForm])

    const handleCreateItinerary = useCallback(() => {
        const trimmed = newItineraryName.trim()
        if (!trimmed) return
        const entry = storageCreateItinerary(trimmed)
        setItineraries(prev => [...prev, entry])
        setActiveIdState(entry.id)
        setItems([])
        setNewItineraryName("")
        setCreatingNew(false)
        closeForm()
    }, [newItineraryName, closeForm])

    const handleDeleteItinerary = useCallback(() => {
        if (!activeId) return
        const newActiveId = storageDeleteItinerary(activeId)
        const { list } = loadItineraries()
        setItineraries(list)
        setActiveIdState(newActiveId)
        setItems(newActiveId ? loadItems(newActiveId) : [])
        closeForm()
    }, [activeId, closeForm])

    /* ---- Segment controls ---- */

    const segmentCount = transitLegs.length
    const canStepSegments = segmentCount > 0

    const stepSegment = useCallback((dir: 1 | -1) => {
        setActiveSegment(prev => {
            if (prev === null) return dir === 1 ? 0 : segmentCount - 1
            const next = prev + dir
            if (next < 0) return null
            if (next >= segmentCount) return null
            return next
        })
    }, [segmentCount])

    /* ---- Sort icon helper ---- */

    const sortIcon = sortMode === 'date-asc'
        ? <IconSortAscending size={18} />
        : sortMode === 'date-desc'
            ? <IconSortDescending size={18} />
            : <IconGripVertical size={18} />

    const sortTooltip = sortMode === 'manual'
        ? 'Manual order (drag to reorder) — click to sort by date'
        : sortMode === 'date-asc'
            ? 'Sorted earliest first — click for latest first'
            : 'Sorted latest first — click for manual order'

    /* ---- Render ---- */

    return (
        <Stack gap="md">
            {/* Map */}
            <div style={{ position: "relative", width: "100%", height: "500px", borderRadius: 12, overflow: "hidden" }}>
                <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />
                {isLoading && (
                    <div
                        aria-live="polite"
                        aria-busy="true"
                        style={{
                            position: "absolute", inset: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "var(--mantine-color-body)", color: "var(--mantine-color-text)",
                        }}
                    >
                        Loading map...
                    </div>
                )}

                {/* Segment stepper overlay */}
                {canStepSegments && (
                    <div style={{
                        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                        zIndex: 1000, display: 'flex', alignItems: 'center', gap: 6,
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: 99, padding: '4px 8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        pointerEvents: 'all',
                    }}>
                        <ActionIcon
                            size="sm" variant="subtle"
                            onClick={() => stepSegment(-1)}
                            disabled={activeSegment === null || activeSegment === 0}
                        >
                            <IconChevronLeft size={14} />
                        </ActionIcon>
                        <Text size="xs" fw={500} style={{ whiteSpace: 'nowrap', minWidth: 90, textAlign: 'center' }}>
                            {activeSegment === null
                                ? 'Full route'
                                : `Leg ${activeSegment + 1} of ${segmentCount}`}
                        </Text>
                        <ActionIcon
                            size="sm" variant="subtle"
                            onClick={() => stepSegment(1)}
                            disabled={activeSegment === segmentCount - 1}
                        >
                            <IconChevronRight size={14} />
                        </ActionIcon>
                    </div>
                )}
            </div>

            {/* Itinerary selector */}
            {itineraries.length > 0 && !creatingNew && (
                <Group gap="sm">
                    <Select
                        data={itineraries.map(i => ({ value: i.id, label: i.name }))}
                        value={activeId}
                        onChange={handleSelectItinerary}
                        placeholder="Select itinerary"
                        size="sm"
                        style={{ flex: 1, maxWidth: 280 }}
                        allowDeselect={false}
                    />
                    <Button
                        variant="light"
                        size="sm"
                        leftSection={<IconPlus size={14} />}
                        onClick={() => setCreatingNew(true)}
                    >
                        New
                    </Button>
                    <ActionIcon
                        variant="light"
                        size="lg"
                        color="red"
                        onClick={handleDeleteItinerary}
                        disabled={!activeId}
                        aria-label="Delete itinerary"
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            )}

            {/* Create itinerary form */}
            {(itineraries.length === 0 || creatingNew) && (
                <Paper p="md" radius="md" withBorder>
                    <Stack gap="sm">
                        <Text fw={600} size="sm">
                            {itineraries.length === 0
                                ? "Create your first itinerary to get started"
                                : "Create a new itinerary"}
                        </Text>
                        <Group>
                            <TextInput
                                placeholder="e.g. Japan 2025, Europe Road Trip"
                                value={newItineraryName}
                                onChange={e => setNewItineraryName(e.currentTarget.value)}
                                size="sm"
                                style={{ flex: 1 }}
                                onKeyDown={e => { if (e.key === 'Enter') handleCreateItinerary() }}
                            />
                            <Button
                                size="sm"
                                disabled={!newItineraryName.trim()}
                                onClick={handleCreateItinerary}
                            >
                                Create
                            </Button>
                            {itineraries.length > 0 && (
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => { setCreatingNew(false); setNewItineraryName("") }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Group>
                    </Stack>
                </Paper>
            )}

            {/* Action buttons */}
            {activeId && !creatingNew && (
                <Group justify="center" gap="sm">
                    <ActionIcon
                        variant={formOpen ? "filled" : "light"}
                        size="lg"
                        radius="xl"
                        color="blue"
                        onClick={toggleForm}
                        aria-label={formOpen ? "Close add form" : "Add itinerary item"}
                    >
                        {formOpen ? <IconX size={18} /> : <IconPlus size={18} />}
                    </ActionIcon>
                    {items.length > 0 && (
                        <>
                            <Tooltip label={sortTooltip} withArrow multiline w={220}>
                                <ActionIcon
                                    variant="light"
                                    size="lg"
                                    radius="xl"
                                    color={sortMode === 'manual' ? 'gray' : 'orange'}
                                    onClick={cycleSortMode}
                                    aria-label="Change sort order"
                                >
                                    {sortIcon}
                                </ActionIcon>
                            </Tooltip>
                            <ActionIcon
                                variant="light"
                                size="lg"
                                radius="xl"
                                color="teal"
                                onClick={() => { void handleExportPDF() }}
                                disabled={exporting}
                                aria-label="Export itinerary as PDF"
                            >
                                {exporting ? <Loader size={16} color="teal" /> : <IconDownload size={18} />}
                            </ActionIcon>
                        </>
                    )}
                </Group>
            )}

            {/* Add item form */}
            {activeId && (
                <Collapse in={formOpen}>
                    <Paper p="md" radius="md" withBorder>
                        <Stack gap="sm">
                            <Text fw={600} size="sm">Add a stop</Text>

                            <LocationSearch onSelect={setPendingLocation} />

                            {pendingLocation && (
                                <Paper p="xs" radius="sm" withBorder bg="var(--mantine-color-blue-light)">
                                    <Group gap="xs">
                                        <Text size="sm" fw={500}>
                                            {pendingLocation.display_name.split(',')[0]}
                                        </Text>
                                        {isHotelLocation(pendingLocation) && (
                                            <Text size="xs" c="orange" fw={600}>
                                                Hotel — will create check-in & check-out stops
                                            </Text>
                                        )}
                                    </Group>
                                    <Text size="xs" c="dimmed">{pendingLocation.display_name}</Text>
                                </Paper>
                            )}

                            <Group grow>
                                <TextInput
                                    label={<Text size="xs" fw={500}>Start <Text span size="xs" c="dimmed">(optional)</Text></Text>}
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={e => setStartDate(e.currentTarget.value)}
                                    onClick={e => { try { (e.target as HTMLInputElement).showPicker?.() } catch {} }}
                                    size="sm"
                                />
                                <TextInput
                                    label={<Text size="xs" fw={500}>End <Text span size="xs" c="dimmed">(optional)</Text></Text>}
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={e => setEndDate(e.currentTarget.value)}
                                    onClick={e => { try { (e.target as HTMLInputElement).showPicker?.() } catch {} }}
                                    size="sm"
                                />
                            </Group>

                            <Group justify="flex-end">
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() => { closeForm(); setPendingLocation(null); setStartDate(""); setEndDate(""); }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={!pendingLocation}
                                    onClick={() => { void handleAddItem() }}
                                >
                                    Add to Itinerary
                                </Button>
                            </Group>
                        </Stack>
                    </Paper>
                </Collapse>
            )}

            {/* Items list */}
            {activeId && items.length > 0 && (
                <Stack gap={0}>
                    <Text fw={600} size="sm" c="dimmed" mb="xs">
                        {activeItineraryName} — {items.length} {items.length === 1 ? 'stop' : 'stops'}
                        {sortMode === 'manual' && (
                            <Text span size="xs" c="dimmed"> · drag to reorder</Text>
                        )}
                    </Text>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={sortedItems.map(i => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Stack gap="xs">
                                {sortedItems.map((item, idx) => (
                                    <div key={item.id}>
                                        <SortableItem
                                            item={item}
                                            index={idx}
                                            isDragMode={sortMode === 'manual'}
                                            onUpdate={handleUpdateItem}
                                            onRemove={handleRemoveItem}
                                            onFocus={handleFocusItem}
                                        />
                                        {idx < sortedItems.length - 1 && transitLegs[idx] && (
                                            <TransitConnector
                                                distance={transitLegs[idx].distance}
                                                duration={transitLegs[idx].duration}
                                            />
                                        )}
                                    </div>
                                ))}
                            </Stack>
                        </SortableContext>
                    </DndContext>
                </Stack>
            )}

            {activeId && items.length === 0 && !formOpen && (
                <Text ta="center" c="dimmed" size="sm" py="lg">
                    No stops yet. Tap the + button to start building your itinerary.
                </Text>
            )}
        </Stack>
    )
}
