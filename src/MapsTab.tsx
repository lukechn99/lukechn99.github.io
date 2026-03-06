import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import {
    Stack, Text, ActionIcon, Collapse, Group, Button, Paper, TextInput, Loader, Select, Tooltip,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconPlus, IconX, IconDownload, IconTrash, IconSortAscending, IconSortDescending } from "@tabler/icons-react"
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
import LocationSearch from "./travel/LocationSearch.tsx"
import ItineraryItemCard from "./travel/ItineraryItemCard.tsx"

const WEATHER_EMOJI: Record<string, string> = {
    'sun': '☀️',
    'cloud-sun': '⛅',
    'cloud': '☁️',
    'cloud-rain': '🌧️',
    'cloud-fog': '🌫️',
    'snowflake': '❄️',
    'cloud-storm': '⛈️',
}

function markerHtml(index: number, weatherIcon?: string): string {
    const emoji = weatherIcon ? (WEATHER_EMOJI[weatherIcon] ?? '📍') : '📍'
    return `
      <div style="
        position:relative; width:42px; height:42px;
      ">
        <div style="
          width:42px; height:42px; border-radius:50%;
          background:white; border:2.5px solid #339af0;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; box-shadow:0 2px 8px rgba(0,0,0,0.22);
        ">${emoji}</div>
        <div style="
          position:absolute; top:-5px; right:-5px;
          width:20px; height:20px; border-radius:50%;
          background:#339af0; color:white;
          font-size:11px; font-weight:700;
          display:flex; align-items:center; justify-content:center;
          border:2px solid white; box-shadow:0 1px 3px rgba(0,0,0,0.2);
        ">${index}</div>
      </div>
    `
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
    const [sortAsc, setSortAsc] = useState(true)
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([])

    const sortedItems = useMemo(() => {
        const withDate = items.filter(i => i.startDate)
        const withoutDate = items.filter(i => !i.startDate)
        withDate.sort((a, b) => {
            const dateA = new Date(a.startDate).getTime()
            const dateB = new Date(b.startDate).getTime()
            return sortAsc ? dateA - dateB : dateB - dateA
        })
        return [...withDate, ...withoutDate]
    }, [items, sortAsc])

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
                    zoomSnap: 0,
                    zoomDelta: 0.25,
                })
                mapInstance.current = map

                const mtLayer = new MaptilerLayer({ apiKey: MAPTILER_API_KEY })
                mtLayer.addTo(map)

                if (!isCancelled) setIsLoading(false)
            } catch {
                if (!isCancelled) setIsLoading(false)
            }
        }

        timeoutId = window.setTimeout(() => { void loadMap() }, 0)

        return () => {
            isCancelled = true
            if (timeoutId !== undefined) window.clearTimeout(timeoutId)
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    /* ---- Markers ---- */

    useEffect(() => {
        const map = mapInstance.current
        const L = leafletRef.current
        if (!map || !L) return

        markersRef.current.forEach((m: unknown) => (m as { remove: () => void }).remove())
        markersRef.current = []

        if (sortedItems.length === 0) return

        const bounds: [number, number][] = []

        sortedItems.forEach((item, idx) => {
            const icon = L.divIcon({
                html: markerHtml(idx + 1, item.weather?.icon),
                className: '',
                iconSize: [42, 42],
                iconAnchor: [21, 21],
            })

            const marker = L.marker([item.lat, item.lon], { icon }).addTo(map)
            marker.bindTooltip(`${idx + 1}. ${item.name}`, { direction: 'top', offset: [0, -24] })
            markersRef.current.push(marker)
            bounds.push([item.lat, item.lon])
        })

        if (routeCoords.length > 1) {
            const routeLine = L.polyline(routeCoords, {
                color: '#339af0',
                weight: 3.5,
                opacity: 0.7,
            }).addTo(map)
            markersRef.current.push(routeLine)
        } else if (sortedItems.length > 1) {
            const polyline = L.polyline(bounds, {
                color: '#339af0',
                weight: 2.5,
                opacity: 0.5,
                dashArray: '8, 8',
            }).addTo(map)
            markersRef.current.push(polyline)
        }

        if (bounds.length === 1) {
            map.setView(bounds[0] as [number, number], 11, { animate: true })
        } else if (bounds.length > 1) {
            map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50], maxZoom: 13, animate: true })
        }
    }, [sortedItems, routeCoords, isLoading])

    /* ---- Route ---- */

    useEffect(() => {
        if (sortedItems.length < 2) {
            setRouteCoords([])
            return
        }

        let cancelled = false
        const coords: [number, number][] = sortedItems.map(i => [i.lat, i.lon])

        fetchDrivingRoute(coords)
            .then(result => { if (!cancelled) setRouteCoords(result.coords) })
            .catch(() => { if (!cancelled) setRouteCoords([]) })

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
            const weather = await fetchWeather(lat, lon)
            const ids = new Set(newItems.map(i => i.id))
            const updated = next.map(i => ids.has(i.id) ? { ...i, weather } : i)
            persist(updated)
        } catch { /* weather is best-effort */ }
    }

    const handleUpdateItem = useCallback((updated: ItineraryItem) => {
        const current = items.find(i => i.id === updated.id)
        const next = items.map(i => i.id === updated.id ? updated : i)
        persist(next)

        if (current && (current.lat !== updated.lat || current.lon !== updated.lon)) {
            void (async () => {
                try {
                    const weather = await fetchWeather(updated.lat, updated.lon)
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
            const weather = await fetchWeather(item.lat, item.lon)
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

            let mapAdded = false

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
                    mapAdded = true
                }
            } catch { /* static map failed */ }

            if (!mapAdded && mapContainer.current) {
                try {
                    const html2canvasModule = await import('html2canvas-pro')
                    const html2canvas = html2canvasModule.default
                    const mapCanvas = await html2canvas(mapContainer.current, {
                        useCORS: true,
                        allowTaint: true,
                        scale: 2,
                        logging: false,
                        backgroundColor: '#ffffff',
                    })
                    const mapImg = mapCanvas.toDataURL('image/png')
                    const mapAspect = mapCanvas.height / mapCanvas.width
                    const cappedMapH = Math.min(contentW * mapAspect, 100)
                    pdf.addImage(mapImg, 'PNG', margin, cursorY, contentW, cappedMapH)
                    cursorY += cappedMapH + 6
                } catch { /* html2canvas fallback also failed */ }
            }

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
                        `Weather: ${Math.round(item.weather.temperature)}°F — ${item.weather.description}, Humidity ${item.weather.humidity}%, Wind ${Math.round(item.weather.windSpeed)} mph`,
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

    /* ---- Render ---- */

    return (
        <Stack gap="md">
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

            {/* Action buttons — only when an itinerary is active */}
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
                            <Tooltip label={sortAsc ? "Sorted: earliest first" : "Sorted: latest first"} withArrow>
                                <ActionIcon
                                    variant="light"
                                    size="lg"
                                    radius="xl"
                                    color="orange"
                                    onClick={() => setSortAsc(prev => !prev)}
                                    aria-label={sortAsc ? "Sort latest first" : "Sort earliest first"}
                                >
                                    {sortAsc ? <IconSortAscending size={18} /> : <IconSortDescending size={18} />}
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

            {activeId && (
                <Collapse in={formOpen}>
                    <Paper p="md" radius="md" withBorder>
                        <Stack gap="sm">
                            <Text fw={600} size="sm">Add a stop to your itinerary</Text>

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
                                    label="Start"
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={e => setStartDate(e.currentTarget.value)}
                                    onClick={e => { try { (e.target as HTMLInputElement).showPicker?.() } catch {} }}
                                    size="sm"
                                />
                                <TextInput
                                    label="End"
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

            {activeId && items.length > 0 && (
                <Stack gap="xs">
                    <Text fw={600} size="sm" c="dimmed">
                        {activeItineraryName} — {items.length} {items.length === 1 ? 'stop' : 'stops'}
                    </Text>
                    {sortedItems.map((item, idx) => (
                        <ItineraryItemCard
                            key={item.id}
                            item={item}
                            index={idx}
                            onUpdate={handleUpdateItem}
                            onRemove={handleRemoveItem}
                            onFocus={handleFocusItem}
                        />
                    ))}
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
