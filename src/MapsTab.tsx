import { useEffect, useRef, useState } from "react"
import { Stack } from "@mantine/core"
import type { Map as LeafletMap } from "leaflet"

export default function MapsTab() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<LeafletMap | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const minZoom = 4

    useEffect(() => {
        let isCancelled = false
        let timeoutId: number | undefined

        const loadMap = async () => {
            if (mapInstance.current || !mapContainer.current) {
                if (!isCancelled) {
                    setIsLoading(false)
                }
                return
            }

            try {
                const [{ default: L }, { MaptilerLayer }] = await Promise.all([
                    import("leaflet"),
                    import("@maptiler/leaflet-maptilersdk"),
                    import("leaflet/dist/leaflet.css"),
                ])

                if (isCancelled || !mapContainer.current) return

                const map = L.map(mapContainer.current, {
                    center: [34.0459701, -118.5639983],
                    zoom: 10,
                    minZoom: minZoom,
                })
                mapInstance.current = map

                const mtLayer = new MaptilerLayer({
                    apiKey: "NvWSomKHnqk2ky65h9RN",
                })

                mtLayer.addTo(map)

                if (!isCancelled) {
                    setIsLoading(false)
                }
            } catch {
                if (!isCancelled) {
                    setIsLoading(false)
                }
            }
        }

        timeoutId = window.setTimeout(() => {
            void loadMap()
        }, 0)

        return () => {
            isCancelled = true
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId)
            }
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    return <Stack>
        Maps will include map tiles, routing, scrubbing, jumping to locations, travel pins, flights, etc.
        <div style={{ position: "relative", width: "100%", height: "500px" }}>
            <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />
            {isLoading ? (
                <div
                    aria-live="polite"
                    aria-busy="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--mantine-color-body)",
                        color: "var(--mantine-color-text)",
                    }}
                >
                    Loading map...
                </div>
            ) : null}
        </div>
    </Stack>
}
