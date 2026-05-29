// ======================================================
// STATUS.JS — Cockpit IFR EBLG PRO+++
// Initialisation du panneau de statut
// ======================================================

import { STATUS_CONFIG } from "./config.js";

const IS_DEV = location.hostname.includes("localhost");
const log = (...a) => IS_DEV && console.log("[STATUS]", ...a);

// ------------------------------------------------------
// INIT STATUS PANEL
// ------------------------------------------------------
function initStatusPanel() {
    const container = document.getElementById("status-panel");
    if (!container) return;

    container.innerHTML = "";

    Object.entries(STATUS_CONFIG || {}).forEach(([key, cfg]) => {
        const div = document.createElement("div");
        div.className = "status-item status-error";
        div.dataset.statusKey = key;
        div.textContent = cfg.labelInit || `${key}: …`;
        container.appendChild(div);
    });

    log("Status panel initialisé");
}

initStatusPanel();
