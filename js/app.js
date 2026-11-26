/* Fő frissítő logika, állapotmentés, kapcsolók és indítás. */

// =========================================================================
// 5. FŐ FRISSÍTŐ ÉS INICIALIZÁLÓ LOGIKA
// =========================================================================
function updateAll() {
    // Ha a kiválasztott esemény versenye ki lett kapcsolva, válasszunk egy aktívat
    const current = findEventById(selectedEventId);
    if (!current || !current.comp.active) {
        selectedEventId = pickDefaultSelectedEvent();
    }

    renderTodayBadges();
    renderFilterCards();
    renderTimeline();
    renderEventDetail();
    renderChronologicalList();
    renderDetailedInfoCards();
    renderWorkshopProjects();
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
    document.querySelectorAll('.time-filter-btn').forEach(b => {
        b.className = b.dataset.timefilter === timeFilter
            ? 'time-filter-btn px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-900 shadow-sm transition cursor-pointer'
            : 'time-filter-btn px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer';
    });
}
document.querySelectorAll('.time-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        timeFilter = btn.dataset.timefilter;
        applyTimeFilterUI();
        renderChronologicalList();
        saveState();
    });
});

// Alsó versenykiírások szekció összecsukása/kinyitása
function applyDetailsSectionUI() {
    const wrapper = document.getElementById('detailedInfoWrapper');
    const textEl = document.getElementById('toggleDetailsSectionText');
    const iconEl = document.getElementById('toggleDetailsSectionIcon');
    const btnEl = document.getElementById('toggleDetailsSectionBtn');

    btnEl.setAttribute('aria-expanded', String(isDetailsSectionOpen));
    wrapper.classList.toggle('hidden', !isDetailsSectionOpen);
    textEl.textContent = isDetailsSectionOpen ? 'Részletek elrejtése' : 'Részletek megjelenítése';
    iconEl.style.transform = isDetailsSectionOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}
document.getElementById('toggleDetailsSectionBtn').addEventListener('click', () => {
    isDetailsSectionOpen = !isDetailsSectionOpen;
    applyDetailsSectionUI();
    saveState();
});

// Hamburger menü (mobil)
document.getElementById('menuToggleBtn').addEventListener('click', () => {
    const controls = document.getElementById('headerControls');
    const open = controls.classList.toggle('hidden') === false;
    const btn = document.getElementById('menuToggleBtn');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    document.getElementById('menuIconOpen').classList.toggle('hidden', open);
    document.getElementById('menuIconClose').classList.toggle('hidden', !open);
});

// Téma váltó
function updateThemeButton() {
    const dark = isDark();
    document.getElementById('themeToggleIcon').textContent = dark ? '☀️' : '🌙';
    document.getElementById('themeToggleText').textContent = dark ? 'Világos mód' : 'Sötét mód';
}
function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    updateThemeButton();
    updateAll();
}
function hasSavedTheme() {
    try { const t = localStorage.getItem('theme'); return t === 'dark' || t === 'light'; } catch (e) { return false; }
}
document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch (e) {}
    applyTheme(next);
});
// Ha nincs mentett választás, követjük a böngésző/rendszer beállítását
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!hasSavedTheme()) applyTheme(e.matches ? 'dark' : 'light');
    });
}

// Kezdő kirajzolás
window.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyTimeFilterUI();
    applyDetailsSectionUI();
    selectedEventId = pickDefaultSelectedEvent();
    updateThemeButton();
    updateAll();

    // Egérrel megfogható idővonal: húzásra oldalra görget (a buborékok és gombok kattinthatók maradnak)
    (function enableTimelineDrag() {
        const scroller = document.getElementById('timelineWrapper').parentElement;
        let startX = 0, startLeft = 0, down = false, moved = false;
        scroller.classList.add('timeline-grab');
        scroller.addEventListener('mousedown', e => {
            if (e.button !== 0 || e.target.closest('.timeline-event-trigger, button, a')) return;
            down = true; moved = false;
            startX = e.clientX; startLeft = scroller.scrollLeft;
            e.preventDefault();
        });
        window.addEventListener('mousemove', e => {
            if (!down) return;
            const dx = e.clientX - startX;
            if (!moved && Math.abs(dx) < 3) return;
            moved = true;
            scroller.classList.add('timeline-grabbing');
            scroller.scrollLeft = startLeft - dx;
        });
        window.addEventListener('mouseup', () => {
            if (!down) return;
            down = false;
            scroller.classList.remove('timeline-grabbing');
        });
        scroller.addEventListener('click', e => { if (moved) { e.stopPropagation(); moved = false; } }, true);
    })();

    // Induláskor a mai napra görgetjük az (széles) idővonalat
    (function scrollTimelineToToday() {
        const wrap = document.getElementById('timelineWrapper');
        const scroller = wrap.parentElement;
        if (!isTodayWithinTimeline() || scroller.scrollWidth <= scroller.clientWidth) return;
        const labelCol = window.innerWidth >= 1024 ? 190 : 104;
        const track = wrap.scrollWidth - labelCol - 40;
        const x = labelCol + 20 + track * getPercentPosition(TODAY_STR) / 100;
        scroller.scrollLeft = Math.max(0, x - scroller.clientWidth / 3);
    })();
});

// Esemény felugró ablak (idővonalon rákattintva)
(function () {
    const modal = document.getElementById('eventModal');
    const body = document.getElementById('eventModalBody');
    let lastFocus = null, hideTimer = null;
    window.openEventModal = function (id) {
        const found = findEventById(id);
        if (!found) return;
        body.innerHTML = eventDetailHtml(found.comp, found.ev, 'modal');
        lastFocus = document.activeElement;
        clearTimeout(hideTimer);
        modal.classList.remove('hidden');
        void modal.offsetWidth; // az átmenet induljon a rejtett állapotból
        modal.classList.add('modal-open');
        document.getElementById('eventModalClose').focus();
    };
    function close() {
        modal.classList.remove('modal-open');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => modal.classList.add('hidden'), 220);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.getElementById('eventModalClose').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });
})();
