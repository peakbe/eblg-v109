// ======================================================
// APP.JS — Cockpit IFR EBLG PRO+++
// Point d’entrée du dashboard
// ======================================================

// ------------------------------------------------------
// IMPORTS (tous versionnés pour casser le cache)
// ------------------------------------------------------
import "./config.js?v=155";
import "./metar.js?v=155";
import "./taf.js?v=155";
import "./fids.js?v=155";
import "./sonometers.js?v=155";
import "./radar.js?v=155";
import "./logs.js?v=155";
import "./logsLive.js?v=155";
import "./runways.js?v=155";
import "./status.js?v=155";

// ------------------------------------------------------
// LOG
// ------------------------------------------------------
function log(msg) {
    console.log(`[APP] ${msg}`);
}

// ------------------------------------------------------
// INIT UI
// ------------------------------------------------------
function initSidebarTabs() {
    const tabs = document.querySelectorAll("#sidebar-tabs button");
    const panels = document.querySelectorAll("#sidebar-panels .panel");

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.panelTarget;

            panels.forEach(p => p.classList.add("hidden"));
            document.getElementById(target).classList.remove("hidden");

            tabs.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

function initFidsTabs() {
    const tabs = document.querySelectorAll(".fids-tab");
    const arr = document.getElementById("fids-arrivals");
    const dep = document.getElementById("fids-departures");

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");

            if (btn.dataset.fids === "arrivals") {
                arr.style.display = "block";
                dep.style.display = "none";
            } else {
                arr.style.display = "none";
                dep.style.display = "block";
            }
        });
    });
}

// ------------------------------------------------------
// INIT DEBUG PANEL
// ------------------------------------------------------
function initDebugPanel() {
    let last = performance.now();
    let frames = 0;

    function loop() {
        const now = performance.now();
        frames++;

        if (now - last >= 1000) {
            document.getElementById("fps").textContent = frames;
            frames = 0;
            last = now;
        }

        requestAnimationFrame(loop);
    }

    loop();
}

// ------------------------------------------------------
// INIT GLOBAL
// ------------------------------------------------------
async function initApp() {
    log("Initialisation cockpit IFR…");
    
    window.initMap();   // ← appelle la vraie carte IFR de map.js

    initSidebarTabs();
    initFidsTabs();
    initDebugPanel();

    // Appels initiaux
    try {
        await window.loadMetar();
        await window.loadTaf();
        await window.loadFids();
        await window.loadSonometers();
        await window.loadRadar();
        await window.loadLogs();
        await window.startLiveLogs();
    } catch (err) {
        console.error("[APP] Erreur init:", err);
    }

    // Timers
    setInterval(window.loadMetar, 60_000);
    setInterval(window.loadTaf, 5 * 60_000);
    setInterval(window.loadFids, 30_000);
    setInterval(window.loadSonometers, 60_000);
    setInterval(window.loadRadar, 5_000);
    setInterval(window.loadLogs, 10_000);

    log("Cockpit IFR opérationnel");
}

initApp();
