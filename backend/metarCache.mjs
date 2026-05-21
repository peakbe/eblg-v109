// ======================================================
// METAR / TAF CACHE PRO+++
// - Cache METAR 5 min
// - Cache TAF 30 min
// - Fallback intelligent si CheckWX tombe
// ======================================================

let metarCache = null;
let metarCacheTime = 0;

let tafCache = null;
let tafCacheTime = 0;

export function getCachedMetar() {
    const now = Date.now();
    if (metarCache && now - metarCacheTime < 5 * 60 * 1000) {
        return metarCache;
    }
    return null;
}

export function setCachedMetar(data) {
    metarCache = data;
    metarCacheTime = Date.now();
}

export function getCachedTaf() {
    const now = Date.now();
    if (tafCache && now - tafCacheTime < 30 * 60 * 1000) {
        return tafCache;
    }
    return null;
}

export function setCachedTaf(data) {
    tafCache = data;
    tafCacheTime = Date.now();
}
