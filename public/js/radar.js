// ======================================================
// RADAR.JS — Cockpit IFR PRO+++
// ======================================================

import { EBLG } from "./constants.js";

// ======================================================
// CONFIG
// ======================================================
const RADAR_URL = "/radar";
const RADAR_REFRESH_MS = 5000;

let radarLayer = null;

// ======================================================
// OUTILS
// ======================================================
function isValidFlight(f) {
    return (
        f &&
        typeof f.lat === "number" &&
        typeof f.lon === "number" &&
        !Number.isNaN(f.lat) &&
        !Number.isNaN(f.lon)
    );
}

function createMarker(f) {
    return L.circleMarker([f.lat, f.lon], {
        radius: 5,
        color: "#00e5ff",
        weight: 1,
        fillColor: "#00e5ff",
        fillOpacity: 0.8
    }).bindTooltip(
        `${f.callsign || "N/A"}<br>${f.alt || 0} ft<br>${f.speed || 0} kt`,
        { direction: "top" }
    );
}

// ======================================================
// CHARGEMENT RADAR
// ======================================================
async function loadRadar() {
    try {
        const r = await fetch(RADAR_URL, { cache: "no-store" });

        // Si backend renvoie HTML → éviter crash JSON
        const text = await r.text();
        if (text.trim().startsWith("<")) {
            console.warn("[RADAR] HTML reçu → backend fallback SPA");
            return [];
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.warn("[RADAR] JSON invalide →", e);
            return [];
        }

        if (!data || !Array.isArray(data.flights)) {
            console.warn("[RADAR] format invalide");
            return [];
        }

        return data.flights.filter(isValidFlight);

    } catch (err) {
        console.error("[RADAR] erreur réseau", err);
        return [];
    }
}

// ======================================================
// AFFICHAGE RADAR
// ======================================================
async function updateRadar() {
    const flights = await loadRadar();

    if (!radarLayer) {
        radarLayer = L.layerGroup().addTo(window.map);
    }

    radarLayer.clearLayers();

    if (!flights.length) {
        console.warn("[RADAR] aucun trafic valide");
        return;
    }

    flights.forEach(f => {
        const marker = createMarker(f);
        radarLayer.addLayer(marker);
    });
}

// ======================================================
// INITIALISATION
// ======================================================
export function initRadar() {
    if (!window.map) {
        console.error("[RADAR] map non initialisée");
        return;
    }

    updateRadar();
    setInterval(updateRadar, RADAR_REFRESH_MS);
}
