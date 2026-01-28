import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "@maptiler/leaflet-maptilersdk"

export default function Map() {
    const map = L.map('map', {
        center: L.latLng(49.2125578, 16.62662018),
        zoom: 14,
    })

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new (L as any).maptiler.maptilerLayer({
        // Get your free API key at https://cloud.maptiler.com
        apiKey: "QxgePF3QcWmZeOHVZm7o",
    }).addTo(map)
}