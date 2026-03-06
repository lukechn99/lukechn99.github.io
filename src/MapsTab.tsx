import { useEffect, useRef, useState, useCallback } from "react"
import {
    Stack, Text, ActionIcon, Collapse, Group, Button, Paper, TextInput,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconPlus, IconX } from "@tabler/icons-react"
import type { Map as LeafletMap } from "leaflet"
import type { ItineraryItem, NominatimResult } from "./travel/types.ts"
import { loadItems, saveItems, generateId } from "./travel/storage.ts"
import { fetchWeather } from "./travel/api.ts"
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

    const [items, setItems] = useState<ItineraryItem[]>(() => loadItems())
    const [formOpen, { toggle: toggleForm, close: closeForm }] = useDisclosure(false)
    const [pendingLocation, setPendingLocation] = useState<NominatimResult | null>(null)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const persist = useCallback((next: ItineraryItem[]) => {
        setItems(next)
        saveItems(next)
    }, [])

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

                const mtLayer = new MaptilerLayer({ apiKey: "NvWSomKHnqk2ky65h9RN" })
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

    useEffect(() => {
        const map = mapInstance.current
        const L = leafletRef.current
        if (!map || !L) return

        markersRef.current.forEach((m: unknown) => (m as { remove: () => void }).remove())
        markersRef.current = []

        if (items.length === 0) return

        const bounds: [number, number][] = []

        items.forEach((item, idx) => {
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

        if (items.length > 1) {
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
    }, [items, isLoading])

    const handleAddItem = async () => {
        if (!pendingLocation) return

        const addr = pendingLocation.address
        const address: ItineraryItem['address'] = {}
        if (addr?.road) address.road = addr.road
        const city = addr?.city ?? addr?.town ?? addr?.village
        if (city) address.city = city
        if (addr?.state) address.state = addr.state
        if (addr?.country) address.country = addr.country
        if (addr?.postcode) address.postcode = addr.postcode

        const newItem: ItineraryItem = {
            id: generateId(),
            name: pendingLocation.display_name.split(',')[0] ?? pendingLocation.display_name,
            displayName: pendingLocation.display_name,
            lat: parseFloat(pendingLocation.lat),
            lon: parseFloat(pendingLocation.lon),
            address,
            category: pendingLocation.class,
            type: pendingLocation.type,
            tags: [],
            notes: '',
            startDate,
            endDate,
            addedAt: new Date().toISOString(),
        }

        const next = [...items, newItem]
        persist(next)

        setPendingLocation(null)
        setStartDate("")
        setEndDate("")
        closeForm()

        try {
            const weather = await fetchWeather(newItem.lat, newItem.lon)
            const updated = next.map(i => i.id === newItem.id ? { ...i, weather } : i)
            persist(updated)
        } catch { /* weather is best-effort */ }
    }

    const handleUpdateItem = useCallback((updated: ItineraryItem) => {
        const next = items.map(i => i.id === updated.id ? updated : i)
        persist(next)
    }, [items, persist])

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

            <Group justify="center">
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
            </Group>

            <Collapse in={formOpen}>
                <Paper p="md" radius="md" withBorder>
                    <Stack gap="sm">
                        <Text fw={600} size="sm">Add a stop to your itinerary</Text>

                        <LocationSearch onSelect={setPendingLocation} />

                        {pendingLocation && (
                            <Paper p="xs" radius="sm" withBorder bg="var(--mantine-color-blue-light)">
                                <Text size="sm" fw={500}>
                                    {pendingLocation.display_name.split(',')[0]}
                                </Text>
                                <Text size="xs" c="dimmed">{pendingLocation.display_name}</Text>
                            </Paper>
                        )}

                        <Group grow>
                            <TextInput
                                label="Start"
                                type="datetime-local"
                                value={startDate}
                                onChange={e => setStartDate(e.currentTarget.value)}
                                size="sm"
                            />
                            <TextInput
                                label="End"
                                type="datetime-local"
                                value={endDate}
                                onChange={e => setEndDate(e.currentTarget.value)}
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

            {items.length > 0 && (
                <Stack gap="xs">
                    <Text fw={600} size="sm" c="dimmed">
                        Itinerary — {items.length} {items.length === 1 ? 'stop' : 'stops'}
                    </Text>
                    {items.map((item, idx) => (
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

            {items.length === 0 && !formOpen && (
                <Text ta="center" c="dimmed" size="sm" py="lg">
                    No stops yet. Tap the + button to start building your itinerary.
                </Text>
            )}
        </Stack>
    )
}
