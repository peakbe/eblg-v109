// ======================================================
// CONFIG.JS — Cockpit IFR EBLG PRO+++
// ======================================================

// URL backend Render (sans slash final)
export const BASE_URL = "https://eblg-dashboard-v84.onrender.com";

// Endpoints backend
export const ENDPOINTS = {
    metar: `${BASE_URL}/metar`,
    taf: `${BASE_URL}/taf`,
    fids: `${BASE_URL}/fids`,
    sono: `${BASE_URL}/sonos`,
    adsb: `${BASE_URL}/api/adsb`,
    logs: `${BASE_URL}/logs`
};

// ======================================================
// STATUS CONFIG — Cockpit IFR EBLG PRO+++
// ======================================================

export const STATUS_CONFIG = {
    METAR: {
        labelInit: "METAR: …",
        labelOk:   "METAR: OK",
        labelWarn: "METAR: WARN",
        labelError:"METAR: ERR"
    },
    TAF: {
        labelInit: "TAF: …",
        labelOk:   "TAF: OK",
        labelWarn: "TAF: WARN",
        labelError:"TAF: ERR"
    },
    FIDS: {
        labelInit: "FIDS: …",
        labelOk:   "FIDS: OK",
        labelWarn: "FIDS: WARN",
        labelError:"FIDS: ERR"
    },
    SONO: {
        labelInit: "SONO: …",
        labelOk:   "SONO: OK",
        labelWarn: "SONO: WARN",
        labelError:"SONO: ERR"
    },
    ADSB: {
        labelInit: "ADSB: …",
        labelOk:   "ADSB: OK",
        labelWarn: "ADSB: WARN",
        labelError:"ADSB: ERR"
    },
    LOGS: {
        labelInit: "LOGS: …",
        labelOk:   "LOGS: OK",
        labelWarn: "LOGS: WARN",
        labelError:"LOGS: ERR"
    }
};

// config.js v155
window.API_BASE = "";
// Si un jour tu veux pointer vers un autre host : window.API_BASE = "https://eblg-dashboard-v84.onrender.com";
