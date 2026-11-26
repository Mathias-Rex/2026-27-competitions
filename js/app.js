/*
 * Indítás és eseménykezelők. A felület szerkezetét az index.html YAML leírása adja (createDOMBlocks buildUI),
 * a származtatott adatokat a derive.js számolja, ez a fájl a forrás-állapotot és a kezelőket köti össze.
 */

const STATE_KEY = 'competitionsUiState';

// Mentett állapot (localStorage) a forrás-állapotba
function loadSaved() {
    const saved = { active: {}, timeFilter: 'all', detailsOpen: true };
    try {
        const raw = localStorage.getItem(STATE_KEY);
        if (!raw) return saved;
        const s = JSON.parse(raw);
        if (s.active) Object.keys(s.active).forEach(id => { if (typeof s.active[id] === 'boolean') saved.active[id] = s.active[id]; });
        if (s.timeFilter === 'all' || s.timeFilter === 'upcoming') saved.timeFilter = s.timeFilter;
        if (typeof s.detailsOpen === 'boolean') saved.detailsOpen = s.detailsOpen;
    } catch (e) { /* hibás vagy nem elérhető mentés: alapértelmezés */ }
    return saved;
}

function saveSource(state) {
    try {
        localStorage.setItem(STATE_KEY, JSON.stringify({
            active: state.get('active'),
            timeFilter: state.get('timeFilter'),
            isDetailsSectionOpen: state.get('detailsOpen'),
            detailsOpen: state.get('detailsOpen')
        }));
    } catch (e) { /* localStorage nem elérhető */ }
}

const currentTheme = () => (isDark() ? 'dark' : 'light');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
}

function hasSavedTheme() {
    try { const t = localStorage.getItem('theme'); return t === 'dark' || t === 'light'; } catch (e) { return false; }
}

// A forrás-állapot kulcsai, amelyek változásakor a származtatott adatok újraszámolódnak
const SOURCE_KEYS = ['active', 'timeFilter', 'selectedId', 'theme'];

function sourceOf(state) {
    return {
        active: state.get('active'),
        timeFilter: state.get('timeFilter'),
        selectedId: state.get('selectedId'),
        theme: state.get('theme')
    };
}

function syncActiveFlags(active) {
    competitions.forEach(c => { c.active = !!active[c.id]; });
}

function startApp() {
    const saved = loadSaved();
    const active = {};
    competitions.forEach(c => { active[c.id] = typeof saved.active[c.id] === 'boolean' ? saved.active[c.id] : c.active; });
    syncActiveFlags(active);

    const source = { active, timeFilter: saved.timeFilter, selectedId: pickDefaultSelectedEvent(), theme: currentTheme() };
    const wide = window.innerWidth >= 1024;

    // a hivatkozott adatok (a YAML-ben $név vagy ${név})
    const data = {
        icons: ICONS,
        downloads: DOWNLOADS.map(group => ({ ...group, colorStyle: `--c-color:${group.color}` })),
        workshopProjects: workshopProjectCards(),
        timelineSettings: {
            monthWidth: wide ? 380 : 260,
            labelWidth: wide ? 190 : 104,
            today: TODAY_STR,
            todayLabel: `Ma (${TODAY_INFO.shortHu})`
        },
        todayFull: TODAY_INFO.fullHu,
        todayLegend: `Ma (${TODAY_INFO.shortHu})`
    };

    const handlers = {
        // téma
        toggleTheme({ state }) {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem('theme', next); } catch (e) { /* nincs mentés */ }
            applyTheme(next);
            state.set('theme', next);
        },
        // versenykapcsoló kártya: bárhová kattintva vált, a kapcsolóra kattintást a checkbox maga kezeli
        competitionCardClick({ state, event, el }) {
            if (event.target.closest('.checkbox-input')) return;
            state.toggle('active.' + el.dataset.competitionId);
        },
        competitionSwitchChanged({ state, event }) {
            const id = event.target.closest('[data-competition-id]').dataset.competitionId;
            state.set('active.' + id, event.target.checked);
        },
        // idővonal
        hoverEvent({ state }, milestone) { state.set('selectedId', milestone.id); },
        openEvent({ state }, milestone) {
            state.set('selectedId', milestone.id);
            B.openModal('event-modal');
        },
        // Workshop projekt kártya: a workshop eseményének megnyitása
        openProjectEvent({ state, el }) {
            state.set('selectedId', el.dataset.eventId);
            B.openModal('event-modal');
        },
        // naptár menü és kattintás-megállítás
        openCalendarMenu({ event, el }) {
            event.stopPropagation();
            openCalMenu(el.dataset.eventId, el);
        },
        stopPropagation({ event }) { event.stopPropagation(); },
        // Újdonságok ablak
        acceptWhatsNew({ state }) {
            try {
                localStorage.setItem('whatsNewAccepted', JSON.stringify({ version: state.get('whatsNew.version'), acceptedAt: new Date().toISOString() }));
            } catch (e) { /* nincs mentés */ }
            B.closeModal('whats-new-modal');
        }
    };

    const page = document.getElementById('page').textContent;
    const ui = B.buildUI(page, {
        parent: 'app',
        handlers,
        data,
        state: {
            menuOpen: false,
            detailsOpen: saved.detailsOpen,
            ...source,
            ...derive(source),
            whatsNew: whatsNewData()
        }
    });
    window.ui = ui;

    const state = ui.state;
    let syncing = false;
    state.subscribe(SOURCE_KEYS, () => {
        if (syncing) return;
        syncing = true;
        try {
            syncActiveFlags(state.get('active'));
            // ha a kiválasztott esemény versenye kikapcsolt, választunk egy aktívat
            const found = findEventById(state.get('selectedId'));
            if (!found || !found.comp.active) state.set('selectedId', pickDefaultSelectedEvent());
            const next = derive(sourceOf(state), state.snapshot);
            state.batch(() => Object.entries(next).forEach(([k, v]) => state.set(k, v)));
            saveSource(state);
        } finally {
            syncing = false;
        }
    });
    state.subscribe(['detailsOpen'], () => saveSource(state));

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (hasSavedTheme()) return;
            const next = e.matches ? 'dark' : 'light';
            applyTheme(next);
            state.set('theme', next);
        });
    }

    if (state.get('whatsNew.show')) {
        B.openModal('whats-new-modal');
        document.getElementById('whats-new-ok-button')?.focus();
    }
}

let appStarted = false;
// Csak egyszer futhat: egyes böngészőbővítmények a betöltés után újra elsütik a DOMContentLoaded eseményt.
function boot() {
    if (appStarted) return;
    appStarted = true;
    startApp();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
