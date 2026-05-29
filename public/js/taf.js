// ======================================================
// TAF.JS — Cockpit IFR EBLG PRO+++
// Chargement sécurisé du TAF + rendu UI
// ======================================================

import { ENDPOINTS } from "./config.js";
import { fetchJSON, updateStatusPanel } from "./helpers.js";

// ------------------------------------------------------
// Fonction principale appelée par app.js
// ------------------------------------------------------
async function loadTaf() {
    try {
        const data = await fetchJSON(ENDPOINTS.taf);

        // Ton backend renvoie parfois { taf: "N/A" } ou un format différent
        if (!data || !data.raw) {
            console.warn("[TAF] Format inattendu:", data);
            renderTaf(null);
            updateStatusPanel("TAF", { error: true });
            return;
        }

        renderTaf(data);
        updateStatusPanel("TAF", { ok: true });

    } catch (err) {
        console.error("[TAF] Erreur loadTaf()", err);
        renderTaf(null);
        updateStatusPanel("TAF", { error: true });
    }
}

// ------------------------------------------------------
// Rendu TAF
// ------------------------------------------------------
function renderTaf(data) {
    const el = document.getElementById("taf");
    if (!el) return;

    if (!data) {
        el.textContent = "TAF indisponible";
        return;
    }

    el.textContent = data.raw || "TAF indisponible";
}

// ------------------------------------------------------
// EXPORT GLOBAL (clé pour app.js)
// ------------------------------------------------------
window.loadTaf = loadTaf;
window.initTaf = () => {};
