// ======================================================
// CONFIG.JS — Cockpit IFR EBLG PRO+++
// ======================================================

// Même domaine Render → pas besoin de base URL
const API_BASE = "";

// ------------------------------------------------------
// ENDPOINTS
// ------------------------------------------------------
export const ENDPOINTS = {
    metar:     `${API_BASE}/api/metar`,
    taf:       `${API_BASE}/api/taf`,
    fids:      `${API_BASE}/api/fids`,
    sonos:     `${API_BASE}/api/sonos`,
    radar:     `${API_BASE}/api/radar`,
    logs:      `${API_BASE}/api/logs`,
    logsLive:  `${API_BASE}/api/logs-live`
};

// ------------------------------------------------------
// STATUS PANEL CONFIG
// ------------------------------------------------------
export const STATUS_CONFIG = {
    METAR: { labelInit: "METAR: …", labelOk: "METAR: OK", labelWarn: "METAR: WARN", labelError: "METAR: ERR" },
    TAF:   { labelInit: "TAF: …",   labelOk: "TAF: OK",   labelWarn: "TAF: WARN",   labelError: "TAF: ERR" },
    FIDS:  { labelInit: "FIDS: …",  labelOk: "FIDS: OK",  labelWarn: "FIDS: WARN",  labelError: "FIDS: ERR" },
    SONO:  { labelInit: "SONO: …",  labelOk: "SONO: OK",  labelWarn: "SONO: WARN",  labelError: "SONO: ERR" },
    ADSB:  { labelInit: "ADSB: …",  labelOk: "ADSB: OK",  labelWarn: "ADSB: WARN",  labelError: "ADSB: ERR" },
    LOGS:  { labelInit: "LOGS: …",  labelOk: "LOGS: OK",  labelWarn: "LOGS: WARN",  labelError: "LOGS: ERR" }
};

// ------------------------------------------------------
// EXPORT GLOBAL (clé pour helpers.js, radar.js, console…)
// ------------------------------------------------------
window.ENDPOINTS = ENDPOINTS;
window.STATUS_CONFIG = STATUS_CONFIG;
