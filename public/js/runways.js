// ======================================================
// RUNWAYS.JS — Cockpit IFR EBLG PRO+++
// Gestion piste active + affichage heading
// ======================================================

const IS_DEV = location.hostname.includes("localhost");
const log = (...a) => IS_DEV && console.log("[RUNWAYS]", ...a);

const RUNWAYS = {
    "04": {
        id: "04",
        heading: 40,
        label: "RWY 04",
        color: "#00ffcc"
    },
    "22": {
        id: "22",
        heading: 220,
        label: "RWY 22",
        color: "#ffcc00"
    }
};

let activeRunway = null;

// ------------------------------------------------------
// SET ACTIVE RUNWAY
// ------------------------------------------------------
export function setActiveRunway(id) {
    const rwy = RUNWAYS[id];
    if (!rwy) {
        log("Piste inconnue:", id);
        return;
    }

    activeRunway = rwy;
    window.activeRunway = rwy; // pour radar / sono / heatmap

    updateRunwayUI();
    log("Piste active =", rwy.id);
}

// ------------------------------------------------------
// UI
// ------------------------------------------------------
function updateRunwayUI() {
    const el = document.getElementById("runway-active");
    if (!el) return;

    if (!activeRunway) {
        el.textContent = "Piste: n/a";
        return;
    }

    el.textContent = `${activeRunway.label} (${activeRunway.heading}°)`;
}

// ------------------------------------------------------
// INIT BOUTONS
// ------------------------------------------------------
function initRunwayButtons() {
    const btn04 = document.querySelector("[data-runway='04']");
    const btn22 = document.querySelector("[data-runway='22']");

    if (btn04) {
        btn04.addEventListener("click", () => setActiveRunway("04"));
    }
    if (btn22) {
        btn22.addEventListener("click", () => setActiveRunway("22"));
    }

    // Piste par défaut
    setActiveRunway("22");
}

initRunwayButtons();

// ------------------------------------------------------
// EXPORT GLOBAL (si besoin ailleurs)
// ------------------------------------------------------
window.setActiveRunway = setActiveRunway;
window.RUNWAYS = RUNWAYS;
