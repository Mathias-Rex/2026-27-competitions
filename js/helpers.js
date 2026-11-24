/* Téma- és színsegédek, állapotváltozók, dátum- és eseménysegédek. */

// Téma kezelés: <html data-theme="light|dark">
function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
// Versenyszín: sötét módban a comp.dark paletta
function cc(comp, key) { return isDark() && comp.dark ? comp.dark[key] : comp[key]; }
// A versenyszínek CSS-változókként (a kártyák, jelvények és gombok ezekből színeződnek)
function compVars(comp) {
    return `--c-color:${cc(comp, 'color')};--c-bg:${cc(comp, 'bgLight')};--c-border:${cc(comp, 'borderColor')};--c-text:${cc(comp, 'textDark')}`;
}

// Állapot változók
let selectedEventId = null;
let timeFilter = 'all'; // 'all' vagy 'upcoming'
let isDetailsSectionOpen = true;

function parseDate(dateStr) {
    return new Date(dateStr + 'T12:00:00');
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
    return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function formatRelativeDays(dateStr) {
    const diff = getDaysDiff(dateStr);
    if (diff === 0) return 'Ma van!';
    if (diff === 1) return 'Holnap';
    if (diff > 1) return `${diff} nap múlva`;
    if (diff === -1) return 'Tegnap lejárt';
    return `${Math.abs(diff)} napja lejárt`;
}

// A dátumból az évszám nélküli rövid alak ("2026. nov. 6." -> "nov. 6.")
function shortDate(displayDate) {
    return displayDate.replace('2026. ', '').replace('2027. ', '');
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
    const allActiveEvents = [];
    competitions.filter(c => c.active).forEach(c => c.events.forEach(e => allActiveEvents.push(e)));
    allActiveEvents.sort((a, b) => a.date.localeCompare(b.date));
    const nextUpcoming = allActiveEvents.find(e => !isPast(e.date));
    if (nextUpcoming) return nextUpcoming.id;
    return allActiveEvents.length > 0 ? allActiveEvents[0].id : null;
}
