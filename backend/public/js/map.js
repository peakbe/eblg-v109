// ======================================================
// MAP.JS — Cockpit IFR PRO+++
// - Carte Leaflet optimisée
// - ADS-B live + ghost tracks
// - Labels + heading arrows
// - Corridors IFR (approche + départ)
// - Heatmap bruit
// - Reset map PRO+++
// ======================================================

import { getRunwayCorridors } from "./runways.js";

// ======================================================
// VARIABLES INTERNES
// ======================================================
let map = null;
let aircraftLayer = null;
let ghostLayer = null;
let adsbHeatmap = null;

let lastPositions = new Map(); // ghost tracks

// ======================================================
// INIT MAP
// ======================================================
export function initMap() {
    map = L.map("map", {
        zoomControl: false,
        minZoom: 8,
        maxZoom: 18,
        preferCanvas: true
    }).setView([50.645, 5.46], 12);

    // Fond de carte
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OSM"
    }).addTo(map);

    // Couches
    aircraftLayer = L.layerGroup().addTo(map);
    ghostLayer = L.layerGroup().addTo(map);

    // Heatmap bruit
    adsbHeatmap = L.layerGroup();

    window.map = map; // utile pour metar.js
}

// ======================================================
// RESET MAP PRO+++
// ======================================================
export function resetMapView() {
    if (!map) return;

    map.flyTo(
        [50.645, 5.46],
        12,
        {
            animate: true,
            duration: 1.2,
            easeLinearity: 0.25
        }
    );
}

// ======================================================
// TOGGLE HEATMAP
// ======================================================
export function toggleNoiseHeatmap(state) {
    if (!map || !adsbHeatmap) return;

    if (state) adsbHeatmap.addTo(map);
    else map.removeLayer(adsbHeatmap);
}

// ======================================================
// UPDATE ADS-B
// ======================================================
export function updateADSB(aircraftList) {
    if (!map) return;

    aircraftLayer.clearLayers();

    aircraftList.forEach(ac => {
        if (!ac.lat || !ac.lon) return;

        // Ghost track
        const key = ac.hex;
        const prev = lastPositions.get(key);
        lastPositions.set(key, [ac.lat, ac.lon]);

        if (prev) {
            L.polyline([prev, [ac.lat, ac.lon]], {
                color: "#00eaff55",
                weight: 2
            }).addTo(ghostLayer);
        }

        // Icon + heading
        const icon = L.divIcon({
            className: "ac-icon",
            html: `
                <div class="ac-label">${ac.callsign || ac.hex}</div>
                <div class="ac-arrow" style="transform: rotate(${ac.track || 0}deg)"></div>
            `
        });

        L.marker([ac.lat, ac.lon], { icon }).addTo(aircraftLayer);
    });
}

// ======================================================
// CORRIDORS IFR
// ======================================================
export function drawApproachCorridor(rwy) {
    if (!map) return;

    const c = getRunwayCorridors(rwy);
    if (!c) return;

    if (c.approach) {
        L.polyline(c.approach, {
            color: "#00ff88",
            weight: 3,
            dashArray: "6,4"
        }).addTo(map);
    }
}

export function drawDepartureCorridor(rwy) {
    if (!map) return;

    const c = getRunwayCorridors(rwy);
    if (!c) return;

    if (c.departure) {
        L.polyline(c.departure, {
            color: "#ffaa00",
            weight: 3,
            dashArray: "6,4"
        }).addTo(map);
    }
}
