// ======================================================
// LOGS.JS — Cockpit IFR EBLG PRO+++
// Chargement des logs backend + rendu UI
// ======================================================

import { ENDPOINTS } from "./config.js";
import { fetchJSON, updateStatusPanel } from "./helpers.js";

// ------------------------------------------------------
// Fonction principale appelée par app.js
// ------------------------------------------------------
async function loadLogs() {
    const box = document.getElementById("logs-box");
    if (!box) return;

    try {
        // Si ton endpoint renvoie du texte brut, remplace fetchJSON par fetch classique
        const res = await fetch(ENDPOINTS.logs, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const text = await res.text();

        box.textContent = text || "Aucun log disponible";
        box.scrollTop = box.scrollHeight;

        updateStatusPanel("LOGS", { ok: true });

    } catch (err) {
        console.error("[LOGS] Erreur loadLogs()", err);
        box.textContent = "Erreur lors du chargement des logs";
        updateStatusPanel("LOGS", { error: true });
    }
}

// ------------------------------------------------------
// EXPORT GLOBAL (clé pour app.js)
// ------------------------------------------------------
window.loadLogs = loadLogs;
window.initLogs = () => {};
