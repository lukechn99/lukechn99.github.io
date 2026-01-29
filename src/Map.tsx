import React, { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<L.Map | null>(null)

    useEffect(() => {
        if (mapInstance.current || !mapContainer.current) return

        mapInstance.current = L.map(mapContainer.current, {
            center: [49.2125578, 16.62662018],
            zoom: 14,
        })

        const mtLayer = new MaptilerLayer({
            apiKey: "NvWSomKHnqk2ky65h9RN",
        })
        
        mtLayer.addTo(mapInstance.current);

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    return <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
}
