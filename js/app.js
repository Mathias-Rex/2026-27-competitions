/* Fő frissítő logika, állapotmentés, téma és indítás. A felület komponensei: js/ui/. */

function updateAll() {
    // Ha a kiválasztott esemény versenye ki lett kapcsolva, válasszunk egy aktívat
    const current = findEventById(selectedEventId);
    if (!current || !current.comp.active) {
        selectedEventId = pickDefaultSelectedEvent();
    }

    renderTodayLegend();
    renderFilterCards();
    renderTimeline();
    renderEventDetail();
    renderChronologicalList();
    renderDetailedInfoCards();
    saveState();
}

// Kapcsolók állapotának mentése / betöltése (localStorage)
const STATE_KEY = 'competitionsUiState';
function saveState() {
    try {
        const state = {
            active: Object.fromEntries(competitions.map(c => [c.id, c.active])),
            timeFilter,
            isDetailsSectionOpen
        };
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) { /* localStorage nem elérhető */ }
}
function loadState() {
    try {
        const raw = localStorage.getItem(STATE_KEY);
        if (!raw) return;
        const state = JSON.parse(raw);
        if (state.active) {
            competitions.forEach(c => {
                if (typeof state.active[c.id] === 'boolean') c.active = state.active[c.id];
            });
        }
        if (state.timeFilter === 'all' || state.timeFilter === 'upcoming') timeFilter = state.timeFilter;
        if (typeof state.isDetailsSectionOpen === 'boolean') isDetailsSectionOpen = state.isDetailsSectionOpen;
    } catch (e) { /* hibás vagy nem elérhető mentés: alapértelmezés */ }
}

// Időszűrő gombok ("Összes" / "Csak hátralévő")
function applyTimeFilterUI() {
    document.querySelectorAll('[data-timefilter]').forEach(b => {
        b.classList.toggle('is-active', b.dataset.timefilter === timeFilter);
        b.setAttribute('aria-pressed', String(b.dataset.timefilter === timeFilter));
    });
}

// Alsó versenykiírások szekció összecsukása/kinyitása
function applyDetailsSectionUI() {
    const btn = document.getElementById('toggleDetailsSectionBtn');
    btn.setAttribute('aria-expanded', String(isDetailsSectionOpen));
    btn.firstChild.textContent = isDetailsSectionOpen ? 'Részletek elrejtése' : 'Részletek megjelenítése';
    document.getElementById('detailedInfoCardsContainer').hidden = !isDetailsSectionOpen;
}

// Téma: <html data-theme>, a gomb felirata és a versenyszínek újrarajzolása
function updateThemeButton() {
    const btn = document.getElementById('themeToggleBtn');
    btn.textContent = isDark() ? '☀️ Világos mód' : '🌙 Sötét mód';
}
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    updateThemeButton();
    updateAll();
    renderDownloads();
}
function hasSavedTheme() {
    try { const t = localStorage.getItem('theme'); return t === 'dark' || t === 'light'; } catch (e) { return false; }
}

// Kezdő kirajzolás
window.addEventListener('DOMContentLoaded', () => {
    loadState();
    selectedEventId = pickDefaultSelectedEvent();
    buildPage();
    applyTimeFilterUI();
    applyDetailsSectionUI();
    updateThemeButton();
    updateAll();
    renderDownloads();
    initWhatsNew();

    // Ha nincs mentett választás, követjük a böngésző/rendszer beállítását
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!hasSavedTheme()) applyTheme(e.matches ? 'dark' : 'light');
        });
    }
});
