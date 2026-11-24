/* Téma- és színsegédek, állapotváltozók, dátum- és eseménysegédek. */

// Téma kezelés
function isDark() { return document.documentElement.classList.contains('dark'); }
const NEUTRAL_DARK = {
    '#cbd5e1': '#475569', '#e2e8f0': '#334155', '#475569': '#cbd5e1',
    '#f8fafc': '#1e293b', '#ffffff': '#111827', '#64748b': '#94a3b8',
    '#0f172a': '#f1f5f9', '#94a3b8': '#64748b', '#fef3c7': '#3b2a0a',
    '#f1f5f9': '#1e293b', '#d97706': '#f59e0b', '#78350f': '#fde68a'
};
// Semleges (nem versenyhez kötött) szín: sötét módban megfelelő párját adja
function nc(hex) { return isDark() ? (NEUTRAL_DARK[hex.toLowerCase()] || hex) : hex; }
// Versenyszín: sötét módban a comp.dark paletta
function cc(comp, key) { return isDark() && comp.dark ? comp.dark[key] : comp[key]; }

// Állapot változók
let selectedEventId = null;
let timeFilter = 'all'; // 'all' vagy 'upcoming'
let isDetailsSectionOpen = true;

// =========================================================================
// 3. SEGÉDFÜGGVÉNYEK
// =========================================================================
function parseDate(dateStr) {
    return new Date(dateStr + 'T12:00:00');
}

function getPercentPosition(dateStr) {
    const d = parseDate(dateStr);
    const totalMs = TIMELINE_END.getTime() - TIMELINE_START.getTime();
    const currentMs = d.getTime() - TIMELINE_START.getTime();
    const pct = (currentMs / totalMs) * 100;
    return Math.max(0, Math.min(100, pct));
}

function isTodayWithinTimeline() {
    const todayDate = parseDate(TODAY_STR);
    return todayDate >= TIMELINE_START && todayDate <= TIMELINE_END;
}

function isPast(dateStr) {
    return dateStr < TODAY_STR;
}

function getDaysDiff(dateStr) {
    const target = new Date(dateStr + 'T00:00:00');
    const today = new Date(TODAY_STR + 'T00:00:00');
    const diffTime = target - today;
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function formatRelativeDays(dateStr) {
    const diff = getDaysDiff(dateStr);
    if (diff === 0) return 'Ma van!';
    if (diff === 1) return 'Holnap';
    if (diff > 1) return `${diff} nap múlva`;
    if (diff === -1) return 'Tegnap lejárt';
    return `${Math.abs(diff)} napja lejárt`;
}

function findEventById(eventId) {
    if (!eventId) return null;
    for (const comp of competitions) {
        const ev = comp.events.find(e => e.id === eventId);
        if (ev) return { comp, ev };
    }
    return null;
}

function pickDefaultSelectedEvent() {
    const activeComps = competitions.filter(c => c.active);
    const allActiveEvents = [];
    activeComps.forEach(c => {
        c.events.forEach(e => allActiveEvents.push(e));
    });
    allActiveEvents.sort((a, b) => a.date.localeCompare(b.date));
    const nextUpcoming = allActiveEvents.find(e => !isPast(e.date));
    if (nextUpcoming) return nextUpcoming.id;
    return allActiveEvents.length > 0 ? allActiveEvents[0].id : null;
}
