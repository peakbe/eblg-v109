// ======================================================
// APP.JS — Cockpit IFR EBLG PRO+++
// Orchestration globale + Timers + UI + ADS-B robuste
// ======================================================

import { ENDPOINTS } from "./config.js";

import {
    initMap,
    resetMapView,
    toggleNoiseHeatmap,
    toggleNoiseZones,
    updateADSB,
    initDebugPanel
} from "./map.js";

import { initMetar, safeLoadMetar } from "./metar.js";
import { initTaf, safeLoadTaf } from "./taf.js";
import { safeLoadFids } from "./fids.js";
import { loadSonometers } from "./sonometers.js";
import { checkApiStatus } from "./status.js";
import { loadLogs } from "./logs.js";
import { startLiveLogs } from "./logsLive.js";

// ======================================================
// INIT GLOBAL
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initDebugPanel();

    initMetar();
    initTaf();

    safeLoadFids();
    loadSonometers();
    checkApiStatus();
    loadLogs();
    startLiveLogs();

    startAdsbLoop();
    setupTimers();
    setupUIBindings();
});

// ======================================================
// TIMERS
// ======================================================
function setupTimers() {
    setInterval(safeLoadMetar, 60_000);
    setInterval(safeLoadTaf, 10 * 60_000);
    setInterval(safeLoadFids, 60_000);
    setInterval(loadSonometers, 30_000);
    setInterval(checkApiStatus, 60_000);
    setInterval(loadLogs, 120_000);
}

// ======================================================
// ADS-B LOOP — VERSION ROBUSTE ANTI-HTML PRO+++
// ======================================================
function startAdsbLoop() {
    const POLL_MS = 5_000;

    const loop = async () => {
        try {
            const r = await fetch(ENDPOINTS.adsb || "/api/adsb");
            if (!r.ok) throw new Error("HTTP " + r.status);

            // On lit d'abord en texte pour détecter le HTML
            const text = await r.text();

            // 🔥 Si la réponse commence par "<", c'est du HTML → on ignore
            if (text.trim().startsWith("<")) {
                console.warn("[ADSB] Réponse HTML ignorée");
                updateADSB([]);
                return setTimeout(loop, POLL_MS);
            }

            // Tentative de parse JSON
            let json;
            try {
                json = JSON.parse(text);
            } catch (e) {
                console.warn("[ADSB] JSON invalide");
                updateADSB([]);
                return setTimeout(loop, POLL_MS);
            }

            // Structure correcte : { ac: [...] }
            const list = json.ac || [];
            updateADSB(list);

        } catch (err) {
            console.error("[ADSB] Erreur", err);
            updateADSB([]);
        } finally {
            setTimeout(loop, POLL_MS);
        }
    };

    loop();
}

// ======================================================
// UI BINDINGS
// ======================================================
function setupUIBindings() {
    const resetBtn = document.getElementById("btn-reset-map");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => resetMapView());
    }

    const heatmapToggle = document.getElementById("btn-heatmap");
    if (heatmapToggle) {
        heatmapToggle.addEventListener("change", (e) => {
            const state = e.target.checked ?? e.target.classList.contains("active");
            toggleNoiseHeatmap(state);
        });
    }

    const noiseZonesBtn = document.getElementById("btn-noisezones-toggle");
    if (noiseZonesBtn) {
        noiseZonesBtn.addEventListener("click", () => toggleNoiseZones());
    }

    const tabs = document.querySelectorAll("[data-panel-target]");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = tab.getAttribute("data-panel-target");
            if (!targetId) return;

            document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
            const panel = document.getElementById(targetId);
            if (panel) panel.classList.remove("hidden");
        });
    });
}
